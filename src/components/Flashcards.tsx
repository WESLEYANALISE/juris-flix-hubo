
import { ArrowLeft, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/context/NavigationContext';

export const Flashcards = () => {
  const { setCurrentFunction } = useNavigation();

  const handleBack = () => {
    setCurrentFunction(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </div>

        <div className="text-center py-20">
          <Brain className="h-16 w-16 mx-auto text-purple-500 mb-6" />
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Flashcards</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Memorize conceitos jurídicos importantes com nossos flashcards interativos. 
            Aprenda de forma eficiente e reforce seu conhecimento.
          </p>
        </div>
      </div>
    </div>
  );
};
