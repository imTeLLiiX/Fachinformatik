export interface Course {
  _id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // in minutes
  requirements: string[];
  objectives: string[];
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
  author: {
    name: string;
    id: string;
  };
  enrolledStudents?: number;
  rating?: number;
  reviews?: {
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    createdAt: Date;
  }[];
} 