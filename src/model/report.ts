import { UserProfile } from './user';

export interface PriceReport {
  product: string;
  unit: string;
  price: number;
  currency: string;
  location: string;
  images: string[];
  description: string;
  stat: {
    likes: number;
    dislikes: number;
    comments: number;
  };
  user: UserProfile;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}
