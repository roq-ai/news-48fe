import { ScrapedDataInterface } from 'interfaces/scraped-data';
import { ClientInterface } from 'interfaces/client';
import { GetQueryInterface } from 'interfaces';

export interface TopicInterface {
  id?: string;
  name: string;
  client_id?: string;
  created_at?: any;
  updated_at?: any;
  scraped_data?: ScrapedDataInterface[];
  client?: ClientInterface;
  _count?: {
    scraped_data?: number;
  };
}

export interface TopicGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  client_id?: string;
}
