import { PortableTextBlock } from "@sanity/types";

export interface Talk {
  _id: string;
  title: string;
  slug: { current: string };
  speakerImage: string;
  speakerName?: string;
  speakerEmail?: string;
  publishedAt: string;
  description?: PortableTextBlock[];
  duration?: string;
  location?: string;
  tags?: string[];
  forkunnskap?: string;
}
