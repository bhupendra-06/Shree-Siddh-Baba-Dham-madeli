import { Button } from "@/components/ui/button";
import { Flame, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Book Diya", href: "/book-diya" },
    { name: "Diya List", href: "/devotees" },
    { name: "Gallery", href: "/gallery" },
    { name: "Donations", href: "/donations" }
  ];

  return (
    <header className="fixed top-0 w-full bg-card/95 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="p-2 bg-gradient-primary rounded-lg shadow-temple hover:shadow-diya transition-all duration-300">
              <Flame className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="rozha-one-regular font-display font-bold text-lg text-foreground">
                श्री सिद्ध बाबा धाम
              </h1>
              <p className="text-xs text-muted-foreground">पावन मंदिर, मड़ेली</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-foreground hover:text-primary transition-all duration-300 font-medium relative group ${
                  location.pathname === item.href ? 'text-primary' : ''
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full ${
                  location.pathname === item.href ? 'w-full' : ''
                }`}></span>
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/book-diya">
              <Button variant="temple" size="lg" className="hover:scale-105 transition-transform duration-300">
                Book Your Diya
              </Button>
            </Link>
            <Link to="/admin-login">
              <Button size="lg" className="hover:scale-105 bg-teal-500 hover:bg-teal-700 ml-2 transition-transform duration-300">
                Login
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-foreground hover:text-primary transition-colors font-medium py-2 ${
                    location.pathname === item.href ? 'text-primary' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/book-diya" onClick={() => setIsMenuOpen(false)}>
                <Button variant="temple" className="mt-2 w-full">
                  Book Your Diya
                </Button>
              </Link>
              <Link to="/admin-login">
              <Button size="lg" className="hover:scale-105 bg-teal-400 hover:bg-teal-700 w-full transition-transform duration-300">
                Login
              </Button>
            </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};