import axios from "axios"
const url = BACKEND_URL

const get = async (params) => {
  return axios.get(url + params)
}

class CountryApi {
  async getAvailableCountries () {
    const data = await get("available-countries")
    return data.data
  }
}

const countryApiInstance = new CountryApi()
export default countryApiInstance;