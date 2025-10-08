
import React, { useEffect, useRef, useState } from 'react';

// This lets us use `window.google` without TypeScript errors
declare global {
  interface Window {
    google: any;
    gm_authFailure?: () => void; // Define our callback on window
  }
}

interface AddressAutocompleteProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

// Safely access the API key to prevent "process is not defined" error in browser environments.
const GOOGLE_MAPS_API_KEY = (typeof process !== 'undefined' && process.env.GOOGLE_MAPS_API_KEY) ? process.env.GOOGLE_MAPS_API_KEY : undefined;

export const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({ label, id, value, onChange, required }) => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [apiFailed, setApiFailed] = useState(false);
  const autocompleteInput = useRef<HTMLInputElement>(null);
  const autocompleteInstance = useRef<any>(null);

  useEffect(() => {
    // Define the callback function that Google Maps will call on auth error
    window.gm_authFailure = () => {
      console.error("Google Maps API Authentication Failed: The provided API key is invalid or misconfigured. Address autocomplete is disabled.");
      setApiFailed(true);
    };

    const loadScript = () => {
      if (document.getElementById('googleMapsScript')) {
        if (window.google) setScriptLoaded(true);
        return;
      }
      
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&error_callback=gm_authFailure`;
      script.id = 'googleMapsScript';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        setScriptLoaded(true);
      };
    };

    if (GOOGLE_MAPS_API_KEY) {
      loadScript();
    } else {
      console.warn("Google Maps API key not found. Address autocomplete is disabled.");
      setApiFailed(true);
    }
    
    // Cleanup the global callback on component unmount
    return () => {
      if (window.gm_authFailure) {
        delete window.gm_authFailure;
      }
    };
  }, []);

  useEffect(() => {
    // Initialize the autocomplete widget once the script is loaded and the API hasn't failed
    if (scriptLoaded && !apiFailed && autocompleteInput.current) {
        autocompleteInstance.current = new window.google.maps.places.Autocomplete(
            autocompleteInput.current,
            { types: ['address'], componentRestrictions: { country: 'us' } }
        );

        autocompleteInstance.current.addListener('place_changed', () => {
            const place = autocompleteInstance.current?.getPlace();
            if (place?.formatted_address) {
                onChange(place.formatted_address);
            }
        });
    }
  }, [scriptLoaded, apiFailed, onChange]);
  
  // Render a fallback input if the API key is missing or invalid
  if (apiFailed) {
      return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
                {label}
            </label>
            <input
                id={id}
                name={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                placeholder="Start typing your address..."
                className="w-full bg-neutral-700 border border-neutral-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent transition"
            />
            <p className="text-xs text-yellow-500 mt-1">Address autocomplete is temporarily unavailable.</p>
        </div>
      );
  }

  // Render the autocomplete-enabled input
  return (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
            {label}
        </label>
        <input
            ref={autocompleteInput}
            id={id}
            name={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            placeholder="Start typing your address..."
            className="w-full bg-neutral-700 border border-neutral-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent transition"
        />
    </div>
  );
};
