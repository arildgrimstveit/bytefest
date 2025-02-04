export interface TalkProgram {
  _id: string;
  title: string;
  slug: { current: string };
  talkTime: string;
  speaker: { name: string };
  location: string;
}
