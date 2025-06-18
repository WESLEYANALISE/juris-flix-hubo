
import { useNavigation } from '@/context/NavigationContext';
import { useAppFunctions } from '@/hooks/useAppFunctions';
import { 
  Scale, Bot, Library, Headphones, Brain, Monitor, 
  Play, Folder, Newspaper, Film, Award, Calendar, 
  BookOpen, GraduationCap, FileText, Search, Download, Upload, 
  Share, Heart, Star, Zap, Shield, Globe, Camera, Music, 
  Video, Image, File, Archive, Code, Database, Clock, Target, HelpCircle
} from 'lucide-react';

// Array expandido de ícones únicos
const availableIcons = [
  Scale, Bot, Library, Headphones, Brain, Monitor, Play, Folder, 
  Newspaper, Film, Award, Calendar, BookOpen, GraduationCap, FileText, 
  Search, Download, Upload, Share, Heart, Star, Zap, Shield, Globe, 
  Camera, Music, Video, Image, File, Archive, Code, Database, Clock, Target, HelpCircle
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
  if (name.includes('flashcard') || name.includes('flash card')) return Brain;
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

const getColorForIndex = (index: number) => {
  const colors = [
    'from-blue-600 to-purple-600',
    'from-green-600 to-teal-600', 
    'from-orange-600 to-red-600',
    'from-purple-600 to-pink-600',
    'from-teal-600 to-cyan-600',
    'from-red-600 to-orange-600'
  ];
  return colors[index % colors.length];
};

export const FeaturesGrid = () => {
  const { setCurrentFunction } = useNavigation();
  const { functions, loading } = useAppFunctions();

  const handleFeatureClick = (funcao: string) => {
    setCurrentFunction(funcao);
  };

  if (loading) {
    return (
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Todas as Funcionalidades</h2>
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!functions || functions.length === 0) {
    return null;
  }

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">Todas as Funcionalidades</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore nossa suíte completa de ferramentas jurídicas desenvolvidas especialmente para profissionais do Direito
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {functions.map((func, index) => {
            const Icon = getUniqueIconForFunction(func.funcao, index);
            const colorClass = getColorForIndex(index);
            
            return (
              <div
                key={func.id}
                onClick={() => handleFeatureClick(func.funcao)}
                className="group cursor-pointer bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:bg-card/80 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClass} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                  {func.funcao}
                </h3>
                
                {func.descricao && (
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {func.descricao}
                  </p>
                )}
                
                <div className="mt-4 flex items-center text-primary text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Acessar ferramenta</span>
                  <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
