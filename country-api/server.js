const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors')

const port = 4000;

app.use(cors())
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello world")
})

// Get Available Countries Endpoint
app.get('/api/available-countries', async (req, res) => {
    try {
        const response = await axios.get('https://date.nager.at/api/v3/AvailableCountries');
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching available countries', error: error.message });
    }
});

// Get Country Info Endpoint
app.get('/api/country-info/:countryCode', async (req, res) => {
    const countryCode = req.params.countryCode;
    try {
        // Get border countries
        const countryInfo = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${countryCode}`);

        // Get population data
        const populationData = await axios.post('https://countriesnow.space/api/v0.1/countries/population', {
            country: countryInfo.data.commonName,
        });

        // Get flag URL
        const flagResponse = await axios.post('https://countriesnow.space/api/v0.1/countries/flag/images', {
            iso2: countryInfo.data.countryCode,
        });

        // Combine data
        const result = {
            countryName: countryInfo.data.commonName,
            countryCode: countryInfo.data.countryCode,
            borders: countryInfo.data.borders,
            population: populationData.data.data.populationCounts || null,
            flagUrl: flagResponse.data.data.flag,
        };

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching country info', error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
