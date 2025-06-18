
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, RotateCcw, Check, X, ArrowLeft } from 'lucide-react';
import { useNavigation } from '@/context/NavigationContext';

export const Flashcards = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const { goHome } = useNavigation();

  const flashcards = [
    {
      question: "O que é o princípio da legalidade?",
      answer: "Ninguém será obrigado a fazer ou deixar de fazer alguma coisa senão em virtude de lei.",
      area: "Direito Constitucional"
    },
    {
      question: "Qual é o prazo prescricional para crimes punidos com reclusão de 4 a 8 anos?",
      answer: "12 anos, conforme o artigo 109, III do Código Penal.",
      area: "Direito Penal"
    },
    {
      question: "O que caracteriza a boa-fé objetiva?",
      answer: "Padrão de conduta baseado na honestidade, lealdade e consideração pelos interesses da outra parte.",
      area: "Direito Civil"
    }
  ];

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentCard((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setShowAnswer(false);
    setCurrentCard((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Brain className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">Flashcards Inteligentes</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Sistema de repetição espaçada para memorização eficaz de conceitos jurídicos
        </p>
      </div>

      {/* Progresso */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">
            Cartão {currentCard + 1} de {flashcards.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {flashcards[currentCard].area}
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentCard + 1) / flashcards.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <Card className="mb-6 min-h-[300px] flex flex-col">
        <CardContent className="flex-1 flex items-center justify-center p-8">
          <div className="text-center">
            {!showAnswer ? (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Pergunta</h2>
                <p className="text-lg leading-relaxed">{flashcards[currentCard].question}</p>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-semibold mb-4 text-green-600">Resposta</h2>
                <p className="text-lg leading-relaxed">{flashcards[currentCard].answer}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Controles */}
      <div className="flex flex-col gap-4">
        {/* Botão para mostrar resposta */}
        <Button 
          onClick={toggleAnswer}
          className="w-full"
          variant={showAnswer ? "secondary" : "default"}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          {showAnswer ? "Ver Pergunta" : "Ver Resposta"}
        </Button>

        {/* Navegação e avaliação */}
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            className="flex-1"
          >
            Anterior
          </Button>
          
          {showAnswer && (
            <>
              <Button 
                variant="outline" 
                onClick={handleNext}
                className="flex-1"
                size="sm"
              >
                <X className="h-4 w-4 mr-1" />
                Difícil
              </Button>
              <Button 
                variant="default" 
                onClick={handleNext}
                className="flex-1"
                size="sm"
              >
                <Check className="h-4 w-4 mr-1" />
                Fácil
              </Button>
            </>
          )}
          
          <Button 
            variant="outline" 
            onClick={handleNext}
            className="flex-1"
          >
            Próximo
          </Button>
        </div>
      </div>
    </div>
  );
};
