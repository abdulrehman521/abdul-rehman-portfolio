// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { supabase } from "@/lib/supabaseClient"
// import { X } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { useRouter } from "next/navigation"
// import Link from "next/link"

// export default function AddAestheticsPage() {
//   const [files, setFiles] = useState<File[]>([])
//   const [category, setCategory] = useState("")
//   const [categories, setCategories] = useState<string[]>([])
//   const [images, setImages] = useState<any[]>([])
//   const [selectedCategory, setSelectedCategory] = useState<string>("All")
//   const { toast } = useToast()
//   const router = useRouter()

//   useEffect(() => {
//     fetchCategories()
//     fetchImages()
//   }, [])

//   const fetchCategories = async () => {
//     const { data, error } = await supabase.from("images").select("folder")
//     if (error) {
//       console.error(error)
//       return
//     }
//     const uniqueCategories = Array.from(new Set(data.map((item) => item.folder)))
//     setCategories(uniqueCategories)
//   }

//   const fetchImages = async () => {
//     const { data, error } = await supabase
//       .from("images")
//       .select("*")
//       .order("created_at", { ascending: false })
//     if (error) console.error(error)
//     else setImages(data || [])
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFiles([...files, ...Array.from(e.target.files)])
//     }
//   }

//   const handleUpload = async () => {
//     if (!files.length || !category) {
//       toast({ title: "Error", description: "Please select files and category", variant: "destructive" })
//       return
//     }

//     for (const file of files) {
//       const formData = new FormData()
//       formData.append("file", file)
//       formData.append("upload_preset", "YOUR_CLOUDINARY_PRESET")

//       const cloudinaryRes = await fetch(
//         `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`,
//         { method: "POST", body: formData }
//       )

//       const cloudinaryData = await cloudinaryRes.json()
//       if (cloudinaryData.secure_url) {
//         await supabase.from("images").insert({
//           url: cloudinaryData.secure_url,
//           folder: category,
//         })
//       }
//     }

//     toast({ title: "Success", description: "Images uploaded successfully" })
//     setFiles([])
//     setCategory("")
//     fetchImages()
//     fetchCategories()
//   }

//   const handleDelete = async (id: string) => {
//     await supabase.from("images").delete().eq("id", id)
//     toast({ title: "Deleted", description: "Image removed from database" })
//     fetchImages()
//     fetchCategories()
//   }

//   const filteredImages =
//     selectedCategory === "All"
//       ? images
//       : images.filter((img) => img.folder === selectedCategory)

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
//       {/* Navbar */}
//       <nav className="bg-black/50 backdrop-blur-md border-b border-amber-500/20 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
//         <h1 className="text-lg font-bold text-amber-500">Aesthetic Manager</h1>
//         <div className="space-x-4">
//           <Link href="/">
//             <Button variant="outline">Home</Button>
//           </Link>
//           <Button variant="outline" onClick={() => router.back()}>← Back</Button>
//         </div>
//       </nav>

//       <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Upload Form */}
//         <Card className="bg-black/60 border-amber-500/20">
//           <CardHeader>
//             <CardTitle>Upload Aesthetic Images</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <Input type="file" multiple onChange={handleFileChange} className="bg-gray-800" />
//               <div>
//                 <Label>Category</Label>
//                 <select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
//                 >
//                   <option value="">Select a category</option>
//                   {categories.map((cat) => (
//                     <option key={cat} value={cat}>
//                       {cat}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <Button onClick={handleUpload} className="w-full bg-amber-500 hover:bg-amber-600">
//                 Upload
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Image List */}
//         <Card className="bg-black/60 border-amber-500/20">
//           <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//             <CardTitle>Existing Images</CardTitle>
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
//             >
//               <option value="All">All Categories</option>
//               {categories.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-2 gap-4">
//               {filteredImages.map((img) => (
//                 <div key={img.id} className="relative group">
//                   <img
//                     src={img.url}
//                     alt=""
//                     className="w-full h-32 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
//                   />
//                   <div className="absolute top-1 left-1 bg-black/60 px-2 py-1 text-xs rounded">
//                     {img.folder}
//                   </div>
//                   <button
//                     onClick={() => handleDelete(img.id)}
//                     className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { supabase } from "@/lib/supabaseClient"
// import { X } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { useRouter } from "next/navigation"
// import Link from "next/link"

