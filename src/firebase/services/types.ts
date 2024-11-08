export interface ProductComment {
  id: string;
  userId: string;
  comment: string;
  timestamp: number;
  likes: number;
  userName?: string;
}
