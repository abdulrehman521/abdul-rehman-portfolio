import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from 'lucide-react'
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/placeholder-video.mp4" type="video/mp4" />
        </video>
        {/* Fallback background image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('Portfolio_Pictures/Aesthetics/IMG_9891-2-2.jpg')"
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
            Abdul Rehman
          </h1>
          <div className="text-xl md:text-2xl lg:text-3xl text-amber-400 mb-8 font-light tracking-wide">
            Creative Storyteller | Video Editor | Videographer 
          </div>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Impactful storytelling through high-end post-production and narrative-driven visual content
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              asChild
              size="lg" 
              className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-4 text-lg group transition-all duration-300"
            >
              <Link href="/filmography">
                View My Work
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
  asChild
  variant="outline" 
  size="lg"
  className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg group transition-all duration-300"
>
  <a href="/about">
    <Play className="mr-2 h-5 w-5" />
    View Resume
  </a>
</Button>

          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
