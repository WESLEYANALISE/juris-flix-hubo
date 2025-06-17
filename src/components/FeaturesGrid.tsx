
import { Card, CardContent } from '@/components/ui/card';
import { useAppFunctions } from '@/hooks/useAppFunctions';
import { useNavigation } from '@/context/NavigationContext';
import { 
  Book, 
  Bot, 
  Library, 
  Headphones, 
  Play, 
  ArrowRight, 
  Scale,
  FileText,
  Calculator,
  Users,
  Briefcase,
  Search,
  BookOpen,
  Gavel,
  GraduationCap,
  Award,
  Clock,
  Target,
  Zap,
  PenTool,
  Volume2,
  Video,
  Globe
} from 'lucide-react';

const getIconForFunction = (funcao: string) => {
  const name = funcao.toLowerCase();
  if (name.includes('vade') || name.includes('mecum')) return Book;
  if (name.includes('audio') || name.includes('áudio')) return Headphones;
  if (name.includes('biblioteca')) return Library;
  if (name.includes('ia') || name.includes('juridica') || name.includes('inteligência')) return Bot;
  if (name.includes('calculadora')) return Calculator;
  if (name.includes('simulado') || name.includes('questões') || name.includes('questoes')) return Target;
  if (name.includes('petições') || name.includes('peticoes')) return Briefcase;
  if (name.includes('jurisprudência') || name.includes('jurisprudencia')) return Scale;
  if (name.includes('dicionário') || name.includes('dicionario')) return BookOpen;
  if (name.includes('tribunal') || name.includes('juiz')) return Gavel;
  if (name.includes('pesquisa')) return Search;
  if (name.includes('comunidade')) return Users;
  if (name.includes('curso') || name.includes('aula')) return GraduationCap;
  if (name.includes('certificado') || name.includes('diploma')) return Award;
  if (name.includes('cronômetro') || name.includes('tempo')) return Clock;
  if (name.includes('redação') || name.includes('redacao')) return PenTool;
  if (name.includes('podcast') || name.includes('som')) return Volume2;
  if (name.includes('video') || name.includes('vídeo')) return Video;
  if (name.includes('portal') || name.includes('site')) return Globe;
  if (name.includes('quiz') || name.includes('teste')) return Zap;
  return Play;
};

const getColorForFunction = (index: number) => {
  const colors = [
    'from-red-500/90 to-red-600/90',
    'from-blue-500/90 to-blue-600/90',
    'from-emerald-500/90 to-emerald-600/90',
    'from-purple-500/90 to-purple-600/90',
    'from-amber-500/90 to-amber-600/90',
    'from-pink-500/90 to-pink-600/90',
    'from-indigo-500/90 to-indigo-600/90',
    'from-teal-500/90 to-teal-600/90',
    'from-orange-500/90 to-orange-600/90',
    'from-cyan-500/90 to-cyan-600/90',
    'from-lime-500/90 to-lime-600/90',
    'from-rose-500/90 to-rose-600/90'
  ];
  return colors[index % colors.length];
};

export const FeaturesGrid = () => {
  const { functions, loading } = useAppFunctions();
  const { setCurrentFunction } = useNavigation();

  const handleFunctionClick = (funcao: string) => {
    setCurrentFunction(funcao);
  };

  // Sort functions by id to maintain table order
  const sortedFunctions = [...functions].sort((a, b) => a.id - b.id);

  if (loading) {
    return (
      <div className="py-12 sm:py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text">
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
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 gradient-text">
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
                className="group cursor-pointer border-border/30 bg-card/60 backdrop-blur-sm hover:bg-card/90 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl animate-scale-in overflow-hidden"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => handleFunctionClick(func.funcao)}
              >
                <CardContent className="p-4 sm:p-6 text-center relative">
                  {/* Background gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-md group-hover:shadow-lg relative`}>
                    <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white drop-shadow-sm" />
                    
                    {/* Hover arrow */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                      <ArrowRight className="h-2 w-2 sm:h-3 sm:w-3 text-red-600" />
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-2 text-foreground group-hover:text-primary transition-colors duration-300 line-clamp-2">
                    {func.funcao}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300 line-clamp-2">
                    {func.descricao || 'Funcionalidade especializada para estudos jurídicos'}
                  </p>

                  {/* Interactive border effect */}
                  <div className="absolute inset-0 rounded-lg border border-primary/0 group-hover:border-primary/20 transition-all duration-300" />
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
