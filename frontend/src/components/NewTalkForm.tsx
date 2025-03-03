'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';

interface Speaker {
  _id: string;
  name: string;
}

const NewTalkForm = () => {
  const [form, setForm] = useState({
    title: '',
    talkTime: '',
    location: '',
    body: '',
    speakerId: '',
  });
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const { title, talkTime, location, body, speakerId } = form;

  useEffect(() => {
    const fetchSpeakers = async () => {
      try {
        const res = await fetch('/api/getSpeakers');
        const data = await res.json();
        setSpeakers(data.speakers);
      } catch (error) {
        console.error('Error fetching speakers:', error);
      }
    };

    fetchSpeakers();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );
      if (imageFile) formData.append('image', imageFile);

      const response = await fetch('/api/createTalk', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Talk submitted as a draft!');
        setForm({
          title: '',
          talkTime: '',
          location: '',
          body: '',
          speakerId: '',
        });
        setImageFile(null);
        setPreviewUrl(null);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('An unexpected error occurred.' + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-6">Submit a New Talk</h2>
      {message && <p className="text-center mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          type="text"
          value={title}
          onChange={handleChange}
          placeholder="Talk Title"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          name="talkTime"
          type="datetime-local"
          value={talkTime}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          name="location"
          type="text"
          value={location}
          onChange={handleChange}
          placeholder="Talk Location"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <div>
          <label className="block mb-2 font-medium">Talk Description</label>
          <input
            type="text"
            value={body}
            onChange={handleChange}
            placeholder="Talk Description"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {previewUrl && (
          <div className="relative w-full h-40">
            <Image
              src={previewUrl}
              alt="Image preview"
              fill
              className="object-cover rounded"
              unoptimized
            />
          </div>
        )}
        <select
          name="speakerId"
          value={speakerId}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
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
          className="w-full p-2 bg-blue-600 text-white rounded disabled:opacity-50"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Talk'}
        </button>
      </form>
    </div>
  );
};

export default NewTalkForm;
