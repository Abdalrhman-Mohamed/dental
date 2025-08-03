// /app/services/[id]/page.tsx

import { notFound } from 'next/navigation';
import Image from 'next/image';

type Service = {
  id: string;
  title: string;
  image: string;
  type: 'doctor' | 'lab' | 'clinic' | 'technician';
};

const services: Service[] = [
  { id: 'lab-1', title: 'معمل أسنان متكامل', image: '/do.jpeg', type: 'lab' },
  { id: 'doctor-2', title: 'د. أحمد تركيبات وتجميل', image: '/i.webp', type: 'doctor' },
  { id: 'clinic-789', title: 'عيادة أسنان راقية', image: '/file_bwmsb.jpg', type: 'clinic' },
  { id: 'tech-321', title: 'فني تركيبات محترف', image: '/i (1).webp', type: 'technician' },
];

export async function generateStaticParams() {
  return services.map((service) => ({
    id: service.id,
  }));
}

export default async function ServiceDetailsPage({ params }: { params: { id: string } }) {
  const service = services.find((s) => s.id === params.id);

  if (!service) return notFound();

  return (
    <div className="max-w-3xl mx-auto p-4 mt-10">
      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <Image
          src={service.image}
          alt={service.title}
          width={800}
          height={400}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-2">{service.title}</h1>
          <p className="text-gray-700 mb-4">Type: {service.type}</p>
          <p className="text-gray-600">Details about the service go here...</p>
        </div>
      </div>
    </div>
  );
}
