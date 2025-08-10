// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Play, ExternalLink, Calendar, Award } from 'lucide-react'

// const portfolioItems = [
//   {
//     id: 1,
//     title: "1947 - Short Documentary",
//     category: "Documentary",
//     year: "2024",
//     description: "A short documentary uncovering the untold and hidden stories of Pakistan's birth—an intimate exploration of history through forgotten voices and personal narratives.",
//     thumbnail: "/1947-partition-documentary.png",
//     videoUrl: "#",
//     awards: [],
//     featured: true
//   },
//   {
//     id: 2,
//     title: "Hyundai Sonata Ad Campaign",
//     category: "Commercial",
//     year: "2023",
//     description: "Ad campaign highlighting the car's fusion of elegance, innovation, and performance. Cinematic storytelling with commercial appeal, positioning the vehicle as a lifestyle statement.",
//     thumbnail: "/luxury-sonata-commercial.png",
//     videoUrl: "#",
//     awards: [],
//     featured: true
//   },
//   {
//     id: 3,
//     title: "Multiple Short Films Collection",
//     category: "Short Film",
//     year: "2019-2024",
//     description: "A collection of original short films spanning genres and themes, exploring identity, silence, resilience, and human vulnerability through psychological drama and socially grounded realism.",
//     thumbnail: "/psychological-drama-scene.png",
//     videoUrl: "#",
//     awards: [],
//     featured: true
//   },
//   {
//     id: 4,
//     title: "Product Launch Promo",
//     category: "Commercial",
//     year: "2023",
//     description: "Multiple e-commerce product shoots—scripted, shot, color graded, and motion-graphics delivered for various brands and products.",
//     thumbnail: "/product-launch-promo-motion-graphics.png",
//     videoUrl: "#",
//     awards: [],
//     featured: false
//   },
//   {
//     id: 5,
//     title: "Fashion Campaigns",
//     category: "Fashion",
//     year: "2022-2024",
//     description: "High-end fashion campaigns emphasizing elegance, attitude, and form. Combining artistic direction, lighting mastery, and editorial sensibility.",
//     thumbnail: "/elegant-home-fashion.png",
//     videoUrl: "#",
//     awards: [],
//     featured: false
//   },
//   {
//     id: 6,
//     title: "Football Clubs Media Direction",
//     category: "Sports",
//     year: "2020-2024",
//     description: "Media direction for leading football clubs and tournaments across Lahore and Islamabad, including LST, Smurfs, Football Factory, Bulls, Pakistan Football League, Griffin, Bigmen, and Team 18.",
//     thumbnail: "/experimental-art-film-abstract.png",
//     videoUrl: "#",
//     awards: [],
//     featured: false
//   }
// ]

// const categories = ["All", "Documentary", "Commercial", "Fashion", "Short Film", "Experimental", "Sports"]

// export default function PortfolioPage() {
//   const [selectedCategory, setSelectedCategory] = useState("All")
//   const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null)

//   const filteredItems = selectedCategory === "All" 
//     ? portfolioItems 
//     : portfolioItems.filter(item => item.category === selectedCategory)

//   return (
//     <div className="pt-20">
//       {/* Hero Section */}
//       <section className="py-20 px-4">
//         <div className="max-w-7xl mx-auto text-center">
//           <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
//             Portfolio
//           </h1>
//           <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
//             A collection of films, commercials, and creative projects that showcase 
//             my passion for visual storytelling
//           </p>
//           <div className="w-20 h-1 bg-amber-400 mx-auto" />
//         </div>
//       </section>

