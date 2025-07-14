import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Headphones, ArrowRight, Play, Volume2, Clock, Star } from 'lucide-react';

export const AudioAulasSection = () => {
  const audioAulas = [
    {
      id: 1,
      title: "Direito Civil - Contratos",
      duration: "2h 30min",
      professor: "Dr. João Silva",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Direito Penal - Crimes",
      duration: "3h 15min",
      professor: "Dra. Maria Santos",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400&h=300&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Direito Constitucional",
      duration: "2h 45min",
      professor: "Prof. Carlos Lima",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center"
    }
  ];

  return (
    <section className="py-12 px-4 md:px-8 bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background opacity-60" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header section similar to reference image */}
        <div className="text-center mb-12 animate-fade-in-legal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20">
              <Headphones className="h-6 w-6 text-primary animate-legal-icon-glow" />
            </div>
            <h2 className="text-3xl font-bold gradient-text-legal">
              Áudio-aulas Especializadas
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conteúdo em áudio para estudo em qualquer lugar
          </p>
        </div>

        {/* Audio lessons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {audioAulas.map((aula, index) => (
            <Card 
              key={aula.id} 
              className="group card-legal hover-lift-legal animate-bounce-in-legal cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                {/* Image section */}
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={aula.image} 
                    alt={aula.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                      <Play className="h-8 w-8 text-background ml-1" />
                    </div>
                  </div>
                  
                  {/* Duration badge */}
                  <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {aula.duration}
                  </div>
                </div>

                {/* Content section */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {aula.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {aula.professor}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm font-medium">{aula.rating}</span>
                    </div>
                    
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="text-primary hover:text-primary hover:bg-primary/10 p-1 h-8 w-8"
                    >
                      <Volume2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center">
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Ver Todas as Áudio-aulas
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};