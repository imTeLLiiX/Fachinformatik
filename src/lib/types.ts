import { Schema, model, models } from "mongoose"

export interface IModule {
  id: string
  title: string
  description: string
  content: string
  order: number
  published: boolean
  createdAt: Date
  updatedAt: Date
}

const moduleSchema = new Schema<IModule>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    order: { type: Number, required: true },
    published: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

export const Module = models.Module || model<IModule>("Module", moduleSchema)

export interface IUser {
  id: string
  name: string
  email: string
  role: "learner" | "content-admin" | "super-admin"
  subscription: "basic" | "pro" | "lifetime"
  progress: Map<string, {
    completed: boolean
    score: number
    lastAccessed: Date
  }>
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: {
      type: String,
      enum: ["learner", "content-admin", "super-admin"],
      default: "learner",
    },
    subscription: {
      type: String,
      enum: ["basic", "pro", "lifetime"],
      default: "basic",
    },
    progress: {
      type: Map,
      of: {
        completed: Boolean,
        score: Number,
        lastAccessed: Date,
      },
      default: {},
    },
  },
  {
    timestamps: true,
  }
)

export const User = models.User || model<IUser>("User", userSchema)

export interface ITransaction {
  id: string
  userId: string
  amount: number
  currency: string
  status: "succeeded" | "failed" | "pending"
  type: "subscription" | "one-time"
  createdAt: Date
  updatedAt: Date
}

const transactionSchema = new Schema<ITransaction>(
  {
    userId: { type: String, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: {
      type: String,
      enum: ["succeeded", "failed", "pending"],
      default: "pending",
    },
    type: {
      type: String,
      enum: ["subscription", "one-time"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export const Transaction = models.Transaction || model<ITransaction>("Transaction", transactionSchema) 