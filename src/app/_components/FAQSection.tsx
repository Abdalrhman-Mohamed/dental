"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqItems = [
    {
      question: "How long has your company been established?",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean porta rhoncus leo, eget iaculis arcu dapibus vel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porttitor, erat mollis, magna augue consectetur lorem."
    },
    {
      question: "How much does it cost for one care?",
      answer: "Our pricing varies based on the specific care needed. We offer competitive pricing and flexible payment plans to accommodate different budgets."
    },
    {
      question: "How many people work at your company?",
      answer: "We currently have over 150 dedicated professionals working across our various departments and locations."
    },
    {
      question: "Does your company open job vacancies?",
      answer: "Yes, we regularly post job openings on our careers page. We're always looking for talented individuals to join our team."
    },
    {
      question: "How do I contact Dentry for appointment?",
      answer: "You can contact us by phone at +1 (234) 567 890 00, through our website contact form, or by visiting any of our locations during business hours."
    },
    {
      question: "What kind of contracts do you provide?",
      answer: "We offer a range of contract options including annual maintenance plans, pay-per-visit options, and corporate packages for businesses."
    }
  ];

  const toggleFAQ = (index: React.SetStateAction<number>) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block bg-blue-100 text-blue-800 px-6 py-2 rounded-full text-xl font-bold mb-4">
            FAOS
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Frequently Asked Questions
          </h1>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          {/* الجانب الأيسر: الأسئلة الشائعة */}
          <div className="w-full lg:w-7/12">
            <div className="space-y-6">
              {faqItems.map((item, index) => (
                <div 
                  key={index} 
                  className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${
                    activeIndex === index ? 'border-l-4 border-blue-500' : ''
                  }`}
                >
                  <button
                    className="w-full text-left p-6 flex justify-between items-center"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h3 className="text-xl font-semibold text-gray-800">
                      {item.question}
                    </h3>
                    <div className="ml-4 flex-shrink-0">
                      {activeIndex === index ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      )}
                    </div>
                  </button>
                  
                  {activeIndex === index && (
                    <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* الجانب الأيمن: معلومات الاتصال مع الصورة */}
          <div className="w-full lg:w-5/12">
            <div className="relative h-full rounded-2xl overflow-hidden shadow-xl">
              {/* صورة الخلفية - يمكن استبدالها بصورة حقيقية */}
              <div className="bg-gradient-to-br from-blue-500 to-indigo-700 h-full">
                <Image 
                  src="/do.jpeg" 
                  alt="Contact Background" 
                  layout="fill" 
                  objectFit="cover" 
                  className="opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="text-white">
                    <h3 className="text-3xl font-bold mb-4">Contact Us</h3>
                    <p className="text-2xl font-semibold mb-8">+1 (234) 567 890 00</p>
                    
                        <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="bg-blue-500 p-3 rounded-lg mr-4">
                            <FaPhoneAlt className="h-6 w-6 text-white" /> 
                            </div>
                            <div>
                            <p className="text-blue-200">Phone Number</p>
                            <p className="font-medium">+1 (234) 567 890 00</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center">
                            <div className="bg-blue-500 p-3 rounded-lg mr-4">
                            <FaEnvelope className="h-6 w-6 text-white" /> 
                            </div>
                            <div>
                            <p className="text-blue-200">Email Address</p>
                            <p className="font-medium">info@dentry.com</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center">
                            <div className="bg-blue-500 p-3 rounded-lg mr-4">
                            <FaMapMarkerAlt className="h-6 w-6 text-white" /> 
                            </div>
                            <div>
                            <p className="text-blue-200">Main Office</p>
                            <p className="font-medium">123 Dental Street, New York, NY</p>
                            </div>
                        </div>
                        </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;