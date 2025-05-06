import { PortableTextBlock } from "@sanity/types";

interface Speaker {
  _key?: string;
  name?: string;
  email?: string;
  picture?: {
    _type?: 'image';
    asset?: {
      _ref?: string;
      _type?: 'reference';
      url?: string; 
    };
  };
}

export interface Talk {
  _id: string;
  title: string;
  slug: { current: string };
  speakers?: Speaker[]; 
  publishedAt: string;
  description?: PortableTextBlock[];
  duration?: string;
  location?: string;
  tags?: string[];
  forkunnskap?: string;
}
