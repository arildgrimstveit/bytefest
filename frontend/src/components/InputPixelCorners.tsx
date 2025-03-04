import React from 'react';

interface PixelInputProps {
  children: React.ReactNode;
}

export function PixelInput({ children }: PixelInputProps) {
  return (
    <div className="pixel-corners">
      {children}
      <div className="pixel-corner tl"></div>
      <div className="pixel-corner tr"></div>
      <div className="pixel-corner bl"></div>
      <div className="pixel-corner br"></div>
    </div>
  );
} 