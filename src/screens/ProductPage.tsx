import { useState } from 'react';
import { Heart, ChevronDown, Menu, X, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { getAssetPath } from '../utils/assetPath';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
}

export const ProductPage = (): JSX.Element => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sizes = ['XXS', 'XS', 'S', 'M', 'L', 'XL'];
  
  // Example media array with both images and video
  const mediaItems: MediaItem[] = [
    { type: 'video', url: getAssetPath('/vid.mp4'), thumbnail: getAssetPath('/ss1.png') },
    { type: 'image', url: getAssetPath('/ss1.png') },
    { type: 'image', url: getAssetPath('/ss2.png') },
    { type: 'image', url: getAssetPath('/ss3.png') },
    { type: 'image', url: getAssetPath('/ss1.png') },
    { type: 'image', url: getAssetPath('/ss2.png') },
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

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  return (
    <div className="min-h-screen bg-white">
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
              <img src={getAssetPath("/black logo.png")} alt="TRIANGL" className="h-6" />
            </Link>
          </div>

          {/* Right side elements */}
          <div className="flex items-center space-x-6">
            <button className="relative hover:text-gray-600 text-black">
              <Heart size={20} />
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

      <div className="w-full flex flex-col md:flex-row mt-20 md:gap-12 md:px-[30px]">
        {/* Left side - Media gallery */}
        <div className="w-full md:w-2/3 flex relative">
          <div className="hidden md:flex flex-col gap-2 p-4">
            {mediaItems.map((item, index) => (
              <button 
                key={index} 
                className={"relative w-[60px] h-[80px] overflow-hidden " + 
                  (currentMediaIndex === index ? "border-2 border-black" : "")
                }
                onClick={() => {
                  setCurrentMediaIndex(index);
                }}
              >
                {item.type === 'video' ? (
                  <>
                    <img 
                      src={item.thumbnail} 
                      alt="Video thumbnail" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                  </>
                ) : (
                  <img 
                    src={item.url} 
                    alt={`Thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover" 
                  />
                )}
              </button>
            ))}
          </div>
          <div className="flex-1 relative">
            {mediaItems[currentMediaIndex].type === 'video' ? (
              <div className="relative w-full h-full">
                <video
                  src={mediaItems[currentMediaIndex].url}
                  className="w-full h-[800px] object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls={false}
                />
              </div>
            ) : (
              <img 
                src={mediaItems[currentMediaIndex].url}
                alt="Main product" 
                className="w-full h-[800px] object-cover"
              />
            )}
            {/* Mobile Navigation Arrows */}
            <div className="md:hidden absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-4">
              <button 
                onClick={prevMedia}
                className="bg-white/80 rounded-full p-2 hover:bg-white"
                aria-label="Previous media"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button 
                onClick={nextMedia}
                className="bg-white/80 rounded-full p-2 hover:bg-white"
                aria-label="Next media"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            {/* Media Counter */}
            <div className="md:hidden absolute bottom-4 right-4 bg-white/80 px-3 py-1 rounded-full">
              <span className="text-sm font-medium">
                {currentMediaIndex + 1} / {mediaItems.length}
              </span>
            </div>
          </div>
        </div>

        {/* Right side - Product info */}
        <div className="w-full md:w-1/3 p-6 md:p-8">
          <div className="flex justify-between items-start">
            <h1 className="[font-family:'Bebas_Neue',Helvetica] text-2xl">COVA - LOKO SPARKLE ONE PIECE</h1>
            <button className="text-black hover:text-gray-600">
              <Heart className="w-6 h-6" />
            </button>
          </div>

          <p className="mt-2 [font-family:'Archivo_Narrow',Helvetica] text-lg">119 USD</p>

          {/* Size selector */}
          <div className="mt-8">
            <p className="[font-family:'Archivo_Narrow',Helvetica] mb-2">Select Size</p>
            <div className="grid grid-cols-6 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={'h-10 border ' + 
                    (selectedSize === size
                      ? 'border-black bg-black text-white'
                      : 'border-gray-300 hover:border-black')
                  }
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <button className="mt-2 text-sm underline">What Size Am I?</button>
          </div>

          {/* Add to cart button */}
          <Button className="w-full h-12 mt-8 bg-black text-white hover:bg-gray-900 [font-family:'Bebas_Neue',Helvetica]">
            ADD TO CART
          </Button>

          {/* Expandable sections */}
          <div className="mt-8 space-y-4">
            {['DESCRIPTION', 'CARE AND COMPOSITION', 'DELIVERY AND RETURNS'].map((section) => (
              <div key={section} className="border-t border-gray-200">
                <button
                  className="w-full py-4 flex justify-between items-center"
                  onClick={() => toggleSection(section)}
                >
                  <span className="[font-family:'Bebas_Neue',Helvetica]">{section}</span>
                  <ChevronDown
                    className={'w-5 h-5 transition-transform ' + 
                      (expandedSection === section ? 'rotate-180' : '')
                    }
                  />
                </button>
                {expandedSection === section && (
                  <div className="pb-4 [font-family:'Archivo_Narrow',Helvetica]">
                    {/* Placeholder content */}
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 