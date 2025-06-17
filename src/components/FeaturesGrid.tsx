
import { Card, CardContent } from '@/components/ui/card';
import { useAppFunctions } from '@/hooks/useAppFunctions';
import { useNavigation } from '@/context/NavigationContext';
import { 
  ArrowRight, 
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
  BookOpen
} from 'lucide-react';

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
    'from-teal-500 to-green-500',
    'from-violet-500 to-purple-600',
    'from-lime-500 to-green-500',
    'from-pink-500 to-rose-600',
    'from-sky-500 to-blue-500'
  ];
  return colors[index % colors.length];
};

export const FeaturesGrid = () => {
  const { functions, loading } = useAppFunctions();
  const { setCurrentFunction } = useNavigation();

  const handleFunctionClick = (funcao: string) => {
    setCurrentFunction(funcao);
  };

  const sortedFunctions = [...functions].sort((a, b) => a.id - b.id);

  if (loading) {
    return (
      <div className="py-12 sm:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
              Ferramentas Jurídicas Profissionais
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Carregando funcionalidades...
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4 sm:p-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 bg-gray-300 rounded-xl"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent">
            Ferramentas Jurídicas Profissionais
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Acesse todas as funcionalidades desenvolvidas especialmente para profissionais e estudantes do Direito
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {sortedFunctions.map((func, index) => {
            const Icon = getIconForFunction(func.funcao);
            const colorClass = getColorForFunction(index);
            
            return (
              <Card 
                key={func.id} 
                className="group cursor-pointer border-border/30 bg-card/60 backdrop-blur-sm hover:bg-card/90 hover:border-border/60 transition-all duration-300 hover:shadow-lg hover:scale-105"
                onClick={() => handleFunctionClick(func.funcao)}
              >
                <CardContent className="p-4 sm:p-6 text-center relative">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg relative`}>
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white drop-shadow-lg" />
                    
                    {/* Enhanced hover arrow */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100 shadow-md">
                      <ArrowRight className="h-2 w-2 sm:h-3 sm:w-3 text-gray-800" />
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-2 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {func.funcao}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300 line-clamp-2">
                    {func.descricao || 'Funcionalidade especializada para estudos jurídicos'}
                  </p>

                  {/* Interactive border effect */}
                  <div className="absolute inset-0 rounded-lg border border-primary/0 group-hover:border-primary/30 transition-all duration-300" />
                  
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-primary/5 to-transparent" />
                </CardContent>
              </Card>
            );
          })}
        </div>

        {sortedFunctions.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Nenhuma função encontrada. Verifique a configuração da base de dados.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
