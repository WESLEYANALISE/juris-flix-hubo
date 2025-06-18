
import { Videoaulas } from '@/components/Videoaulas';
import { Anotacoes } from '@/components/Anotacoes';
import { Explorar } from '@/components/Explorar';

interface AppFunctionProps {
  functionName: string | null;
}

export const AppFunction = ({ functionName }: AppFunctionProps) => {
  if (!functionName) return null;

  // Map function names to components
  const renderFunction = () => {
    const lowerFunctionName = functionName.toLowerCase();
    
    if (lowerFunctionName.includes('videoaulas') || lowerFunctionName.includes('vídeo')) {
      return <Videoaulas />;
    }
    
    if (lowerFunctionName.includes('anotações') || lowerFunctionName.includes('anotacoes')) {
      return <Anotacoes />;
    }
    
    if (lowerFunctionName.includes('explorar')) {
      return <Explorar />;
    }

    // Default fallback
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{functionName}</h2>
          <p className="text-muted-foreground">
            Esta funcionalidade está em desenvolvimento.
          </p>
        </div>
      </div>
    );
  };

  return renderFunction();
};
