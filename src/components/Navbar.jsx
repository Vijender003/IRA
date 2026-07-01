import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrolled(window.scrollY > 60);
    });
  }, []);

  return (
    <header className={`fixed w-full z-50 transition ${scrolled ? "bg-white shadow-md" : ""}`}>
      <nav className="max-w-7xl mx-auto px-5 flex justify-between items-center h-20">
        
        <h1 className={`font-bold text-xl ${scrolled ? "text-brand-900" : "text-white"}`}>
          Global<span className="text-gold-400">Pathways</span>
        </h1>

        <button onClick={() => setOpen(!open)} className="lg:hidden text-2xl">
          ☰
        </button>

        <ul className="hidden lg:flex gap-6">
          {["Home", "Services", "Contact"].map((item) => (
            <li key={item} className={scrolled ? "text-slate-700" : "text-white"}>
              {item}
            </li>
          ))}
        </ul>
      </nav>

      {open && (
        <div className="bg-brand-900 text-white p-4 space-y-3">
          <p>Home</p>
          <p>Services</p>
          <p>Contact</p>
        </div>
      )}
    </header>
  );
}