import type { FC } from 'react';

interface StarIconProps {
  isFavorite: boolean;
  className?: string;
}

const StarIcon: FC<StarIconProps> = ({ isFavorite, className }) => {
  // Basic pixelated star SVG path
  // This is a simplified representation and might need fine-tuning
  const starPath = 
    "M12 2 L15.09 8.26 L22 9.27 L17 14.14 L18.18 21.02 L12 17.77 L5.82 21.02 L7 14.14 L2 9.27 L8.91 8.26 Z";
  
  // You might want to use a more detailed pixelated SVG path here if needed
  // For example, using multiple <rect> elements or a more complex path

  return (
    <svg
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5" // Use a thinner stroke for a pixelated feel
      fill={isFavorite ? 'currentColor' : 'none'}
      className={className}
      style={{ imageRendering: 'pixelated' }} // Ensure pixelated rendering
    >
      <path d={starPath} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
};

export default StarIcon;
