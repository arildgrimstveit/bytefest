'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PixelInput } from '@/components/InputPixelCorners';
import { useUser } from '@/components/UserContext';
import { useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import { LoginForm } from '@/components/LoginForm';
import sanityClient from '@/sanityClient';
import type { Attendee } from '@/types/attendee';

interface Section {
  id: string;
  title: string;
  questions: Array<{
    type: 'rating' | 'text';
    question: string;
    field: string;
  }>;
}

// Move sections outside component to avoid useEffect dependency issues
const digitalSections: Section[] = [
  {
    id: 'digital',
    title: 'Faglig del - digitalt',
    questions: [
      { type: 'rating', question: 'Hvordan opplevde du den digitale deltakelsen?', field: 'digitalParticipationRating' },
      { type: 'text', question: 'Har du kommentarer til den digitale gjennomføringen?', field: 'digitalImplementationFeedback' },
      { type: 'rating', question: 'Hvordan opplevde du kvaliteten på lyden på strømmingen?', field: 'audioQualityRating' },
      { type: 'rating', question: 'Hvordan opplevde du kvaliteten på bildet på strømmingen?', field: 'videoQualityRating' },
      { type: 'text', question: 'Har du kommentarer om kombinasjonen av strømming og fysiske foredrag?', field: 'streamingCombinationFeedback' }
    ]
  },
  {
    id: 'content',
    title: 'Faglig del - Innhold',
    questions: [
      { type: 'rating', question: 'Hvordan opplevde du utvalget i det faglige innholdet?', field: 'contentSelectionRating' },
      { type: 'text', question: 'Hva var bra med det faglige innholdet?', field: 'contentPositiveFeedback' },
      { type: 'text', question: 'Hva kan vi forbedre ved det faglige innholdet til lignende arrangementer?', field: 'contentImprovementFeedback' }
    ]
  },
  {
    id: 'information',
    title: 'Informasjon',
    questions: [
      { type: 'rating', question: 'Hvordan opplevde du nettsiden?', field: 'websiteRating' },
      { type: 'text', question: 'Hvor fikk du informasjon som gjorde at du valgte å melde deg på?', field: 'informationSourceFeedback' },
      { type: 'text', question: 'Har du kommentarer til informasjonen du fikk om Bytefest?', field: 'informationCommentsFeedback' }
    ]
  },
  {
    id: 'overall',
    title: 'Helhetsinntrykk',
    questions: [
      { type: 'rating', question: 'Hva var helhets-inntrykket ditt av Bytefest?', field: 'overallImpressionRating' },
      { type: 'text', question: 'Har du kommentarer til Bytefest som arrangement?', field: 'overallCommentRating' },
      { type: 'rating', question: 'Hvor sannsynlig er det at du vil anbefale en kollega å delta på Bytefest på samme måte som deg?', field: 'recommendationRating' }
    ]
  }
];

const physicalSections: Section[] = [
  {
    id: 'content',
    title: 'Faglig del - Innhold',
    questions: [
      { type: 'rating', question: 'Hvordan opplevde du utvalget i det faglige innholdet?', field: 'contentSelectionRating' },
      { type: 'text', question: 'Hva var bra med det faglige innholdet?', field: 'contentPositiveFeedback' },
      { type: 'text', question: 'Hva kan vi forbedre ved det faglige innholdet til lignende arrangementer?', field: 'contentImprovementFeedback' }
    ]
  },
  {
    id: 'praktisk',
    title: 'Faglig del - Praktisk gjennomføring',
    questions: [
      { type: 'rating', question: 'Hvordan opplevde du den praktiske gjennomføringen på ditt kontor?', field: 'praktiskOfficeRating' },
      { type: 'rating', question: 'Hvordan opplevde du maten og serveringen?', field: 'foodServiceRating' },
      { type: 'text', question: 'Har du kommentarer til den praktiske gjennomføringen?', field: 'praktiskFeedback' },
      { type: 'rating', question: 'Hvordan opplevde du kvaliteten på lyden på strømmingen?', field: 'praktiskAudioQualityRating' },
      { type: 'rating', question: 'Hvordan opplevde du kvaliteten på bildet på strømmingen?', field: 'praktiskVideoQualityRating' },
      { type: 'text', question: 'Har du kommentarer om kombinasjonen av strømming og fysiske foredrag?', field: 'praktiskStreamingCombinationFeedback' }
    ]
  },
  {
    id: 'social',
    title: 'Sosial del',
    questions: [
      { type: 'rating', question: 'Hvordan opplevde du den sosiale delen av arrangementet?', field: 'socialRating' },
      { type: 'text', question: 'Hva kan vi forbedre ved den sosiale delen av arrangementet?', field: 'socialFeedback' }
    ]
  },
  {
    id: 'information',
    title: 'Informasjon',
    questions: [
      { type: 'rating', question: 'Hvordan opplevde du nettsiden?', field: 'websiteRating' },
      { type: 'text', question: 'Hvor fikk du informasjon som gjorde at du valgte å melde deg på?', field: 'informationSourceFeedback' },
      { type: 'text', question: 'Har du kommentarer til informasjonen du fikk om Bytefest?', field: 'informationCommentsFeedback' }
    ]
  },
  {
    id: 'overall',
    title: 'Helhetsinntrykk',
    questions: [
      { type: 'rating', question: 'Hva var helhets-inntrykket ditt av Bytefest?', field: 'overallImpressionRating' },
      { type: 'text', question: 'Har du kommentarer til Bytefest som arrangement?', field: 'overallCommentRating' },
      { type: 'rating', question: 'Hvor sannsynlig er det at du vil anbefale en kollega å delta på Bytefest på samme måte som deg?', field: 'recommendationRating' }
    ]
  }
];

export default function BytefestFeedbackPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BytefestFeedback />
    </Suspense>
  );
}

