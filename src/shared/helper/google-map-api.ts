import {
  Client,
} from "@googlemaps/google-maps-services-js";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GOOGLE_MAP_API_KEY;
const client = new Client({});

export async function getCountryCities(country: string): Promise<string[]> {
  try {
    // Make a Geocoding API request to get the cities in the specified country
    const response = await client.geocode({
      params: {
        address: country,
        key: `${apiKey}`,
        components: { country },
      },
    });

    // Extract the cities from the API response
    const cities = response.data.results.map(
      (result: any) => result.formatted_address
    );

    return cities;
  } catch (error) {
    console.error("Error retrieving country cities:", error);
    throw error;
  }
}

// Function to get address details for a city
export async function getCityAddress(city: string) {
    try {
        const response = await client.geocode({
          params: {
            key: `${apiKey}`,
            address: city
          }
        });
    
        const addresses: string[] = [];
    
        for (const result of response.data.results) {
          addresses.push(result.formatted_address);
        }
    
        return addresses;
      } catch (error) {
        console.error('Error:', error);
      }
}

export async function mainFunction() {
    try {
      // Get cities in a country
      const country = 'Cameroon';
      const cities = await getCountryCities(country);
      console.log(`Cities in ${country}:`, cities);
  
      // Get address for a city
      const city = 'Yaounde';
      const address = await getCityAddress(city);
      console.log(`Address of ${city}:`, address);
    } catch (error) {
      console.error('Error:', error);
    }
  }