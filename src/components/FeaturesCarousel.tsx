
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const carouselData = [
  {
    id: 1,
    title: "Vade Mecum Digital",
    description: "Leis e códigos sempre atualizados com busca inteligente",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop&crop=center"
  },
  {
    id: 2,
    title: "Assistente IA Jurídico",
    description: "Inteligência artificial especializada em Direito brasileiro",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&crop=center"
  },
  {
    id: 3,
    title: "Biblioteca Jurídica",
    description: "Milhares de livros, doutrinas e jurisprudências organizadas",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop&crop=center"
  },
  {
    id: 4,
    title: "Áudio-aulas Especializadas",
    description: "Conteúdo em áudio para estudo em qualquer lugar",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&h=400&fit=crop&crop=center"
  },
  {
    id: 5,
    title: "Mapas Mentais Jurídicos",
    description: "Visualize conexões entre institutos e conceitos do Direito",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop&crop=center"
  },
  {
    id: 6,
    title: "Flashcards Interativos",
    description: "Memorização eficiente de conceitos jurídicos fundamentais",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=400&fit=crop&crop=center"
  },
  {
    id: 7,
    title: "Resumos de Códigos",
    description: "Resumos organizados dos principais códigos brasileiros",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop&crop=center"
  },
  {
    id: 8,
    title: "Petições e Modelos",
    description: "Biblioteca de petições e modelos profissionais atualizados",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop&crop=center"
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
      className="relative h-[200px] sm:h-[240px] w-full overflow-hidden rounded-2xl shadow-lg"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
        style={{
          backgroundImage: `url(${currentItem.image})`,
          filter: 'brightness(0.4) contrast(1.1) saturate(0.8)'
        }}
      />
      
      {/* Enhanced Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-blue-500/10" />
      
      {/* Content */}
      <div className="relative z-10 flex h-full items-center px-6 sm:px-8">
        <div className="max-w-2xl text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white drop-shadow-2xl">
            {currentItem.title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-100 drop-shadow-lg leading-relaxed">
            {currentItem.description}
          </p>
          
          {/* Professional accent line */}
          <div className="mt-4 w-20 h-1 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" />
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white w-6' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/50">
        <div 
          className="h-full bg-gradient-to-r from-amber-500 via-blue-500 to-amber-500 transition-all duration-500"
          style={{
            width: `${(currentSlide + 1) / carouselData.length * 100}%`
          }}
        />
      </div>
    </div>
  );
};