function LoadingFallback() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <p className="text-white text-xl">Laster...</p>
    </div>
  );
}

function BytefestFeedback() {
  const router = useRouter();
  const { user, isAuthenticated } = useUser();
  const { instance, inProgress } = useMsal();
  
  const [formData, setFormData] = useState({
    digitalParticipationRating: '',
    digitalImplementationFeedback: '',
    audioQualityRating: '',
    videoQualityRating: '',
    streamingCombinationFeedback: '',
    praktiskOfficeRating: '',
    foodServiceRating: '',
    praktiskFeedback: '',
    praktiskAudioQualityRating: '',
    praktiskVideoQualityRating: '',
    praktiskStreamingCombinationFeedback: '',
    contentSelectionRating: '',
    contentPositiveFeedback: '',
    contentImprovementFeedback: '',
    socialRating: '',
    socialFeedback: '',
    websiteRating: '',
    informationSourceFeedback: '',
    informationCommentsFeedback: '',
    overallImpressionRating: '',
    overallCommentRating: '',
    recommendationRating: ''
  });

  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [pageStatus, setPageStatus] = useState<'loading' | 'authenticating' | 'checkingAttendee' | 'formReady' | 'loginRequired' | 'notRegistered'>('loading');
  const [participationLocation, setParticipationLocation] = useState<string | null>(null);
  const [sections, setSections] = useState<Section[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Effect 1: Handle MSAL redirect and initial authentication status
  useEffect(() => {
    if (inProgress === InteractionStatus.Startup) {
      setPageStatus('authenticating');
      return;
    }
    if (inProgress === InteractionStatus.HandleRedirect) {
      setPageStatus('authenticating');
      instance.handleRedirectPromise().then((response) => {
        if (response) {
          instance.setActiveAccount(response.account);
          window.setTimeout(() => window.dispatchEvent(new Event('msal:login:complete')), 100);
        }
      }).catch(error => {
        console.error("Error handling redirect in BytefestFeedbackPage:", error);
        setPageStatus('loginRequired');
      });
      return;
    }

    if (inProgress === InteractionStatus.None) {
      if (isAuthenticated) {
        setPageStatus('checkingAttendee');
      } else {
        setPageStatus('loginRequired');
      }
    }
  }, [inProgress, isAuthenticated, instance]);

  // Effect 2: Fetch attendee data to determine participation type
  useEffect(() => {
    if (pageStatus !== 'checkingAttendee' || !isAuthenticated || !user?.email) {
      return;
    }

    const fetchAttendeeData = async () => {
      try {
        const query = `*[_type == "attendee" && attendeeEmail == $email][0]`;
        const params = { email: user.email };
        const attendee: Attendee | null = await sanityClient.withConfig({ useCdn: false }).fetch(query, params);

        if (!attendee) {
          setPageStatus('notRegistered');
          return;
        }

        // Determine participation type based on participationLocation
        const isDigital = attendee.participationLocation === 'Digitalt';
        setParticipationLocation(attendee.participationLocation);
        setSections(isDigital ? digitalSections : physicalSections);
        setPageStatus('formReady');
      } catch (error) {
        console.error("Error fetching attendee data:", error);
        setPageStatus('notRegistered');
      }
    };

    fetchAttendeeData();
  }, [pageStatus, isAuthenticated, user?.email]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = (currentSectionId: string) => {
    const currentSectionIndex = sections.findIndex(section => section.id === currentSectionId);
    if (currentSectionIndex < sections.length - 1) {
      const nextSection = sections[currentSectionIndex + 1];
      
      // Expand the next section if it's not already expanded
      if (!expandedSections.includes(nextSection.id)) {
        setExpandedSections(prev => [...prev, nextSection.id]);
      }
      
      // Always scroll to the next section (whether it was already expanded or just opened)
      setTimeout(() => {
        const nextSectionElement = document.getElementById(`section-${nextSection.id}`);
        if (nextSectionElement) {
          nextSectionElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }
      }, 150);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          feedbackCategory: 'general',
          ...formData,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit feedback');
      }

      const result = await response.json();
      console.log('Feedback submitted successfully:', result);
      console.log('Submitted from location:', participationLocation);
      
      // Check for pending talk feedback and submit it
      const pendingTalkFeedback = localStorage.getItem('pendingTalkFeedback');
      if (pendingTalkFeedback) {
        try {
          const parsed = JSON.parse(pendingTalkFeedback);
          if (parsed.talkId && parsed.formData) {
            const talkResponse = await fetch('/api/feedback', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                feedbackCategory: 'talk',
                relatedTalk: parsed.talkId,
                rating: parsed.formData.rating,
                message: parsed.formData.speakerFeedback,
              }),
            });
            
            if (talkResponse.ok) {
              console.log('Pending talk feedback also submitted successfully');
              localStorage.removeItem('pendingTalkFeedback');
            } else {
              console.error('Failed to submit pending talk feedback');
            }
          }
        } catch (error) {
          console.error('Error processing pending talk feedback:', error);
          localStorage.removeItem('pendingTalkFeedback');
        }
      }
      
      // Redirect to confirmation page
      router.push('/feedback/takk');
      
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert(error instanceof Error ? error.message : 'Det oppstod en feil ved innsending av tilbakemelding.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  // Conditional rendering based on pageStatus
  if (pageStatus === 'loading' || pageStatus === 'authenticating') {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-white text-xl">Laster tilbakemeldingsskjema...</p>
      </div>
    );
  }

  if (pageStatus === 'loginRequired') {
    return (
      <div className="flex sm:min-h-[calc(100vh-99px-220px)] items-start sm:items-center justify-center -mt-[99px] pt-[99px] px-4 mb-12 sm:mb-0">
        <div className="w-full max-w-sm mt-8 sm:mt-0">
          <LoginForm title="Logg inn for å gi tilbakemelding" />
        </div>
      </div>
    );
  }

  if (pageStatus === 'checkingAttendee') {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-white text-xl">Sjekker din påmeldingsstatus...</p>
      </div>
    );
  }

  if (pageStatus === 'notRegistered') {
    return (
      <div className="flex sm:min-h-[calc(100vh-99px-220px)] items-start sm:items-center justify-center -mt-[99px] pt-[99px] px-4">
        <div className="w-full max-w-4xl mx-auto my-8">
          <div className="relative bg-white p-8 shadow-lg px-6 sm:px-10 md:px-20">
            <div className="absolute -z-10 top-0 left-0 w-full h-full bg-[#FFAB5F] translate-x-1 translate-y-1"></div>
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl argent text-center mb-6">Ikke påmeldt</h1>
              <p className="text-lg mb-6">
                Du må være påmeldt til Bytefest for å kunne gi tilbakemelding på arrangementet.
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
                  style={{ height: "auto", width: "auto" }}
                  className="transition-transform active:scale-95 group-hover:opacity-80"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (pageStatus !== 'formReady') {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <p className="text-white text-xl">Laster...</p>
      </div>
    );
  }

  return (
    <div className="flex sm:min-h-[calc(100vh-99px-220px)] items-start sm:items-center justify-center -mt-[99px] pt-[99px] px-4">
      <div className="w-full max-w-4xl mx-auto my-8">
        <div className="relative bg-white p-8 shadow-lg px-6 sm:px-10 md:px-20">
          <div className="absolute -z-10 top-0 left-0 w-full h-full bg-[#FFAB5F] translate-x-1 translate-y-1"></div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl argent text-center mb-2">Tilbakemelding</h1>
            <p className="text-gray-600">Vi setter pris på din tilbakemelding</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {sections.map((section) => (
              <div key={section.id} className="bg-white" id={`section-${section.id}`}>
                <button
                  type="button"
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-4 text-left flex items-center justify-start bg-white relative cursor-pointer rounded-lg overflow-hidden group"
                >
                  {/* Hover background that aligns with borders */}
                  <div className="absolute inset-y-0 left-2 right-2 bg-[#fdf2e5] opacity-0 group-hover:opacity-100 transition-opacity rounded-lg -z-0"></div>
                  
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`transition-transform duration-200 mr-3 relative z-10 ${
                      expandedSections.includes(section.id) ? 'rotate-180' : ''
                    }`}
                  >
                    <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="iceland text-2xl relative z-10">{section.title}</span>
                  {/* Bottom border that extends beyond title */}
                  <div className="absolute bottom-0 left-2 right-2 h-[2px] bg-black z-10"></div>
                </button>

                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    expandedSections.includes(section.id) ? 'max-h-[4000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  {expandedSections.includes(section.id) && (
                    <div className="p-6 bg-white">
                      <div className="space-y-6">
                        {section.questions.map((question) => (
                          <div key={question.field}>
                            <p className="mb-3 font-medium">{question.question}</p>
                            {question.type === 'rating' && (
                              <div className="flex flex-col md:flex-row md:items-center gap-3">
                                <span className="text-sm">Lav / Dårlig</span>
                                <div className="flex flex-col md:flex-row gap-2 md:gap-4">
                                  {[1, 2, 3, 4, 5].map((rating) => (
                                    <label key={rating} className="flex items-center cursor-pointer" htmlFor={`${question.field}-${rating}`}>
                                      <input
                                        id={`${question.field}-${rating}`}
                                        type="radio"
                                        name={question.field}
                                        value={rating}
                                        onChange={handleInputChange}
                                        className="w-6 h-6 border-[2px] border-black appearance-none rounded-full checked:bg-white checked:border-[6px] cursor-pointer"
                                      />
                                      <span className="ml-2 text-sm">{rating}</span>
                                    </label>
                                  ))}
                                </div>
                                <span className="text-sm">Høy / Bra</span>
                              </div>
                            )}
                            {question.type === 'text' && (
                              <div className="relative">
                                <PixelInput>
                                  <textarea
                                    name={question.field}
                                    value={formData[question.field as keyof typeof formData]}
                                    onChange={handleInputChange}
                                    placeholder="Skriv din tilbakemelding her..."
                                    rows={4}
                                    className="w-full p-3 bg-white focus:outline-none resize-vertical min-h-[100px]"
                                  />
                                </PixelInput>
                                <p className="text-xs text-gray-500 text-right mt-1 mb-[-10] flex items-center justify-end gap-1">
                                  Dra for å utvide
                                  <svg width="12" height="12" viewBox="0 0 12 12" className="text-gray-400">
                                    <path d="M1 1L11 11M11 11L7 11M11 11L11 7M1 1L5 1M1 1L1 5" stroke="currentColor" strokeWidth="1" fill="none" strokeLinecap="round"/>
                                  </svg>
                                </p>
                              </div>
                            )}
                          </div>
                        ))}

                        {/* Next Button */}
                        {expandedSections.includes(section.id) && sections.indexOf(section) < sections.length - 1 && (
                          <div className="flex justify-start">
                            <button
                              type="button"
                              onClick={() => handleNext(section.id)}
                              className="group transition-transform active:scale-95 cursor-pointer"
                            >
                              <Image
                                src="/images/neste.svg"
                                alt="Neste"
                                width={180}
                                height={60}
                                style={{ height: "auto", width: "auto" }}
                                className="transition-transform active:scale-95 group-hover:opacity-80 mt-3"
                              />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Submit Button */}
            <div className="p-6 bg-white">
              <div className="flex justify-start">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Image
                    src="/images/SendInnBeige.svg"
                    alt={isSubmitting ? 'Sender...' : 'Send inn'}
                    width={180}
                    height={60}
                    style={{ height: "auto", width: "auto" }}
                    priority
                    className="transition-transform active:scale-95 group-hover:opacity-80"
                  />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 