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

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Try to get cached module
    const cachedModule = await getCachedModule(params.id)
    if (cachedModule) {
      return NextResponse.json(cachedModule)
    }

    // If not cached, fetch from database
    const module = await Module.findById(params.id).lean()
    if (!module) {
      return new NextResponse("Not found", { status: 404 })
    }

    // Cache the module
    await setCachedModule(params.id, module)

    return NextResponse.json(module)
  } catch (error) {
    console.error("[MODULE_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || !["content-admin", "super-admin"].includes(session.user.role)) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const module = await Module.findByIdAndUpdate(params.id, body, { new: true })

    if (!module) {
      return new NextResponse("Not found", { status: 404 })
    }

    // Invalidate caches
    await invalidateModuleCache(params.id)
    await invalidateModulesListCache()

    return NextResponse.json(module)
  } catch (error) {
    console.error("[MODULE_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user || !["content-admin", "super-admin"].includes(session.user.role)) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const module = await Module.findByIdAndDelete(params.id)
    if (!module) {
      return new NextResponse("Not found", { status: 404 })
    }

    // Invalidate caches
    await invalidateModuleCache(params.id)
    await invalidateModulesListCache()

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("[MODULE_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 