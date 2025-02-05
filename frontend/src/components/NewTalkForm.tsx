'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Speaker {
  _id: string;
  name: string;
}

const NewTalkForm = () => {
  const [title, setTitle] = useState('');
  const [talkTime, setTalkTime] = useState('');
  const [location, setLocation] = useState('');
  const [body, setBody] = useState('');
  const [speakerId, setSpeakerId] = useState('');
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/getSpeakers')
      .then((res) => res.json())
      .then((data) => setSpeakers(data.speakers))
      .catch((err) => console.error('Error fetching speakers:', err));
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('talkTime', talkTime);
    formData.append('location', location);
    formData.append('body', body);
    formData.append('speakerId', speakerId);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const response = await fetch('/api/createTalk', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      setMessage('Talk submitted as a draft!');
      setTitle('');
      setTalkTime('');
      setLocation('');
      setBody('');
      setSpeakerId('');
      setImageFile(null);
      setPreviewUrl(null);
    } else {
      setMessage(`Error: ${data.error}`);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Submit a New Talk</h2>
      {message && <p className="text-center mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Talk Title"
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="datetime-local"
          value={talkTime}
          onChange={(e) => setTalkTime(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Talk Location"
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Talk description..."
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        {previewUrl && (
          <div className="relative w-full h-40">
            <Image
              src={previewUrl}
              alt="Image preview"
              fill
              className="object-cover rounded-md"
              unoptimized
            />
          </div>
        )}
        <select
          value={speakerId}
          onChange={(e) => setSpeakerId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
          required
        >
          <option value="">Select a Speaker</option>
          {speakers.map((speaker) => (
            <option key={speaker._id} value={speaker._id}>
              {speaker.name}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Talk'}
        </button>
      </form>
    </div>
  );
};

export default NewTalkForm;
