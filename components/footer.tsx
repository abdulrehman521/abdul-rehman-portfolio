import Link from "next/link"
import { Instagram, Linkedin, Youtube, ExternalLink, Mail, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-amber-400 mb-4">Abdul Rehman</h3>
            <p className="text-gray-400 mb-4">
              Video Editor, Videographer & Creative Storyteller
            </p>
            <p className="text-gray-400 text-sm">
              Impactful storytelling through high-end post-production.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Lahore, Pakistan • +92 300-0521000
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/portfolio" className="block text-gray-400 hover:text-amber-400 transition-colors">
                Portfolio
              </Link>
              <Link href="/photography" className="block text-gray-400 hover:text-amber-400 transition-colors">
                Photography
              </Link>
              <Link href="/workshops" className="block text-gray-400 hover:text-amber-400 transition-colors">
                Workshops
              </Link>
              <Link href="/contact" className="block text-gray-400 hover:text-amber-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a 
                href="https://behance.net/abdulrehman19966" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <ExternalLink className="h-6 w-6" />
              </a>
              <a 
                href="mailto:abdulrehman19966@gmail.com" 
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Mail className="h-6 w-6" />
              </a>
              <a 
                href="tel:+923000521000" 
                className="text-gray-400 hover:text-amber-400 transition-colors"
              >
                <Phone className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Abdul Rehman. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