// export default function AddAestheticsPage() {
//   const [files, setFiles] = useState<File[]>([])
//   const [category, setCategory] = useState("")
//   const [images, setImages] = useState<any[]>([])
//   const [selectedCategory, setSelectedCategory] = useState<string>("All")
//   const { toast } = useToast()
//   const router = useRouter()

//   // Hardcoded categories
//   const categories = ["Aesthetics", "Corporate", "Fashion Product", "Sports", "Wedding"]

//   useEffect(() => {
//     fetchImages()
//   }, [])

//   const fetchImages = async () => {
//     const { data, error } = await supabase
//       .from("images")
//       .select("*")
//       .order("created_at", { ascending: false })
//     if (error) console.error(error)
//     else setImages(data || [])
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFiles([...files, ...Array.from(e.target.files)])
//     }
//   }

//   const handleUpload = async () => {
//     if (!files.length || !category) {
//       toast({ title: "Error", description: "Please select files and category", variant: "destructive" })
//       return
//     }

//     for (const file of files) {
//       const formData = new FormData()
//       formData.append("file", file)
//       formData.append("upload_preset", "ml_default") // Your unsigned preset in Cloudinary

//       const cloudinaryRes = await fetch(
//         `https://api.cloudinary.com/v1_1/dk4pwokx3/image/upload`,
//         { method: "POST", body: formData }
//       )

//       const cloudinaryData = await cloudinaryRes.json()
//       if (cloudinaryData.secure_url) {
//         await supabase.from("images").insert({
//           url: cloudinaryData.secure_url,
//           folder: category,
//         })
//       }
//     }

//     toast({ title: "Success", description: "Images uploaded successfully" })
//     setFiles([])
//     setCategory("")
//     fetchImages()
//   }

//   const handleDelete = async (id: string) => {
//     await supabase.from("images").delete().eq("id", id)
//     toast({ title: "Deleted", description: "Image removed from database" })
//     fetchImages()
//   }

//   const filteredImages =
//     selectedCategory === "All"
//       ? images
//       : images.filter((img) => img.folder === selectedCategory)

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
//       {/* Navbar */}
   
//       <nav className="bg-black/50 backdrop-blur-md border-b border-amber-500/20 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
//         <h1 className="text-lg font-bold text-amber-500">Aesthetic Manager</h1>
//         <div className="space-x-4">
//           <Link href="/">
//             <Button variant="outline">Home</Button>
//           </Link>
//           <Button variant="outline" onClick={() => router.back()}>← Back</Button>
//         </div>
//       </nav>

//       <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Upload Form */}
//         <Card className="bg-black/60 border-amber-500/20">
//           <CardHeader>
//             <CardTitle>Upload Images</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <Input type="file" multiple onChange={handleFileChange} className="bg-gray-800" />
//               <div>
//                 <Label>Category</Label>
//                 <select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
//                 >
//                   <option value="">Select a category</option>
//                   {categories.map((cat) => (
//                     <option key={cat} value={cat}>
//                       {cat}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <Button onClick={handleUpload} className="w-full bg-amber-500 hover:bg-amber-600">
//                 Upload
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Image List */}
//         <Card className="bg-black/60 border-amber-500/20">
//           <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
//             <CardTitle>Existing Images</CardTitle>
//             <select
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//               className="bg-gray-800 border border-gray-700 rounded px-3 py-2"
//             >
//               <option value="All">All Categories</option>
//               {categories.map((cat) => (
//                 <option key={cat} value={cat}>
//                   {cat}
//                 </option>
//               ))}
//             </select>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-2 gap-4">
//               {filteredImages.map((img) => (
//                 <div key={img.id} className="relative group">
//                   <img
//                     src={img.url}
//                     alt=""
//                     className="w-full h-32 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
//                   />
//                   <div className="absolute top-1 left-1 bg-black/60 px-2 py-1 text-xs rounded">
//                     {img.folder}
//                   </div>
//                   <button
//                     onClick={() => handleDelete(img.id)}
//                     className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
//                   >
//                     <X className="w-4 h-4" />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Trash2, Eye, EyeOff, X, AlertCircle, Lock, Camera, ImageIcon } from 'lucide-react'
import { useAuth } from "@/lib/auth"
import { supabase } from "@/lib/supabase"
import { uploadToCloudinary, compressImage } from "@/lib/cloudinary"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"

