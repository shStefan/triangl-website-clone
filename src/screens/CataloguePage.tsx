import React, { useState } from 'react';
import { Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
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
  "/ss1.png",
  "/ss2.png",
  "/vid.mp4",  // Every third item will be the video
];

const products = Array(12).fill(null).map((_, index) => ({
  name: "MICA - GRACI",
  price: "99 USD",
  media: productImages[index % 3],
  isVideo: index % 3 === 2  // Every third item will be a video
}));

export const CataloguePage = (): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Category data for the top section
  const categories = [
    { name: "Sets", image: "/Sets.png" },
    { name: "Separates", image: "/Separates.png" },
    { name: "One piece", image: "/onepiece.png" },
  ];

  return (
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-full relative">
        <div className="w-full">
          {/* Header */}
          <header className="fixed top-0 left-0 right-0 z-50 bg-white">
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
                  <img src="/black logo.png" alt="TRIANGL" className="h-6" />
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

            {/* Mobile Navigation Menu */}
            <div className={`
              fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden
              ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
            `}>
              <div className={`
                fixed inset-y-0 left-0 w-64 bg-white transform transition-transform duration-300 ease-in-out
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
              `}>
                <div className="flex justify-end p-4">
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-black hover:text-gray-600"
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
                      className="[font-family:'Bebas_Neue',Helvetica] text-sm tracking-wider text-black hover:text-gray-600"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </header>

          <div className="w-full mt-20 pb-20">
            {/* Category selection */}
            <div className="w-full flex justify-center mb-8">
              <div className="flex space-x-10 overflow-x-auto">
                {categories.map((category, index) => (
                  <div key={index} className="flex flex-col items-center w-[100px] md:w-[200px]">
                    <div
                      className="w-full h-[125px] md:h-[250px] bg-cover bg-center rounded-lg"
                      style={{ 
                        backgroundImage: `url('${category.image}')`,
                        backgroundColor: '#f5f5f5'
                      }}
                    />
                    <p className="mt-3 [font-family:'Bebas_Neue',Helvetica] font-normal text-[#000000d9] text-base md:text-lg tracking-[0] leading-[26.4px] text-center">
                      {category.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Product grid */}
            <div className="max-w-[1830px] mx-auto md:px-[45px]">
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 md:gap-x-6 md:gap-y-12">
                {products.map((product, index) => (
                  <div key={index} className="relative">
                    {/* Product Media (Image or Video) */}
                    <Link to={`/product/${index + 1}`} className="block">
                      <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                        {product.isVideo ? (
                          <video
                            src={product.media}
                            className="w-full h-full object-cover"
                            autoPlay
                            loop
                            muted
                            playsInline
                          />
                        ) : (
                          <img
                            src={product.media}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            onError={(e) => console.error('Image failed to load:', e.currentTarget.src)}
                          />
                        )}
                      </div>
                    </Link>
                    
                    {/* Product Info */}
                    <div className="mt-4 flex justify-between items-start px-2 md:px-0">
                      <Link to={`/product/${index + 1}`} className="block">
                        <div>
                          <h3 className="[font-family:'Archivo_Narrow',Helvetica] text-sm md:text-base font-normal text-black">
                            {product.name}
                          </h3>
                          <p className="[font-family:'Archivo_Narrow',Helvetica] text-sm md:text-base font-normal text-black mt-1">
                            {product.price}
                          </p>
                        </div>
                      </Link>
                      <button 
                        className="text-black hover:text-gray-600 transition-colors"
                        aria-label="Add to wishlist"
                      >
                        <Heart className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            <div className="w-full flex flex-col items-center py-12">
              <p className="[font-family:'Archivo_Narrow',Helvetica] font-normal text-black text-sm text-center mb-4">
                Showing 1 - 30 of 178 products
              </p>

              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationLink
                      className="[font-family:'Archivo_Narrow',Helvetica] font-normal text-black text-sm underline"
                      isActive
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink className="[font-family:'Archivo_Narrow',Helvetica] font-normal text-black text-sm">
                      2
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink className="[font-family:'Archivo_Narrow',Helvetica] font-normal text-black text-sm">
                      3
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <span className="[font-family:'Archivo_Narrow',Helvetica] font-normal text-black text-base">
                      …
                    </span>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink className="[font-family:'Archivo_Narrow',Helvetica] font-normal text-black text-sm">
                      6
                    </PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 