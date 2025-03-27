"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@/components/UserContext";

// Define TypeScript interface for the form data
interface TalkSubmitData {
  title: string;
  description: string;
  tags: string[];
  duration?: string;
  forkunnskap?: string;
  location: string;
  speakerName?: string;
  speakerEmail?: string;
}

export default function Oppsummering() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [] as string[],
    experience: '',
    duration: '',
    location: ''
  });
  const [loading, setLoading] = useState(true);
  const { user, getProfilePicture } = useUser();
  const [profilePic, setProfilePic] = useState<string | null>(null);

  useEffect(() => {
    // Retrieve data from localStorage
    const title = localStorage.getItem('applicationTitle') || '';
    const description = localStorage.getItem('applicationDescription') || '';
    const tags = JSON.parse(localStorage.getItem('applicationTags') || '[]');
    const experience = localStorage.getItem('applicationExperience') || '';
    const duration = localStorage.getItem('applicationDuration') || '';
    const location = localStorage.getItem('applicationLocation') || '';

    setFormData({
      title,
      description,
      tags,
      experience,
      duration,
      location
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    const fetchProfilePic = async () => {
      if (user?.name) {
        const photoUrl = await getProfilePicture('profile');
        if (photoUrl) {
          setProfilePic(photoUrl);
        }
      }
    };
    fetchProfilePic();
  }, [user?.name, getProfilePicture]);

  // Map experience value to readable text
  const getExperienceText = (value: string) => {
    switch (value) {
      case 'none': return 'Ingen forkunnskap kreves';
      case 'low': return 'Lite forkunnskap kreves';
      case 'medium': return 'Noe forkunnskap kreves';
      case 'high': return 'Mye forkunnskap kreves';
      default: return '';
    }
  };

  // Map duration value to readable text
  const getDurationText = (value: string) => {
    switch (value) {
      case '10min': return '10 minutter';
      case '20min': return '20 minutter';
      case '30min': return '30 minutter';
      case '45min': return '45 minutter';
      default: return '';
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      // Scroll to top of page to ensure loading state is visible
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Prepare the data object with required fields
      const submitData: TalkSubmitData = {
        title: formData.title,
        description: formData.description,
        tags: formData.tags,
        location: formData.location,
        speakerName: user?.name || "",
        speakerEmail: user?.email || ""
      };
      
      // Only add duration if it exists
      if (formData.duration) {
        submitData.duration = formData.duration;
      }
      
      // Only add forkunnskap if it exists
      if (formData.experience) {
        submitData.forkunnskap = formData.experience;
      }
      
      // Submit the form data to create a Sanity draft
      const response = await fetch('/api/createTalkDraft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to submit talk draft');
      }
      
      // Clear localStorage items
      localStorage.removeItem('applicationTitle');
      localStorage.removeItem('applicationDescription');
      localStorage.removeItem('applicationTags');
      localStorage.removeItem('applicationExperience');
      localStorage.removeItem('applicationDuration');
      localStorage.removeItem('applicationLocation');
      
      // Redirect to confirmation page
      window.location.href = '/bli-foredragsholder/confirmation';
    } catch (error) {
      console.error('Error submitting talk draft:', error);
      alert('Det oppstod en feil ved innsending av foredraget. Vennligst prøv igjen senere.');
      setLoading(false);
    }
  };

  const handleGoBack = () => {
    // Store a flag to indicate the user was already logged in
    // This will be checked by the bli-foredragsholder page
    localStorage.setItem('isAlreadyLoggedIn', 'true');
    window.location.href = '/bli-foredragsholder';
  };

  if (loading) {
    return (
      <div className="flex sm:min-h-[calc(100vh-99px-220px)] items-start sm:items-center justify-center -mt-[99px] pt-[99px] px-4">
        <div className="w-full max-w-4xl mx-auto my-8 relative">
          <div className="relative bg-white p-6 sm:p-8 shadow-lg px-4 sm:px-6 sm:px-10 md:px-20 break-words">
            <div className="absolute -z-10 top-0 left-0 w-full h-full bg-[#FFAB5F] translate-x-1 translate-y-1"></div>
            <div className="flex flex-col items-center justify-center py-10">
              <h1 className="text-4xl sm:text-5xl argent text-center mb-6">Sender inn...</h1>
              <p className="text-center">Vennligst vent mens foredraget ditt blir sendt inn.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex sm:min-h-[calc(100vh-99px-220px)] items-start sm:items-center justify-center -mt-[99px] pt-[99px] px-4">
      <div className="w-full max-w-4xl mx-auto mt-16 sm:mt-8 mb-8">
        <div className="relative bg-white p-6 sm:p-8 shadow-lg px-4 sm:px-6 sm:px-10 md:px-20 break-words">
          <div className="absolute -z-10 top-0 left-0 w-full h-full bg-[#FFAB5F] translate-x-1 translate-y-1"></div>
          
          <h1 className="text-4xl sm:text-5xl argent text-center mb-6">Oppsummering</h1>
          
          <div className="space-y-8">
          
            <button 
              onClick={handleGoBack}
              className="flex items-center text-sm text-gray-700 hover:text-black transition-colors mb-2 cursor-pointer ml-[-6]"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="mr-1"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
              <span>Tilbake</span>
            </button>
            
            <p>Ble det riktig? Se over det du har skrevet og gjør eventuelle endringer før du sender inn. </p>
            
            <div className="bg-[#F6EBD5] p-6 border-2 border-black">
              <h2 className="text-2xl font-medium mb-4 break-words overflow-hidden mb-6">{formData.title}</h2>
              
              {(formData.duration || formData.experience || formData.location) && (
                <div className="grid grid-cols-1 gap-4 mb-6">
                  {formData.duration && (
                    <div className="flex items-center text-gray-700 ml-[-5px]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                        <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                      </svg>
                      <span className="text-sm">{getDurationText(formData.duration)}</span>
                    </div>
                  )}
                  
                  {formData.experience && (
                    <div className="flex items-center text-gray-700 ml-[-5px]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                        <path d="M5 19V5H19V19H5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M9 9H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm">{getExperienceText(formData.experience)}</span>
                    </div>
                  )}
                  
                  {formData.location && (
                    <div className="flex items-center text-gray-700 ml-[-5px]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="12" cy="9" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm">{formData.location}</span>
                    </div>
                  )}
                </div>
              )}
              
              {formData.tags.length > 0 && (
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="flex items-center bg-[#161E38] text-white px-4 py-1 mb-2 max-w-[160px] sm:max-w-[200px] md:max-w-[300px] overflow-hidden text-ellipsis whitespace-nowrap uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Om foredraget</h2>
                <p className="whitespace-pre-wrap break-words overflow-hidden">{formData.description}</p>
              </div>
              
              <div className="mt-8 pt-6 border-t-2 border-black">
                <h3 className="font-medium mb-4">Foredragsholder:</h3>
                <div className="flex flex-col items-start sm:flex-row sm:items-center gap-6">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-black shrink-0 bg-white flex items-center justify-center overflow-hidden">
                    {profilePic ? (
                      <Image
                        src={profilePic}
                        alt={user?.name || "User"}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                        unoptimized={true}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#2A1449] text-white text-5xl">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-xl font-medium mb-2 break-words overflow-hidden">{user?.name || "Laster navn..."}</h3>
                    <div className="flex flex-row items-end justify-start gap-2">
                      <Image
                        src="/images/Mail.svg"
                        alt="Mail"
                        width={16}
                        height={14}
                        className="shrink-0 w-2 xs:w-3 sm:w-4 mb-[1px]"
                        style={{ height: "auto" }}
                      />
                      <span className="text-gray-700 text-xs sm:text-sm sm:text-base break-all translate-y-[2px]">{user?.email || "Laster e-post..."}</span>
                    </div>
                  </div>
                  <div className="absolute right-30 h-full hidden md:flex md:items-center">
                    <Image
                      src="/images/FargerikFisk.svg"
                      alt="FargerikFisk"
                      width={43}
                      height={40}
                      style={{ width: '36px', height: 'auto' }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-between sm:items-center">
              <button 
                type="button"
                onClick={handleGoBack}
                className="transition-transform active:scale-95 hover:opacity-80 cursor-pointer"
                disabled={loading}
              >
                <Image
                  src="/images/Tilbake.svg" 
                  alt="Tilbake til skjema" 
                  width={269}
                  height={59}
                  style={{ width: '250px', height: 'auto' }}
                />
              </button>
              
              <button 
                type="submit"
                onClick={handleSubmit}
                className="cursor-pointer transition-transform active:scale-95 hover:opacity-80"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center px-10 py-4 bg-gray-200 border-2 border-black">
                    <span className="iceland text-xl">Sender inn...</span>
                  </div>
                ) : (
                  <Image 
                    src="/images/SendInn.svg"
                    alt="Send inn"
                    width={269}
                    height={59}
                    style={{ width: '250px', height: 'auto' }}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 