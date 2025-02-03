import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

interface Post {
  title: string;
  image: string;
  slug: { current: string };
}

interface PostCardProps {
  post: Post;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <Link href={`/post/${post.slug.current}`} className="block">
      <div className="max-w-lg mx-auto rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-2xl transform hover:scale-[1.02] transition duration-300">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">{post.title}</h2>
        </div>
        <Image
          src={post.image}
          alt={post.title}
          width={500}
          height={300}
          className="object-cover w-full h-56"
        />
      </div>
    </Link>
  );
};

export default PostCard;
