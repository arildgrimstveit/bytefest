export interface Speaker {
  _id: string;
  name: string;
  slug?: { current: string };
  summary: string;
  picture: string;
}
