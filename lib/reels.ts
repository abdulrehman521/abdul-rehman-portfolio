import { supabase } from "./supabase"
import type { Reel } from "./supabase"

export const getReels = async (): Promise<Reel[]> => {
  const { data, error } = await supabase.from("reels").select("*").order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}

export const createReel = async (reelData: {
  title: string
  category: string
  year: string
  description: string
  thumbnail: string
  video_url: string
  awards: string[]
  featured: boolean
}): Promise<Reel> => {
  const { data, error } = await supabase.from("reels").insert([reelData]).select().single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const updateReel = async (
  id: number,
  reelData: {
    title?: string
    category?: string
    year?: string
    description?: string
    thumbnail?: string
    video_url?: string
    awards?: string[]
    featured?: boolean
  },
): Promise<Reel> => {
  const { data, error } = await supabase.from("reels").update(reelData).eq("id", id).select().single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export const deleteReel = async (id: number): Promise<void> => {
  const { error } = await supabase.from("reels").delete().eq("id", id)

  if (error) {
    throw new Error(error.message)
  }
}

export const getReelById = async (id: number): Promise<Reel | null> => {
  const { data, error } = await supabase.from("reels").select("*").eq("id", id).single()

  if (error) {
    if (error.code === "PGRST116") {
      return null // No rows returned
    }
    throw new Error(error.message)
  }

  return data
}

export const getFeaturedReels = async (): Promise<Reel[]> => {
  const { data, error } = await supabase
    .from("reels")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}

export const getReelsByCategory = async (category: string): Promise<Reel[]> => {
  const { data, error } = await supabase
    .from("reels")
    .select("*")
    .eq("category", category)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}
