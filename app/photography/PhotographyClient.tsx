// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { Button } from "@/components/ui/button";

// type Props = {
//   categories: string[];
//   imagesByCategory: Record<string, string[]>;
// };

// export default function PhotographyClient({ categories, imagesByCategory }: Props) {
//   const [selectedCategory, setSelectedCategory] = useState(categories[0]);
//   const [page, setPage] = useState(1);

//   const itemsPerPage = 20;
//   const images = imagesByCategory[selectedCategory] || [];
//   const totalPages = Math.ceil(images.length / itemsPerPage);
//   const paginatedImages = images.slice((page - 1) * itemsPerPage, page * itemsPerPage);

//   return (
//     <div className="pt-20">
//       {/* Hero */}
//       <section className="py-20 px-4 text-center">
//         <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Photography</h1>
//         <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
//           Capturing moments, emotions, and stories through the lens.
//         </p>
//         <div className="w-20 h-1 bg-amber-400 mx-auto" />
//       </section>

//       {/* Categories */}
//       <section className="pb-12 px-4">
//         <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4">
//           {categories.map(category => (
//             <Button
//               key={category}
//               variant={selectedCategory === category ? "default" : "outline"}
//               onClick={() => { setSelectedCategory(category); setPage(1); }}
//               className={selectedCategory === category
//                 ? "bg-amber-500 hover:bg-amber-600 text-black"
//                 : "border-gray-600 text-gray-300 hover:border-amber-400 hover:text-amber-400"}
//             >
//               {category}
//             </Button>
//           ))}
//         </div>
//       </section>

//       {/* Images Grid */}
//       <section className="pb-20 px-4">
//         <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-4 gap-6">
//             {paginatedImages.map((src, idx) => (
//             <div key={idx} className="mb-6 break-inside-avoid">
//                 <Image
//                 src={src}
//                 alt={`Photo ${idx + 1}`}
//                 width={800}
//                 height={0} // height will be calculated automatically
//                 className="w-full h-auto object-contain rounded-xl bg-gray-900"
//                 />
//             </div>
//             ))}
//         </div>
//         </section>


//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center gap-2 pb-20">
//           <Button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
//             Prev
//           </Button>
//           <span className="text-white">{page} / {totalPages}</span>
//           <Button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
//             Next
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = {
  categories: string[];
  imagesByCategory: Record<string, string[]>;
};

export default function PhotographyClient({ categories, imagesByCategory }: Props) {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const itemsPerPage = 20;
  const images = imagesByCategory[selectedCategory] || [];
  const totalPages = Math.ceil(images.length / itemsPerPage);
  const paginatedImages = images.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Close modal on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Photography</h1>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
          Capturing moments, emotions, and stories through the lens.
        </p>
        <div className="w-20 h-1 bg-amber-400 mx-auto" />
      </section>

      {/* Categories */}
      <section className="pb-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => { setSelectedCategory(category); setPage(1); }}
              className={selectedCategory === category
                ? "bg-amber-500 hover:bg-amber-600 text-black"
                : "border-gray-600 text-gray-300 hover:border-amber-400 hover:text-amber-400"}
            >
              {category}
            </Button>
          ))}
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-4 gap-6">
          {paginatedImages.map((src, idx) => (
            <div
              key={idx}
              className="mb-6 break-inside-avoid cursor-pointer"
              onClick={() => setSelectedImage(src)}
            >
              <Image
                src={src}
                alt={`Photo ${idx + 1}`}
                width={800}
                height={0}
                className="w-full h-auto object-contain rounded-xl bg-gray-900 transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pb-20">
          <Button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
            Prev
          </Button>
          <span className="text-white">{page} / {totalPages}</span>
          <Button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
            Next
          </Button>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
                <div
        className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
        onClick={() => setSelectedImage(null)}
        >
        <div
            className="relative max-w-full max-h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
        >
            <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
            >
            ✕
            </button>
            <Image
            src={selectedImage}
            alt="Full size"
            width={1600}
            height={2400} // use a large height so Next calculates ratio
            className="max-w-full max-h-[90vh] w-auto h-auto object-contain"
            />
        </div>
        </div>

      )}
    </div>
  );
}