//       {/* Category Filter */}
//       <section className="pb-12 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-wrap justify-center gap-4">
//             {categories.map((category) => (
//               <Button
//                 key={category}
//                 variant={selectedCategory === category ? "default" : "outline"}
//                 onClick={() => setSelectedCategory(category)}
//                 className={selectedCategory === category 
//                   ? "bg-amber-500 hover:bg-amber-600 text-black" 
//                   : "border-gray-600 text-gray-300 hover:border-amber-400 hover:text-amber-400"
//                 }
//               >
//                 {category}
//               </Button>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Portfolio Grid */}
//       <section className="pb-20 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredItems.map((item) => (
//               <div 
//                 key={item.id}
//                 className="group relative bg-gray-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
//                 onClick={() => setSelectedItem(item)}
//               >
//                 <div className="aspect-video relative overflow-hidden">
//                   <Image
//                     src={item.thumbnail || "/placeholder.svg"}
//                     alt={item.title}
//                     fill
//                     className="object-cover group-hover:scale-110 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
//                     <Play className="h-12 w-12 text-white" />
//                   </div>
//                   {item.featured && (
//                     <div className="absolute top-4 left-4 bg-amber-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
//                       Featured
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="p-6">
//                   <div className="flex items-center justify-between mb-2">
//                     <span className="text-amber-400 text-sm font-medium">{item.category}</span>
//                     <span className="text-gray-500 text-sm">{item.year}</span>
//                   </div>
//                   <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
//                     {item.title}
//                   </h3>
//                   <p className="text-gray-400 text-sm line-clamp-2">
//                     {item.description}
//                   </p>
//                   {item.awards.length > 0 && (
//                     <div className="mt-3 flex items-center text-amber-400 text-sm">
//                       <Award className="h-4 w-4 mr-1" />
//                       {item.awards[0]}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Modal/Lightbox */}
//       {selectedItem && (
//         <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
//           <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="relative">
//               <button
//                 onClick={() => setSelectedItem(null)}
//                 className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
//               >
//                 ✕
//               </button>
              
//               <div className="aspect-video bg-black rounded-t-xl flex items-center justify-center">
//                 <div className="text-center">
//                   <Play className="h-16 w-16 text-amber-400 mx-auto mb-4" />
//                   <p className="text-white">Video Player Placeholder</p>
//                   <p className="text-gray-400 text-sm">Click to play showreel</p>
//                 </div>
//               </div>
              
//               <div className="p-8">
//                 <div className="flex items-center justify-between mb-4">
//                   <div>
//                     <h2 className="text-3xl font-bold text-white mb-2">{selectedItem.title}</h2>
//                     <div className="flex items-center gap-4 text-gray-400">
//                       <span className="flex items-center">
//                         <Calendar className="h-4 w-4 mr-1" />
//                         {selectedItem.year}
//                       </span>
//                       <span className="text-amber-400">{selectedItem.category}</span>
//                     </div>
//                   </div>
//                   <Button className="bg-amber-500 hover:bg-amber-600 text-black">
//                     <ExternalLink className="h-4 w-4 mr-2" />
//                     View on Behance
//                   </Button>
//                 </div>
                
//                 <p className="text-gray-300 mb-6 leading-relaxed">
//                   {selectedItem.description}
//                 </p>
                
//                 {selectedItem.awards.length > 0 && (
//                   <div className="border-t border-gray-700 pt-6">
//                     <h3 className="text-lg font-semibold text-white mb-3">Awards & Recognition</h3>
//                     <ul className="space-y-2">
//                       {selectedItem.awards.map((award, index) => (
//                         <li key={index} className="flex items-center text-amber-400">
//                           <Award className="h-4 w-4 mr-2" />
//                           {award}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Calendar, Award, Loader2 } from "lucide-react"
import { getReels } from "@/lib/reels"
import type { Reel } from "@/lib/supabase"

const categories = ["All", "Documentary", "Commercial", "Fashion", "Short Film", "Experimental", "Sports"]

