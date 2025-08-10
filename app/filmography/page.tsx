// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"
// import { Play, Calendar, Clock, Award } from "lucide-react"


// const films = [
//   {
//     id: 1,
//     title: "1947 - The Hidden Stories",
//     year: "2022-2023",
//     duration: "Short Film",
//     genre: "Documentary",
//     role: "Director, Editor, Producer",
//     description: "A short documentary uncovering untold stories of Pakistan's birth.",
//     poster: "/Posters/1947-partition-documentary.png",
//     awards: [],
//     status: "Completed",
//     trailerUrl: "https://www.youtube.com/embed/F3hheOqpTgU",
//     filmUrl: "https://www.youtube.com/embed/HKXAiMSualg"
//   },
//   {
//     id: 2,
//     title: "Multiple Short Films Collection",
//     year: "2019-2024",
//     duration: "Various",
//     genre: "Drama/Psychological",
//     role: "Director, Writer, Producer",
//     description: "A collection of original short films spanning genres and themes.",
//     poster: "/Posters/319191c1-4182-4b62-80ed-85dde6863824.JPG",
//     awards: [],
//     status: "Completed",
//     trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//     filmUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
//   },
//   {
//     id: 3,
//     title: "Aangan",
//     year: "2025",
//     duration: "Commercial",
//     genre: "Advertisement",
//     role: "Director, Creative Director",
//     description: "Ad campaign highlighting elegance, innovation, and performance.",
//     poster: "/Posters/Thesis.png",
//     awards: [],
//     status: "Completed",
//     trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//     filmUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
//   },
//   {
//     id: 4,
//     title: "Fashion Campaign Series",
//     year: "2022-2024",
//     duration: "Campaign Series",
//     genre: "Fashion/Commercial",
//     role: "Director, Creative Director",
//     description: "High-end fashion campaigns with elegance and editorial sensibility.",
//     poster: "/Posters/Dance_Film.jpg",
//     awards: [],
//     status: "Completed",
//     trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//     filmUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
//   },
//   {
//     id: 5,
//     title: "Product Launch Promos",
//     year: "2020-2024",
//     duration: "Various",
//     genre: "Commercial",
//     role: "Director, Editor, Motion Graphics",
//     description: "Multiple e-commerce product shoots and motion graphics delivery.",
//     poster: "/Posters/Legacy.jpg",
//     awards: [],
//     status: "Completed",
//     trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//     filmUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
//   },
//   // Additional placeholder films (6-10)
//   ...Array.from({ length: 5 }, (_, i) => ({
//     id: i + 6,
//     title: `Sample Film ${i + 6}`,
//     year: "2021",
//     duration: "Feature",
//     genre: "Drama",
//     role: "Director",
//     description: "Sample description for placeholder film.",
//     poster: `/posters/sample-${i + 6}.png`,
//     awards: [],
//     status: "Completed",
//     trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
//     filmUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
//   }))
// ]

// export default function FilmographyPage() {
//   const [modalUrl, setModalUrl] = useState<string | null>(null)
//   const [showComingSoon, setShowComingSoon] = useState(false)


//   return (
//     <div className="pt-20">
//       {/* Hero Section */}
//       <section className="py-20 px-4 text-center">
//         <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Filmography</h1>
//         <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
//           A collection of my directorial works from short films to documentaries.
//         </p>
//         <div className="w-20 h-1 bg-amber-400 mx-auto" />
//       </section>

//       {showComingSoon && (
//   <div
//     className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
//     onClick={() => setShowComingSoon(false)}
//   >
//     <div
//   className="relative bg-gradient-to-br from-amber-400/10 to-transparent border border-amber-400/20 p-10 rounded-xl text-center max-w-md mx-auto shadow-lg animate-[fadeInScale_0.3s_ease-out]"
//   onClick={(e) => e.stopPropagation()}
// >
//       <h2 className="text-3xl font-bold text-amber-400 mb-4">
//         Coming Soon
//       </h2>
//       <p className="text-gray-300 mb-6">
//         Behind the Scenes content is in the works. Stay tuned for exclusive looks!
//       </p>
//       <Button
//         className="bg-amber-500 hover:bg-amber-600 text-black"
//         onClick={() => setShowComingSoon(false)}
//       >
//         Close
//       </Button>
//     </div>
//   </div>
// )}

//       {/* Films Grid */}
//       <section className="pb-20 px-4">
//         <div className="max-w-7xl mx-auto space-y-16">
//           {films.map((film, index) => (
//             <div
//               key={film.id}
//               className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
//                 index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
//               }`}
//             >
//               {/* Film Poster */}
//               <div className={`relative group ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
//                 <div className="aspect-[2/3] relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-400/10 to-transparent p-1">
//                   <Image
//                     src={film.poster || "/placeholder.svg"}
//                     alt={`${film.title} poster`}
//                     fill
//                     className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
//                     <Button
//                       className="bg-amber-500 hover:bg-amber-600 text-black"
//                       onClick={() => setModalUrl(film.trailerUrl)}
//                     >
//                       <Play className="mr-2 h-5 w-5" />
//                       Watch Trailer
//                     </Button>
//                   </div>
//                 </div>
//               </div>

