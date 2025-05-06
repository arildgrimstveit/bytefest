import { Talk } from "./talk";
import { ReactNode, ComponentPropsWithoutRef } from "react";

export interface UserAvatarProps {
  size?: number;
}

export interface ClientTalkFiltersProps {
  talks: Talk[];
  availableTags: string[];
}

export interface TalkCardProps {
  talk: Talk;
  onFavoriteToggle?: () => void;
  initialIsFavorite?: boolean;
}

export interface PixelInputProps {
  children: ReactNode;
}

export interface LoginFormProps extends ComponentPropsWithoutRef<"div"> {
  title?: string;
  buttonText?: string;
  className?: string;
}
