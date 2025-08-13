'use client';
import Link from 'next/link';
import Button from './ui/Button';
import { useHomeStore } from '@/store/useHomeStore';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = {
  mainData: any[];
  title: string;
  filterByType: 'doctor' | 'lab' | 'clinic' | 'technician' | 'company';
};

export default function ServicesSlider({ mainData, title, filterByType }: Props) {
  const { loading, error } = useHomeStore()
  console.log(mainData);
  
  mainData?.map((item) =>
    console.log(item?.name)
  )


  if (loading) {
    return (
      <section
        className="w-full bg-no-repeat bg-cover bg-center py-28 min-h-[90vh] flex items-center justify-center"
        style={{ backgroundImage: 'url(/Dental-clinic.webp)' }}
      >
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-3xl md:text-5xl font-bold">{title}</h2>
          <p className="text-lg mt-4">جاري تحميل البيانات...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        className="w-full bg-no-repeat bg-cover bg-center py-28 min-h-[90vh] flex items-center justify-center"
        style={{ backgroundImage: 'url(/Dental-clinic.webp)' }}
      >
        <div className="text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold">{title}</h2>
          <div className="bg-red-500 bg-opacity-80 p-6 rounded-lg mt-8 max-w-md mx-auto">
            <p className="text-lg">خطأ في تحميل البيانات:</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (mainData?.length === 0) {
    return (
      <section
        className="w-full bg-no-repeat bg-cover bg-center py-28 min-h-[90vh] flex items-center justify-center"
        style={{ backgroundImage: 'url(/Dental-clinic.webp)' }}
      >
        <div className="text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold">{title}</h2>
          <p className="text-lg mt-8">لا توجد خدمات متاحة حاليًا</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="w-full bg-no-repeat bg-cover bg-center py-28 min-h-[90vh]"
      style={{ backgroundImage: 'url(/Dental-clinic.webp)' }}
    >
      <div className="text-center text-white mb-12">
        <h2 className="text-3xl md:text-5xl font-bold">{title}</h2>
      </div>

      <div className="px-4 max-w-7xl mx-auto">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Navigation, Pagination, Autoplay]}
        >
          {mainData?.map((service: any) => (
            <SwiperSlide key={service?.id}>
              <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                <Image
                  className="w-full h-48 object-cover"
                  width={80}
                  height={80}
                  src={service?.image_url ? service?.image_url : '/i.webp'}
                  alt={service?.name || 'service image'}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {filterByType === 'lab' ? service?.name : filterByType === 'doctor' ? service?.user_name : service?.name}
                  </h3>
                  <Link href={filterByType === 'lab' ? `/labs/${service?.id}`
                    : filterByType === 'company' ? `/companies/${service?.id}`
                      : filterByType === 'technician' ? `/technicians/${service?.id}`
                        : filterByType === 'doctor' ? `/doctors/${service?.id}` : ''
                  }>
                    <Button className="mt-3" variant="primary">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

