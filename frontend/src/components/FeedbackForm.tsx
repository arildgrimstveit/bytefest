"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { PixelInput } from '@/components/InputPixelCorners';
import { useUser } from '@/components/UserContext';
import { useRouter } from 'next/navigation';
import sanityClient from '@/sanityClient';
import type { Attendee } from '@/types/attendee';

interface FeedbackFormProps {
  talkId: string;
  talkTitle: string;
  shareButton?: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function FeedbackForm({ talkId, talkTitle: _talkTitle, shareButton }: FeedbackFormProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    rating: '',
    speakerFeedback: '',
    bytefestFeedback: '',
    bytefestChoice: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attendeeStatus, setAttendeeStatus] = useState<'checking' | 'notRegistered' | 'registered'>('checking');
  
  const feedbackRef = useRef<HTMLDivElement>(null);

  // Check attendee registration status when user is authenticated
  useEffect(() => {
    if (!isAuthenticated || !user?.email) {
      setAttendeeStatus('checking');
      return;
    }

    const checkAttendeeStatus = async () => {
      try {
        const query = `*[_type == "attendee" && attendeeEmail == $email][0]`;
        const params = { email: user.email };
        const attendee: Attendee | null = await sanityClient.withConfig({ useCdn: false }).fetch(query, params);

        if (attendee) {
          setAttendeeStatus('registered');
        } else {
          setAttendeeStatus('notRegistered');
        }
      } catch (error) {
        console.error("Error checking attendee status:", error);
        setAttendeeStatus('notRegistered');
      }
    };

    checkAttendeeStatus();
  }, [isAuthenticated, user?.email]);

