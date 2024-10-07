"use client"
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LineChart } from '@mui/x-charts/LineChart';

const countryInfo = ({ params }) => {
  const countryCode = params.id

  const [countryInfo, setCountryInfo] = useState(null)

  const router = useRouter()

  useEffect(() => {
    axios.get(`http://localhost:4000/api/country-info/${countryCode}`)
      .then(response => {
        setCountryInfo(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleOnClick = (code) => {
    router.push(`/country-info/${code}`)
  }

  const yearChart = countryInfo?.population.map(entry => entry.year)
  const populationChart = countryInfo?.population.map(entry => entry.value)

  return (
    <div className="p-20 flex flex-col gap-10 h-full">
      <h1 className="underline cursor-pointer" onClick={() => router.push('/country-list')}>
        Go to Coutries List
      </h1>
      <div className="flex-col md:flex-row flex gap-10 items-center justify-center h-full w-full">
        <h1 className="text-3xl font-extrabold">{countryInfo?.countryName}</h1>
        <Image
          alt="coutry flag"
          src={countryInfo?.flagUrl}
          width={100}
          height={100}
          className="min-h-100 min-w-100"
        />
      </div>
      <div className="flex flex-col md:flex-row gap-10 items-center md:items-start h-full">
        <div className="flex flex-col md:gap-10 gap-5 justify-between w-full h-full items-center md:items-start">
          <h2 className="font-bold">Border countries:</h2>
          <ol className="block gap-5 text- w-full">
            {countryInfo?.borders.length > 0 &&
              countryInfo.borders.map((country, index) => {
                return (
                  <li key={index} className="underline cursor-pointer text-center md:text-start"
                    onClick={() => handleOnClick(country.countryCode)}>
                    {country.commonName}
                  </li>
                )
              })}
          </ol>
        </div>
        <div className="flex flex-col md:gap-10 gap-5 items-center md:items-start h-full">
          <h1 className="font-bold">Population Chart</h1>
          {yearChart && populationChart &&
            <LineChart
              className="bg-white"
              xAxis={[{ data: yearChart }]}
              series={[
                {
                  data: populationChart,
                },
              ]}
              width={500}
              height={300}
            />
          }
        </div>
      </div>
    </div>
  )
}

export default countryInfo