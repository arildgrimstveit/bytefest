import type { PortableTextBlock } from '@portabletext/types';
import type { Slug } from '@sanity/types';

export interface SocialEvent {
  _type: 'social';
  _id: string;
  title?: string;
  slug?: Slug;
  description?: PortableTextBlock[];
  location?: string;
  roomAddress?: string;
  time?: string; // ISO datetime string
} 