
import { useState, useEffect } from 'react';
import { X, Scale, Bot, Library, Headphones, Monitor, Play, Folder, Newspaper, Film, Brain, BookOpen, GitBranch } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/context/NavigationContext';
import { useAppFunctions } from '@/hooks/useAppFunctions';

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
}

const getIconForFunction = (funcao: string) => {
  const name = funcao.toLowerCase();
  
  if (name.includes('vade') || name.includes('mecum')) return Scale;
  if (name.includes('assistente') && name.includes('ia')) return Bot;
  if (name.includes('biblioteca')) return Library;
  if (name.includes('audio') || name.includes('áudio')) return Headphones;
  if (name.includes('mapa') && name.includes('mental')) return Brain;
  if (name.includes('plataforma') && name.includes('desktop')) return Monitor;
  if (name.includes('flashcard') || name.includes('flash card')) return GitBranch;
  if (name.includes('resumo') || name.includes('codigo') || name.includes('código')) return BookOpen;
  if (name.includes('video') || name.includes('vídeo') || name.includes('aula')) return Play;
  if (name.includes('petições') || name.includes('peticoes') || name.includes('petição')) return Folder;
  if (name.includes('noticia') || name.includes('notícia') || name.includes('juridica')) return Newspaper;
  if (name.includes('juriflix') || name.includes('filme') || name.includes('cinema')) return Film;
  return Scale;
};

const getColorForFunction = (index: number) => {
  const colors = [
    'from-amber-500 to-yellow-600',
    'from-cyan-500 to-blue-500',
    'from-purple-500 to-purple-600',
    'from-emerald-500 to-green-600',
    'from-rose-500 to-pink-600',
    'from-indigo-500 to-blue-600',
    'from-orange-500 to-red-500',
    'from-teal-500 to-green-500'
  ];
  return colors[index % colors.length];
};

export const MobileSidebar = ({ open, onClose }: MobileSidebarProps) => {
  const { setCurrentFunction } = useNavigation();
  const { functions, loading } = useAppFunctions();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const handleFunctionClick = (funcao: string) => {
    setCurrentFunction(funcao);
    onClose();
  };

  const sortedFunctions = [...functions].sort((a, b) => a.id - b.id);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div 
        className={`fixed top-0 left-0 h-full w-80 bg-background border-r border-border z-50 transform transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center">
              <Scale className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg">LegalStudy Pro</h2>
              <p className="text-sm text-muted-foreground">Ferramentas Jurídicas</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            {loading ? (
              // Loading skeleton
              [...Array(8)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg animate-pulse">
                  <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              ))
            ) : (
              sortedFunctions.map((func, index) => {
                const Icon = getIconForFunction(func.funcao);
                const colorClass = getColorForFunction(index);
                
                return (
                  <button
                    key={func.id}
                    onClick={() => handleFunctionClick(func.funcao)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors duration-200 text-left group"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm group-hover:text-primary transition-colors duration-200 truncate">
                        {func.funcao}
                      </h3>
                      <p className="text-xs text-muted-foreground truncate">
                        {func.descricao || 'Funcionalidade jurídica especializada'}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};
