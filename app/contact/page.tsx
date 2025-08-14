"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion" 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Instagram, Linkedin, Youtube, ExternalLink, Send, CheckCircle2 } from 'lucide-react'
import emailjs from "emailjs-com";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

const [showModal, setShowModal] = useState(false)
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  emailjs
    .send(
      "service_7hi8qqi",      // Your Service ID
      "template_s950fr8",     // Your Template ID
      {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      },
      "JgrVDYde9oMdd1s75"     // Your Public Key
    )
    .then(
      () => {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setShowModal(true);
        setTimeout(() => setShowModal(false), 4000); 
      },
      (error) => {
        console.error(error);
        alert("Failed to send message. Please try again.");
      }
    );
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="pt-20 relative">
      {/* Hero Section */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="bg-gray-900/90 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-amber-500/40 flex flex-col items-center text-center">
              <CheckCircle2 className="text-green-400 w-16 h-16 mb-4" />
              <h2 className="text-2xl font-bold text-white">Message Sent!</h2>
              <p className="text-gray-300 mt-2">
                Thank you for reaching out. I’ll get back to you shortly.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Let's Create Together
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Ready to bring your vision to life? Whether it's a commercial project, 
            documentary, or creative collaboration, I'd love to hear from you.
          </p>
          <div className="w-20 h-1 bg-amber-400 mx-auto" />
        </div>
      </section>

      {/* Contact Content */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white focus:border-amber-400 focus:ring-amber-400"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-gray-800 border-gray-700 text-white focus:border-amber-400 focus:ring-amber-400"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-gray-800 border-gray-700 text-white focus:border-amber-400 focus:ring-amber-400"
                    placeholder="Project inquiry, collaboration, etc."
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-gray-800 border-gray-700 text-white focus:border-amber-400 focus:ring-amber-400"
                    placeholder="Tell me about your project, timeline, budget, and vision..."
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 text-lg"
                >
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-8">Get in Touch</h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  I'm always excited to discuss new projects and creative opportunities. 
                  Whether you're looking for a filmmaker, photographer, or workshop facilitator, 
                  let's connect and explore how we can work together.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-amber-500/10 rounded-full">
                    <Mail className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <a 
                      href="mailto:abdulrehman19966@gmail.com" 
                      className="text-gray-400 hover:text-amber-400 transition-colors"
                    >
                      abdulrehman19966@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-amber-500/10 rounded-full">
                    <Phone className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <a 
                      href="tel:+923000521000" 
                      className="text-gray-400 hover:text-amber-400 transition-colors"
                    >
                      +92 300-0521000
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-amber-500/10 rounded-full">
                    <MapPin className="h-6 w-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Location</p>
                    <p className="text-gray-400">Lahore, Pakistan</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="pt-8 border-t border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-6">Follow My Work</h3>
                <div className="grid grid-cols-2 gap-4">
                  <a 
                    href="https://www.behance.net/portfolio/editor?project_id=179394001" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-amber-400/50 transition-colors group"
                  >
                    <ExternalLink className="h-6 w-6 text-amber-400" />
                    <div>
                      <p className="text-white font-medium group-hover:text-amber-400 transition-colors">Behance</p>
                      <p className="text-gray-400 text-sm">Complete Portfolio</p>
                    </div>
                  </a>

                  <a 
                    href="https://instagram.com/abdulrehmanhashmii" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-amber-400/50 transition-colors group"
                  >
                    <Instagram className="h-6 w-6 text-amber-400" />
                    <div>
                      <p className="text-white font-medium group-hover:text-amber-400 transition-colors">Instagram</p>
                      <p className="text-gray-400 text-sm">Behind the scenes</p>
                    </div>
                  </a>

                  <a 
                    href="https://linkedin.com/in/abdul-rehman-hashmi-436939166" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-amber-400/50 transition-colors group"
                  >
                    <Linkedin className="h-6 w-6 text-amber-400" />
                    <div>
                      <p className="text-white font-medium group-hover:text-amber-400 transition-colors">LinkedIn</p>
                      <p className="text-gray-400 text-sm">Professional network</p>
                    </div>
                  </a>

                  <a 
                    href="https://youtube.com/@abdulrehman" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-4 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-amber-400/50 transition-colors group"
                  >
                    <Youtube className="h-6 w-6 text-amber-400" />
                    <div>
                      <p className="text-white font-medium group-hover:text-amber-400 transition-colors">YouTube</p>
                      <p className="text-gray-400 text-sm">Showreels & tutorials</p>
                    </div>
                  </a>
                </div>
              </div>

              {/* Availability */}
              <div className="bg-gradient-to-r from-amber-500/10 to-transparent rounded-xl p-6 border border-amber-500/20">
                <h3 className="text-xl font-semibold text-white mb-3">Current Availability</h3>
                <p className="text-gray-300 mb-4">
                  Available for commercial ads, short films, corporate videos, and social media content. 
                  Specializing in full-cycle production from ideation to post-production.
                </p>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-400 font-medium">Available for new projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400">
              Common questions about working together
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">What's your typical project timeline?</h3>
              <p className="text-gray-300">
                Project timelines vary depending on scope and complexity. A typical commercial project takes 2-4 weeks 
                from pre-production to final delivery, while documentaries can range from 2-6 months. I always provide 
                detailed timelines during the initial consultation.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">Do you work with international clients?</h3>
              <p className="text-gray-300">
                I work with clients globally and can accommodate different time zones for meetings and 
                project coordination. Remote collaboration tools make it seamless to work together regardless of location.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">What equipment do you use?</h3>
              <p className="text-gray-300">
                I work with professional Sony Alpha cameras, DaVinci Resolve for color grading, and Adobe Creative Suite. 
                Equipment selection is always tailored to the specific needs and budget of each project.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">Can you provide references from past clients?</h3>
              <p className="text-gray-300">
                Yes, I'm happy to provide references and case studies from previous projects. Client testimonials 
                and detailed project breakdowns are available upon request during our initial consultation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
