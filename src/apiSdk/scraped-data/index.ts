import axios from 'axios';
import queryString from 'query-string';
import { ScrapedDataInterface, ScrapedDataGetQueryInterface } from 'interfaces/scraped-data';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getScrapedData = async (
  query?: ScrapedDataGetQueryInterface,
): Promise<PaginatedInterface<ScrapedDataInterface>> => {
  const response = await axios.get('/api/scraped-data', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createScrapedData = async (scrapedData: ScrapedDataInterface) => {
  const response = await axios.post('/api/scraped-data', scrapedData);
  return response.data;
};

export const updateScrapedDataById = async (id: string, scrapedData: ScrapedDataInterface) => {
  const response = await axios.put(`/api/scraped-data/${id}`, scrapedData);
  return response.data;
};

export const getScrapedDataById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/scraped-data/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteScrapedDataById = async (id: string) => {
  const response = await axios.delete(`/api/scraped-data/${id}`);
  return response.data;
};
