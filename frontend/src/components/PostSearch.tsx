'use client';

import { useState, useMemo } from 'react';
import PostCard from './PostCard';
import type { FC } from 'react';

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  image: string;
  publishedAt: string;
}

interface PostSearchProps {
  posts: Post[];
}

const PostSearch: FC<PostSearchProps> = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = useMemo(() => {
    if (!searchTerm) return posts;
    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [posts, searchTerm]);

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search posts..."
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostSearch;
