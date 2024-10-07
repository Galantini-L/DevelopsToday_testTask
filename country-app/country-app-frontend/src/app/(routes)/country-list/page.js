"use client"
import { vars } from "@/app/utils/vars"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const ShowCountries = () => {
  const [countries, setCountries] = useState([])

  const router = useRouter()

  useEffect(() => {
    axios.get('http://localhost:4000/api/available-countries')
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleOnClick = (code) => {
    router.push(`/country-info/${code}`)
  }


  return (
    <div className="p-20">
      <h1 className="flex justify-center font-extrabold text-5xl pb-10">Countries List</h1>
      <ol className="flex flex-col gap-5">
        {countries.length > 0 &&
          countries.map((country, index) => {
            return (
              <li className="underline cursor-pointer"
                onClick={() => handleOnClick(country.countryCode)}
              >{country.name}</li>
            )
          })}
      </ol>
    </div>
  )
}
export default ShowCountries