import { TopicInterface } from 'interfaces/topic';
import { WebsiteInterface } from 'interfaces/website';
import { GetQueryInterface } from 'interfaces';

export interface ScrapedDataInterface {
  id?: string;
  summary?: string;
  link?: string;
  image?: string;
  text?: string;
  topic_id?: string;
  website_id?: string;
  created_at?: any;
  updated_at?: any;

  topic?: TopicInterface;
  website?: WebsiteInterface;
  _count?: {};
}

export interface ScrapedDataGetQueryInterface extends GetQueryInterface {
  id?: string;
  summary?: string;
  link?: string;
  image?: string;
  text?: string;
  topic_id?: string;
  website_id?: string;
}
