'use client'
import NewServiceBanner from "./NewServiceBanner"
import ServicesSlider from "./ServicesSlider"
import { useEffect, useState } from "react"
import { useHomeStore } from "@/store/useHomeStore"
import { useLabstore } from "@/store/useLabStore"
import { useCompanystore } from "@/store/useCompanyStore"

const Main = () => {
    const { fetchHomeData, token, loading, loadFromStorage } = useHomeStore()
    const { loading: labLoading } = useLabstore()
    const { loading: companyLoading } = useCompanystore()
    const [getData, setGetData] = useState() as any

    useEffect(() => {
        loadFromStorage()
        const data = async () => {
            const data = await fetchHomeData()
            console.log(data);

            setGetData(data)
        }
        data()
    }, [loadFromStorage, companyLoading, labLoading])


    return (<>
        {token ? <>
            {loading ? <div className="w-full h-svh flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-blue-700 border-t-transparent rounded-full animate-spin mr-2" />
            </div> : <>
                <div className="flex items-center justify-center" >
                    <NewServiceBanner companies={getData?.companys} />
                </div>
                <ServicesSlider mainData={getData?.usersAsDoctors} title="أفضل الأطباء" filterByType="doctor" />
                <ServicesSlider mainData={getData?.labs} title="معامل الأسنان المتخصصة" filterByType="lab" />
                <ServicesSlider mainData={getData?.companys} title="شركات ومراكز أسنان" filterByType="company" />
                <ServicesSlider mainData={getData?.usersAsTechnician} title="فنيين تركيبات محترفين" filterByType="technician" />
            </>}
        </> : null}
    </>)
}

export default Main