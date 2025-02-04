import { PortableTextBlock } from "@sanity/types";

export interface Talk {
  _id: string;
  title: string;
  slug: { current: string };
  image: string;
  publishedAt: string;
  body: PortableTextBlock[];
}
