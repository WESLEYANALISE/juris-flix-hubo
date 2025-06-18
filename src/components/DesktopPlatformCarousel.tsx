
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Platform {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
}

const platforms: Platform[] = [
  {
    id: '1',
    name: 'Windows',
    description: 'Versão completa para desktop Windows',
    image: '/placeholder.svg',
    link: 'https://windows-link.com'
  },
  {
    id: '2',
    name: 'macOS',
    description: 'Versão otimizada para Mac',
    image: '/placeholder.svg',
    link: 'https://macos-link.com'
  },
  {
    id: '3',
    name: 'Linux',
    description: 'Suporte para distribuições Linux',
    image: '/placeholder.svg',
    link: 'https://linux-link.com'
  },
  {
    id: '4',
    name: 'Web App',
    description: 'Acesse direto do navegador',
    image: '/placeholder.svg',
    link: 'https://webapp-link.com'
  }
];

export const DesktopPlatformCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % platforms.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + platforms.length) % platforms.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {platforms.map((platform) => (
            <div key={platform.id} className="w-full flex-shrink-0">
              <Card className="border-0 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl">
                <CardContent className="p-12 text-center">
                  <div className="mb-8">
                    <img 
                      src={platform.image} 
                      alt={platform.name}
                      className="w-24 h-24 mx-auto mb-6 rounded-2xl object-cover"
                    />
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {platform.name}
                    </h3>
                    <p className="text-slate-300 text-lg max-w-md mx-auto mb-8">
                      {platform.description}
                    </p>
                  </div>
                  
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-accent-legal to-amber-500 hover:from-accent-legal/90 hover:to-amber-500/90 text-white px-8 py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => window.open(platform.link, '_blank')}
                  >
                    Acessar Plataforma
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 border-white/20 text-white hover:bg-black/40 hover:border-white/40"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 border-white/20 text-white hover:bg-black/40 hover:border-white/40"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {platforms.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-accent-legal shadow-lg' 
                : 'bg-slate-600 hover:bg-slate-500'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
