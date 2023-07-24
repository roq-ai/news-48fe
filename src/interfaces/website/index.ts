import { ScrapedDataInterface } from 'interfaces/scraped-data';
import { ClientInterface } from 'interfaces/client';
import { GetQueryInterface } from 'interfaces';

export interface WebsiteInterface {
  id?: string;
  url: string;
  client_id?: string;
  created_at?: any;
  updated_at?: any;
  scraped_data?: ScrapedDataInterface[];
  client?: ClientInterface;
  _count?: {
    scraped_data?: number;
  };
}

export interface WebsiteGetQueryInterface extends GetQueryInterface {
  id?: string;
  url?: string;
  client_id?: string;
}
