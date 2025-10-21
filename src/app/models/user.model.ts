export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: 'user' | 'admin' | 'moderator';
  createdAt: Date;
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: 'ru' | 'en';
  notifications: boolean;
}

export interface UserProfile extends User {
  phone?: string;
  address?: Address;
  bio?: string;
  socialLinks?: SocialLinks;
}

export interface Address {
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface SocialLinks {
  website?: string;
  twitter?: string;
  linkedin?: string;
  github?: string;
}