  // Scroll to feedback form when it expands
  useEffect(() => {
    if (isExpanded && feedbackRef.current) {
      setTimeout(() => {
        feedbackRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }, 100); // Small delay to allow animation to start
    }
  }, [isExpanded]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Handle redirect to comprehensive feedback if user selected "Ja" for Bytefest
    if (formData.bytefestChoice === 'yes') {
      // Store the talk feedback for submission after comprehensive feedback
      localStorage.setItem('pendingTalkFeedback', JSON.stringify({
        talkId,
        formData: {
          ...formData,
          bytefestChoice: '' // Clear this since it's just for routing
        },
        timestamp: Date.now()
      }));
      router.push('/feedback/bytefest');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedbackCategory: 'talk',
          relatedTalk: talkId,
          rating: formData.rating,
          message: formData.speakerFeedback,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit feedback');
      }

      const result = await response.json();
      console.log('Feedback submitted successfully:', result);
      
      // Clear any pending feedback from localStorage
      localStorage.removeItem('pendingTalkFeedback');
      
      // Redirect to confirmation page
      router.push('/feedback/takk');
    } catch (err) {
      setError('Det oppstod en feil ved sending av tilbakemelding. Prøv igjen.');
      console.error('Error submitting feedback:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check for pending feedback on component mount
  useEffect(() => {
    if (isAuthenticated && attendeeStatus === 'registered') {
      const pendingFeedback = localStorage.getItem('pendingTalkFeedback');
      if (pendingFeedback) {
        try {
          const parsed = JSON.parse(pendingFeedback);
          // Check if this is the same talk and the data is recent (within 1 hour)
          if (parsed.talkId === talkId && parsed.timestamp && Date.now() - parsed.timestamp < 3600000) {
            setFormData(parsed.formData);
            setIsExpanded(true);
            // Auto-submit if there's no bytefest choice (meaning they just wanted to submit talk feedback)
            if (!parsed.formData.bytefestChoice || parsed.formData.bytefestChoice === 'no') {
              // Small delay to ensure component is fully mounted
              setTimeout(async () => {
                setIsSubmitting(true);
                setError(null);

                try {
                  const response = await fetch('/api/feedback', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      feedbackCategory: 'talk',
                      relatedTalk: talkId,
                      rating: parsed.formData.rating,
                      message: parsed.formData.speakerFeedback,
                    }),
                  });

                  if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to submit feedback');
                  }

                  // Clear pending feedback and redirect
                  localStorage.removeItem('pendingTalkFeedback');
                  router.push('/feedback/takk');
                } catch (err) {
                  setError('Det oppstod en feil ved sending av tilbakemelding. Prøv igjen.');
                  console.error('Error submitting feedback:', err);
                } finally {
                  setIsSubmitting(false);
                }
              }, 100);
            }
          }
        } catch (error) {
          console.error('Error parsing pending feedback:', error);
          localStorage.removeItem('pendingTalkFeedback');
        }
      }
    }
  }, [isAuthenticated, attendeeStatus, talkId, router]);

  const toggleFeedbackForm = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="relative" ref={feedbackRef}>
      {/* Feedback Section Header - Clickable Toggle */}
      <div className="flex items-center justify-between">
        <button 
          onClick={toggleFeedbackForm}
          className="flex items-center group cursor-pointer"
        >
          <Image
            src="/images/feedback.svg"
            alt="Feedback"
            width={24}
            height={24}
            style={{ height: "auto" }}
            className="w-60 transition-transform active:scale-95 group-hover:opacity-80"
          />
          <div className="ml-4 text-[#2A1449] group-hover:opacity-70 transition-opacity">
            <svg 
              className={`w-6 h-6 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </button>

        {/* Share Button */}
        {shareButton && (
          <div className="flex gap-4">
            {shareButton}
          </div>
        )}
      </div>

      {/* Collapsible Form */}
      <div 
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {isExpanded && (
          <div>
            {/* Show different states based on authentication and registration status */}
            {!isAuthenticated ? (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-2">
                  Logg inn for å gi tilbakemelding
                </h3>
                <p className="mb-8">
                  Du må være innlogget og påmeldt til Bytefest for å kunne gi tilbakemelding.
                </p>
                <button
                  onClick={() => {
                    const currentPath = window.location.pathname;
                    // Store the redirect path in localStorage for after login
                    localStorage.setItem('loginRedirectTo', currentPath);
                    router.push(`/login?intent=talkFeedback&redirectTo=${encodeURIComponent(currentPath)}`);
                  }}
                  className="group transition-transform active:scale-95 cursor-pointer"
                >
                  <Image
                    src="/images/LoggInn.svg"
                    alt="Logg inn"
                    width={240}
                    height={59}
                    style={{ height: "auto" }}
                    className="transition-transform active:scale-95 group-hover:opacity-80"
                  />
                </button>
              </div>
            ) : attendeeStatus === 'checking' ? (
              <div className="mt-8">
                <p className="text-gray-600">Sjekker din påmeldingsstatus...</p>
              </div>
            ) : attendeeStatus === 'notRegistered' ? (
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-2">
                  Ikke påmeldt
                </h3>
                <p className="mb-8">
                  Du må være påmeldt til Bytefest for å kunne gi tilbakemelding på foredrag.
                </p>
                <button
                  onClick={() => router.push('/paamelding')}
                  className="group transition-transform active:scale-95 cursor-pointer"
                >
                  <Image
                    src="/images/MeldDegPaa.svg"
                    alt="Meld deg på"
                    width={240}
                    height={60}
                    style={{ height: "auto" }}
                    className="transition-transform active:scale-95 group-hover:opacity-80"
                  />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600">{error}</p>
                  </div>
                )}

                {/* Rating Question */}
                <div className='mt-12'>
                  <fieldset>
                    <legend className="mb-4 font-medium">
                      Hvor godt likte du foredraget?
                    </legend>
                    <div className="flex items-center gap-3">
                      <span>Lav</span>
                      <div className="flex space-x-4">
                        {[1, 2, 3, 4, 5].map((value) => (
                          <label key={value} className="flex items-center cursor-pointer" htmlFor={`rating-${value}`}>
                            <input
                              id={`rating-${value}`}
                              type="radio"
                              name="rating"
                              value={value.toString()}
                              checked={formData.rating === value.toString()}
                              onChange={handleInputChange}
                              className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer"
                            />
                            <span className="ml-2">{value}</span>
                          </label>
                        ))} 
                      </div>
                      <span>Høy</span>
                    </div>
                  </fieldset>
                </div>

                {/* Speaker Feedback */}
                <div className="mt-12">
                  <label htmlFor="speakerFeedback" className="block mb-3 font-medium">
                    Har du tilbakemeldinger til foredragsholderen?
                  </label>
                  <div className="relative">
                    <PixelInput>
                      <textarea
                        id="speakerFeedback"
                        name="speakerFeedback"
                        value={formData.speakerFeedback}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full p-3 bg-white focus:outline-none resize-vertical min-h-[100px]"
                        placeholder="Skriv din tilbakemelding her..."
                      />
                    </PixelInput>
                    {/* Minimal resize indicator */}
                    <div className="absolute bottom-1 right-1 pointer-events-none">
                      <div className="grid grid-cols-2 gap-[1px]">
                        <div className="w-[2px] h-[2px] bg-gray-500"></div>
                        <div className="w-[2px] h-[2px] bg-gray-500"></div>
                        <div className="w-[2px] h-[2px] bg-gray-500"></div>
                        <div className="w-[2px] h-[2px] bg-gray-500"></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 text-right flex items-center justify-end gap-1">
                    Dra for å utvide
                    <svg width="12" height="12" viewBox="0 0 12 12" className="text-gray-400">
                      <path d="M1 1L11 11M11 11L7 11M11 11L11 7M1 1L5 1M1 1L1 5" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round"/>
                    </svg>
                  </p>
                </div>

                {/* Bytefest Feedback */}
                <div>
                  <fieldset>
                    <legend className="block mb-3 font-medium">
                      Ønsker du å gi tilbakemelding på Bytefest som helhet?
                    </legend>
                    <div className="flex items-start space-x-3 mb-3">
                      <label className="flex items-center cursor-pointer" htmlFor="bytefest-yes">
                        <input
                          id="bytefest-yes"
                          type="radio"
                          name="bytefestChoice"
                          value="yes"
                          onChange={handleInputChange}
                          className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer"
                        />
                        <span className="ml-2">Ja</span>
                      </label>
                      <label className="flex items-center cursor-pointer" htmlFor="bytefest-no">
                        <input
                          id="bytefest-no"
                          type="radio"
                          name="bytefestChoice"
                          value="no"
                          onChange={handleInputChange}
                          className="w-5 h-5 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer"
                        />
                        <span className="ml-2">Nei</span>
                      </label>
                    </div>
                  </fieldset>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Image
                      src="/images/sendinn.svg"
                      alt={isSubmitting ? 'Sender...' : 'Send inn'}
                      width={240}
                      height={40}
                      className="w-60 transition-transform active:scale-95 group-hover:opacity-80"
                    />
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 