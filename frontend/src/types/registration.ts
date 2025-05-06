export interface RegistrationSubmitData {
  bu: string;
  participationLocation: string;
  wantsFood: string;
  dietaryNeeds: string[];
  attendsParty: string;
  willPresent: string;
  attendeeName: string;
  attendeeEmail: string;
  localFavoriteSlugs?: string[];
  // Add any other fields that are part of the submission data being validated
} 