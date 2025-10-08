import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <input
        id={id}
        className="w-full bg-neutral-700 border border-neutral-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent transition"
        {...props}
      />
    </div>
  );
};