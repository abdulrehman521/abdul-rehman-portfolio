"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Film, Video, User, Lock, Eye, EyeOff } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { ImageIcon } from "lucide-react"


export default function AdminPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })

  // Check if already authenticated
  useEffect(() => {
    const adminAuth = localStorage.getItem("admin_authenticated")
    if (adminAuth === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate loading for better UX
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (credentials.username === "abdulrehman" && credentials.password === "abdulrehman") {
      localStorage.setItem("admin_authenticated", "true")
      setIsAuthenticated(true)
      toast({
        title: "Welcome Back!",
        description: "Successfully logged into admin dashboard",
      })
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated")
    setIsAuthenticated(false)
    setCredentials({ username: "", password: "" })
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    })
  }

  const navigateToFilms = () => {
    router.push("/add-films")
  }

  const navigateToReels = () => {
    router.push("/add-reels")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5" />

        <div className="relative z-10 w-full max-w-md px-4">
          <Card className="bg-black/80 border-amber-500/30 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center pb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500/10 rounded-full mb-6 mx-auto">
                <User className="w-10 h-10 text-amber-400" />
              </div>
              <CardTitle className="text-3xl font-bold text-white mb-2">Admin Access</CardTitle>
              <p className="text-gray-400">Enter your credentials to continue</p>
              <div className="w-16 h-1 bg-amber-400 mx-auto mt-4" />
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <Label className="block text-sm font-medium text-gray-300 mb-2">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type="text"
                      value={credentials.username}
                      onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                      className="bg-gray-800/50 border-gray-600 text-white pl-10 focus:border-amber-400 focus:ring-amber-400"
                      placeholder="Enter username"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-300 mb-2">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={credentials.password}
                      onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      className="bg-gray-800/50 border-gray-600 text-white pl-10 pr-10 focus:border-amber-400 focus:ring-amber-400"
                      placeholder="Enter password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 transition-all duration-300 transform hover:scale-105"
                >
                  {isLoading ? "Authenticating..." : "Access Dashboard"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">Authorized personnel only</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-20">
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500/10 rounded-full mb-6">
            <User className="w-10 h-10 text-amber-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Admin Dashboard</h1>
          <p className="text-xl text-gray-400 mb-6">Manage your cinematic portfolio</p>
          <div className="w-20 h-1 bg-amber-400 mx-auto mb-8" />

          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:border-red-400 hover:text-red-400 bg-transparent"
          >
            Logout
          </Button>
        </div>

        {/* Dashboard Cards */}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* Films Management */}
          <Card className="bg-black/60 border-amber-500/20 backdrop-blur-md hover:border-amber-500/40 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
            <CardHeader className="text-center pb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-4 mx-auto group-hover:bg-blue-500/20 transition-colors">
                <Film className="w-8 h-8 text-blue-400" />
              </div>
              <CardTitle className="text-2xl text-white mb-2">Manage Films</CardTitle>
              <p className="text-gray-400">Add, edit, and manage your filmography</p>
            </CardHeader>

            <CardContent className="text-center">
              <Button
                onClick={navigateToFilms}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 transition-all duration-300"
              >
                <Film className="mr-2 h-5 w-5" />
                Add Films
              </Button>

              <div className="mt-4 text-sm text-gray-500">
                <p>• Upload film posters</p>
                <p>• Add trailers & details</p>
                <p>• Manage awards & status</p>
              </div>
            </CardContent>
          </Card>


          {/* Aesthetics Management */}
<Card className="bg-black/60 border-amber-500/20 backdrop-blur-md hover:border-amber-500/40 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
  <CardHeader className="text-center pb-6">
    <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-500/10 rounded-full mb-4 mx-auto group-hover:bg-pink-500/20 transition-colors">
      <ImageIcon className="w-8 h-8 text-pink-400" />
    </div>
    <CardTitle className="text-2xl text-white mb-2">Manage Photos</CardTitle>
    <p className="text-gray-400">Upload and organize your photo library</p>
  </CardHeader>

  <CardContent className="text-center">
    <Button
      onClick={() => router.push("/add-aesthetics")}
      className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 transition-all duration-300"
    >
      <ImageIcon className="mr-2 h-5 w-5" />
      Add Photos
    </Button>

    <div className="mt-4 text-sm text-gray-500">
      <p>• Upload multiple photos</p>
      <p>• Organize them into folders</p>
      <p>• Manage or delete items</p>
    </div>
  </CardContent>
</Card>





          {/* Reels Management */}
          <Card className="bg-black/60 border-amber-500/20 backdrop-blur-md hover:border-amber-500/40 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
            <CardHeader className="text-center pb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-full mb-4 mx-auto group-hover:bg-purple-500/20 transition-colors">
                <Video className="w-8 h-8 text-purple-400" />
              </div>
              <CardTitle className="text-2xl text-white mb-2">Manage Reels</CardTitle>
              <p className="text-gray-400">Create and organize your portfolio reels</p>
            </CardHeader>

            <CardContent className="text-center">
              <Button
                onClick={navigateToReels}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 transition-all duration-300"
              >
                <Video className="mr-2 h-5 w-5" />
                Add Reels
              </Button>

              <div className="mt-4 text-sm text-gray-500">
                <p>• Upload reel thumbnails</p>
                <p>• Add YouTube videos</p>
                <p>• Categorize & feature</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-8 bg-black/40 rounded-full px-8 py-4 backdrop-blur-md border border-amber-500/20">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">∞</div>
              <div className="text-sm text-gray-400">Creative Vision</div>
            </div>
            <div className="w-px h-8 bg-gray-600" />
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">24/7</div>
              <div className="text-sm text-gray-400">Inspiration</div>
            </div>
            <div className="w-px h-8 bg-gray-600" />
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">100%</div>
              <div className="text-sm text-gray-400">Cinematic</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { Film, Video, User, Lock, Eye, EyeOff, Camera } from 'lucide-react'
// import { useToast } from "@/hooks/use-toast"

// export default function AdminPage() {
//   const router = useRouter()
//   const { toast } = useToast()

//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [credentials, setCredentials] = useState({
//     username: "",
//     password: "",
//   })

//   // Check if already authenticated
//   useEffect(() => {
//     const adminAuth = localStorage.getItem("admin_authenticated")
//     if (adminAuth === "true") {
//       setIsAuthenticated(true)
//     }
//   }, [])

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     // Simulate loading for better UX
//     await new Promise((resolve) => setTimeout(resolve, 1000))

//     if (credentials.username === "abdulrehman" && credentials.password === "abdulrehman") {
//       localStorage.setItem("admin_authenticated", "true")
//       setIsAuthenticated(true)
//       toast({
//         title: "Welcome Back!",
//         description: "Successfully logged into admin dashboard",
//       })
//     } else {
//       toast({
//         title: "Access Denied",
//         description: "Invalid credentials. Please try again.",
//         variant: "destructive",
//       })
//     }

//     setIsLoading(false)
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("admin_authenticated")
//     setIsAuthenticated(false)
//     setCredentials({ username: "", password: "" })
//     toast({
//       title: "Logged Out",
//       description: "You have been logged out successfully",
//     })
//   }

//   const navigateToFilms = () => {
//     router.push("/add-films")
//   }

//   const navigateToReels = () => {
//     router.push("/add-reels")
//   }

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
//         <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5" />

//         <div className="relative z-10 w-full max-w-md px-4">
//           <Card className="bg-black/80 border-amber-500/30 backdrop-blur-xl shadow-2xl">
//             <CardHeader className="text-center pb-8">
//               <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500/10 rounded-full mb-6 mx-auto">
//                 <User className="w-10 h-10 text-amber-400" />
//               </div>
//               <CardTitle className="text-3xl font-bold text-white mb-2">Admin Access</CardTitle>
//               <p className="text-gray-400">Enter your credentials to continue</p>
//               <div className="w-16 h-1 bg-amber-400 mx-auto mt-4" />
//             </CardHeader>

//             <CardContent>
//               <form onSubmit={handleLogin} className="space-y-6">
//                 <div>
//                   <Label className="block text-sm font-medium text-gray-300 mb-2">Username</Label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                     <Input
//                       type="text"
//                       value={credentials.username}
//                       onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
//                       className="bg-gray-800/50 border-gray-600 text-white pl-10 focus:border-amber-400 focus:ring-amber-400"
//                       placeholder="Enter username"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <Label className="block text-sm font-medium text-gray-300 mb-2">Password</Label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                     <Input
//                       type={showPassword ? "text" : "password"}
//                       value={credentials.password}
//                       onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//                       className="bg-gray-800/50 border-gray-600 text-white pl-10 pr-10 focus:border-amber-400 focus:ring-amber-400"
//                       placeholder="Enter password"
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400 transition-colors"
//                     >
//                       {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                     </button>
//                   </div>
//                 </div>

//                 <Button
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 transition-all duration-300 transform hover:scale-105"
//                 >
//                   {isLoading ? "Authenticating..." : "Access Dashboard"}
//                 </Button>
//               </form>

//               <div className="mt-6 text-center">
//                 <p className="text-xs text-gray-500">Authorized personnel only</p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-20">
//       <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5" />

//       <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500/10 rounded-full mb-6">
//             <User className="w-10 h-10 text-amber-400" />
//           </div>
//           <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Admin Dashboard</h1>
//           <p className="text-xl text-gray-400 mb-6">Manage your cinematic portfolio</p>
//           <div className="w-20 h-1 bg-amber-400 mx-auto mb-8" />

//           <Button
//             onClick={handleLogout}
//             variant="outline"
//             className="border-gray-600 text-gray-300 hover:border-red-400 hover:text-red-400 bg-transparent"
//           >
//             Logout
//           </Button>
//         </div>

//         {/* Dashboard Cards */}
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">

//           {/* Films Management */}
//           <Card className="bg-black/60 border-amber-500/20 backdrop-blur-md hover:border-amber-500/40 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
//             <CardHeader className="text-center pb-6">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-4 mx-auto group-hover:bg-blue-500/20 transition-colors">
//                 <Film className="w-8 h-8 text-blue-400" />
//               </div>
//               <CardTitle className="text-2xl text-white mb-2">Manage Films</CardTitle>
//               <p className="text-gray-400">Add, edit, and manage your filmography</p>
//             </CardHeader>

//             <CardContent className="text-center">
//               <Button
//                 onClick={navigateToFilms}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 transition-all duration-300"
//               >
//                 <Film className="mr-2 h-5 w-5" />
//                 Add Films
//               </Button>

//               <div className="mt-4 text-sm text-gray-500">
//                 <p>• Upload film posters</p>
//                 <p>• Add trailers & details</p>
//                 <p>• Manage awards & status</p>
//               </div>
//             </CardContent>
//           </Card>


//           {/* Photos Management */}
// <Card className="bg-black/60 border-amber-500/20 backdrop-blur-md hover:border-amber-500/40 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
//   <CardHeader className="text-center pb-6">
//     <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-500/10 rounded-full mb-4 mx-auto group-hover:bg-pink-500/20 transition-colors">
//       <Camera className="w-8 h-8 text-pink-400" />
//     </div>
//     <CardTitle className="text-2xl text-white mb-2">Add Photos</CardTitle>
//     <p className="text-gray-400">Upload and organize aesthetic visuals</p>
//   </CardHeader>

//   <CardContent className="text-center">
//     <Button
//       onClick={() => router.push("/add-aesthetics")}
//       className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-3 transition-all duration-300"
//     >
//       <Camera className="mr-2 h-5 w-5" />
//       Add Photos
//     </Button>

//     <div className="mt-4 text-sm text-gray-500">
//       <p>• Upload multiple images</p>
//       <p>• Categorize them</p>
//       <p>• Manage or delete items</p>
//     </div>
//   </CardContent>
// </Card>

//           {/* Reels Management */}
//           <Card className="bg-black/60 border-amber-500/20 backdrop-blur-md hover:border-amber-500/40 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
//             <CardHeader className="text-center pb-6">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-full mb-4 mx-auto group-hover:bg-purple-500/20 transition-colors">
//                 <Video className="w-8 h-8 text-purple-400" />
//               </div>
//               <CardTitle className="text-2xl text-white mb-2">Manage Reels</CardTitle>
//               <p className="text-gray-400">Create and organize your portfolio reels</p>
//             </CardHeader>

//             <CardContent className="text-center">
//               <Button
//                 onClick={navigateToReels}
//                 className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 transition-all duration-300"
//               >
//                 <Video className="mr-2 h-5 w-5" />
//                 Add Reels
//               </Button>

//               <div className="mt-4 text-sm text-gray-500">
//                 <p>• Upload reel thumbnails</p>
//                 <p>• Add YouTube videos</p>
//                 <p>• Categorize & feature</p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Quick Stats */}
//         <div className="mt-12 text-center">
//           <div className="inline-flex items-center space-x-8 bg-black/40 rounded-full px-8 py-4 backdrop-blur-md border border-amber-500/20">
//             <div className="text-center">
//               <div className="text-2xl font-bold text-amber-400">∞</div>
//               <div className="text-sm text-gray-400">Creative Vision</div>
//             </div>
//             <div className="w-px h-8 bg-gray-600" />
//             <div className="text-center">
//               <div className="text-2xl font-bold text-amber-400">24/7</div>
//               <div className="text-sm text-gray-400">Inspiration</div>
//             </div>
//             <div className="w-px h-8 bg-gray-600" />
//             <div className="text-center">
//               <div className="text-2xl font-bold text-amber-400">100%</div>
//               <div className="text-sm text-gray-400">Cinematic</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { Film, Video, User, Lock, Eye, EyeOff } from "lucide-react"
// import { useToast } from "@/hooks/use-toast"

// export default function AdminPage() {
//   const router = useRouter()
//   const { toast } = useToast()

//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [credentials, setCredentials] = useState({
//     username: "",
//     password: "",
//   })

//   // Check if already authenticated
//   useEffect(() => {
//     const adminAuth = localStorage.getItem("admin_authenticated")
//     if (adminAuth === "true") {
//       setIsAuthenticated(true)
//     }
//   }, [])

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     // Simulate loading for better UX
//     await new Promise((resolve) => setTimeout(resolve, 1000))

//     if (credentials.username === "abdulrehman" && credentials.password === "abdulrehman") {
//       localStorage.setItem("admin_authenticated", "true")
//       setIsAuthenticated(true)
//       toast({
//         title: "Welcome Back!",
//         description: "Successfully logged into admin dashboard",
//       })
//     } else {
//       toast({
//         title: "Access Denied",
//         description: "Invalid credentials. Please try again.",
//         variant: "destructive",
//       })
//     }

//     setIsLoading(false)
//   }

//   const handleLogout = () => {
//     localStorage.removeItem("admin_authenticated")
//     setIsAuthenticated(false)
//     setCredentials({ username: "", password: "" })
//     toast({
//       title: "Logged Out",
//       description: "You have been logged out successfully",
//     })
//   }

//   const navigateToFilms = () => {
//     router.push("/add-films")
//   }

//   const navigateToReels = () => {
//     router.push("/add-reels")
//   }

//   if (!isAuthenticated) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
//         <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5" />

//         <div className="relative z-10 w-full max-w-md px-4">
//           <Card className="bg-black/80 border-amber-500/30 backdrop-blur-xl shadow-2xl">
//             <CardHeader className="text-center pb-8">
//               <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500/10 rounded-full mb-6 mx-auto">
//                 <User className="w-10 h-10 text-amber-400" />
//               </div>
//               <CardTitle className="text-3xl font-bold text-white mb-2">Admin Access</CardTitle>
//               <p className="text-gray-400">Enter your credentials to continue</p>
//               <div className="w-16 h-1 bg-amber-400 mx-auto mt-4" />
//             </CardHeader>

//             <CardContent>
//               <form onSubmit={handleLogin} className="space-y-6">
//                 <div>
//                   <Label className="block text-sm font-medium text-gray-300 mb-2">Username</Label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                     <Input
//                       type="text"
//                       value={credentials.username}
//                       onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
//                       className="bg-gray-800/50 border-gray-600 text-white pl-10 focus:border-amber-400 focus:ring-amber-400"
//                       placeholder="Enter username"
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <Label className="block text-sm font-medium text-gray-300 mb-2">Password</Label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//                     <Input
//                       type={showPassword ? "text" : "password"}
//                       value={credentials.password}
//                       onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
//                       className="bg-gray-800/50 border-gray-600 text-white pl-10 pr-10 focus:border-amber-400 focus:ring-amber-400"
//                       placeholder="Enter password"
//                       required
//                     />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-amber-400 transition-colors"
//                     >
//                       {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
//                     </button>
//                   </div>
//                 </div>

//                 <Button
//                   type="submit"
//                   disabled={isLoading}
//                   className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 transition-all duration-300 transform hover:scale-105"
//                 >
//                   {isLoading ? "Authenticating..." : "Access Dashboard"}
//                 </Button>
//               </form>

//               <div className="mt-6 text-center">
//                 <p className="text-xs text-gray-500">Authorized personnel only</p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black pt-20">
//       <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-5" />

//       <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500/10 rounded-full mb-6">
//             <User className="w-10 h-10 text-amber-400" />
//           </div>
//           <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Admin Dashboard</h1>
//           <p className="text-xl text-gray-400 mb-6">Manage your cinematic portfolio</p>
//           <div className="w-20 h-1 bg-amber-400 mx-auto mb-8" />

//           <Button
//             onClick={handleLogout}
//             variant="outline"
//             className="border-gray-600 text-gray-300 hover:border-red-400 hover:text-red-400 bg-transparent"
//           >
//             Logout
//           </Button>
//         </div>

//         {/* Dashboard Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">


//           {/* Films Management */}
//           <Card className="bg-black/60 border-amber-500/20 backdrop-blur-md hover:border-amber-500/40 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
//             <CardHeader className="text-center pb-6">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-4 mx-auto group-hover:bg-blue-500/20 transition-colors">
//                 <Film className="w-8 h-8 text-blue-400" />
//               </div>
//               <CardTitle className="text-2xl text-white mb-2">Manage Films</CardTitle>
//               <p className="text-gray-400">Add, edit, and manage your filmography</p>
//             </CardHeader>

//             <CardContent className="text-center">
//               <Button
//                 onClick={navigateToFilms}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 transition-all duration-300"
//               >
//                 <Film className="mr-2 h-5 w-5" />
//                 Add Films
//               </Button>

//               <div className="mt-4 text-sm text-gray-500">
//                 <p>• Upload film posters</p>
//                 <p>• Add trailers & details</p>
//                 <p>• Manage awards & status</p>
//               </div>
//             </CardContent>
//           </Card>





//           {/* Reels Management */}
//           <Card className="bg-black/60 border-amber-500/20 backdrop-blur-md hover:border-amber-500/40 transition-all duration-300 transform hover:scale-105 cursor-pointer group">
//             <CardHeader className="text-center pb-6">
//               <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 rounded-full mb-4 mx-auto group-hover:bg-purple-500/20 transition-colors">
//                 <Video className="w-8 h-8 text-purple-400" />
//               </div>
//               <CardTitle className="text-2xl text-white mb-2">Manage Reels</CardTitle>
//               <p className="text-gray-400">Create and organize your portfolio reels</p>
//             </CardHeader>

//             <CardContent className="text-center">
//               <Button
//                 onClick={navigateToReels}
//                 className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 transition-all duration-300"
//               >
//                 <Video className="mr-2 h-5 w-5" />
//                 Add Reels
//               </Button>

//               <div className="mt-4 text-sm text-gray-500">
//                 <p>• Upload reel thumbnails</p>
//                 <p>• Add YouTube videos</p>
//                 <p>• Categorize & feature</p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Quick Stats */}
//         <div className="mt-12 text-center">
//           <div className="inline-flex items-center space-x-8 bg-black/40 rounded-full px-8 py-4 backdrop-blur-md border border-amber-500/20">
//             <div className="text-center">
//               <div className="text-2xl font-bold text-amber-400">∞</div>
//               <div className="text-sm text-gray-400">Creative Vision</div>
//             </div>
//             <div className="w-px h-8 bg-gray-600" />
//             <div className="text-center">
//               <div className="text-2xl font-bold text-amber-400">24/7</div>
//               <div className="text-sm text-gray-400">Inspiration</div>
//             </div>
//             <div className="w-px h-8 bg-gray-600" />
//             <div className="text-center">
//               <div className="text-2xl font-bold text-amber-400">100%</div>
//               <div className="text-sm text-gray-400">Cinematic</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
