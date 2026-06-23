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
            <Link to="/" className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div><span className="text-lg font-display font-bold text-white">IRA</span><span className="text-lg font-display font-light text-white/50 ml-1">International</span></div>
            </Link>
            <p className="text-white/30 text-sm leading-relaxed max-w-xs mb-6">Building global futures through education, immigration, and business opportunities.</p>
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
          <p className="text-white/20 text-sm">&copy; {new Date().getFullYear()} IRA International. All rights reserved.</p>
          <p className="text-white/20 text-sm">Future Without Borders</p>
        </div>
      </div>
    </footer>
  );
}
