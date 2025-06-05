import { NextResponse } from "next/server";
import { sanityClientWithToken } from "@/sanityClient";
import { cookies } from "next/headers";

// Helper to get authenticated user email from the cookie
async function getAuthenticatedUserEmail(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get("userEmail")?.value || null;
}

interface GeneralFeedbackData {
  feedbackCategory: 'general' | 'talk' | 'speaker';
  relatedTalk?: string;
  name?: string;
  email?: string;
  message?: string;
  rating?: string;
  // General event feedback fields
  digitalParticipationRating?: string;
  digitalImplementationFeedback?: string;
  audioQualityRating?: string;
  videoQualityRating?: string;
  streamingCombinationFeedback?: string;
  praktiskOfficeRating?: string;
  foodServiceRating?: string;
  praktiskFeedback?: string;
  praktiskAudioQualityRating?: string;
  praktiskVideoQualityRating?: string;
  praktiskStreamingCombinationFeedback?: string;
  contentSelectionRating?: string;
  contentPositiveFeedback?: string;
  contentImprovementFeedback?: string;
  socialRating?: string;
  socialFeedback?: string;
  websiteRating?: string;
  informationSourceFeedback?: string;
  informationCommentsFeedback?: string;
  overallImpressionRating?: string;
  overallCommentFeedback?: string;
  recommendationRating?: string;
}

function isValidFeedbackData(data: unknown): data is GeneralFeedbackData {
  if (typeof data !== "object" || data === null) {
    return false;
  }
  const potentialData = data as Record<string, unknown>;
  return (
    typeof potentialData.feedbackCategory === "string" &&
    ['general', 'talk', 'speaker'].includes(potentialData.feedbackCategory)
  );
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!isValidFeedbackData(data)) {
      console.error("[API Error] Invalid feedback data received:", data);
      return NextResponse.json(
        { error: "Invalid feedback data" },
        { status: 400 }
      );
    }

    // For general event feedback, require authentication
    if (data.feedbackCategory === 'general') {
      const userEmail = await getAuthenticatedUserEmail();

      if (!userEmail) {
        return NextResponse.json(
          { error: "User not authenticated for general event feedback submission." },
          { status: 401 }
        );
      }

      // Find the attendee document by email to get its _id for reference
      const attendee = await sanityClientWithToken.fetch<{ _id: string; participationLocation: string } | null>(
        `*[_type == "attendee" && attendeeEmail == $email][0]{_id, participationLocation}`,
        { email: userEmail }
      );

      if (!attendee || !attendee._id) {
        return NextResponse.json(
          { error: "Attendee registration not found for this user." },
          { status: 404 } 
        );
      }

      // Process general event feedback
      const processedData: Record<string, unknown> & { _type: string } = {
        _type: "feedback",
        feedbackCategory: "general",
        attendee: {
          _type: 'reference',
          _ref: attendee._id
        },
        participationLocation: attendee.participationLocation,
        submittedAt: new Date().toISOString(),
      };

      // Process all the form fields, converting ratings to numbers and filtering empty values
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'feedbackCategory') return; // Already handled
        
        if (typeof value === 'string' && value.trim() !== '') {
          // If field ends with 'Rating', convert to number
          if (key.endsWith('Rating')) {
            const numValue = parseInt(value, 10);
            if (!isNaN(numValue) && numValue >= 1 && numValue <= 5) {
              processedData[key] = numValue;
            }
          } else {
            // Text fields
            processedData[key] = value.trim();
          }
        }
      });

      const savedFeedback = await sanityClientWithToken.create(processedData);
      console.log(`[API Info] General event feedback document created: ${savedFeedback._id}`);

      return NextResponse.json(
        { 
          message: "Feedback submitted successfully", 
          feedbackId: savedFeedback._id 
        },
        { status: 201 }
      );
    } else {
      // Handle other feedback types (talk, speaker) - now require authentication
      const userEmail = await getAuthenticatedUserEmail();

      if (!userEmail) {
        return NextResponse.json(
          { error: "User not authenticated for feedback submission." },
          { status: 401 }
        );
      }

      // Find the attendee document by email to get its _id for reference
      const attendee = await sanityClientWithToken.fetch<{ _id: string; participationLocation: string } | null>(
        `*[_type == "attendee" && attendeeEmail == $email][0]{_id, participationLocation}`,
        { email: userEmail }
      );

      // Require attendee registration for all feedback types
      if (!attendee || !attendee._id) {
        return NextResponse.json(
          { error: "Attendee registration not found for this user." },
          { status: 404 } 
        );
      }

      const processedData: Record<string, unknown> & { _type: string } = {
        _type: "feedback",
        feedbackCategory: data.feedbackCategory,
        submittedAt: new Date().toISOString(),
      };

      // Add attendee reference (now guaranteed to exist)
      processedData.attendee = {
        _type: 'reference',
        _ref: attendee._id
      };

      // Add fields based on feedback type
      if (data.feedbackCategory === 'talk' && data.relatedTalk) {
        processedData.relatedTalk = {
          _type: 'reference',
          _ref: data.relatedTalk
        };
      }

      // Add common fields
      if (data.name && typeof data.name === 'string') {
        processedData.name = data.name.trim();
      }
      if (data.email && typeof data.email === 'string') {
        processedData.email = data.email.trim();
      }
      if (data.message && typeof data.message === 'string') {
        processedData.message = data.message.trim();
      }
      if (data.rating && typeof data.rating === 'string') {
        const numValue = parseInt(data.rating, 10);
        if (!isNaN(numValue) && numValue >= 1 && numValue <= 5) {
          processedData.rating = numValue;
        }
      }

      const savedFeedback = await sanityClientWithToken.create(processedData);
      console.log(`[API Info] Feedback document created: ${savedFeedback._id}`);

      return NextResponse.json(
        { 
          message: "Feedback submitted successfully", 
          feedbackId: savedFeedback._id 
        },
        { status: 201 }
      );
    }

  } catch (error) {
    console.error("[API Error] Error during feedback submission:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    const typedError = error as Error & { response?: { body?: unknown } };
    const errorDetails = process.env.NODE_ENV === "development" && typedError.response?.body
                         ? typedError.response.body
                         : undefined;

    return NextResponse.json(
      {
        error: "Failed to submit feedback",
        details: errorMessage,
        ...(errorDetails && { sanityError: errorDetails })
      },
      { status: 500 }
    );
  }
} 