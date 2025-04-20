import { ObjectId } from 'mongodb';

export interface TicketDocument {
  _id?: ObjectId;
  userId: ObjectId;
  subject: string;
  message: string;
  status: 'open' | 'in-progress' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
  responses?: TicketResponse[];
}

export interface TicketResponse {
  _id?: ObjectId;
  userId: ObjectId;
  message: string;
  createdAt: Date;
  isStaff: boolean;
}

export interface TicketCreateInput {
  userId: string;
  subject: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
}

export interface TicketUpdateInput {
  subject?: string;
  message?: string;
  status?: 'open' | 'in-progress' | 'closed';
  priority?: 'low' | 'medium' | 'high';
}

export interface TicketResponseInput {
  userId: string;
  message: string;
  isStaff: boolean;
} 