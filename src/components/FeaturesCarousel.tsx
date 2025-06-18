
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Brain } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  gradient: string;
}

const features: Feature[] = [
  {
    id: '1',
    title: 'Mapas Mentais',
    description: 'Visualização do conhecimento jurídico',
    icon: Brain,
    gradient: 'from-blue-600 to-purple-600'
  },
  {
    id: '2',
    title: 'Flashcards',
    description: 'Memorização eficiente de conceitos',
    icon: Brain,
    gradient: 'from-green-600 to-teal-600'
  },
  {
    id: '3',
    title: 'Videoaulas',
    description: 'Conteúdo audiovisual especializado',
    icon: Brain,
    gradient: 'from-red-600 to-pink-600'
  },
  {
    id: '4',
    title: 'Biblioteca Digital',
    description: 'Acervo completo de materiais jurídicos',
    icon: Brain,
    gradient: 'from-amber-600 to-orange-600'
  }
];

export const FeaturesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative max-w-3xl mx-auto">
      <div className="overflow-hidden rounded-2xl">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {features.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <div key={feature.id} className="w-full flex-shrink-0">
                <Card className="border-0 bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-xl">
                  <CardContent className="p-10 text-center">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mx-auto mb-6 shadow-2xl`}>
                      <IconComponent className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-slate-300 text-lg max-w-sm mx-auto">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 border-white/20 text-white hover:bg-black/40"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 border-white/20 text-white hover:bg-black/40"
        onClick={nextSlide}
      >
        <ChevronRight className="h-5 w-5" />
      </Button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {features.map((_, index) => (
          <button
            key={index}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-accent-legal scale-125' 
                : 'bg-slate-600 hover:bg-slate-500'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
