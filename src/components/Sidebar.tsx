
import { X, Scale, Book, Bot, Library, GraduationCap, Video, Brain, FileText, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: Book, title: 'Vade Mecum', description: 'Leis e códigos' },
  { icon: Bot, title: 'Assistente IA', description: 'IA Jurídica' },
  { icon: Library, title: 'Biblioteca', description: 'Livros digitais' },
  { icon: GraduationCap, title: 'Cursos', description: 'Formação completa' },
  { icon: Video, title: 'Vídeo Aulas', description: 'Conteúdo audiovisual' },
  { icon: Brain, title: 'Mapas Mentais', description: 'Resumos visuais' },
  { icon: FileText, title: 'Petições', description: 'Modelos práticos' },
  { icon: Globe, title: 'Dicionário', description: 'Termos jurídicos' },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-80 bg-card border-r border-border z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <Scale className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">LegalStudy</h2>
                <p className="text-sm text-muted-foreground">Menu Principal</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Menu Items */}
          <div className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.title}
                  className="w-full flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-all duration-200 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-10 h-10 bg-secondary/30 rounded-lg flex items-center justify-center group-hover:bg-red-600/20 transition-colors">
                    <Icon className="h-5 w-5 text-muted-foreground group-hover:text-red-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
