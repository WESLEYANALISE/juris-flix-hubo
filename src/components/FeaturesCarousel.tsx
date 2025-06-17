
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const carouselData = [
  {
    id: 1,
    title: "Vade Mecum Digital",
    description: "Leis e códigos sempre atualizados",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=250&fit=crop"
  },
  {
    id: 2,
    title: "Assistente IA Jurídico", 
    description: "Inteligência artificial especializada em Direito",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=250&fit=crop"
  },
  {
    id: 3,
    title: "Biblioteca Jurídica",
    description: "Milhares de livros e materiais especializados",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=250&fit=crop"
  },
  {
    id: 4,
    title: "Simulados OAB",
    description: "Prepare-se para o exame da Ordem", 
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=250&fit=crop"
  }
];

export const FeaturesCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % carouselData.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const currentItem = carouselData[currentSlide];

  return (
    <div 
      className="relative h-[180px] sm:h-[220px] w-full overflow-hidden rounded-xl shadow-2xl" 
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Image with enhanced overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform"
        style={{
          backgroundImage: `url(${currentItem.image})`,
          filter: 'brightness(0.3) contrast(1.2)'
        }}
      />
      
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      
      {/* Content with better positioning */}
      <div className="relative z-10 flex h-full items-center px-4 sm:px-6">
        <div className="max-w-lg text-white">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3 text-white drop-shadow-lg animate-fade-in-up">
            {currentItem.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-100 drop-shadow-md animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {currentItem.description}
          </p>
        </div>
      </div>

      {/* Enhanced Navigation Arrows */}
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white h-8 w-8 sm:h-10 sm:w-10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300" 
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-20 bg-black/40 hover:bg-black/60 text-white h-8 w-8 sm:h-10 sm:w-10 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300" 
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>

      {/* Enhanced Dots Indicator */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 rounded-sm">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/30">
        <div 
          className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / carouselData.length) * 100}%` }}
        />
      </div>
    </div>
  );
};