//               {/* Film Details */}
//               <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
//                 <h2 className="text-3xl md:text-4xl font-bold text-white">{film.title}</h2>
//                 <div className="flex flex-wrap gap-4 text-gray-400">
//                   <span className="flex items-center">
//                     <Calendar className="h-4 w-4 mr-1" />
//                     {film.year}
//                   </span>
//                   <span className="flex items-center">
//                     <Clock className="h-4 w-4 mr-1" />
//                     {film.duration}
//                   </span>
//                   <span className="text-amber-400 font-medium">{film.genre}</span>
//                 </div>
//                 <p className="text-gray-500">Role: {film.role}</p>
//                 <p className="text-gray-300 leading-relaxed text-lg">{film.description}</p>

//                 {film.awards.length > 0 && (
//                   <div>
//                     <h3 className="text-lg font-semibold text-white flex items-center">
//                       <Award className="h-5 w-5 mr-2 text-amber-400" />
//                       Awards & Recognition
//                     </h3>
//                     <ul className="space-y-2">
//                       {film.awards.map((award, awardIndex) => (
//                         <li key={awardIndex} className="text-amber-400 flex items-start">
//                           <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0" />
//                           {award}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}

//                 <div className="flex gap-4">
//                   <Button
//                     className="bg-amber-500 hover:bg-amber-600 text-black"
//                     onClick={() => setModalUrl(film.filmUrl)}
//                   >
//                     <Play className="mr-2 h-4 w-4" />
//                     Watch Film
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="border-gray-600 text-gray-300 hover:border-amber-400 hover:text-amber-400"
//                     onClick={() => setShowComingSoon(true)}
//                   >
//                     Behind the Scenes
//                   </Button>

//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Video Modal */}
//       {modalUrl && (
//         <div
//           className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
//           onClick={() => setModalUrl(null)}
//         >
//           <div
//             className="relative w-full max-w-5xl aspect-video"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <iframe
//               className="w-full h-full rounded-lg"
//               src={modalUrl}
//               title="YouTube video"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             />
//             <button
//               onClick={() => setModalUrl(null)}
//               className="absolute -top-10 right-0 text-white text-3xl"
//             >
//               ✕
//             </button>
//           </div>
//         </div>
//       )}

//hfdjf
//     </div>
//   )
// }




"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Calendar, Clock, Award } from "lucide-react"
import { supabase, type Film } from "@/lib/supabase"

export default function FilmographyPage() {
  const [modalUrl, setModalUrl] = useState<string | null>(null)
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [films, setFilms] = useState<Film[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchFilms()
  }, [])

  const fetchFilms = async () => {
    try {
      const { data, error } = await supabase.from("films").select("*").order("created_at", { ascending: false })

      if (error) throw error
      setFilms(data || [])
    } catch (error) {
      console.error("Error fetching films:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="pt-20 min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading films...</div>
      </div>
    )
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Filmography</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
          A collection of my directorial works from short films to documentaries.
        </p>
        <div className="w-20 h-1 bg-amber-400 mx-auto" />
      </section>

      {showComingSoon && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowComingSoon(false)}
        >
          <div
            className="relative bg-gradient-to-br from-amber-400/10 to-transparent border border-amber-400/20 p-10 rounded-xl text-center max-w-md mx-auto shadow-lg animate-[fadeInScale_0.3s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold text-amber-400 mb-4">Coming Soon</h2>
            <p className="text-gray-300 mb-6">
              Behind the Scenes content is in the works. Stay tuned for exclusive looks!
            </p>
            <Button className="bg-amber-500 hover:bg-amber-600 text-black" onClick={() => setShowComingSoon(false)}>
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Films Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto space-y-16">
          {films.map((film, index) => (
            <div
              key={film.id}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:grid-flow-col-dense" : ""
              }`}
            >
              {/* Film Poster */}
              <div className={`relative group ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                <div className="aspect-[2/3] relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-400/10 to-transparent p-1">
                  <Image
                    src={film.poster || "/placeholder.svg"}
                    alt={`${film.title} poster`}
                    fill
                    className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                    <Button
                      className="bg-amber-500 hover:bg-amber-600 text-black"
                      onClick={() => setModalUrl(film.trailer_url)}
                    >
                      <Play className="mr-2 h-5 w-5" />
                      Watch Trailer
                    </Button>
                  </div>
                </div>
              </div>

              {/* Film Details */}
              <div className={`space-y-6 ${index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}`}>
                <h2 className="text-3xl md:text-4xl font-bold text-white">{film.title}</h2>
                <div className="flex flex-wrap gap-4 text-gray-400">
                  <span className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {film.year}
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {film.duration}
                  </span>
                  <span className="text-amber-400 font-medium">{film.genre}</span>
                </div>
                <p className="text-gray-500">Role: {film.role}</p>
                <p className="text-gray-300 leading-relaxed text-lg">{film.description}</p>

                {film.awards && film.awards.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <Award className="h-5 w-5 mr-2 text-amber-400" />
                      Awards & Recognition
                    </h3>
                    <ul className="space-y-2">
                      {film.awards.map((award, awardIndex) => (
                        <li key={awardIndex} className="text-amber-400 flex items-start">
                          <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                          {award}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button
                    className="bg-amber-500 hover:bg-amber-600 text-black"
                    onClick={() => setModalUrl(film.film_url)}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Watch Film
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:border-amber-400 hover:text-amber-400 bg-transparent"
                    onClick={() => setShowComingSoon(true)}
                  >
                    Behind the Scenes
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Modal */}
      {modalUrl && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setModalUrl(null)}
        >
          <div className="relative w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe
              className="w-full h-full rounded-lg"
              src={modalUrl}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button onClick={() => setModalUrl(null)} className="absolute -top-10 right-0 text-white text-3xl">
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
