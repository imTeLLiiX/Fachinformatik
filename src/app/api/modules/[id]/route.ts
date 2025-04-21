import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import {
  getCachedModule,
  setCachedModule,
  invalidateModuleCache,
  invalidateModulesListCache
} from "@/lib/redis"
import { Module } from "@/lib/types"
import { connectToDatabase } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Try to get from cache first
    const cachedModule = await getCachedModule(params.id)
    if (cachedModule) {
      return NextResponse.json(cachedModule)
    }

    // If not in cache, get from database
    const { db } = await connectToDatabase()
    const module = await db.collection('modules').findOne({ 
      _id: new ObjectId(params.id)
    })

    if (!module) {
      return NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
      )
    }

    // Cache the result
    await setCachedModule(params.id, module)

    return NextResponse.json(module)
  } catch (error) {
    console.error('Error fetching module:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDatabase()
    const body = await req.json()

    const result = await db.collection('modules').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: body }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
      )
    }

    // Invalidate cache
    await invalidateModuleCache(params.id)

    return NextResponse.json({ message: 'Module updated successfully' })
  } catch (error) {
    console.error('Error updating module:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { db } = await connectToDatabase()
    const result = await db.collection('modules').deleteOne({ 
      _id: new ObjectId(params.id)
    })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Module not found' },
        { status: 404 }
      )
    }

    // Invalidate cache
    await invalidateModuleCache(params.id)

    return NextResponse.json({ message: 'Module deleted successfully' })
  } catch (error) {
    console.error('Error deleting module:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 