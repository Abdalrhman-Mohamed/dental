// /app/services/[id]/page.tsx
'use client'
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useServices } from '@/context/ServicesContext';
import { use, useEffect, useState } from 'react';

type Service = {
  id: string;
  title: string;
  image: string;
  type: 'doctor' | 'lab' | 'clinic' | 'technician';
};

// export async function generateStaticParams() {
//   return services.map((service) => ({
//     id: service.id,
//   }));
// }


export default function ServiceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { getServiceById } = useServices()
  const { id } = use(params)
  const [service, setService] = useState<any | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      const result = await getServiceById(id);
      setService(result);
    };
    fetchService();
  }, [id]);

  if (service === null) return <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>



  if (!service) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-4 pt-30">
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <Image
          src={service[0]?.image || '/i.webp'}
          alt={service[0]?.title || 'image alt'}
          width={800}
          height={400}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{service[0]?.title}</h1>
          <p className="text-gray-700 mb-4">Type: {service[0]?.type}</p>
          <p className="text-gray-600">Details about the service go here...</p>
        </div>
      </div>
    </div>
  );
}
