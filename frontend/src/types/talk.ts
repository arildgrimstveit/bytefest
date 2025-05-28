import type { PortableTextBlock } from '@portabletext/types';
import type { Slug } from '@sanity/types';

export interface Speaker {
  _key?: string;
  name?: string;
  email?: string;
  picture?: {
    asset?: {
      url?: string;
      metadata?: {
        lqip?: string;
      };
    };
  };
}

export interface Talk {
  _type: 'talk';
  _id: string;
  title?: string;
  slug: Slug;
  summary?: PortableTextBlock[];
  description?: PortableTextBlock[];
  time?: string;
  duration?: string;
  location?: string;
  track?: '1' | '2' | '3' | '4' | 'other';
  speakers?: Speaker[];
  language?: 'norwegian' | 'english';
  tags?: string[];
  publishedAt?: string;
  forkunnskap?: 'none' | 'low' | 'medium' | 'high';
}
