import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { getAssetPath } from '../utils/assetPath';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../components/ui/pagination';

// Navigation items
const navItems = [
  { id: 1, title: "New Arrivals", path: "/catalogue" },
  { id: 2, title: "Best Sellers", path: "/catalogue" },
  { id: 3, title: "Swimwear", path: "/catalogue" },
  { id: 4, title: "Clothing", path: "/catalogue" },
  { id: 5, title: "Campaigns", path: "/catalogue" },
  { id: 6, title: "For Him", path: "/catalogue" },
];

// Product data
const productImages = [
  getAssetPath("/ss1.png"),
  getAssetPath("/ss2.png"),
  getAssetPath("/vid.mp4"),  // Every third item will be the video
];

const products = Array(12).fill(null).map((_, index) => ({
  name: "MICA - GRACI",
  price: "99 USD",
  media: productImages[index % 3],
  isVideo: index % 3 === 2  // Every third item will be a video
}));

// Category data
const categories = [
  { name: "Sets", image: getAssetPath("/Sets.png") },
  { name: "Separates", image: getAssetPath("/Separates.png") },
  { name: "One piece", image: getAssetPath("/onepiece.png") },
];

export const CataloguePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-[1920px] mx-auto">
        <div className="relative">
          <header className="fixed top-0 left-0 right-0 bg-white z-50">
            <nav className="flex items-center justify-between px-6 h-[60px]">
              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-black hover:text-gray-600"
              >
                <Menu size={24} />
              </button>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className="[font-family:'Bebas_Neue',Helvetica] text-sm tracking-wider text-black hover:text-gray-600"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>

              {/* Center logo */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <Link to="/">
                  <img src={getAssetPath("/black logo.png")} alt="TRIANGL" className="h-6" />
                </Link>
              </div>

              {/* Right side elements */}
              <div className="flex items-center space-x-6">
                <button className="relative hover:text-gray-600 text-black">
                  <Heart size={20} />
                  <span className="absolute -top-2 -right-2 bg-black text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">0</span>
                </button>
                <button className="relative hover:text-gray-600 text-black">
                  <ShoppingBag size={20} />
                  <span className="absolute -top-2 -right-2 bg-black text-white rounded-full w-4 h-4 text-xs flex items-center justify-center">0</span>
                </button>
              </div>
            </nav>
          </header>

          <div className={`
            fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden
            ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
          `}>
            {/* ... menu content ... */}
          </div>

          {/* ... rest of the component content ... */}
        </div>
      </div>
    </div>
  );
};