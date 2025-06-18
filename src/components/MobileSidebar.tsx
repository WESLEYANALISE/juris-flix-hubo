
import { X, Home, Scale, Headphones, Library, Bot, User, Settings, HelpCircle, 
         GitBranch, Monitor, Play, Folder, Newspaper, Film, Brain, BookOpen, 
         FileText, Search, GraduationCap, Calendar, Clock, Award, Target,
         Bookmark, Download, Upload, Share, Heart, Star, Zap, Shield,
         Globe, Camera, Music, Video, Image, File, Archive, Code,
         Database, Server, Wifi, Lock, Key, Eye, EyeOff, Trash,
         Edit, Copy, Clipboard, Printer, ScanLine, Phone, Mail,
         MessageCircle, Bell, Flag, Tag, Hash, AtSign, Percent,
         DollarSign, Euro, PoundSterling, CreditCard, ShoppingCart, Package,
         Truck, Map, MapPin, Navigation, Compass, Route, Car,
         Plane, Ship, Train, Bus, Bike, Footprints, Clock3, Timer,
         Watch, AlarmClock, Calendar as CalendarIcon, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/context/NavigationContext';
import { useAppFunctions } from '@/hooks/useAppFunctions';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// Array expandido de ícones únicos
const availableIcons = [
  Scale, Bot, Library, Headphones, GitBranch, Monitor, Play, Folder, 
  Newspaper, Film, Brain, BookOpen, FileText, Search, GraduationCap, 
  Calendar, Clock, Award, Target, Bookmark, Download, Upload, Share, 
  Heart, Star, Zap, Shield, Globe, Camera, Music, Video, Image, 
  File, Archive, Code, Database, Server, Wifi, Lock, Key, Eye, 
  EyeOff, Trash, Edit, Copy, Clipboard, Printer, ScanLine, Phone, 
  Mail, MessageCircle, Bell, Flag, Tag, Hash, AtSign, Percent, 
  DollarSign, Euro, PoundSterling, CreditCard, ShoppingCart, Package, Truck, 
  Map, MapPin, Navigation, Compass, Route, Car, Plane, Ship, Train, 
  Bus, Bike, Footprints, Clock3, Timer, Watch, AlarmClock, CalendarIcon, CalendarDays, HelpCircle
];

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
  if (name.includes('banco') && name.includes('dados')) return Database;
  if (name.includes('banco') && name.includes('questões')) return Target;
  if (name.includes('suporte')) return HelpCircle;
  
  // Se não encontrar correspondência específica, usa um ícone único baseado no índice
  return availableIcons[index % availableIcons.length] || Scale;
};

export const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const { setCurrentFunction } = useNavigation();
  const { functions } = useAppFunctions();

  const handleItemClick = (funcao: string | null) => {
    setCurrentFunction(funcao);
    onClose();
  };

  // Item inicial para Home
  const homeItem = {
    id: 'home',
    title: 'Início',
    icon: Home,
    function: null
  };

  // Items secundários (configurações, etc.)
  const secondaryMenuItems = [
    {
      id: 'profile',
      title: 'Meu Perfil',
      icon: User
    },
    {
      id: 'settings',
      title: 'Configurações',
      icon: Settings
    },
    {
      id: 'help',
      title: 'Ajuda',
      icon: HelpCircle
    }
  ];

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-card/95 backdrop-blur-xl border-l border-border/50 shadow-2xl z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/20">
          <h2 className="text-xl font-bold gradient-text">Menu</h2>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onClose}
            className="h-10 w-10 rounded-full hover:bg-primary/10 transition-all duration-300"
          >
            <X className={`h-5 w-5 transition-transform duration-300 ${isOpen ? 'rotate-0' : 'rotate-90'}`} />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[calc(100%-88px)]">
          {/* Main Menu with all functions */}
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Principal</h3>
              
              {/* Home Item */}
              <button
                onClick={() => handleItemClick(null)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 hover:bg-primary/10 hover:text-primary group transform ${
                  isOpen 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-4 opacity-0'
                }`}
                style={{
                  transitionDelay: isOpen ? `0ms` : '0ms'
                }}
              >
                <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/15 transition-all duration-300">
                  <Home className="h-5 w-5" />
                </div>
                <span className="font-medium">Início</span>
              </button>

              {/* All Functions */}
              {functions.map((func, index) => {
                const Icon = getUniqueIconForFunction(func.funcao, index);
                return (
                  <button
                    key={func.id}
                    onClick={() => handleItemClick(func.funcao)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 hover:bg-primary/10 hover:text-primary group transform ${
                      isOpen 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-4 opacity-0'
                    }`}
                    style={{
                      transitionDelay: isOpen ? `${(index + 1) * 50}ms` : '0ms'
                    }}
                  >
                    <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/15 transition-all duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium text-sm">{func.funcao}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Secondary Menu */}
          <div className="p-6 border-t border-border/20">
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">Conta</h3>
              {secondaryMenuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={onClose}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 hover:bg-primary/10 hover:text-primary group transform ${
                      isOpen 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-4 opacity-0'
                    }`}
                    style={{
                      transitionDelay: isOpen ? `${(functions.length + index + 1) * 50}ms` : '0ms'
                    }}
                  >
                    <div className="p-2 rounded-lg bg-muted/50 group-hover:bg-primary/15 transition-all duration-300">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{item.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
