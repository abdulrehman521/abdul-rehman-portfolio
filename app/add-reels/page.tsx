"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Upload, Trash2, Edit, Plus, Save, X, AlertCircle, Video, Database, ArrowLeft } from "lucide-react"
import { useAdminAuth } from "@/lib/auth"
import { uploadToCloudinary, compressImage } from "@/lib/cloudinary"
import { validateYouTubeUrl, convertToEmbedUrl } from "@/lib/youtube"
import { getReels, createReel, updateReel, deleteReel } from "@/lib/reels"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import type { Reel } from "@/lib/supabase"

const categories = ["Documentary", "Commercial", "Fashion", "Short Film", "Experimental", "Sports"]

export default function AddReelsPage() {
  const { isAdminAuthenticated, isLoading: authLoading } = useAdminAuth()
  const router = useRouter()
  const { toast } = useToast()

  // State
  const [reels, setReels] = useState<Reel[]>([])
  const [editingReel, setEditingReel] = useState<Reel | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [databaseError, setDatabaseError] = useState<string | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    year: "",
    description: "",
    videoUrl: "",
    awards: "",
    featured: false,
  })
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const [fileSize, setFileSize] = useState<number>(0)

  // Handle authentication redirect
  useEffect(() => {
    if (!authLoading && !isAdminAuthenticated) {
      router.push("/admin")
    }
  }, [isAdminAuthenticated, authLoading, router])

  // Load reels when authenticated
  useEffect(() => {
    if (isAdminAuthenticated && !authLoading) {
      loadReels()
    }
  }, [isAdminAuthenticated, authLoading])

  const loadReels = async () => {
    try {
      setDatabaseError(null)
      const data = await getReels()
      setReels(data)
    } catch (error) {
      console.error("Error loading reels:", error)
      const errorMessage = (error as Error).message

      if (errorMessage.includes("table") && errorMessage.includes("reels")) {
        setDatabaseError("The reels table doesn't exist yet. Please run the database setup script first.")
      } else {
        setDatabaseError("Failed to load reels from database.")
      }

      toast({
        title: "Database Error",
        description: "Please run the database setup script to create the reels table.",
        variant: "destructive",
      })
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFileSize(file.size)

      // Check if file needs compression
      const maxSize = 10 * 1024 * 1024 // 10MB in bytes

      if (file.size > maxSize) {
        toast({
          title: "Compressing Image",
          description: "Image is larger than 10MB, compressing...",
        })

        try {
          const compressedFile = await compressImage(file, maxSize)
          setThumbnailFile(compressedFile)
          setFileSize(compressedFile.size)
          const url = URL.createObjectURL(compressedFile)
          setPreviewUrl(url)

          toast({
            title: "Image Compressed",
            description: `Image compressed from ${(file.size / 1024 / 1024).toFixed(2)}MB to ${(compressedFile.size / 1024 / 1024).toFixed(2)}MB`,
          })
        } catch (error) {
          toast({
            title: "Error",
            description: "Error compressing image. Please try a smaller file.",
            variant: "destructive",
          })
        }
      } else {
        setThumbnailFile(file)
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (databaseError) {
      toast({
        title: "Database Not Ready",
        description: "Please run the database setup script first.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Validate YouTube URL
      if (!validateYouTubeUrl(formData.videoUrl)) {
        toast({
          title: "Invalid URL",
          description: "Video URL must be in format: https://youtu.be/VIDEO_ID",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Convert URL to embed format
      const embedVideoUrl = convertToEmbedUrl(formData.videoUrl)

      let thumbnailUrl = editingReel?.thumbnail || ""

      if (thumbnailFile) {
        toast({
          title: "Uploading Image",
          description: "Uploading thumbnail to Cloudinary...",
        })
        thumbnailUrl = await uploadToCloudinary(thumbnailFile)
        toast({
          title: "Success",
          description: "Image uploaded successfully!",
        })
      }

      const reelData = {
        title: formData.title,
        category: formData.category,
        year: formData.year,
        description: formData.description,
        thumbnail: thumbnailUrl,
        video_url: embedVideoUrl,
        awards: formData.awards
          .split(",")
          .map((award) => award.trim())
          .filter(Boolean),
        featured: formData.featured,
      }

      if (editingReel) {
        await updateReel(editingReel.id, reelData)
        toast({
          title: "Success",
          description: "Reel updated successfully!",
        })
      } else {
        await createReel(reelData)
        toast({
          title: "Success",
          description: "Reel added successfully!",
        })
      }

      resetForm()
      loadReels()
    } catch (error) {
      console.error("Submit error:", error)
      toast({
        title: "Error",
        description: "Error: " + (error as Error).message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this reel?")) return

    try {
      await deleteReel(id)
      toast({
        title: "Success",
        description: "Reel deleted successfully!",
      })
      loadReels()
    } catch (error) {
      toast({
        title: "Error",
        description: "Error deleting reel",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (reel: Reel) => {
    setEditingReel(reel)
    // Convert embed URL back to youtu.be format for editing
    const videoId = reel.video_url.split("/embed/")[1]?.split("?")[0]

    setFormData({
      title: reel.title,
      category: reel.category,
      year: reel.year,
      description: reel.description,
      videoUrl: videoId ? `https://youtu.be/${videoId}` : reel.video_url,
      awards: reel.awards.join(", "),
      featured: reel.featured,
    })
    setPreviewUrl(reel.thumbnail)
    setFileSize(0)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      year: "",
      description: "",
      videoUrl: "",
      awards: "",
      featured: false,
    })
    setThumbnailFile(null)
    setPreviewUrl("")
    setEditingReel(null)
    setFileSize(0)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return ""
    const mb = bytes / 1024 / 1024
    return `${mb.toFixed(2)} MB`
  }

  const filteredReels = selectedCategory === "All" ? reels : reels.filter((reel) => reel.category === selectedCategory)

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  // Don't render if not authenticated (will redirect)
  if (!isAdminAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-20">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Button
            onClick={() => router.push("/admin")}
            variant="outline"
            className="mb-6 border-gray-600 text-gray-300 hover:border-amber-400 hover:text-amber-400 bg-transparent"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Admin
          </Button>

          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500/10 rounded-full mb-6">
            <Video className="w-10 h-10 text-amber-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Reels Management</h1>
          <p className="text-xl text-gray-400">Create and manage your portfolio reels</p>
          <div className="w-20 h-1 bg-amber-400 mx-auto mt-6" />
        </div>

        {/* Database Error Alert */}
        {databaseError && (
          <Card className="bg-red-900/20 border-red-500/50 mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-3">
                <Database className="h-6 w-6 text-red-400" />
                <div>
                  <h3 className="text-red-400 font-semibold">Database Setup Required</h3>
                  <p className="text-red-300 text-sm mt-1">{databaseError}</p>
                  <p className="text-red-300 text-sm mt-2">
                    Run: <code className="bg-red-800/30 px-2 py-1 rounded">python scripts/setup_reels_table.py</code>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="bg-black/60 border-amber-500/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                {editingReel ? <Edit className="mr-2 h-6 w-6" /> : <Plus className="mr-2 h-6 w-6" />}
                {editingReel ? "Edit Reel" : "Add New Reel"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-2">Title *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      required
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-2">Year *</Label>
                    <Input
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-300 mb-2">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-300 mb-2">Description *</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-300 mb-2">Video URL *</Label>
                  <Input
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="https://youtu.be/VIDEO_ID"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Format: https://youtu.be/VIDEO_ID</p>
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-300 mb-2">Awards (comma-separated)</Label>
                  <Input
                    value={formData.awards}
                    onChange={(e) => setFormData({ ...formData, awards: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="Best Director, Audience Choice Award"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                  <Label htmlFor="featured" className="text-gray-300">
                    Featured Reel
                  </Label>
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-300 mb-2">Thumbnail Image *</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="bg-gray-800 border-gray-600 text-white"
                        required={!editingReel}
                      />
                      <Upload className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-amber-400" />
                      <span className="text-gray-400">
                        Max file size: 10MB {fileSize > 0 && `• Current: ${formatFileSize(fileSize)}`}
                      </span>
                    </div>
                    {fileSize > 10 * 1024 * 1024 && (
                      <div className="text-red-400 text-sm">⚠️ File too large! It will be automatically compressed.</div>
                    )}
                  </div>
                  {previewUrl && (
                    <div className="mt-4">
                      <Image
                        src={previewUrl || "/placeholder.svg"}
                        alt="Preview"
                        width={300}
                        height={200}
                        className="rounded-lg object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={isLoading || !!databaseError}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-black"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? "Saving..." : editingReel ? "Update Reel" : "Add Reel"}
                  </Button>
                  {editingReel && (
                    <Button
                      type="button"
                      onClick={resetForm}
                      variant="outline"
                      className="border-gray-600 text-gray-300 hover:border-amber-400 hover:text-amber-400 bg-transparent"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Reels List */}
          <Card className="bg-black/60 border-amber-500/20 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Portfolio Reels</CardTitle>
              <p className="text-gray-400">{reels.length} reels in database</p>
            </CardHeader>
            <CardContent>
              {!databaseError && (
                <>
                  {/* Category Filter */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {["All", ...categories].map((category) => (
                        <Button
                          key={category}
                          variant={selectedCategory === category ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(category)}
                          className={
                            selectedCategory === category
                              ? "bg-amber-500 hover:bg-amber-600 text-black"
                              : "border-gray-600 text-gray-300 hover:border-amber-400 hover:text-amber-400 bg-transparent"
                          }
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {filteredReels.length === 0 ? (
                      <p className="text-gray-400 text-center py-8">No reels found</p>
                    ) : (
                      filteredReels.map((reel) => (
                        <div key={reel.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                          <div className="flex items-start gap-4">
                            <Image
                              src={reel.thumbnail || "/placeholder.svg"}
                              alt={reel.title}
                              width={80}
                              height={60}
                              className="rounded-md object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-white font-semibold truncate">{reel.title}</h3>
                                {reel.featured && <Badge className="bg-amber-500 text-black text-xs">Featured</Badge>}
                              </div>
                              <p className="text-gray-400 text-sm">
                                {reel.year} • {reel.category}
                              </p>
                              <p className="text-gray-500 text-xs mt-1 line-clamp-2">{reel.description}</p>
                              {reel.awards && reel.awards.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {reel.awards.slice(0, 2).map((award, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="border-amber-500/50 text-amber-400 text-xs"
                                    >
                                      {award}
                                    </Badge>
                                  ))}
                                  {reel.awards.length > 2 && (
                                    <Badge variant="outline" className="border-gray-500/50 text-gray-400 text-xs">
                                      +{reel.awards.length - 2} more
                                    </Badge>
                                  )}
                                </div>
                              )}
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleEdit(reel)}
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleDelete(reel.id)}
                                className="bg-red-600 hover:bg-red-700 text-white"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
