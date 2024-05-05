import axios from "axios";

/**
 * Fetches data from the specified URL using axios.
 * @param url - The URL to fetch data from.
 * @returns A promise that resolves to the data fetched from the URL.
 */
export const fetcher = (url: string) => axios.get(url).then((res) => res.data);
