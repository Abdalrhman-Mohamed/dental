'use client'
import { getHomeData } from "@/api"
import NewServiceBanner from "./NewServiceBanner"
import ServicesSlider from "./ServicesSlider"
import { useEffect, useState } from "react"
import { useAllServices } from "@/context/allServicesContext"

const Main = () => {
    const { loading } = useAllServices()
    const [getData, setGetData] = useState() as any
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const token = localStorage.getItem('auth')
        setToken(token)
        const data = async () => {
            const { data } = await getHomeData()
            setGetData(data)
        }
        data()
    }, [loading])


    return (<>
        {token ? <>
            <div className="flex items-center justify-center" >
                <NewServiceBanner />
            </div>
            <ServicesSlider mainData={getData?.usersAsDoctors} title="أفضل الأطباء" filterByType="doctor" />
            <ServicesSlider mainData={getData?.labs} title="معامل الأسنان المتخصصة" filterByType="lab" />
            <ServicesSlider mainData={getData?.companys} title="شركات ومراكز أسنان" filterByType="company" />
            <ServicesSlider mainData={getData?.usersAsTechnician} title="فنيين تركيبات محترفين" filterByType="technician" />
        </> : null}
    </>)
}

export default Main