// Function to convert youtu.be URLs to embed format
const convertToEmbedUrl = (url: string): string => {
  if (!url || url === "#") return "#"

  // Check if it's a youtu.be URL
  const youtuBeMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/)
  if (youtuBeMatch) {
    return `https://www.youtube.com/embed/${youtuBeMatch[1]}`
  }

  // Check if it's already a youtube.com URL
  const youtubeMatch = url.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/)
  if (youtubeMatch) {
    return `https://www.youtube.com/embed/${youtubeMatch[1]}`
  }

  // If it's already an embed URL, return as is
  if (url.includes("youtube.com/embed/")) {
    return url
  }

  return url
}

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedItem, setSelectedItem] = useState<Reel | null>(null)
  const [reels, setReels] = useState<Reel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load reels from database
  useEffect(() => {
    const loadReels = async () => {
      try {
        const reelsData = await getReels()
        setReels(reelsData)
      } catch (err) {
        console.error("Error loading reels:", err)
        setError("Failed to load reels. Please make sure the database is set up correctly.")
      } finally {
        setLoading(false)
      }
    }

    loadReels()
  }, [])

  const filteredItems = selectedCategory === "All" ? reels : reels.filter((item) => item.category === selectedCategory)

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-amber-400 mb-4" />
          <p className="text-white text-xl">Loading Reels...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-white mb-4">Database Error</h1>
          <p className="text-gray-400 mb-6">{error}</p>
          <p className="text-gray-500 text-sm">
            Run the database setup script:{" "}
            <code className="bg-gray-800 px-2 py-1 rounded">python scripts/setup_reels_table.py</code>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Reels</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            A collection of films, commercials, and creative projects that showcase my passion for visual storytelling
          </p>
          <div className="w-20 h-1 bg-amber-400 mx-auto" />
        </div>
      </section>

      {/* Category Filter */}
      <section className="pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-amber-500 hover:bg-amber-600 text-black"
                    : "border-gray-600 text-gray-300 hover:border-amber-400 hover:text-amber-400"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-600 text-6xl mb-4">🎬</div>
              <h2 className="text-2xl font-bold text-white mb-4">No Reels Found</h2>
              <p className="text-gray-400 mb-6">
                {selectedCategory === "All"
                  ? "No reels have been added yet."
                  : `No reels found in the ${selectedCategory} category.`}
              </p>
              <Button
                onClick={() => setSelectedCategory("All")}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:border-amber-400 hover:text-amber-400"
              >
                View All Categories
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-gray-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={item.thumbnail || "/placeholder.svg?height=400&width=600&query=video thumbnail"}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Play className="h-12 w-12 text-white" />
                    </div>
                    {item.featured && (
                      <div className="absolute top-4 left-4 bg-amber-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                        Featured
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-amber-400 text-sm font-medium">{item.category}</span>
                      <span className="text-gray-500 text-sm">{item.year}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
                    {item.awards && item.awards.length > 0 && (
                      <div className="mt-3 flex items-center text-amber-400 text-sm">
                        <Award className="h-4 w-4 mr-1" />
                        {item.awards[0]}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal/Lightbox */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              >
                ✕
              </button>

              {/* Video Player */}
              <div className="aspect-video bg-black rounded-t-xl">
                {selectedItem.video_url && selectedItem.video_url !== "#" ? (
                  <iframe
                    src={convertToEmbedUrl(selectedItem.video_url)}
                    title={selectedItem.title}
                    className="w-full h-full rounded-t-xl"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Play className="h-16 w-16 text-amber-400 mx-auto mb-4" />
                      <p className="text-white">Video Player Placeholder</p>
                      <p className="text-gray-400 text-sm">Click to play showreel</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-8">
                <div className="mb-4">
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedItem.title}</h2>
                  <div className="flex items-center gap-4 text-gray-400">
                    <span className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {selectedItem.year}
                    </span>
                    <span className="text-amber-400">{selectedItem.category}</span>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">{selectedItem.description}</p>

                {selectedItem.awards && selectedItem.awards.length > 0 && (
                  <div className="border-t border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Awards & Recognition</h3>
                    <ul className="space-y-2">
                      {selectedItem.awards.map((award, index) => (
                        <li key={index} className="flex items-center text-amber-400">
                          <Award className="h-4 w-4 mr-2" />
                          {award}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
