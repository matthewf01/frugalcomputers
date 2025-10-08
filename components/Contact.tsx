import React, { useState } from 'react';
import { Button } from './common/Button';
import { Input } from './common/Input';
import { Textarea } from './common/Textarea';
import { NextdoorIcon } from './icons/NextdoorIcon';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle form submission here (e.g., API call)
    console.log('Form submitted:', formState);
    setIsSubmitted(true);
  };
  
  return (
    <div className="py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          <div className="lg:col-span-1">
            <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
              Get In Touch
            </h2>
            <p className="mt-4 text-xl text-gray-400">
              Have a question or need to schedule a repair? Fill out the form, and we'll get back to you as soon as possible.
            </p>
            <div className="mt-8 space-y-4">
               <p className="flex items-center text-lg text-gray-300">
                <svg className="flex-shrink-0 mr-3 h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <a href="mailto:frugalcomputer@gmail.com" className="hover:text-brand-lime">frugalcomputer@gmail.com</a>
              </p>
              <div className="flex items-center text-lg text-gray-300">
                 <NextdoorIcon className="flex-shrink-0 mr-3 h-6 w-6 text-gray-400"/>
                 <a href="https://nextdoor.com/page/frugal-computers-suwanee-ga/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-lime">Find us on Nextdoor</a>
              </div>
            </div>
          </div>
          <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-span-1">
            {isSubmitted ? (
              <div className="flex items-center justify-center h-full bg-neutral-800 rounded-lg p-12 text-center">
                <div>
                  <h3 className="text-2xl font-bold text-white">Thank you!</h3>
                  <p className="mt-2 text-lg text-gray-300">Your message has been sent. We'll be in touch shortly.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input label="Your Name" type="text" name="name" id="name" required value={formState.name} onChange={handleChange} />
                <Input label="Your Email" type="email" name="email" id="email" required value={formState.email} onChange={handleChange} />
                <Input label="Subject" type="text" name="subject" id="subject" required value={formState.subject} onChange={handleChange} />
                <Textarea label="Message" name="message" id="message" required value={formState.message} onChange={handleChange} />
                <div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;