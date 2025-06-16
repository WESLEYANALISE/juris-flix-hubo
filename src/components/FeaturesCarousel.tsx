
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const carouselData = [
  {
    id: 1,
    title: "Vade Mecum Digital",
    description: "Leis e códigos atualizados",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=250&fit=crop",
  },
  {
    id: 2,
    title: "Assistente IA Jurídico",
    description: "Inteligência artificial especializada",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=250&fit=crop",
  },
  {
    id: 3,
    title: "OAB Simulado",
    description: "Prepare-se para o exame",
    image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=600&h=250&fit=crop",
  },
];

export const FeaturesCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const currentItem = carouselData[currentSlide];

  return (
    <div 
      className="relative h-[200px] w-full overflow-hidden rounded-lg"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ 
          backgroundImage: `url(${currentItem.image})`,
          filter: 'brightness(0.4)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-6">
        <div className="max-w-lg text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">
            {currentItem.title}
          </h1>
          <p className="text-sm md:text-base text-gray-200">
            {currentItem.description}
          </p>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white h-8 w-8"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white h-8 w-8"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1">
        {carouselData.map((_, index) => (
          <button
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              index === currentSlide ? 'bg-red-500 w-4' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
