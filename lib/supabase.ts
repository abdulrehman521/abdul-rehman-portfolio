// import { createClient } from "@supabase/supabase-js"

// const supabaseUrl = "https://jpcapezxtugpijsrgtkx.supabase.co"
// const supabaseKey =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwY2FwZXp4dHVncGlqc3JndGt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4MjYwNjIsImV4cCI6MjA3MDQwMjA2Mn0.pIBrPNtPZDemWPDOd5kunQRY0dSKRp7XQAc2vwulvnw"

// export const supabase = createClient(supabaseUrl, supabaseKey)

// export type Film = {
//   id: number
//   title: string
//   year: string
//   duration: string
//   genre: string
//   role: string
//   description: string
//   poster: string
//   awards: string[]
//   status: string
//   trailer_url: string
//   film_url: string
//   created_at?: string
// }


import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Film {
  id: number
  title: string
  year: string
  genre: string
  description: string
  poster_url: string
  trailer_url: string
  status: "completed" | "in_production" | "pre_production"
  awards: string[]
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Reel {
  id: number
  title: string
  category: string
  year: string
  description: string
  thumbnail: string
  video_url: string
  awards: string[]
  featured: boolean
  created_at: string
  updated_at: string
}

export type Database = {
  public: {
    Tables: {
      films: {
        Row: Film
        Insert: Omit<Film, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<Film, "id" | "created_at" | "updated_at">>
      }
      reels: {
        Row: Reel
        Insert: Omit<Reel, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<Reel, "id" | "created_at" | "updated_at">>
      }
    }
  }
}
