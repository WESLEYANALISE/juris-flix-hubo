
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
    <section className="py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
            Resultados que Falam por Si
          </h2>
          <p className="text-muted-foreground text-lg">
            A confiança de milhares de profissionais do Direito
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="text-center p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/30 hover:bg-card/50 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-600/20 to-red-700/20 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
