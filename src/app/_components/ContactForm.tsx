"use client";
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import Image from 'next/image';
const InputField = ({ label, name, type, value, onChange, required, rows }: any) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    {type === 'textarea' ? (
      <textarea
        name={name}
        id={name}
        rows={rows || 4}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    ) : (
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )}
  </div>
);
const ContactForm = () => {
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    email: string;
    emailTo: string;
    message: string;
  }>({
    name: '',
    phone: '',
    email: '',
    emailTo: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, phone, email, message, emailTo } = formData;

    const templateParams = {
      name,
      phone,
      email,
      message,
      emailTo,
    };

    try {
      await emailjs.send(
        'service_bzvfzh5',
        'template_w3wq93n',
        templateParams,
        'ohZiM0oZp4HxiDQ0i'
      );
      setResponseMessage('Your message has been sent successfully!');
    } catch (error) {
      setResponseMessage('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    { label: 'Your Name', name: 'name', type: 'text' },
    { label: 'Phone', name: 'phone', type: 'tel' },
    { label: 'Your Email Address', name: 'email', type: 'email' },
    { label: "Recipient's Email Address", name: 'emailTo', type: 'email' },
    { label: 'Message', name: 'message', type: 'textarea' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-25 flex flex-col lg:flex-row gap-12">
        {/* Left Side: Form */}
        <div className="w-full lg:w-7/12">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Get In Touch With Our Support</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {formFields.map((field, index) => (
              <InputField
                key={index}
                label={field.label}
                name={field.name}
                type={field.type}
                value={formData[field.name as keyof typeof formData]} 
                onChange={handleChange}
                required
                rows={field.type === 'textarea' ? 4 : undefined}
              />
            ))}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-full font-bold transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>

          {responseMessage && (
            <div className="mt-6 text-center">
              <p className="text-lg font-medium text-gray-700">{responseMessage}</p>
            </div>
          )}
        </div>

        {/* Right Side: Image */}
        <div className="w-full lg:w-5/12">
          <div className="relative h-full rounded-2xl overflow-hidden shadow-xl">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-700 h-full">
              <Image
                src="/do.jpeg"
                alt="Contact Background"
                layout="fill"
                objectFit="cover"
                className="opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <h3 className="text-3xl font-bold mb-4">Contact Us</h3>
                <p className="text-2xl font-semibold mb-8">+1 (234) 567 890 00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactForm;
