
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const carouselData = [
  {
    id: 1,
    title: "Vade Mecum Digital",
    description: "Acesse todas as leis e códigos brasileiros atualizados em um só lugar",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop",
    feature: "vade-mecum"
  },
  {
    id: 2,
    title: "Assistente IA Jurídico",
    description: "Sua inteligência artificial especializada em Direito para tirar dúvidas e elaborar peças",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&h=400&fit=crop",
    feature: "ai-assistant"
  },
  {
    id: 3,
    title: "Biblioteca Jurídica",
    description: "Milhares de livros jurídicos digitais das melhores editoras",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    feature: "books"
  },
  {
    id: 4,
    title: "OAB Simulado",
    description: "Prepare-se para o exame da OAB com milhares de questões e simulados",
    image: "https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=800&h=400&fit=crop",
    feature: "oab"
  },
  {
    id: 5,
    title: "Tribunal de Justiça",
    description: "Acesse jurisprudências, decisões e petições de todos os tribunais",
    image: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=800&h=400&fit=crop",
    feature: "petitions"
  }
];

export const FeaturesCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000);

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
      className="relative h-[500px] w-full overflow-hidden rounded-lg"
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
      <div className="relative z-10 flex h-full items-center px-8 md:px-16">
        <div className="max-w-2xl text-white animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 gradient-text">
            {currentItem.title}
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            {currentItem.description}
          </p>
          <div className="flex gap-4">
            <Button className="bg-primary hover:bg-primary/90 text-black font-semibold px-8 py-3">
              Começar Agora
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3">
              Saiba Mais
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 text-white"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {carouselData.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-primary w-8' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};
