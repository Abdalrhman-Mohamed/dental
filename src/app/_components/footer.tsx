import Image from "next/image";
import React from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaWhatsapp } from "react-icons/fa";

// Component for rendering social media icons
const SocialLinks = () => (
  <div className="flex justify-center md:justify-start gap-6 mt-6">
    <a href="#" className="text-blue-600 hover:text-blue-800">
      <FaFacebook size={28} />
    </a>
    <a href="#" className="text-blue-600 hover:text-blue-800">
      <FaInstagram size={28} />
    </a>
    <a href="#" className="text-blue-600 hover:text-blue-800">
      <FaYoutube size={28} />
    </a>
    <a href="#" className="text-blue-600 hover:text-blue-800">
      <FaLinkedin size={28} />
    </a>
    <a href="#" className="text-blue-600 hover:text-blue-800">
      <FaWhatsapp size={28} />
    </a>
  </div>
);

// Component for rendering a list of links
interface ListProps {
  title: string;
  items: string[];
  links: string[];
}

const List = ({ title, items, links }: ListProps) => (
  <div className="text-center md:text-left">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
    <ul className="space-y-2 text-gray-600">
      {items.map((item, index) => (
        <li key={index}>
          <a href={links[index]} className="hover:text-blue-600">{item}</a>
        </li>
      ))}
    </ul>
  </div>
);

// Main Footer component
const Footer = () => {
  const exploreItems = ["Home", "About", "Contact"];
  const exploreLinks = ["/Home", "/About", "/Contact"];
  const workingHours = [
    "Monday - Friday: 07:00 - 23:00",
    "Saturday: 07:00 - 20:00",
    "Sunday: 10:00 - 18:00",
  ];

  return (
    <footer className="bg-blue-100 py-16 mt-16">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="text-center md:text-left">
          <Image
            src="/logo-removebg.png" 
            alt="Dentry Logo"
            width={150}
            height={50}
            style={{ width: 'auto', height: 'auto' }}
          />
          <p className="text-gray-600 mt-4">
            Choose the best dentist for dental care. Lorem ipsum dolor sit amet.
          </p>
          <SocialLinks />
        </div>

        {/* Middle Column - Explore */}
        <List title="Explore" items={exploreItems} links={exploreLinks} />

        {/* Right Column - Working Hours */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Working Hours</h3>
          <ul className="space-y-2 text-gray-600">
            {workingHours.map((hour, index) => (
              <li key={index}>{hour}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto text-center mt-12 px-4">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Subscribe Our Newsletter</h3>
        <form className="flex justify-center items-center">
          <input
            type="email"
            placeholder="Your email"
            className="px-4 py-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
          >
            <span className="font-semibold">→</span>
          </button>
        </form>
      </div>

      {/* Footer Bottom */}
      <div className="bg-blue-200 text-center py-6 mt-12">
        <p className="text-gray-600 text-sm">Copyright © 2025 Texa</p>
        <div className="flex justify-center gap-12 mt-6">
          <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>
          <a href="/terms-services" className="text-blue-600 hover:text-blue-800">Terms & Services</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


