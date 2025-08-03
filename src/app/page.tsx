import Hero from "./_components/Hero";
import NewServiceBanner from "./_components/NewServiceBanner";
import ServicesSlider from "./_components/ServicesSlider";

export default function Home() {
  return (
    <>
      <>
        <Hero />
        <div className="flex items-center justify-center">
          <NewServiceBanner />
        </div>
        <ServicesSlider title="أفضل الأطباء" filterByType="doctor" />
        <ServicesSlider title="معامل الأسنان المتخصصة" filterByType="lab" />
        <ServicesSlider title="شركات ومراكز أسنان" filterByType="company" />
        <ServicesSlider title="فنيين تركيبات محترفين" filterByType="technician" />
      </>
    </>
  );
}
