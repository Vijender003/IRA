import { Link } from "react-router-dom";

const footerLinks = {
  Services: [{ name: "Study Abroad", href: "/services" }, { name: "Immigration", href: "/services" }, { name: "Visa Services", href: "/services" }, { name: "Business Setup", href: "/services" }],
  Destinations: [{ name: "Georgia", href: "/country/georgia" }, { name: "Singapore", href: "/country/singapore" }, { name: "Russia", href: "/country/russia" }, { name: "Malta", href: "/country/malta" }],
  Company: [{ name: "About Us", href: "/" }, { name: "Contact", href: "/contact" }],
  Legal: [{ name: "Privacy Policy", href: "/" }, { name: "Terms of Service", href: "/" }],
};

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="absolute inset-0 bg-surface-950" />
      <div className="relative z-10 container-custom px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-4 mb-5 group">
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 via-accent-500 to-accent-600 flex items-center justify-center shadow-lg shadow-primary-400/30 ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                <span className="text-white font-display font-bold text-sm tracking-tight">A</span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/10 to-transparent opacity-50" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-display font-bold text-white tracking-[0.15em] uppercase leading-none">ABC Visas</span>
                <span className="text-[10px] font-sans font-medium text-white/40 tracking-[0.2em] uppercase mt-0.5">consulting & services</span>
              </div>
            </Link>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs mb-6">Expert visa and immigration consulting — guiding you every step of the way with integrity and excellence.</p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white/80 mb-4 tracking-wide uppercase">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}><Link to={link.href} className="text-white/30 text-sm hover:text-primary-400 transition-colors">{link.name}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/20 text-sm">&copy; {new Date().getFullYear()} ABC Visas and consulting services. All rights reserved.</p>
          <p className="text-white/20 text-sm">Trusted Expertise, Global Reach</p>
        </div>
      </div>
    </footer>
  );
}
