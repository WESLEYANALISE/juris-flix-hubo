
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
import { Brain } from 'lucide-react';

export const AppFunction = () => {
  const { currentFunction } = useNavigation();

  if (!currentFunction) return null;

  // Mapear funções para componentes
  const functionComponents: { [key: string]: JSX.Element } = {
    'Vade Mecum': <Vade />,
    'Biblioteca Jurídica': <Biblioteca />,
    'Biblioteca': <Biblioteca />,
    'Flashcards': <Flashcards />,
    'Mapas Mentais': <Mapas />,
    'Videoaulas': <Videoaulas />,
    'Áudio-aulas': <Videoaulas />, // Temporarily using Videoaulas component
    'Downloads': <Downloads />,
    'Notícias Jurídicas': <NoticiasJuridicas />,
    'Plataforma Desktop': <PlataformaDesktop />,
    'Anotações': <Anotacoes />,
    'Explorar': <Explorar />
  };

  // Verificar se a função deve usar o ícone Brain
  const shouldUseBrainIcon = (functionName: string) => {
    const brainFunctions = ['Flashcards', 'Mapas Mentais'];
    return brainFunctions.includes(functionName);
  };

  // Buscar componente baseado no nome da função
  const component = functionComponents[currentFunction];

  if (!component) {
    return (
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
    );
  }

  return component;
};
