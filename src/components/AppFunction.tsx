
import { Vade } from '@/components/Vade';
import { Biblioteca } from '@/components/Biblioteca';
import { Flashcards } from '@/components/Flashcards';
import { Mapas } from '@/components/Mapas';
import { Videoaulas } from '@/components/Videoaulas';
import { Downloads } from '@/components/Downloads';
import { NoticiasJuridicas } from '@/components/NoticiasJuridicas';
import { PlataformaDesktop } from '@/components/PlataformaDesktop';
import { Anotacoes } from '@/components/Anotacoes';
import { Explorar } from '@/components/Explorar';
import { useNavigation } from '@/context/NavigationContext';
import { useAppFunctions } from '@/hooks/useAppFunctions';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Brain } from 'lucide-react';

export const AppFunction = () => {
  const { currentFunction, goHome } = useNavigation();
  const { functions } = useAppFunctions();

  if (!currentFunction) return null;

  // Mapear funções para componentes baseado na tabela APP
  const functionComponents: { [key: string]: JSX.Element } = {
    'Vade Mecum': <Vade />,
    'Vade Mecum Digital': <Vade />,
    'Biblioteca Jurídica': <Biblioteca />,
    'Biblioteca': <Biblioteca />,
    'Flashcards': <Flashcards />,
    'Flashcards Inteligentes': <Flashcards />,
    'Mapas Mentais': <Mapas />,
    'Videoaulas': <Videoaulas />,
    'Áudio-aulas': <Videoaulas />,
    'Áudio-aulas Especializadas': <Videoaulas />,
    'Downloads': <Downloads />,
    'Centro de Downloads': <Downloads />,
    'Notícias Jurídicas': <NoticiasJuridicas />,
    'Plataforma Desktop': <PlataformaDesktop />,
    'Anotações': <Anotacoes />,
    'Sistema de Anotações': <Anotacoes />,
    'Explorar': <Explorar />,
    'Assistente IA Jurídica': <Explorar />
  };

  // Verificar se a função deve usar o ícone Brain
  const shouldUseBrainIcon = (functionName: string) => {
    const brainFunctions = ['Flashcards', 'Flashcards Inteligentes', 'Mapas Mentais'];
    return brainFunctions.includes(functionName);
  };

  // Buscar componente baseado no nome da função
  const component = functionComponents[currentFunction];

  if (!component) {
    return (
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        {/* Botão de voltar */}
        <Button 
          variant="outline" 
          onClick={goHome}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para início
        </Button>

        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="mb-4">
              {shouldUseBrainIcon(currentFunction) ? (
                <Brain className="h-16 w-16 mx-auto text-muted-foreground" />
              ) : (
                <div className="h-16 w-16 mx-auto bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🔧</span>
                </div>
              )}
            </div>
            <h2 className="text-2xl font-bold mb-2">Função: {currentFunction}</h2>
            <p className="text-muted-foreground">Esta funcionalidade está sendo desenvolvida.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Botão de voltar para todas as funções */}
      <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        <Button 
          variant="outline" 
          onClick={goHome}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para início
        </Button>
      </div>
      
      {/* Componente da função */}
      <div className="pb-6">
        {component}
      </div>
    </div>
  );
};
