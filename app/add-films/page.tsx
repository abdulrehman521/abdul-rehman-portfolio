"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, Trash2, Edit, Eye, EyeOff, Plus, Save, X, AlertCircle, Lock } from "lucide-react"
import { useAuth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { uploadToCloudinary, compressImage } from "@/lib/cloudinary"
import { validateYouTubeUrl, convertToEmbedUrl } from "@/lib/youtube"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface FilmData {
  id: number
  title: string
  year: string
  duration: string
  genre: string
  role: string
  description: string
  poster: string
  awards: string[]
  status: string
  trailer_url: string
  film_url: string
}

export default function AddFilmsPage() {
  const { isAuthenticated, login } = useAuth()
  const { toast } = useToast()

  // Auth state
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")

  // Film management state
  const [films, setFilms] = useState<FilmData[]>([])
  const [editingFilm, setEditingFilm] = useState<FilmData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    year: "",
    duration: "",
    genre: "",
    role: "",
    description: "",
    awards: "",
    status: "Completed",
    trailerUrl: "",
    filmUrl: "",
  })
  const [posterFile, setPosterFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState("")
  const [fileSize, setFileSize] = useState<number>(0)

  useEffect(() => {
    if (isAuthenticated) {
      loadFilms()
    }
  }, [isAuthenticated])

  const loadFilms = async () => {
    try {
      const { data, error } = await supabase.from("films").select("*").order("created_at", { ascending: false })
      if (error) throw error
      setFilms(data || [])
    } catch (error) {
      console.error("Error loading Films:", error)
      toast({
        title: "Error",
        description: "Failed to load films",
        variant: "destructive",
      })
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const success = login(loginData.username, loginData.password)
    if (!success) {
      setLoginError("Invalid credentials")
    } else {
      setLoginError("")
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
          setPosterFile(compressedFile)
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
        setPosterFile(file)
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      }
    }
  }

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsLoading(true)

  //   try {
  //     // Validate YouTube URLs
  //     if (!validateYouTubeUrl(formData.trailerUrl)) {
  //       toast({
  //         title: "Invalid URL",
  //         description: "Trailer URL must be in format: https://youtu.be/VIDEO_ID",
  //         variant: "destructive",
  //       })
  //       setIsLoading(false)
  //       return
  //     }

  //     if (!validateYouTubeUrl(formData.filmUrl)) {
  //       toast({
  //         title: "Invalid URL",
  //         description: "Film URL must be in format: https://youtu.be/VIDEO_ID",
  //         variant: "destructive",
  //       })
  //       setIsLoading(false)
  //       return
  //     }

  //     // Convert URLs to embed format
  //     const embedTrailerUrl = convertToEmbedUrl(formData.trailerUrl)
  //     const embedFilmUrl = convertToEmbedUrl(formData.filmUrl)

  //     // Check for duplicate film URL (excluding current film if editing)
  //     const { data: existingFilms } = await supabase.from("films").select("id").eq("film_url", embedFilmUrl)

  //     if (existingFilms && existingFilms.length > 0) {
  //       const isDuplicate = editingFilm
  //         ? existingFilms.some((film) => film.id !== editingFilm.id)
  //         : existingFilms.length > 0

  //       if (isDuplicate) {
  //         toast({
  //           title: "Error",
  //           description: "A film with this URL already exists",
  //           variant: "destructive",
  //         })
  //         setIsLoading(false)
  //         return
  //       }
  //     }

  //     let posterUrl = editingFilm?.poster || ""

  //     if (posterFile) {
  //       toast({
  //         title: "Uploading Image",
  //         description: "Uploading poster to Cloudinary...",
  //       })
  //       posterUrl = await uploadToCloudinary(posterFile)
  //       toast({
  //         title: "Success",
  //         description: "Image uploaded successfully!",
  //       })
  //     }

  //     const filmData = {
  //       title: formData.title,
  //       year: formData.year,
  //       duration: formData.duration,
  //       genre: formData.genre,
  //       role: formData.role,
  //       description: formData.description,
  //       poster: posterUrl,
  //       awards: formData.awards
  //         .split(",")
  //         .map((award) => award.trim())
  //         .filter(Boolean),
  //       status: formData.status,
  //       trailer_url: embedTrailerUrl,
  //       film_url: embedFilmUrl,
  //     }

  //     if (editingFilm) {
  //       const { error } = await supabase.from("films").update(filmData).eq("id", editingFilm.id)
  //       if (error) throw error
  //       toast({
  //         title: "Success",
  //         description: "Film updated successfully!",
  //       })
  //     } else {
  //       const { error } = await supabase.from("films").insert([filmData])
  //       if (error) throw error
  //       toast({
  //         title: "Success",
  //         description: "Film added successfully!",
  //       })
  //     }

  //     resetForm()
  //     loadFilms()
  //   } catch (error) {
  //     console.error("Submit error:", error)
  //     toast({
  //       title: "Error",
  //       description: "Error: " + (error as Error).message,
  //       variant: "destructive",
  //     })
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    // Validate YouTube URLs
    if (!validateYouTubeUrl(formData.trailerUrl)) {
      toast({
        title: "Invalid URL",
        description: "Trailer URL must be in format: https://youtu.be/VIDEO_ID",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!validateYouTubeUrl(formData.filmUrl)) {
      toast({
        title: "Invalid URL",
        description: "Film URL must be in format: https://youtu.be/VIDEO_ID",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Convert URLs to embed format
    const embedTrailerUrl = convertToEmbedUrl(formData.trailerUrl);
    const embedFilmUrl = convertToEmbedUrl(formData.filmUrl);

    // Duplicate check (skip if editing same film_url)
    const { data: existingFilms } = await supabase.from("films").select("id").eq("film_url", embedFilmUrl);
    if (existingFilms && existingFilms.length > 0) {
      const isDuplicate = editingFilm
        ? existingFilms.some((film) => film.id !== editingFilm.id)
        : existingFilms.length > 0;
      if (isDuplicate) {
        toast({
          title: "Error",
          description: "A film with this URL already exists",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
    }

    // Handle poster
    let posterUrl = editingFilm?.poster || "";
    if (posterFile) {
      toast({ title: "Uploading Image", description: "Uploading poster to Cloudinary..." });
      posterUrl = await uploadToCloudinary(posterFile);
      toast({ title: "Success", description: "Image uploaded successfully!" });
    }

    const filmData = {
      title: formData.title,
      year: formData.year,
      duration: formData.duration,
      genre: formData.genre,
      role: formData.role,
      description: formData.description,
      poster: posterUrl,
      awards: formData.awards
        .split(",")
        .map((award) => award.trim())
        .filter(Boolean),
      status: formData.status,
      trailer_url: embedTrailerUrl,
      film_url: embedFilmUrl,
    };

    if (editingFilm) {
      // Delete the old entry
      const { error: deleteError } = await supabase.from("films").delete().eq("id", editingFilm.id);
      if (deleteError) throw deleteError;

      // Insert the new edited entry (will be at top because of new created_at)
      const { error: insertError } = await supabase.from("films").insert([filmData]);
      if (insertError) throw insertError;

      toast({ title: "Success", description: "Film updated and moved to top!" });
    } else {
      const { error: insertError } = await supabase.from("films").insert([filmData]);
      if (insertError) throw insertError;

      toast({ title: "Success", description: "Film added successfully!" });
    }

    resetForm();
    await loadFilms();
  } catch (error) {
    console.error("Submit error:", error);
    toast({
      title: "Error",
      description: "Error: " + (error as Error).message,
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};


  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this film?")) return

    try {
      const { error } = await supabase.from("films").delete().eq("id", id)
      if (error) throw error

      toast({
        title: "Success",
        description: "Film deleted successfully!",
      })
      loadFilms()
    } catch (error) {
      toast({
        title: "Error",
        description: "Error deleting film",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (film: FilmData) => {
    setEditingFilm(film)
    // Convert embed URLs back to youtu.be format for editing
    const trailerVideoId = film.trailer_url.split("/embed/")[1]
    const filmVideoId = film.film_url.split("/embed/")[1]

    setFormData({
      title: film.title,
      year: film.year,
      duration: film.duration,
      genre: film.genre,
      role: film.role,
      description: film.description,
      awards: film.awards.join(", "),
      status: film.status,
      trailerUrl: `https://youtu.be/${trailerVideoId}`,
      filmUrl: `https://youtu.be/${filmVideoId}`,
    })
    setPreviewUrl(film.poster)
    setFileSize(0)
  }

  const resetForm = () => {
    setFormData({
      title: "",
      year: "",
      duration: "",
      genre: "",
      role: "",
      description: "",
      awards: "",
      status: "Completed",
      trailerUrl: "",
      filmUrl: "",
    })
    setPosterFile(null)
    setPreviewUrl("")
    setEditingFilm(null)
    setFileSize(0)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return ""
    const mb = bytes / 1024 / 1024
    return `${mb.toFixed(2)} MB`
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-black to-black" />
        <Card className="w-full max-w-md bg-gray-900/90 border-gray-700 backdrop-blur-sm relative z-10">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-amber-400" />
            </div>
            <CardTitle className="text-2xl text-white">Film Management</CardTitle>
            <p className="text-gray-400">Enter credentials to access admin panel</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Username"
                  value={loginData.username}
                  onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white"
                  required
                />
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="bg-gray-800 border-gray-600 text-white pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {loginError && <p className="text-red-400 text-sm text-center">{loginError}</p>}
              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-black">
                Access Admin Panel
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/10 via-black to-black" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Film Management Studio</h1>
          <p className="text-xl text-gray-400">Add, edit, and manage your filmography</p>
          <div className="w-20 h-1 bg-amber-400 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                {editingFilm ? <Edit className="mr-2 h-6 w-6" /> : <Plus className="mr-2 h-6 w-6" />}
                {editingFilm ? "Edit Film" : "Add New Film"}
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-2">Duration *</Label>
                    <Input
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="e.g., Short Film, 90 minutes"
                      required
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-2">Genre *</Label>
                    <Input
                      value={formData.genre}
                      onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-300 mb-2">Role *</Label>
                  <Input
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="e.g., Director, Editor, Producer"
                    required
                  />
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
                  <Label className="block text-sm font-medium text-gray-300 mb-2">Awards (comma-separated)</Label>
                  <Input
                    value={formData.awards}
                    onChange={(e) => setFormData({ ...formData, awards: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="Best Director, Audience Choice Award"
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-300 mb-2">Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value })}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Post-Production">Post-Production</SelectItem>
                      <SelectItem value="In Production">In Production</SelectItem>
                      <SelectItem value="Pre-Production">Pre-Production</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-2">Trailer URL *</Label>
                    <Input
                      value={formData.trailerUrl}
                      onChange={(e) => setFormData({ ...formData, trailerUrl: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="https://youtu.be/VIDEO_ID"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Format: https://youtu.be/VIDEO_ID</p>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-300 mb-2">Film URL *</Label>
                    <Input
                      value={formData.filmUrl}
                      onChange={(e) => setFormData({ ...formData, filmUrl: e.target.value })}
                      className="bg-gray-800 border-gray-600 text-white"
                      placeholder="https://youtu.be/VIDEO_ID"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">Format: https://youtu.be/VIDEO_ID</p>
                  </div>
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-300 mb-2">Poster Image *</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="bg-gray-800 border-gray-600 text-white"
                        required={!editingFilm}
                      />
                      <Upload className="h-5 w-5 text-gray-400" />
                    </div>
                    {/* File size info */}
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
                        width={200}
                        height={300}
                        className="rounded-lg object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-amber-500 hover:bg-amber-600 text-black"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? "Saving..." : editingFilm ? "Update Film" : "Add Film"}
                  </Button>
                  {editingFilm && (
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

          {/* Films List */}
          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Existing Films</CardTitle>
              <p className="text-gray-400">{films.length} films in database</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {films.length === 0 ? (
                  <p className="text-gray-400 text-center py-8">No films added yet</p>
                ) : (
                  films.map((film) => (
                    <div key={film.id} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{film.title}</h3>
                          <p className="text-gray-400 text-sm">
                            {film.year} • {film.genre}
                          </p>
                          <p className="text-gray-500 text-xs mt-1">{film.role}</p>
                          {film.awards && film.awards.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {film.awards.map((award, index) => (
                                <Badge
                                  key={index}
                                  variant="outline"
                                  className="border-amber-500/50 text-amber-400 text-xs"
                                >
                                  {award}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            onClick={() => handleEdit(film)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleDelete(film.id)}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
