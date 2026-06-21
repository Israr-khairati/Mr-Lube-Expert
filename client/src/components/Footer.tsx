import { Link } from "wouter";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="text-xl font-bold text-accent mb-2" style={{ fontFamily: "Space Grotesk" }}>
              MR LUBE EXPERT
            </div>
            <p className="text-secondary-foreground text-sm">
              Professional Vehicle Care & Repair Solutions
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/">
                  <a className="text-secondary-foreground hover:text-accent transition-colors text-sm">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="text-secondary-foreground hover:text-accent transition-colors text-sm">
                    Services
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/gallery">
                  <a className="text-secondary-foreground hover:text-accent transition-colors text-sm">
                    Gallery
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-secondary-foreground hover:text-accent transition-colors text-sm">
                    About
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <div className="text-secondary-foreground">+91 9538223688</div>
                  <div className="text-secondary-foreground">+91 7676317355</div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-accent mt-0.5 flex-shrink-0" />
                <div className="text-sm text-secondary-foreground">
                  Opp. Murdeshwar Factory, Shivaji Layout, R N Shetty Road, Hubli, Karnataka 580024
                </div>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy">
                  <a className="text-secondary-foreground hover:text-accent transition-colors text-sm">
                    Privacy Policy
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/terms">
                  <a className="text-secondary-foreground hover:text-accent transition-colors text-sm">
                    Terms & Conditions
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-secondary-foreground text-sm">
            © {currentYear} MR LUBE EXPERT. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-foreground hover:text-accent transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-foreground hover:text-accent transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0m5.521 17.674c-1.604.265-5.195.265-6.521.265-1.328 0-4.917 0-6.52-.265-1.379-.228-2.148-.952-2.409-2.409-.265-1.604-.265-5.195-.265-6.521 0-1.328 0-4.917.265-6.52.228-1.379.952-2.148 2.409-2.409 1.604-.265 5.195-.265 6.52-.265 1.328 0 4.917 0 6.521.265 1.379.228 2.148.952 2.409 2.409.265 1.604.265 5.195.265 6.521 0 1.328 0 4.917-.265 6.52-.228 1.379-.952 2.148-2.409 2.409m-3.971-10.905a2.624 2.624 0 1 1-5.248 0 2.624 2.624 0 0 1 5.248 0m.684-4.318a.612.612 0 1 1-1.224 0 .612.612 0 0 1 1.224 0" />
              </svg>
            </a>
            <a
              href="https://www.whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-foreground hover:text-accent transition-colors"
              aria-label="WhatsApp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 0 0-9.746 9.798c0 2.718.738 5.33 2.14 7.617l-2.35 7.355 7.955-2.296c2.267 1.231 4.817 1.881 7.515 1.881 5.487 0 9.968-4.461 9.968-9.934 0-2.665-.675-5.159-1.970-7.346A9.902 9.902 0 0 0 12.04 6.991" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
