import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-neutral-800 p-6 rounded-xl shadow-lg border border-neutral-700 hover:border-brand-lime transition-colors ${className}`}>
      {children}
    </div>
  );
};