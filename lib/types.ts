export type Series = {
  id: string
  slug: string
  title: string
  synopsis: string | null
  tagline: string | null
  category: string | null
  cover_url: string | null
  hero_url: string | null
  featured: boolean
  status: 'draft' | 'published'
  created_at: string
}

export type Episode = {
  id: string
  series_id: string
  number: number
  title: string
  description: string | null
  caption: string | null
  video_url: string | null
  video_path: string | null
  thumbnail_url: string | null
  subtitle_url: string | null
  duration_seconds: number | null
  access: 'free' | 'premium'
  status: 'draft' | 'published'
  created_at: string
}
