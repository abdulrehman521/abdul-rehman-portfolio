// "use client"

// import { useState } from "react"
// import Image from "next/image"
// import { Button } from "@/components/ui/button"

// const photographyCategories = ["All", "Fashion", "Product", "Landscape", "Portrait"]

// const photographyItems = [
//   {
//     id: 1,
//     title: "Enza Home Product Photography",
//     category: "Product",
//     image: "/elegant-home-fashion.png",
//     description: "Product photography campaign focusing on capturing elegance, comfort, and craftsmanship of furniture collections with controlled studio lighting."
//   },
//   {
//     id: 2,
//     title: "LUMS University Lahore Landscapes",
//     category: "Landscape",
//     image: "/university-golden-hour.png",
//     description: "Architectural campaign exploring the campus's timeless structures, serene courtyards, and thoughtful design reflecting academic excellence."
//   },
//   {
//     id: 3,
//     title: "Gymkhana Club Cigar Lounge",
//     category: "Product",
//     image: "/placeholder.svg?height=600&width=400",
//     description: "Premium visual campaign reflecting the space's refined ambiance, exclusivity, and timeless charm with controlled lighting and warm color palettes."
//   },
//   {
//     id: 4,
//     title: "Usman Ki Baithak Campaign",
//     category: "Portrait",
//     image: "/placeholder.svg?height=600&width=400",
//     description: "Culturally rich visual campaign from Old Lahore, capturing traditional baithak culture with natural lighting and ambient details."
//   },
//   {
//     id: 5,
//     title: "Fashion Campaign Direction",
//     category: "Fashion",
//     image: "/elegant-model-studio.png",
//     description: "High-end fashion campaigns combining artistic direction, lighting mastery, and editorial sensibility presenting fashion as visual art."
//   },
//   {
//     id: 6,
//     title: "Sony Workshop Photography",
//     category: "Product",
//     image: "/placeholder.svg?height=600&width=400",
//     description: "Professional workshop documentation showcasing Sony's latest cameras in live studio environments with styled models and creative setups."
//   }
// ]

// export default function PhotographyPage() {
//   const [selectedCategory, setSelectedCategory] = useState("All")
//   const [selectedImage, setSelectedImage] = useState<typeof photographyItems[0] | null>(null)

//   const filteredItems = selectedCategory === "All" 
//     ? photographyItems 
//     : photographyItems.filter(item => item.category === selectedCategory)

//   return (
//     <div className="pt-20">
//       {/* Hero Section */}
//       <section className="py-20 px-4">
//         <div className="max-w-7xl mx-auto text-center">
//           <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
//             Photography
//           </h1>
//           <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
//             Capturing moments, emotions, and stories through the lens. 
//             From fashion campaigns to architectural landscapes.
//           </p>
//           <div className="w-20 h-1 bg-amber-400 mx-auto" />
//         </div>
//       </section>

//       {/* Category Filter */}
//       <section className="pb-12 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="flex flex-wrap justify-center gap-4">
//             {photographyCategories.map((category) => (
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

//       {/* Photography Grid */}
//       <section className="pb-20 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
//             {filteredItems.map((item) => (
//               <div 
//                 key={item.id}
//                 className="break-inside-avoid group cursor-pointer"
//                 onClick={() => setSelectedImage(item)}
//               >
//                 <div className="relative overflow-hidden rounded-xl bg-gray-900">
//                   <Image
//                     src={item.image || "/placeholder.svg"}
//                     alt={item.title}
//                     width={400}
//                     height={600}
//                     className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
//                   />
//                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
//                     <div className="p-6 text-white">
//                       <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
//                       <p className="text-sm text-gray-300">{item.category}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Lightbox Modal */}
//       {selectedImage && (
//         <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
//           <div className="relative max-w-5xl max-h-[90vh] w-full">
//             <button
//               onClick={() => setSelectedImage(null)}
//               className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
//             >
//               ✕
//             </button>
            
//             <div className="flex flex-col lg:flex-row bg-gray-900 rounded-xl overflow-hidden">
//               <div className="lg:flex-1">
//                 <Image
//                   src={selectedImage.image || "/placeholder.svg"}
//                   alt={selectedImage.title}
//                   width={800}
//                   height={1200}
//                   className="w-full h-auto object-cover"
//                 />
//               </div>
              
//               <div className="lg:w-80 p-8 flex flex-col justify-center">
//                 <div className="mb-4">
//                   <span className="text-amber-400 text-sm font-medium">{selectedImage.category}</span>
//                 </div>
//                 <h2 className="text-2xl font-bold text-white mb-4">
//                   {selectedImage.title}
//                 </h2>
//                 <p className="text-gray-300 leading-relaxed">
//                   {selectedImage.description}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }


import fs from "fs";
import path from "path";
import PhotographyClient from "./PhotographyClient";

const categories = ["Aesthetics", "Corporate", "Fashion", "Product", "Sports", "wedding"];

// Recursive function to get all images from a folder
function getImagesFromFolder(folderPath: string, folderURL: string): string[] {
  let images: string[] = [];
  const entries = fs.readdirSync(folderPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(folderPath, entry.name);
    const publicURL = `${folderURL}/${entry.name}`;

    if (entry.isDirectory()) {
      images = images.concat(getImagesFromFolder(fullPath, publicURL));
    } else if (/\.(jpg|jpeg|png|webp|gif)$/i.test(entry.name)) {
      images.push(publicURL);
    }
  }
  return images;
}

export default function PhotographyPage() {
  const baseFolder = path.join(process.cwd(), "public", "Portfolio_Pictures");
  const imagesByCategory: Record<string, string[]> = {};

  categories.forEach(category => {
    const categoryPath = path.join(baseFolder, category);
    if (fs.existsSync(categoryPath)) {
      imagesByCategory[category] = getImagesFromFolder(
        categoryPath,
        `/Portfolio_Pictures/${category}`
      );
    } else {
      imagesByCategory[category] = [];
    }
  });

  return (
    <PhotographyClient
      categories={categories}
      imagesByCategory={imagesByCategory}
    />
  );
}
