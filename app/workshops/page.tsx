import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Award, Camera, Video, Palette } from 'lucide-react'

const workshops = [
  {
    id: 1,
    title: "Sony Professional Camera Workshops",
    date: "2023 - 2024",
    participants: "100+ Attendees",
    description: "Organized and conducted 2 hands-on Sony workshops showcasing Sony's latest line of professional cameras. Created immersive experiences with fully equipped sets, professional lighting, and styled models.",
    image: "/placeholder.svg?height=400&width=600",
    topics: ["Sony Camera Features", "Professional Lighting", "Live Studio Setup", "Real-time Shooting"],
    testimonials: [
      {
        name: "Photography Enthusiast",
        role: "Content Creator",
        quote: "Abdul's Sony workshop was incredibly hands-on and informative. The live studio setup made all the difference in understanding the equipment."
      }
    ]
  },
  {
    id: 2,
    title: "Cinematic Storytelling in Ads",
    date: "2023",
    participants: "50+ Students",
    description: "Workshop focused on cinematic storytelling techniques specifically for advertising and commercial content creation.",
    image: "/placeholder.svg?height=400&width=600",
    topics: ["Cinematic Techniques", "Ad Storytelling", "Commercial Production", "Brand Narratives"],
    testimonials: [
      {
        name: "Marketing Professional",
        role: "Brand Manager",
        quote: "The storytelling techniques learned in this workshop transformed how we approach our brand campaigns."
      }
    ]
  },
  {
    id: 3,
    title: "Color Grading Techniques",
    date: "2022",
    participants: "30+ Participants",
    description: "Completed advanced training in color grading techniques through Film Riot Academy, focusing on professional post-production workflows.",
    image: "/placeholder.svg?height=400&width=600",
    topics: ["DaVinci Resolve Studio", "Color Theory", "Professional Grading", "Post-Production"],
    testimonials: [
      {
        name: "Video Editor",
        role: "Freelancer",
        quote: "Abdul's expertise in color grading is exceptional. His techniques have elevated the quality of my work significantly."
      }
    ]
  }
]

const collaborations = [
  {
    title: "Football Clubs & Tournaments",
    role: "Director of Media",
    description: "Oversaw media direction for LST, Smurfs, Football Factory, Bulls, Pakistan Football League, Griffin, Bigmen, and Team 18 across Lahore and Islamabad.",
    icon: Video
  },
  {
    title: "Fiverr Platform",
    role: "Top-Rated Freelancer",
    description: "Completed 900-1000 projects with 80-100% client satisfaction rates, specializing in branded video narratives and professional audio mix.",
    icon: Camera
  },
  {
    title: "Commercial Brands",
    role: "Creative Director",
    description: "Led full-cycle production from ideation to post-production for various commercial brands, achieving over 1 million combined social impressions.",
    icon: Palette
  }
]

export default function WorkshopsPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Workshops & Training
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Sharing knowledge and empowering the next generation of filmmakers through 
            hands-on workshops and collaborative learning experiences.
          </p>
          <div className="w-20 h-1 bg-amber-400 mx-auto" />
        </div>
      </section>

      {/* Workshops Section */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-20">
            {workshops.map((workshop, index) => (
              <div 
                key={workshop.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}
              >
                {/* Workshop Image */}
                <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="aspect-video relative overflow-hidden rounded-xl">
                    <Image
                      src={workshop.image || "/placeholder.svg"}
                      alt={workshop.title}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Workshop Details */}
                <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                      {workshop.title}
                    </h2>
                    <div className="flex flex-wrap gap-4 text-gray-400 mb-6">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        {workshop.date}
                      </span>
                      <span className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        {workshop.participants}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed text-lg">
                    {workshop.description}
                  </p>

                  {/* Topics Covered */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Topics Covered</h3>
                    <div className="flex flex-wrap gap-2">
                      {workshop.topics.map((topic, topicIndex) => (
                        <span 
                          key={topicIndex}
                          className="bg-amber-500/10 text-amber-400 px-3 py-1 rounded-full text-sm border border-amber-500/20"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Testimonial */}
                  {workshop.testimonials.length > 0 && (
                    <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                      <blockquote className="text-gray-300 italic mb-4">
                        "{workshop.testimonials[0].quote}"
                      </blockquote>
                      <div className="flex items-center">
                        <div>
                          <div className="font-semibold text-white">{workshop.testimonials[0].name}</div>
                          <div className="text-sm text-gray-400">{workshop.testimonials[0].role}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collaborations Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Collaborations & Partnerships
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Working with institutions and organizations to foster creative growth 
              and knowledge sharing in the film community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collaborations.map((collab, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 hover:border-amber-400/50 transition-colors">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-amber-500/10 rounded-full mb-6">
                  <collab.icon className="h-6 w-6 text-amber-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{collab.title}</h3>
                <p className="text-amber-400 text-sm mb-4">{collab.role}</p>
                <p className="text-gray-300">{collab.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">1000+</div>
              <div className="text-gray-400">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">2</div>
              <div className="text-gray-400">Sony Workshops Conducted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">90-100%</div>
              <div className="text-gray-400">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-400 mb-2">1M+</div>
              <div className="text-gray-400">Social Impressions</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Learn?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join my next workshop or bring me to your organization for customized training sessions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-amber-500 hover:bg-amber-600 text-black text-lg px-8 py-3">
              Book a Workshop
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:border-amber-400 hover:text-amber-400 text-lg px-8 py-3">
              Corporate Training
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
