
import { 
  X, Scale, Bot, Library, Headphones, Brain, Monitor, 
  Home, Star, GraduationCap, FileText, Globe, Award, 
  Users, Clock, Shield 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/context/NavigationContext';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuSections = [
  {
    title: 'Principal',
    items: [
      { icon: Home, title: 'Dashboard', function: null, color: 'text-blue-400', bgColor: 'bg-blue-500/20' },
      { icon: Star, title: 'Favoritos', function: null, color: 'text-yellow-400', bgColor: 'bg-yellow-500/20' },
    ]
  },
  {
    title: 'Ferramentas Jurídicas',
    items: [
      { icon: Scale, title: 'Vade Mecum Digital', function: 'Vade Mecum', color: 'text-amber-400', bgColor: 'bg-amber-500/20' },
      { icon: Bot, title: 'Assistente IA Jurídica', function: 'IA Jurídica', color: 'text-cyan-400', bgColor: 'bg-cyan-500/20' },
      { icon: Library, title: 'Biblioteca Jurídica', function: 'Biblioteca', color: 'text-green-400', bgColor: 'bg-green-500/20' },
      { icon: Brain, title: 'Mapas Mentais', function: 'Mapas Mentais', color: 'text-pink-400', bgColor: 'bg-pink-500/20' },
    ]
  },
  {
    title: 'Estudos e Preparação',
    items: [
      { icon: GraduationCap, title: 'Flashcards', function: 'Flashcards', color: 'text-indigo-400', bgColor: 'bg-indigo-500/20' },
      { icon: Headphones, title: 'Áudio-aulas', function: 'Áudio-aulas', color: 'text-purple-400', bgColor: 'bg-purple-500/20' },
      { icon: Monitor, title: 'Plataforma Desktop', function: 'Plataforma Desktop', color: 'text-slate-400', bgColor: 'bg-slate-500/20' },
    ]
  }
];

const legalStats = [
  { icon: Users, label: 'Advogados Ativos', value: '15.000+', color: 'text-blue-400' },
  { icon: Award, label: 'Taxa de Sucesso OAB', value: '89%', color: 'text-green-400' },
  { icon: Clock, label: 'Suporte Jurídico', value: '24/7', color: 'text-amber-400' },
  { icon: Shield, label: 'Conformidade LGPD', value: '100%', color: 'text-red-400' },
];

export const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const { setCurrentFunction } = useNavigation();

  const handleItemClick = (functionName: string | null) => {
    setCurrentFunction(functionName);
    onClose();
  };

  return (
    <>
      {/* Enhanced overlay */}
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-all duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Enhanced sidebar */}
      <div className={`fixed left-0 top-0 h-full w-80 glass-effect-legal border-r border-border/50 z-50 transform transition-all duration-500 shadow-2xl ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Enhanced header */}
          <div className="flex items-center justify-between mb-8 animate-fade-in-legal">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 gradient-legal rounded-xl flex items-center justify-center shadow-lg card-depth-2 animate-legal-shimmer">
                <Scale className="h-7 w-7 text-white animate-legal-icon-float" />
              </div>
              <div>
                <h2 className="text-xl font-bold gradient-text-legal animate-legal-text-glow">LegalStudy Pro</h2>
                <p className="text-sm text-muted-foreground">Plataforma Jurídica</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="hover:bg-red-500/10 h-10 w-10 hover:animate-legal-float"
            >
              <X className="h-5 w-5 text-muted-foreground hover:text-red-400 transition-colors duration-300" />
            </Button>
          </div>

          {/* Legal statistics */}
          <div className="mb-8 animate-slide-up-legal">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider gradient-text-legal">
              Nossos Números
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {legalStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={stat.label}
                    className="p-3 rounded-lg glass-effect-legal border border-border/30 hover:border-primary/30 transition-all duration-300 hover:animate-legal-float"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Icon className={`h-5 w-5 ${stat.color} mb-2 animate-legal-icon-float`} />
                    <div className="text-lg font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enhanced menu items */}
          <div className="space-y-6">
            {menuSections.map((section, sectionIndex) => (
              <div key={section.title} className="animate-slide-up-legal" style={{ animationDelay: `${sectionIndex * 0.1}s` }}>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wider gradient-text-legal">
                  {section.title}
                </h3>
                
                <div className="space-y-1">
                  {section.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.title}
                        variant="ghost"
                        onClick={() => handleItemClick(item.function)}
                        className="w-full justify-start gap-3 h-12 hover:bg-secondary/80 hover-glow-legal group transition-all duration-500 animate-bounce-in-legal hover:animate-legal-float px-3"
                        style={{ animationDelay: `${(sectionIndex * section.items.length + itemIndex) * 0.05}s` }}
                      >
                        <div className={`relative p-2 rounded-lg ${item.bgColor} group-hover:scale-110 transition-all duration-300`}>
                          <Icon className={`h-5 w-5 ${item.color} group-hover:animate-legal-icon-glow transition-colors duration-500`} />
                          
                          {/* Legal sparkle effect on icon */}
                          <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-primary/60 rounded-full opacity-0 group-hover:opacity-100 animate-legal-sparkle transition-opacity duration-500" />
                        </div>
                        
                        <span className="text-sm font-medium group-hover:text-primary transition-all duration-500 group-hover:animate-legal-text-glow group-hover:scale-105">
                          {item.title}
                        </span>
                        
                        {/* Enhanced hover indicator with animation */}
                        <div className="absolute right-2 w-1 h-6 bg-primary/0 group-hover:bg-primary/60 rounded-full transition-all duration-500 animate-legal-accent" />
                        
                        {/* Legal profession ripple effect */}
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 rounded-lg transition-all duration-500 animate-legal-ripple" />
                      </Button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer with legal notice */}
          <div className="mt-8 pt-6 border-t border-border/30 animate-fade-in-legal">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Shield className="h-4 w-4 text-green-400 animate-legal-icon-float" />
                <span>Certificado OAB</span>
              </div>
              <p className="text-xs text-muted-foreground/80">
                Plataforma em conformidade com as normas do Conselho Federal da OAB
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
