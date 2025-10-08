import React, { useState } from 'react';
import type { Service } from '../types';
import { Card } from './common/Card';
import { Button } from './common/Button';
import { Input } from './common/Input';
import { Textarea } from './common/Textarea';
import { AddressAutocomplete } from './common/AddressAutocomplete';
import { 
  WrenchScrewdriverIcon, ShieldExclamationIcon, CircleStackIcon, WifiIcon, 
  CubeTransparentIcon, BuildingOfficeIcon, ComputerCheckIcon, ArrowUpOnSquareIcon, 
  TrashIcon, PrinterIcon, BatteryIcon, HomeIcon
} from './icons/ServiceIcons';

const servicesList: Service[] = [
  {
    icon: <WrenchScrewdriverIcon className="h-10 w-10 text-brand-lime" />,
    title: 'Desktop and Laptop Computer Repair',
    description: 'We can diagnose and repair many issues causing you problems. Repair brings new life to your computer, saving it from the garbage and saving you money!',
  },
  {
    icon: <ShieldExclamationIcon className="h-10 w-10 text-brand-lime" />,
    title: 'Virus & Malware Removal',
    description: 'Comprehensive scanning and removal of malicious software to protect your data and restore your system\'s security.',
  },
   {
    icon: <ComputerCheckIcon className="h-10 w-10 text-brand-lime" />,
    title: 'Computer Health Check and Performance Tune-Up',
    description: 'Optimize your system for speed and longevity. We clean up unnecessary files, update software, and ensure everything is running smoothly.',
  },
  {
    icon: <ArrowUpOnSquareIcon className="h-10 w-10 text-brand-lime" />,
    title: 'Computer Upgrades',
    description: 'Boost your computer\'s performance with more RAM, a faster solid-state drive (SSD), or an upgraded graphics card. We can also evaluate if a replacement is more cost-effective.',
  },
  {
    icon: <BatteryIcon className="h-10 w-10 text-brand-lime" />,
    title: 'Laptop Battery Replacement',
    description: 'Is your laptop battery not holding a charge? We can replace your aging laptop battery to restore its portability and extend its usable life.',
  },
  {
    icon: <CircleStackIcon className="h-10 w-10 text-brand-lime" />,
    title: 'Data Recovery',
    description: 'Attempting to recover lost or deleted files from failing hard drives, SSDs, and other storage media.',
  },
  {
    icon: <TrashIcon className="h-10 w-10 text-brand-lime" />,
    title: 'Secure Data Destruction',
    description: 'Permanently erase all data from your old hard drives before you donate, recycle, or dispose of your computer, protecting your privacy.',
  },
  {
    icon: <WifiIcon className="h-10 w-10 text-brand-lime" />,
    title: 'Network Setup',
    description: 'We help set up and optimize your home wifi and internet for reliable and fast connectivity throughout your home or small office.',
  },
  {
    icon: <HomeIcon className="h-10 w-10 text-brand-lime" />,
    title: 'Smart Home Device Setup',
    description: 'Connecting or configuring smart devices like lights, plugs, and thermostats so they can be controlled from anywhere.',
  },
  {
    icon: <PrinterIcon className="h-10 w-10 text-brand-lime" />,
    title: 'Printer Setup & Troubleshooting',
    description: 'Assistance with setting up new printers, connecting them to your network, and resolving common printing issues.',
  },
  {
    icon: <CubeTransparentIcon className="h-10 w-10 text-brand-lime" />,
    title: 'Custom PC Builds',
    description: 'Building tailor-made computers for gaming, productivity, or any specific need, focusing on performance and value.',
  },
  {
    icon: <BuildingOfficeIcon className="h-10 w-10 text-brand-lime" />,
    title: 'Small Business IT Support',
    description: 'Providing on-demand IT support for small businesses, from workstation setup to server maintenance.',
  },
];

const Services: React.FC = () => {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({ name: '', email: '', location: '', descriptions: {} as Record<string, string> });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleServiceClick = (title: string) => {
    setSelectedServices(prev => {
      if (prev.includes(title)) {
        // Deselecting: remove from array and also remove its description
        const newDescriptions = { ...formData.descriptions };
        delete newDescriptions[title];
        setFormData(prevData => ({ ...prevData, descriptions: newDescriptions }));
        return prev.filter(s => s !== title);
      } else {
        // Selecting: add to array
        return [...prev, title];
      }
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'name' || name === 'email') {
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      // This handles the textareas for service descriptions
      setFormData(prev => ({
        ...prev,
        descriptions: {
          ...prev.descriptions,
          [name]: value,
        },
      }));
    }
  };

  const handleLocationChange = (address: string) => {
    setFormData(prev => ({ ...prev, location: address }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this data to a server
    console.log("Service Request Submitted:", {
      ...formData,
      selectedServices,
    });
    setIsSubmitted(true);
  };


  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-brand-lime tracking-wide uppercase">Our Services</h2>
          <p className="mt-2 text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
            What We Can Do For You
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400">
            Select one or more services you need help with below. A request form will appear at the bottom.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {servicesList.map((service) => {
            const isSelected = selectedServices.includes(service.title);
            return (
              <div
                key={service.title}
                onClick={() => handleServiceClick(service.title)}
                className={`cursor-pointer rounded-xl transition-all duration-300 ${isSelected ? 'ring-2 ring-brand-lime' : ''}`}
                role="checkbox"
                aria-checked={isSelected}
                tabIndex={0}
                onKeyDown={(e) => (e.key === ' ' || e.key === 'Enter') && handleServiceClick(service.title)}
              >
                <Card className={`flex flex-col items-center text-center h-full ${isSelected ? 'border-brand-lime bg-neutral-700/50' : 'border-neutral-700'}`}>
                  <div className="flex-shrink-0">
                    {service.icon}
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-white">{service.title}</h3>
                  <p className="mt-2 text-base text-gray-300 flex-grow">{service.description}</p>
                </Card>
              </div>
            );
          })}
        </div>

        {selectedServices.length > 0 && (
          <div className="mt-20">
            <div className="max-w-3xl mx-auto">
              {isSubmitted ? (
                 <div className="text-center bg-neutral-800 p-10 rounded-lg border border-green-500">
                    <h3 className="text-2xl font-bold text-white">Request Sent!</h3>
                    <p className="mt-2 text-lg text-gray-300">Thank you for your request. We will get back to you shortly at {formData.email}.</p>
                    <Button onClick={() => {
                        setIsSubmitted(false);
                        setSelectedServices([]);
                        setFormData({ name: '', email: '', location: '', descriptions: {} });
                    }} className="mt-6">
                        Submit Another Request
                    </Button>
                 </div>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-center text-white">Service Request</h2>
                  <p className="mt-2 text-lg text-center text-gray-400">Please provide your details and a brief description for each selected service.</p>
                  <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input label="Your Name" name="name" type="text" value={formData.name} onChange={handleInputChange} required />
                      <Input label="Your Email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    
                    <AddressAutocomplete
                      id="location"
                      label="Location / Address (for on-site service)"
                      value={formData.location}
                      onChange={handleLocationChange}
                    />

                    <div className="space-y-6">
                      {selectedServices.map(title => (
                        <Textarea 
                          key={title}
                          label={`Please describe your request for "${title}"`}
                          name={title}
                          value={formData.descriptions[title] || ''}
                          onChange={handleInputChange}
                        />
                      ))}
                    </div>

                    <div className="text-center pt-4">
                      <Button type="submit" variant="primary" className="w-full md:w-auto">Submit Request</Button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;