interface AestheticData {
  id: number
  url: string
  folder: string
  created_at: string
}

export default function AddAestheticsPage() {
  const { isAuthenticated, login } = useAuth()
  const { toast } = useToast()

  // Auth state
  const [loginData, setLoginData] = useState({ username: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")

  // Aesthetic management state
  const [images, setImages] = useState<AestheticData[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Form state
  const [files, setFiles] = useState<File[]>([])
  const [category, setCategory] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [previewUrls, setPreviewUrls] = useState<string[]>([])
  const [totalFileSize, setTotalFileSize] = useState<number>(0)

  // Fixed 6 categories
  const categories = ["Aesthetics", "Corporate", "Product", "Fashion", "Sports", "Wedding"]

  useEffect(() => {
    if (isAuthenticated) {
      loadImages()
    }
  }, [isAuthenticated])

  const loadImages = async () => {
    try {
      const { data, error } = await supabase.from("images").select("*").order("created_at", { ascending: false })
      if (error) throw error
      setImages(data || [])
    } catch (error) {
      console.error("Error loading images:", error)
      toast({
        title: "Error",
        description: "Failed to load images",
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
    const selectedFiles = e.target.files
    if (selectedFiles) {
      const fileArray = Array.from(selectedFiles)
      const maxSize = 10 * 1024 * 1024 // 10MB per file

      let totalSize = 0
      const processedFiles: File[] = []
      const urls: string[] = []

      for (const file of fileArray) {
        totalSize += file.size

        if (file.size > maxSize) {
          toast({
            title: "Compressing Image",
            description: `${file.name} is larger than 10MB, compressing...`,
          })

          try {
            const compressedFile = await compressImage(file, maxSize)
            processedFiles.push(compressedFile)
            urls.push(URL.createObjectURL(compressedFile))

            toast({
              title: "Image Compressed",
              description: `${file.name} compressed successfully`,
            })
          } catch (error) {
            toast({
              title: "Error",
              description: `Error compressing ${file.name}. Please try a smaller file.`,
              variant: "destructive",
            })
          }
        } else {
          processedFiles.push(file)
          urls.push(URL.createObjectURL(file))
        }
      }

      setFiles([...files, ...processedFiles])
      setPreviewUrls([...previewUrls, ...urls])
      setTotalFileSize(totalSize)
    }
  }

  const handleUpload = async () => {
    if (!files.length || !category) {
      toast({
        title: "Missing Information",
        description: "Please select files and category to continue",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      for (const file of files) {
        toast({
          title: "Uploading Image",
          description: `Uploading ${file.name} to Cloudinary...`,
        })

        const imageUrl = await uploadToCloudinary(file)

        const { error } = await supabase.from("images").insert({
          url: imageUrl,
          folder: category,
        })

        if (error) throw error
      }

      toast({
        title: "Upload Complete",
        description: "Your visual masterpieces have been added to the collection!",
      })

      resetForm()
      loadImages()
    } catch (error) {
      console.error("Upload error:", error)
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
    if (!confirm("Are you sure you want to delete this image?")) return

    try {
      const { error } = await supabase.from("images").delete().eq("id", id)
      if (error) throw error

      toast({
        title: "Success",
        description: "Image deleted successfully!",
      })
      loadImages()
    } catch (error) {
      toast({
        title: "Error",
        description: "Error deleting image",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setFiles([])
    setCategory("")
    setPreviewUrls([])
    setTotalFileSize(0)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return ""
    const mb = bytes / 1024 / 1024
    return `${mb.toFixed(2)} MB`
  }

  const filteredImages = selectedCategory === "All" ? images : images.filter((img) => img.folder === selectedCategory)

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-black to-black" />
        <Card className="w-full max-w-md bg-gray-900/90 border-gray-700 backdrop-blur-sm relative z-10">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-8 h-8 text-amber-400" />
            </div>
            <CardTitle className="text-2xl text-white">Aesthetic Management</CardTitle>
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
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Aesthetic Management Studio</h1>
          <p className="text-xl text-gray-400">Add, edit, and manage your visual collection</p>
          <div className="w-20 h-1 bg-amber-400 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <Upload className="mr-2 h-6 w-6" />
                Add New Photos
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label className="block text-sm font-medium text-gray-300 mb-2">Select Files</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-4">
                    <Input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                    <Upload className="h-5 w-5 text-gray-400" />
                  </div>
                  {files.length > 0 && (
                    <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <ImageIcon className="w-5 h-5 text-amber-400" />
                          <span className="text-gray-300 font-medium">
                            {files.length} file{files.length !== 1 ? "s" : ""} ready
                          </span>
                        </div>
                        {totalFileSize > 0 && (
                          <span className="text-amber-400 text-sm font-medium">{formatFileSize(totalFileSize)}</span>
                        )}
                      </div>
                      {previewUrls.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                          {previewUrls.slice(0, 6).map((url, index) => (
                            <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                              <Image
                                src={url || "/placeholder.svg"}
                                alt={`Preview ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ))}
                          {previewUrls.length > 6 && (
                            <div className="aspect-square rounded-lg bg-amber-500/20 flex items-center justify-center">
                              <span className="text-amber-300 font-bold text-sm">+{previewUrls.length - 6}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center space-x-2 text-sm">
                    <AlertCircle className="h-4 w-4 text-amber-400" />
                    <span className="text-gray-400">
                      Max file size: 10MB per image {totalFileSize > 0 && `• Current: ${formatFileSize(totalFileSize)}`}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="block text-sm font-medium text-gray-300 mb-2">Category</Label>
                <Select value={category} onValueChange={(value) => setCategory(value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="text-white hover:bg-gray-700">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                onClick={handleUpload}
                disabled={isLoading || !files.length || !category}
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    <span>Uploading...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Upload Photos</span>
                  </div>
                )}
              </Button>

              {files.length > 0 && (
                <Button
                  onClick={resetForm}
                  variant="outline"
                  className="w-full border-gray-600 text-gray-300 hover:border-amber-400 hover:text-amber-400 bg-transparent"
                >
                  <X className="mr-2 h-4 w-4" />
                  Clear Selection
                </Button>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-700 backdrop-blur-sm">
            <CardHeader>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl text-white">Photo Collection</CardTitle>
                  <p className="text-gray-400">
                    {filteredImages.length} photo{filteredImages.length !== 1 ? "s" : ""} in collection
                  </p>
                </div>

                <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value)}>
                  <SelectTrigger className="bg-gray-800 border-gray-600 text-white w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="All" className="text-white hover:bg-gray-700">
                      All Categories
                    </SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat} className="text-white hover:bg-gray-700">
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>

            <CardContent>
              {filteredImages.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Camera className="w-12 h-12 text-amber-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No Photos Yet</h3>
                  <p className="text-gray-400">Upload your first photos to get started</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                  {filteredImages.map((img) => (
                    <div
                      key={img.id}
                      className="relative group overflow-hidden rounded-lg bg-gray-700/30 aspect-square"
                    >
                      <Image
                        src={img.url || "/placeholder.svg"}
                        alt=""
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute bottom-2 left-2 bg-amber-500/90 backdrop-blur-sm px-2 py-1 text-xs rounded text-black font-medium">
                        {img.folder}
                      </div>
                      <button
                        onClick={() => handleDelete(img.id)}
                        className="absolute top-2 right-2 bg-red-500/90 backdrop-blur-sm hover:bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { supabase } from "@/lib/supabaseClient"
// import { X, Upload, ImageIcon, Film, Camera, Sparkles, Play, Star, Zap } from 'lucide-react'
// import { useToast } from "@/hooks/use-toast"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { useRouter } from "next/navigation"
// import Link from "next/link"

// export default function AddAestheticsPage() {
//   const [files, setFiles] = useState<File[]>([])
//   const [category, setCategory] = useState("")
//   const [images, setImages] = useState<any[]>([])
//   const [selectedCategory, setSelectedCategory] = useState<string>("All")
//   const [isUploading, setIsUploading] = useState(false)
//   const { toast } = useToast()
//   const router = useRouter()

//   // Enhanced categories for cinematic work
//   const categories = [
//     "Aesthetics",
//     "Corporate", 
//     "Fashion Product",
//     "Sports",
//     "Wedding",
//     "Cinematic",
//     "Portrait",
//     "Commercial",
//   ]

//   useEffect(() => {
//     fetchImages()
//   }, [])

//   const fetchImages = async () => {
//     const { data, error } = await supabase.from("images").select("*").order("created_at", { ascending: false })
//     if (error) console.error(error)
//     else setImages(data || [])
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFiles([...files, ...Array.from(e.target.files)])
//     }
//   }

//   const handleUpload = async () => {
//     if (!files.length || !category) {
//       toast({
//         title: "Missing Information",
//         description: "Please select files and category to continue",
//         variant: "destructive",
//       })
//       return
//     }

//     setIsUploading(true)

//     for (const file of files) {
//       const formData = new FormData()
//       formData.append("file", file)
//       formData.append("upload_preset", "ml_default")

//       const cloudinaryRes = await fetch(`https://api.cloudinary.com/v1_1/dk4pwokx3/image/upload`, {
//         method: "POST",
//         body: formData,
//       })

//       const cloudinaryData = await cloudinaryRes.json()
//       if (cloudinaryData.secure_url) {
//         await supabase.from("images").insert({
//           url: cloudinaryData.secure_url,
//           folder: category,
//         })
//       }
//     }

//     toast({ title: "Upload Complete", description: "Your visual stories have been added to the collection" })
//     setFiles([])
//     setCategory("")
//     setIsUploading(false)
//     fetchImages()
//   }

//   const handleDelete = async (id: string) => {
//     await supabase.from("images").delete().eq("id", id)
//     toast({ title: "Removed", description: "Image removed from collection" })
//     fetchImages()
//   }

//   const filteredImages = selectedCategory === "All" ? images : images.filter((img) => img.folder === selectedCategory)

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
//       {/* Cinematic film grain overlay */}
//       <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')] pointer-events-none" />
      
//       {/* Cinematic Navbar */}
//       <nav className="relative z-50 bg-gray-800/90 backdrop-blur-xl border-b border-purple-500/20 px-8 py-6 sticky top-0">
//         <div className="max-w-7xl mx-auto flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-purple-400 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
//               <Film className="w-7 h-7 text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl font-black text-white tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
//                 ELEVATE YOUR VISION
//               </h1>
//               <p className="text-sm text-purple-300 font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>
//                 Crafting Cinematic Experiences
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             <Link href="/">
//               <Button
//                 variant="outline"
//                 className="border-purple-500/40 text-purple-300 hover:bg-purple-500/20 bg-transparent hover:border-purple-400 transition-all duration-300"
//               >
//                 <Star className="w-4 h-4 mr-2" />
//                 Home
//               </Button>
//             </Link>
//             <Button
//               variant="outline"
//               onClick={() => router.back()}
//               className="border-purple-500/40 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 transition-all duration-300"
//             >
//               ← Back
//             </Button>
//           </div>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <div className="relative">
//         <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-gray-800/50" />
//         <div className="relative max-w-7xl mx-auto px-8 py-20 text-center">
//           <div className="flex items-center justify-center mb-6">
//             <Sparkles className="w-8 h-8 text-purple-400 mr-3 animate-pulse" />
//             <span className="text-purple-300 font-semibold tracking-wide uppercase text-sm" style={{ fontFamily: 'Open Sans, sans-serif' }}>
//               Professional Visual Management
//             </span>
//             <Sparkles className="w-8 h-8 text-purple-400 ml-3 animate-pulse" />
//           </div>
          
//           <h1 className="text-6xl md:text-8xl font-black text-white mb-8 leading-none tracking-tight" style={{ fontFamily: 'Montserrat, sans-serif' }}>
//             DISCOVER THE ART
//             <br />
//             <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-white bg-clip-text text-transparent">
//               OF STORYTELLING
//             </span>
//           </h1>
          
//           <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
//             Discover the art of storytelling through stunning visuals. Every frame is designed to captivate and engage.
//           </p>
          
//           <div className="flex items-center justify-center space-x-8">
//             <div className="flex items-center space-x-2 text-purple-300">
//               <Play className="w-5 h-5" />
//               <span className="font-medium">Cinematic Quality</span>
//             </div>
//             <div className="w-px h-6 bg-purple-500/30" />
//             <div className="flex items-center space-x-2 text-purple-300">
//               <Zap className="w-5 h-5" />
//               <span className="font-medium">Professional Tools</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-8 py-16">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
//           {/* Upload Section - Asymmetrical Grid */}
//           <div className="lg:col-span-5">
//             <Card className="bg-gray-800/60 backdrop-blur-xl border-purple-500/20 shadow-2xl shadow-purple-500/10 overflow-hidden">
//               <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent" />
//               <CardHeader className="relative pb-6">
//                 <div className="flex items-center space-x-4">
//                   <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
//                     <Upload className="w-7 h-7 text-white" />
//                   </div>
//                   <div>
//                     <CardTitle className="text-2xl font-black text-white mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
//                       UPLOAD VISUALS
//                     </CardTitle>
//                     <p className="text-gray-400" style={{ fontFamily: 'Open Sans, sans-serif' }}>
//                       Add new masterpieces to your collection
//                     </p>
//                   </div>
//                 </div>
//               </CardHeader>
              
//               <CardContent className="relative space-y-8">
//                 <div className="space-y-4">
//                   <Label className="text-gray-300 font-semibold text-sm uppercase tracking-wide" style={{ fontFamily: 'Open Sans, sans-serif' }}>
//                     Select Files
//                   </Label>
//                   <div className="relative group">
//                     <Input
//                       type="file"
//                       multiple
//                       onChange={handleFileChange}
//                       className="bg-gray-700/50 border-gray-600 text-gray-300 file:bg-purple-600 file:text-white file:border-0 file:rounded-xl file:px-6 file:py-3 file:mr-4 file:font-semibold hover:bg-gray-700/70 transition-all duration-300 group-hover:border-purple-500/50"
//                     />
//                     {files.length > 0 && (
//                       <div className="mt-4 p-3 bg-purple-600/20 rounded-lg border border-purple-500/30">
//                         <div className="flex items-center space-x-2">
//                           <ImageIcon className="w-4 h-4 text-purple-400" />
//                           <span className="text-sm text-purple-300 font-medium">
//                             {files.length} file{files.length !== 1 ? "s" : ""} ready for upload
//                           </span>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className="space-y-4">
//                   <Label className="text-gray-300 font-semibold text-sm uppercase tracking-wide" style={{ fontFamily: 'Open Sans, sans-serif' }}>
//                     Category
//                   </Label>
//                   <select
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     className="w-full bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-4 text-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:bg-gray-700/70"
//                     style={{ fontFamily: 'Open Sans, sans-serif' }}
//                   >
//                     <option value="">Choose a category</option>
//                     {categories.map((cat) => (
//                       <option key={cat} value={cat} className="bg-gray-800">
//                         {cat}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 <Button
//                   onClick={handleUpload}
//                   disabled={isUploading}
//                   className="w-full bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-black py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
//                   style={{ fontFamily: 'Montserrat, sans-serif' }}
//                 >
//                   {isUploading ? (
//                     <div className="flex items-center space-x-3">
//                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                       <span>UPLOADING...</span>
//                     </div>
//                   ) : (
//                     <div className="flex items-center space-x-3">
//                       <Upload className="w-5 h-5" />
//                       <span>LET'S CREATE TOGETHER</span>
//                     </div>
//                   )}
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Gallery Section - Asymmetrical Grid */}
//           <div className="lg:col-span-7">
//             <Card className="bg-gray-800/60 backdrop-blur-xl border-purple-500/20 shadow-2xl shadow-purple-500/10 overflow-hidden">
//               <div className="absolute inset-0 bg-gradient-to-bl from-purple-600/5 to-transparent" />
//               <CardHeader className="relative pb-6">
//                 <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
//                       <ImageIcon className="w-7 h-7 text-white" />
//                     </div>
//                     <div>
//                       <CardTitle className="text-2xl font-black text-white mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
//                         VISUAL COLLECTION
//                       </CardTitle>
//                       <p className="text-gray-400" style={{ fontFamily: 'Open Sans, sans-serif' }}>
//                         {filteredImages.length} masterpieces in collection
//                       </p>
//                     </div>
//                   </div>
                  
//                   <select
//                     value={selectedCategory}
//                     onChange={(e) => setSelectedCategory(e.target.value)}
//                     className="bg-gray-700/50 border border-gray-600 rounded-xl px-4 py-3 text-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 hover:bg-gray-700/70"
//                     style={{ fontFamily: 'Open Sans, sans-serif' }}
//                   >
//                     <option value="All">All Categories</option>
//                     {categories.map((cat) => (
//                       <option key={cat} value={cat} className="bg-gray-800">
//                         {cat}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//               </CardHeader>
              
//               <CardContent className="relative">
//                 {filteredImages.length === 0 ? (
//                   <div className="text-center py-16">
//                     <div className="w-24 h-24 bg-gradient-to-r from-purple-600/20 to-purple-400/20 rounded-full flex items-center justify-center mx-auto mb-6">
//                       <Camera className="w-12 h-12 text-purple-400" />
//                     </div>
//                     <h3 className="text-xl font-black text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
//                       NO VISUALS YET
//                     </h3>
//                     <p className="text-gray-400 text-lg" style={{ fontFamily: 'Open Sans, sans-serif' }}>
//                       Upload your first masterpiece to begin your cinematic journey
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
//                     {filteredImages.map((img, index) => (
//                       <div 
//                         key={img.id} 
//                         className={`relative group overflow-hidden rounded-2xl bg-gray-700/30 transition-all duration-500 hover:scale-105 ${
//                           index % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''
//                         }`}
//                       >
//                         <img
//                           src={img.url || "/placeholder.svg"}
//                           alt=""
//                           className={`w-full object-cover transition-all duration-700 group-hover:scale-110 ${
//                             index % 3 === 0 ? 'h-64 md:h-80' : 'h-32 md:h-40'
//                           }`}
//                         />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
//                         <div className="absolute bottom-3 left-3 bg-purple-600/90 backdrop-blur-sm px-3 py-1.5 text-xs rounded-lg text-white font-bold uppercase tracking-wide">
//                           {img.folder}
//                         </div>
//                         <button
//                           onClick={() => handleDelete(img.id)}
//                           className="absolute top-3 right-3 bg-red-500/90 backdrop-blur-sm hover:bg-red-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform hover:scale-110 shadow-lg"
//                         >
//                           <X className="w-4 h-4" />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </div>

//       {/* Cinematic Footer */}
//       <footer className="relative bg-gray-900/90 backdrop-blur-xl border-t border-purple-500/20 mt-20">
//         <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-transparent" />
//         <div className="relative max-w-7xl mx-auto px-8 py-12 text-center">
//           <div className="flex items-center justify-center mb-4">
//             <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-400 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
//               <Film className="w-8 h-8 text-white" />
//             </div>
//           </div>
//           <h3 className="text-2xl font-black text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
//             LET'S CREATE TOGETHER
//           </h3>
//           <p className="text-gray-400 text-lg" style={{ fontFamily: 'Open Sans, sans-serif' }}>
//             Where every frame tells a story
//           </p>
//         </div>
//       </footer>
//     </div>
//   )
// }