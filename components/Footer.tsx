
import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { NextdoorIcon } from './icons/NextdoorIcon';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 mt-16">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8 items-center">
          
          {/* Column 1: Site Info */}
          <div className="space-y-4 xl:col-span-1">
            <h3 className="text-xl font-bold text-white">Frugal Computers</h3>
            <p className="text-gray-400 text-base">
              Your friendly, local tech support for home and small business needs in Suwanee, GA.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="mt-12 xl:mt-0 xl:col-span-1">
             <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Navigation</h3>
             <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 items-center">
               {NAV_LINKS.map(link => (
                 <li key={link.name}>
                   <NavLink to={link.path} className="text-base text-gray-300 hover:text-white">
                     {link.name}
                   </NavLink>
                 </li>
               ))}
               <li>
                 <a href="https://nextdoor.com/page/frugal-computers-suwanee-ga/" target="_blank" rel="noopener noreferrer" className="text-base text-gray-300 hover:text-white flex items-center gap-2">
                   <NextdoorIcon className="h-5 w-5" />
                   <span>Nextdoor</span>
                 </a>
               </li>
             </ul>
          </div>
          
          {/* Column 3: Copyright */}
          <div className="mt-8 text-center xl:mt-0 xl:col-span-1 xl:text-right">
             <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} Frugal Computers. All rights reserved.</p>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
