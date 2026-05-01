export interface Worker {
  id: string;
  name: string;
  category: string;
  bio: string;
  rating: number;
  experienceYears: number;
  location: string;
  phone: string;
  avatarUrl: string;
  priceRange: string;
  isVerified: boolean;
  skills: string[];
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  description: string;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  phoneNumber?: string;
  isWorker: boolean;
  workerId?: string;
}
