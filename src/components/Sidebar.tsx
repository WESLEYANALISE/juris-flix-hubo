
import { X, Scale, Book, Bot, Library, GraduationCap, Video, Brain, FileText, Globe, Award, Users, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Book, title: 'Vade Mecum Digital', description: 'Legislação atualizada', legal: true },
  { icon: Bot, title: 'Assistente IA Jurídica', description: 'Consultas inteligentes', legal: true },
  { icon: Library, title: 'Biblioteca Jurídica', description: 'Acervo doutrinário', legal: true },
  { icon: GraduationCap, title: 'Cursos Preparatórios', description: 'Formação especializada', legal: true },
  { icon: Video, title: 'Videoaulas Premium', description: 'Conteúdo audiovisual', legal: false },
  { icon: Brain, title: 'Mapas Conceituais', description: 'Organização visual', legal: false },
  { icon: FileText, title: 'Modelos de Petições', description: 'Templates profissionais', legal: true },
  { icon: Globe, title: 'Dicionário Jurídico', description: 'Terminologia especializada', legal: true },
];

const legalStats = [
  { icon: Users, label: 'Advogados Ativos', value: '15.000+' },
  { icon: Award, label: 'Taxa de Sucesso OAB', value: '89%' },
  { icon: Clock, label: 'Suporte Jurídico', value: '24/7' },
  { icon: Shield, label: 'Conformidade LGPD', value: '100%' },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
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
      <div className={`fixed left-0 top-0 h-full w-80 bg-card/95 backdrop-blur-xl border-r border-border/50 z-50 transform transition-all duration-500 shadow-2xl ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Enhanced header */}
          <div className="flex items-center justify-between mb-8 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
                <Scale className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold gradient-text">LegalStudy Pro</h2>
                <p className="text-sm text-muted-foreground">Plataforma Jurídica</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-red-500/10">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Legal statistics */}
          <div className="mb-8 animate-slide-up">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
              Nossos Números
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {legalStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={stat.label}
                    className="p-3 rounded-lg bg-secondary/30 border border-border/30 hover:bg-secondary/50 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <Icon className="h-5 w-5 text-red-400 mb-2" />
                    <div className="text-lg font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enhanced menu items */}
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
              Ferramentas Jurídicas
            </h3>
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.title}
                  className="w-full flex items-center gap-4 p-4 rounded-xl hover:bg-secondary/50 transition-all duration-300 group hover-lift border border-transparent hover:border-red-500/20"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animation: 'slide-up 0.6s ease-out'
                  }}
                >
                  <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-md ${
                    item.legal 
                      ? 'bg-gradient-to-br from-red-600/20 to-red-700/20 group-hover:from-red-600/30 group-hover:to-red-700/30' 
                      : 'bg-secondary/50 group-hover:bg-secondary/70'
                  }`}>
                    <Icon className={`h-6 w-6 ${
                      item.legal ? 'text-red-400' : 'text-muted-foreground'
                    } group-hover:scale-110 transition-all duration-300`} />
                    
                    {/* Legal indicator */}
                    {item.legal && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    )}
                  </div>
                  
                  <div className="text-left flex-1">
                    <h3 className="font-semibold text-foreground group-hover:text-red-300 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>

                  {/* Hover indicator */}
                  <div className="w-1 h-8 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0" />
                </button>
              );
            })}
          </div>

          {/* Footer with legal notice */}
          <div className="mt-8 pt-6 border-t border-border/30 animate-fade-in-up">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Shield className="h-4 w-4 text-green-400" />
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
