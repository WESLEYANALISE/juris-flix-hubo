
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/context/NavigationContext';
import { useAppFunctions } from '@/hooks/useAppFunctions';
import { 
  ChevronLeft,
  ChevronRight,
  GitBranch,
  Scale,
  Bot,
  Headphones,
  Library,
  Monitor,
  Play,
  Folder,
  Newspaper,
  Film,
  Brain,
  BookOpen,
  FileText,
  Search,
  GraduationCap,
  Calendar,
  Clock,
  Award,
  Target,
  Bookmark,
  Download,
  Upload,
  Share,
  Heart,
  Star,
  Zap,
  Shield,
  Globe,
  Camera,
  Music,
  Video,
  Image,
  File,
  Archive,
  Code,
  Database
} from 'lucide-react';

// Array expandido de ícones únicos
const availableIcons = [
  Scale, Bot, Library, Headphones, GitBranch, Monitor, Play, Folder, 
  Newspaper, Film, Brain, BookOpen, FileText, Search, GraduationCap, 
  Calendar, Clock, Award, Target, Bookmark, Download, Upload, Share, 
  Heart, Star, Zap, Shield, Globe, Camera, Music, Video, Image, 
  File, Archive, Code, Database
];

// Get first 8 most common functions for quick access
const getMostUsedFunctions = (functions: any[]) => {
  return functions.slice(0, 8); // First 8 functions from table
};

const getColorForIndex = (index: number) => {
  const colors = [
    'gradient-legal',     // Gold for legal content
    'gradient-ai',        // Cyan for AI/tech
    'gradient-study',     // Blue for study materials
    'gradient-media',     // Purple for media content
    'gradient-docs',      // Green for documents
    'gradient-legal',     // Back to gold
    'gradient-ai',        // Cyan
    'gradient-study'      // Blue
  ];
  return colors[index % colors.length];
};

const getUniqueIconForFunction = (funcao: string, index: number) => {
  const name = funcao.toLowerCase();
  
  // Mapeamento específico para funções principais
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
  if (name.includes('simulado') || name.includes('prova')) return Award;
  if (name.includes('calendario') || name.includes('agenda')) return Calendar;
  if (name.includes('curso') || name.includes('aula')) return GraduationCap;
  if (name.includes('pesquisa') || name.includes('busca')) return Search;
  if (name.includes('documento') || name.includes('texto')) return FileText;
  if (name.includes('download') || name.includes('baixar')) return Download;
  if (name.includes('upload') || name.includes('enviar')) return Upload;
  if (name.includes('compartilhar') || name.includes('share')) return Share;
  if (name.includes('favorito') || name.includes('favoritar')) return Heart;
  if (name.includes('avaliação') || name.includes('rating')) return Star;
  if (name.includes('rápido') || name.includes('express')) return Zap;
  if (name.includes('segurança') || name.includes('security')) return Shield;
  if (name.includes('web') || name.includes('site')) return Globe;
  if (name.includes('imagem') || name.includes('foto')) return Camera;
  if (name.includes('música') || name.includes('music')) return Music;
  if (name.includes('arquivo') || name.includes('file')) return Archive;
  if (name.includes('código') || name.includes('programação')) return Code;
  if (name.includes('banco') || name.includes('dados')) return Database;
  
  // Se não encontrar correspondência específica, usa um ícone único baseado no índice
  return availableIcons[index % availableIcons.length] || Scale;
};

export const QuickAccessSection = () => {
  const { setCurrentFunction } = useNavigation();
  const { functions, loading } = useAppFunctions();
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleQuickAccess = (funcao: string) => {
    setCurrentFunction(funcao);
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -160, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 160, behavior: 'smooth' });
    }
  };

  const quickAccessFunctions = getMostUsedFunctions(functions);

  if (loading || quickAccessFunctions.length === 0) {
    return null;
  }

  return (
    <section className="py-6 sm:py-8 px-4 md:px-8 bg-gradient-to-b from-background/50 to-background animate-slide-up-legal">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-4 sm:mb-6 animate-fade-in-legal">
          <h2 className="text-lg sm:text-xl font-bold mb-2 gradient-text-legal animate-legal-text-glow">
            Acesso Rápido
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            Funcionalidades mais utilizadas por profissionais do Direito
          </p>
        </div>

        <div className="relative">
          {/* Enhanced navigation buttons with legal styling and animations */}
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 glass-effect-legal hover:bg-background border border-border/50 shadow-lg h-8 w-8 hidden sm:flex hover-glow-legal animate-legal-float"
          >
            <ChevronLeft className="h-4 w-4 animate-legal-icon-float" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 glass-effect-legal hover:bg-background border border-border/50 shadow-lg h-8 w-8 hidden sm:flex hover-glow-legal animate-legal-float"
          >
            <ChevronRight className="h-4 w-4 animate-legal-icon-float" />
          </Button>

          {/* Enhanced carousel container with legal animations */}
          <div 
            ref={scrollRef}
            className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide py-2 px-2 sm:px-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {quickAccessFunctions.map((func, index) => {
              const colorClass = getColorForIndex(index);
              const Icon = getUniqueIconForFunction(func.funcao, index);
              
              return (
                <div
                  key={func.id}
                  className="flex-shrink-0 group cursor-pointer animate-bounce-in-legal"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleQuickAccess(func.funcao)}
                >
                  <div className="flex flex-col items-center gap-2">
                    {/* Enhanced circular button with legal styling and animations */}
                    <div className={`
                      w-14 h-14 sm:w-16 sm:h-16 rounded-full ${colorClass}
                      flex items-center justify-center card-depth-2 hover-lift-legal
                      group-hover:scale-110 transition-all duration-500 
                      border border-white/20 group-hover:border-white/50
                      relative overflow-hidden animate-legal-shimmer
                    `}>
                      {/* Enhanced background glow effect */}
                      <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-legal-glow" />
                      
                      <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-amber-400 drop-shadow-lg relative z-10 group-hover:animate-legal-icon-glow" />
                      
                      {/* Professional glow ring with animation */}
                      <div className="absolute inset-0 rounded-full border-2 border-white/0 group-hover:border-white/40 transition-all duration-500 animate-legal-ring" />
                      
                      {/* Legal sparkle effect */}
                      <div className="absolute top-1 right-1 w-2 h-2 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 animate-legal-sparkle transition-opacity duration-500" />
                    </div>
                    
                    {/* Enhanced label with legal typography and animations */}
                    <span className="text-xs font-medium text-center text-foreground group-hover:text-primary transition-all duration-500 max-w-[4rem] sm:max-w-[5rem] line-clamp-2-fade group-hover:animate-legal-text-glow group-hover:scale-105">
                      {func.funcao.split(' ').slice(0, 2).join(' ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
