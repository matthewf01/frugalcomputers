import React from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const Textarea: React.FC<TextareaProps> = ({ label, id, ...props }) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <textarea
        id={id}
        className="w-full bg-neutral-700 border border-neutral-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent transition"
        rows={5}
        {...props}
      ></textarea>
    </div>
  );
};