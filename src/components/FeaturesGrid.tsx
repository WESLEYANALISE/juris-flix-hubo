
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
  Gavel
} from 'lucide-react';

const getIconForFunction = (funcao: string) => {
  const name = funcao.toLowerCase();
  if (name.includes('vade') || name.includes('mecum')) return Book;
  if (name.includes('audio') || name.includes('áudio')) return Headphones;
  if (name.includes('biblioteca')) return Library;
  if (name.includes('ia') || name.includes('juridica') || name.includes('inteligência')) return Bot;
  if (name.includes('calculadora')) return Calculator;
  if (name.includes('simulado') || name.includes('questões')) return FileText;
  if (name.includes('petições') || name.includes('peticoes')) return Briefcase;
  if (name.includes('jurisprudência') || name.includes('jurisprudencia')) return Scale;
  if (name.includes('dicionário') || name.includes('dicionario')) return BookOpen;
  if (name.includes('tribunal') || name.includes('juiz')) return Gavel;
  if (name.includes('pesquisa')) return Search;
  if (name.includes('comunidade')) return Users;
  return Play;
};

const getColorForFunction = (index: number) => {
  const colors = [
    'from-red-600 to-red-700',
    'from-blue-600 to-blue-700',
    'from-emerald-600 to-emerald-700',
    'from-purple-600 to-purple-700',
    'from-amber-600 to-amber-700',
    'from-pink-600 to-pink-700',
    'from-indigo-600 to-indigo-700',
    'from-teal-600 to-teal-700',
    'from-orange-600 to-orange-700',
    'from-cyan-600 to-cyan-700',
    'from-lime-600 to-lime-700',
    'from-rose-600 to-rose-700'
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
      <div className="py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              Ferramentas Jurídicas Profissionais
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Carregando funcionalidades...
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="w-18 h-18 mx-auto mb-4 bg-gray-300 rounded-xl"></div>
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
    <div className="py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            Ferramentas Jurídicas Profissionais
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Acesse todas as funcionalidades desenvolvidas especialmente para profissionais e estudantes do Direito
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {sortedFunctions.map((func, index) => {
            const Icon = getIconForFunction(func.funcao);
            const colorClass = getColorForFunction(index);
            
            return (
              <Card 
                key={func.id} 
                className="group cursor-pointer border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 hover:scale-105 hover-lift hover-glow animate-scale-in ring-1 ring-red-500/20"
                style={{ animationDelay: `${index * 0.08}s` }}
                onClick={() => handleFunctionClick(func.funcao)}
              >
                <CardContent className="p-6 text-center relative overflow-hidden">
                  {/* Background gradient effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className={`w-18 h-18 mx-auto mb-4 rounded-xl bg-gradient-to-br ${colorClass} flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg group-hover:shadow-xl relative`}>
                    <Icon className="h-9 w-9 text-white drop-shadow-sm" />
                    
                    {/* Pulse indicator */}
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                    
                    {/* Hover arrow */}
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                      <ArrowRight className="h-3 w-3 text-red-600" />
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-lg mb-2 text-foreground group-hover:text-red-300 transition-colors duration-300">
                    {func.funcao}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground group-hover:text-muted-foreground/80 transition-colors duration-300 line-clamp-2">
                    {func.descricao || 'Funcionalidade especializada para estudos jurídicos'}
                  </p>

                  {/* Interactive border effect */}
                  <div className="absolute inset-0 rounded-lg border-2 border-red-500/0 group-hover:border-red-500/20 transition-all duration-500" />
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
