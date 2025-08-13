'use client'
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';
import { LuLoaderCircle } from 'react-icons/lu';
import { useLabstore } from '@/store/useLabStore';


export default function LabsDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [service, setService] = useState<any | null>(null);
  const { getLabWithId, loading, error, loadFromStorage } = useLabstore()
  console.log(service);

  useEffect(() => {
    loadFromStorage()
    const fetchService = async () => {
      const data = await getLabWithId(id);
      setService(data);
    };
    fetchService();
  }, [id, loadFromStorage]);

  // if (!service) return notFound();

  return (<>
    <div className="">
      {error && <div>{error}</div>}
      {loading ? <div className='h-80 w-full flex justify-center items-center animate-spin'><LuLoaderCircle size={25} /></div> :
        <div className="overflow-hidden max-w-3xl mx-auto p-4 pt-30">
          <Image
            src={service?.image_url || '/i.webp'}
            alt={service?.title || 'image alt'}
            width={800}
            height={400}
            className="w-full h-64 object-fill rounded-sm"
          />
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{service?.name}</h1>
            <p className="text-gray-700 mb-4">Type: {service?.description}</p>
            <p className="text-gray-600">{service?.address}</p>
            <p className="text-gray-600">{service?.website}</p>
            <p className="text-gray-600">{service?.phone_number}</p>
          </div>
        </div>
      }
    </div>
  </>)
}
