"use client";

import Image from "next/image";
import Button from "./ui/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Hero = () => {
  const router = useRouter()
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("auth")
    setToken(storedToken)
  }, [])

  return (
    <section className="relative bg-white min-h-[85vh] flex items-center justify-center px-6 sm:px-12 lg:px-20 overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/i.webp"
          alt="Dental Background"
          fill
          className="object-cover opacity-80"
          priority
        />

        {/* gradient overlay*/}
        <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/40 to-white/10 backdrop-blur-sm" />
      </div>


      {/* Content */}
      <div className="relative z-10 max-w-7xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12 mt-12">

        {/* Text Content */}
        <div className="flex-1 items-center text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 leading-tight">
            One Unified Platform<br />
            <span className="text-blue-600">
              Connecting Dentists, Labs, and Technicians
            </span>
          </h1>

          <p className="mt-6 text-gray-700 text-lg leading-relaxed">
            Save time and streamline your workflow by managing dental and lab services all in one place.
          </p>

          <div className="mt-8 flex gap-4 items-center justify-center">
            {!token ? <Button variant="primary" onClick={() => router.push('/auth')}>Get Started</Button> : null}
            <Button
              variant="secondary"
              onClick={() => router.push('/about')}
              className="border border-blue-600 text-blue-600 hover:bg-blue-50"
            >
              Explore Services
            </Button>
          </div>
        </div>

        {/* Optional side image (now removed visually) */}
        <div className="hidden md:flex flex-1 justify-center" />
      </div>
    </section>
  );
};

export default Hero;
