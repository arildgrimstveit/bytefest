// Basic type definition based on sanity/schemas/attendee.ts

export interface Attendee {
  _id: string; // Sanity document ID
  _type: 'attendee';
  _createdAt: string;
  _updatedAt: string;
  attendeeName?: string; // Optional because it might be set by Sanity/SSO
  attendeeEmail: string; // Assuming email is always present when fetching
  bu: string;
  participationLocation: string;
  wantsFood: 'yes' | 'no' | 'digital';
  dietaryNeeds?: string[];
  attendsParty: 'yes' | 'no';
  registeredAt?: string;
  favoriteTalks?: {_key: string, _ref: string, _type: 'reference'}[];
}