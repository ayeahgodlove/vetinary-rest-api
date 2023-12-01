"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainFunction = exports.getCityAddress = exports.getCountryCities = void 0;
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const apiKey = process.env.GOOGLE_MAP_API_KEY;
const client = new google_maps_services_js_1.Client({});
async function getCountryCities(country) {
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
        const cities = response.data.results.map((result) => result.formatted_address);
        return cities;
    }
    catch (error) {
        console.error("Error retrieving country cities:", error);
        throw error;
    }
}
exports.getCountryCities = getCountryCities;
// Function to get address details for a city
async function getCityAddress(city) {
    try {
        const response = await client.geocode({
            params: {
                key: `${apiKey}`,
                address: city
            }
        });
        const addresses = [];
        for (const result of response.data.results) {
            addresses.push(result.formatted_address);
        }
        return addresses;
    }
    catch (error) {
        console.error('Error:', error);
    }
}
exports.getCityAddress = getCityAddress;
async function mainFunction() {
    try {
        // Get cities in a country
        const country = 'Cameroon';
        const cities = await getCountryCities(country);
        console.log(`Cities in ${country}:`, cities);
        // Get address for a city
        const city = 'Yaounde';
        const address = await getCityAddress(city);
        console.log(`Address of ${city}:`, address);
    }
    catch (error) {
        console.error('Error:', error);
    }
}
exports.mainFunction = mainFunction;
