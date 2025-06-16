
import { Users, BookOpen, Award, Clock } from 'lucide-react';

const stats = [{
  icon: Users,
  value: '50.000+',
  label: 'Estudantes Ativos',
  color: 'text-blue-400'
}, {
  icon: BookOpen,
  value: '10.000+',
  label: 'Materiais de Estudo',
  color: 'text-green-400'
}, {
  icon: Award,
  value: '85%',
  label: 'Taxa de Aprovação OAB',
  color: 'text-amber-400'
}, {
  icon: Clock,
  value: '24/7',
  label: 'Suporte Disponível',
  color: 'text-purple-400'
}];

export const StatsSection = () => {
  return (
    <section className="py-16 px-4 md:px-8 animate-fade-in-up">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-2xl glass-effect hover:bg-white/5 transition-all duration-500 hover:scale-105 animate-scale-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 mb-4 ${stat.color} group-hover:scale-110 transition-all duration-300`}>
                  <Icon className="h-8 w-8" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-red-300 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 font-medium">
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
