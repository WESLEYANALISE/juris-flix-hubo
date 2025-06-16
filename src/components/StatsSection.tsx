
import { Users, BookOpen, Award, Clock } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '50.000+',
    label: 'Estudantes Ativos',
    color: 'text-blue-400'
  },
  {
    icon: BookOpen,
    value: '10.000+',
    label: 'Materiais de Estudo',
    color: 'text-green-400'
  },
  {
    icon: Award,
    value: '85%',
    label: 'Taxa de Aprovação OAB',
    color: 'text-amber-400'
  },
  {
    icon: Clock,
    value: '24/7',
    label: 'Suporte Disponível',
    color: 'text-purple-400'
  }
];

export const StatsSection = () => {
  return (
    <div className="py-16 px-4 md:px-8 bg-card/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-secondary/50 rounded-full flex items-center justify-center">
                    <Icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
