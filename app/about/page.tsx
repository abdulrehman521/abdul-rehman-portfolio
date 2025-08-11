import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download, Award, Users, Eye, Camera } from 'lucide-react'

const skills = [
  { name: "Video Editing (DaVinci Resolve Studio)", level: 95 },
  { name: "Adobe Premiere Pro", level: 90 },
  { name: "Videography & Planning", level: 88 },
  { name: "Color Grading", level: 85 },
  { name: "Sound Design & Audio Mixing", level: 80 },
  { name: "Motion Graphics", level: 75 },
]

const achievements = [
  { icon: Camera, number: "1000+", label: "Fiverr Projects Completed" },
  { icon: Eye, number: "1M+", label: "Combined Social Impressions" },
  { icon: Award, number: "5+", label: "Years Experience" },
  { icon: Users, number: "150+", label: "Total Projects Directed" },
]

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-amber-400/20 to-transparent p-1">
                <Image
                  src="/ProfilePic.jpg"
                  alt="Abdul Rehman"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>

            {/* Bio Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                  About Me
                </h1>
                <div className="w-20 h-1 bg-amber-400 mb-6" />
              </div>

              <p className="text-lg text-gray-300 leading-relaxed">
                Creative and detail-oriented Video Editor & Videographer with 5+ years' experience in 
                producing commercial ads, social media content, short films, and corporate video.
              </p>

              <p className="text-gray-400 leading-relaxed">
                Proficient in DaVinci Resolve Studio, Adobe Premiere Pro, Lightroom, color grading and 
                sound design. Passionate about impactful storytelling through high-end post-production 
                and narrative-driven visual content that drives results.
              </p>

              <div className="pt-4">
                  <a
                    href="/Abdul-Rehman-CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                  >
                    <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
                      <Download className="mr-2 h-4 w-4" />
                      Download CV
                    </Button>
                  </a>
                </div>

            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Core Skills
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Expertise across the complete video production pipeline
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skill) => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{skill.name}</span>
                  <span className="text-amber-400 font-semibold">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Achievements
            </h2>
            <p className="text-gray-400">
              Milestones that define my journey
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-500/10 rounded-full mb-4 group-hover:bg-amber-500/20 transition-colors">
                  <achievement.icon className="h-8 w-8 text-amber-400" />
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {achievement.number}
                </div>
                <div className="text-gray-400 text-sm">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Certifications & Training
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-amber-400/50 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-2">University of Creative Arts London</h3>
              <p className="text-gray-400">TMUC-The Millennium Universal College</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-amber-400/50 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-2">Adobe Certified Professional</h3>
              <p className="text-gray-400">Premiere Pro & Lightroom</p>
            </div>
            
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-amber-400/50 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-2">Sony Workshops</h3>
              <p className="text-gray-400">Conducted 2 Professional Workshops</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
