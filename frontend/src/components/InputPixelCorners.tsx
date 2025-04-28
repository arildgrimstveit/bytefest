import React from 'react';
import { PixelInputProps } from '@/types/props';

export function PixelInput({ children }: PixelInputProps) {
  return (
    <div className="pixel-corners w-full">
      {children}
      <div className="pixel-corner tl"></div>
      <div className="pixel-corner tr"></div>
      <div className="pixel-corner bl"></div>
      <div className="pixel-corner br"></div>
    </div>
  );
} 