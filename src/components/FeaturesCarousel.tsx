
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

const carouselData = [
  {
    id: 1,
    title: "Vade Mecum Digital",
    description: "Leis e códigos sempre atualizados com busca inteligente",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop&crop=center",
    category: "Legislação"
  },
  {
    id: 2,
    title: "Assistente IA Jurídico",
    description: "Inteligência artificial especializada em Direito brasileiro",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&crop=center",
    category: "IA & Tecnologia"
  },
  {
    id: 3,
    title: "Biblioteca Jurídica",
    description: "Milhares de livros, doutrinas e jurisprudências organizadas",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop&crop=center",
    category: "Biblioteca"
  },
  {
    id: 4,
    title: "Áudio-aulas Especializadas",
    description: "Conteúdo em áudio para estudo em qualquer lugar",
    image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&h=400&fit=crop&crop=center",
    category: "Áudio & Mídia"
  },
  {
    id: 5,
    title: "Mapas Mentais Jurídicos",
    description: "Visualize conexões entre institutos e conceitos do Direito",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop&crop=center",
    category: "Mapas Mentais"
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

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const currentItem = carouselData[currentSlide];

  return (
    <div 
      className="relative h-[200px] sm:h-[240px] w-full overflow-hidden rounded-2xl shadow-legal card-depth-3 group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Image with enhanced overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform"
        style={{
          backgroundImage: `url(${currentItem.image})`,
          filter: 'brightness(0.4) contrast(1.1) saturate(0.8)'
        }}
      />
      
      {/* Enhanced Legal Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background-deep/95 via-background-deep/70 to-background-deep/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background-deep/90 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent-legal/20 via-transparent to-primary/10" />
      
      {/* Content with better positioning and legal styling */}
      <div className="relative z-10 flex h-full items-center px-6 sm:px-8">
        <div className="max-w-2xl text-white">
          {/* Category badge */}
          <div className="mb-3">
            <span className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary-foreground border border-primary/30 rounded-full backdrop-blur-sm">
              {currentItem.category}
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white drop-shadow-2xl animate-fade-in-up gradient-text-legal-light">
            {currentItem.title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-100 drop-shadow-lg animate-fade-in-up leading-relaxed" 
             style={{ animationDelay: '0.2s' }}>
            {currentItem.description}
          </p>
          
          {/* Professional accent line */}
          <div className="mt-4 w-20 h-1 bg-gradient-to-r from-accent-legal to-accent-legal/60 rounded-full animate-fade-in-up" 
               style={{ animationDelay: '0.4s' }} />
        </div>
      </div>

      {/* Enhanced Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 
                 bg-background/20 hover:bg-background/40 border border-white/20 
                 hover:border-white/40 text-white backdrop-blur-sm
                 opacity-0 group-hover:opacity-100 transition-all duration-300
                 hover:scale-110 shadow-lg"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 
                 bg-background/20 hover:bg-background/40 border border-white/20 
                 hover:border-white/40 text-white backdrop-blur-sm
                 opacity-0 group-hover:opacity-100 transition-all duration-300
                 hover:scale-110 shadow-lg"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Play/Pause button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleAutoPlay}
        className="absolute top-4 right-4 z-20 h-8 w-8 
                 bg-background/20 hover:bg-background/40 border border-white/20 
                 hover:border-white/40 text-white backdrop-blur-sm
                 opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>

      {/* Enhanced Dots Indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`
              w-3 h-3 rounded-full border-2 transition-all duration-300 hover:scale-125
              ${index === currentSlide 
                ? 'bg-accent-legal border-accent-legal shadow-lg shadow-accent-legal/50' 
                : 'bg-transparent border-white/50 hover:border-white/80'
              }
            `}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Enhanced Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-background-deep/50">
        <div 
          className="h-full bg-gradient-to-r from-accent-legal via-primary to-accent-legal transition-all duration-500 shadow-lg shadow-accent-legal/30"
          style={{ width: `${(currentSlide + 1) / carouselData.length * 100}%` }}
        />
      </div>

      {/* Slide number indicator */}
      <div className="absolute bottom-4 left-4 z-20 text-white/70 text-sm font-medium backdrop-blur-sm bg-background/20 px-2 py-1 rounded">
        {currentSlide + 1} / {carouselData.length}
      </div>
    </div>
  );
};
