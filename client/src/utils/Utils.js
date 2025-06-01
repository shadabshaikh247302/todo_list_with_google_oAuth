import axios from "axios";
import { config } from "./config";
import { PROD } from "./constants";

// Dynamically select API URL
const baseURL =
  config.CURRENT_ENV === "PROD"
    ? process.env.NEXT_PUBLIC_API_URL_PROD
    : process.env.NEXT_PUBLIC_API_URL_DEV;

// Create Axios instance
const API = axios.create({
  baseURL: baseURL,
 
});

export { axios, API, baseURL };
