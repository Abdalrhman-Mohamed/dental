import Image from 'next/image';
import React, { JSX } from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <LeftSection />
          <RightSection />
        </div>
      </div>
    </div>
  );
};

const LeftSection = () => (
  <div className="w-full lg:w-1/2">
    <div className="relative rounded-2xl overflow-hidden shadow-xl transform hover:scale-[1.02] transition-all duration-500">
      <div className="relative w-full h-[500px]">
        {/* Image Component */}
        <Image
          src="/Dental-clinic.webp"  
          alt="Dr. Ahmed Mahmoud"
          layout="fill"
          objectFit="cover" 
          className="rounded-xl" 
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <div className="text-white">
          <h3 className="text-2xl font-bold mb-2">Dr. Ahmed Mahmoud</h3>
          <p className="text-blue-200 font-medium">Cosmetic Dentistry Specialist</p>
        </div>
      </div>
      <div className="absolute top-6 right-6 bg-white rounded-full p-4 shadow-lg">
        <div className="text-center">
          <span className="text-2xl font-bold text-blue-600">27+</span>
          <span className="block text-xs text-gray-600 mt-1">Years of Experience</span>
        </div>
      </div>
    </div>
  </div>
);

const RightSection = () => (
  <div className="w-full lg:w-1/2">
    <div className="text-center lg:text-left">
      <div className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium mb-4">
        About Us
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
        Smile, You're in the Right Place
      </h1>
      <p className="text-gray-600 text-lg mb-8 space-y-4">
        At our clinic, we believe that a beautiful smile is a right for everyone. We are a team of specialists committed to providing exceptional dental care that combines scientific precision and a human touch.
      </p>
      <p className="text-gray-600 text-lg mb-8 space-y-4">
        Using the latest technologies and innovative treatment methods, we aim to make the dental experience comfortable, relaxing, and stress-free.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <ServiceCard 
        title="Medical Care Available 24/7"
        items={["Personalized treatment planning", "Top-notch general health support", "Instant consultations via phone"]}
        icon={getIcon('blue')}
        color="blue"
      />
      <ServiceCard 
        title="Dentist Appointments"
        items={["Complete psychological support", "Affordable and reasonable prices", "Flexible payment plans"]}
        icon={getIcon('green')}
        color="green"
      />
    </div>

    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-6 shadow-lg">
      <div className="grid grid-cols-3 gap-4">
        <StatCard number="27+" label="Years of Experience" />
        <StatCard number="150+" label="Specialized Doctors" />
        <StatCard number="3.4K+" label="Positive Reviews" />
      </div>

      <div className="mt-6 text-center">
        <button className="bg-white text-blue-600 hover:bg-blue-50 font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg inline-flex items-center">
          Learn More
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </div>
);

const ServiceCard = ({ title, items, icon, color }: { title: string, items: string[], icon: JSX.Element, color: 'blue' | 'green' }) => {
  const colorClasses = {
    blue: "border-blue-200 hover:border-blue-400",
    green: "border-green-200 hover:border-green-400",
  };

  return (
    <div className={`bg-white rounded-xl p-5 border-2 ${colorClasses[color]} transition-all duration-300 hover:shadow-lg`}>
      <div className="flex items-start">
        <div className="mr-3 mt-1">
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckIcon />
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const CheckIcon = () => (
  <span className="text-green-500 mr-2">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  </span>
);

const StatCard = ({ number, label }: { number: string, label: string }) => (
  <div className="text-center text-white">
    <div className="text-2xl md:text-3xl font-bold mb-1">{number}</div>
    <div className="text-blue-100 text-sm">{label}</div>
  </div>
);

const getIcon = (color: 'blue' | 'green') => {
  if (color === 'blue') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    );
  }
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
};

export default AboutUs;
