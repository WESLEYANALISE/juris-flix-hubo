import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
const carouselData = [{
  id: 1,
  title: "Vade Mecum Digital",
  description: "Leis e códigos sempre atualizados com busca inteligente",
  image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop&crop=center"
}, {
  id: 2,
  title: "Assistente IA Jurídico",
  description: "Inteligência artificial especializada em Direito brasileiro",
  image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&crop=center"
}, {
  id: 3,
  title: "Biblioteca Jurídica",
  description: "Milhares de livros, doutrinas e jurisprudências organizadas",
  image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop&crop=center"
}, {
  id: 4,
  title: "Áudio-aulas Especializadas",
  description: "Conteúdo em áudio para estudo em qualquer lugar",
  image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&h=400&fit=crop&crop=center"
}, {
  id: 5,
  title: "Mapas Mentais Jurídicos",
  description: "Visualize conexões entre institutos e conceitos do Direito",
  image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=400&fit=crop&crop=center"
}];
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
  return <div className="relative h-[200px] sm:h-[240px] w-full overflow-hidden rounded-2xl shadow-legal card-depth-3" onMouseEnter={() => setIsAutoPlaying(false)} onMouseLeave={() => setIsAutoPlaying(true)}>
      {/* Background Image with enhanced overlay */}
      <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000 transform" style={{
      backgroundImage: `url(${currentItem.image})`,
      filter: 'brightness(0.4) contrast(1.1) saturate(0.8)'
    }} />
      
      {/* Enhanced Legal Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background-deep/95 via-background-deep/70 to-background-deep/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-background-deep/90 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-accent-legal/20 via-transparent to-primary/10" />
      
      {/* Content with better positioning and legal styling */}
      <div className="relative z-10 flex h-full items-center px-6 sm:px-8">
        <div className="max-w-2xl text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-white drop-shadow-2xl animate-fade-in-up gradient-text-legal-light">
            {currentItem.title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-100 drop-shadow-lg animate-fade-in-up leading-relaxed" style={{
          animationDelay: '0.2s'
        }}>
            {currentItem.description}
          </p>
          
          {/* Professional accent line */}
          <div className="mt-4 w-20 h-1 bg-gradient-to-r from-accent-legal to-accent-legal/60 rounded-full animate-fade-in-up" style={{
          animationDelay: '0.4s'
        }} />
        </div>
      </div>

      {/* Enhanced Navigation Arrows with legal styling */}
      
      
      

      {/* Enhanced Dots Indicator with legal styling */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3 p-2 rounded-xl glass-effect-legal border border-white/20">
        {carouselData.map((_, index) => <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-accent-legal scale-125 shadow-lg shadow-accent-legal/50' : 'bg-white/60 hover:bg-white/80 hover:scale-110'}`} />)}
      </div>

      {/* Enhanced Progress bar with legal styling */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-background-deep/50">
        <div className="h-full bg-gradient-to-r from-accent-legal via-primary to-accent-legal transition-all duration-500 shadow-lg shadow-accent-legal/30" style={{
        width: `${(currentSlide + 1) / carouselData.length * 100}%`
      }} />
      </div>

      {/* Subtle particle effect overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-4 right-8 w-2 h-2 bg-accent-legal/40 rounded-full animate-legal-pulse" style={{
        animationDelay: '0s'
      }} />
        <div className="absolute top-12 right-16 w-1 h-1 bg-white/30 rounded-full animate-legal-pulse" style={{
        animationDelay: '1s'
      }} />
        <div className="absolute top-8 right-12 w-1.5 h-1.5 bg-accent-legal/30 rounded-full animate-legal-pulse" style={{
        animationDelay: '2s'
      }} />
      </div>
    </div>;
};