import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10 mt-20 relative overflow-hidden">
        {/* Background Gradient Blob */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-primary via-green-400 to-primary"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter text-white">
              NUTRI<span className="text-primary">NEST</span>
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Empowering your wellness journey with nature's finest organic supplements and health foods. Sourced sustainably, delivered with care.
            </p>
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" }
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 border border-white/10"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-4">
              {[
                  { name: "About Us", path: "/about" },
                  { name: "Our Products", path: "/products" },
                  { name: "Blog", path: "/blog" },
                  { name: "Contact Us", path: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

           {/* Legal */}
           <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Support</h3>
            <ul className="space-y-4">
              {[
                  { name: "FAQ", path: "/faq" },
                  { name: "Shipping & Returns", path: "/shipping" },
                  { name: "Privacy Policy", path: "/privacy" },
                  { name: "Terms of Service", path: "/terms" }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group"
                  >
                     <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold mb-6 text-white">Get in Touch</h3>
            <div className="flex items-start gap-4 text-gray-400">
               <MapPin className="w-6 h-6 text-primary mt-1 shrink-0" />
               <p>123 Wellness Blvd, <br/>Green City, NY 10012</p>
            </div>
             <div className="flex items-center gap-4 text-gray-400">
               <Phone className="w-5 h-5 text-primary shrink-0" />
               <p>+1 (555) 123-4567</p>
            </div>
             <div className="flex items-center gap-4 text-gray-400">
               <Mail className="w-5 h-5 text-primary shrink-0" />
               <p>support@nutrinest.com</p>
            </div>

            {/* Newsletter Input */}
            <div className="mt-6">
                 <form className="relative">
                    <input 
                        type="email" 
                        placeholder="Your email address" 
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:outline-none focus:border-primary transition-colors pr-12"
                    />
                    <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary rounded-md text-white hover:bg-green-600 transition-colors">
                        <ArrowRight size={16} />
                    </button>
                 </form>
            </div>

          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} NutriNest. All rights reserved.
            </p>
             <div className="flex gap-6 text-sm text-gray-500">
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Terms</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;