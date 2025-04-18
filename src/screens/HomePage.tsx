import { useState } from 'react';
import { Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

// Define data for sections to enable mapping
const sections = [
  {
    id: 1,
    title: "NEW ARRIVALS",
    backgroundImage: "/triangl-website/dskjnknjdas.png",
  },
  {
    id: 2,
    title: "BEST SELLERS",
    backgroundImage: "/triangl-website/dskjnknjdas.png",
  },
  {
    id: 3,
    title: "SWIMWEAR",
    backgroundImage: "/triangl-website/dskjnknjdas.png",
  },
  {
    id: 4,
    title: "CLOTHING",
    backgroundImage: "/triangl-website/dskjnknjdas.png",
  },
  {
    id: 5,
    title: "FOR HIM",
    backgroundImage: "/triangl-website/dskjnknjdas.png",
  },
];

// Navigation items
const navItems = [
  { id: 1, title: "New Arrivals", path: "/catalogue" },
  { id: 2, title: "Best Sellers", path: "/catalogue" },
  { id: 3, title: "Swimwear", path: "/catalogue" },
  { id: 4, title: "Clothing", path: "/catalogue" },
  { id: 5, title: "Campaigns", path: "/catalogue" },
  { id: 6, title: "For Him", path: "/catalogue" },
];

export const HomePage = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <main className="w-full">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="flex items-center justify-between px-6 h-[60px]">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white hover:text-gray-300"
          >
            <Menu size={24} />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="[font-family:'Bebas_Neue',Helvetica] text-sm tracking-wider text-white hover:text-gray-300"
              >
                {item.title}
              </Link>
            ))}
          </div>

          {/* Center logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link to="/">
              <img src="/triangl-website/white logo.png" alt="TRIANGL" className="h-6" />
            </Link>
          </div>

          {/* Right side elements */}
          <div className="flex items-center space-x-6">
            <button className="relative hover:text-gray-300 text-white">
              <Heart size={20} />
              <span className="absolute -top-2 -right-2 bg-white text-black rounded-full w-4 h-4 text-xs flex items-center justify-center">0</span>
            </button>
            <button className="relative hover:text-gray-300 text-white">
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-white text-black rounded-full w-4 h-4 text-xs flex items-center justify-center">0</span>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        <div className={`
          fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden
          ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}>
          <div className={`
            fixed inset-y-0 left-0 w-64 bg-black transform transition-transform duration-300 ease-in-out
            ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <div className="flex justify-end p-4">
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="text-white hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col space-y-4 p-6">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="[font-family:'Bebas_Neue',Helvetica] text-sm tracking-wider text-white hover:text-gray-300"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main content sections */}
      <div className="w-full">
        {sections.map((section) => (
          <section
            key={section.id}
            className="w-full h-[1160px] bg-black"
            style={{
              backgroundImage: `url(${section.backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "50% 50%",
            }}
          >
            <div className="flex flex-col items-center justify-end h-full pb-20">
              <h2 className="[font-family:'Bebas_Neue',Helvetica] font-normal text-white text-2xl text-center tracking-[0] leading-[31.2px] whitespace-nowrap mb-[15px]">
                {section.title}
              </h2>
              <Button
                variant="outline"
                className="w-[169px] h-[38px] border border-solid border-white rounded-none bg-transparent hover:bg-white hover:text-black transition-colors"
              >
                <span className="[font-family:'Bebas_Neue',Helvetica] font-normal text-white text-sm text-center tracking-[0.42px] leading-[14px] whitespace-nowrap group-hover:text-black">
                  SHOP NOW
                </span>
              </Button>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}; 