
import { Brain, Plus, Play, BookOpen, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const Flashcards = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Brain className="h-16 w-16 text-accent-legal" />
        </div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Flashcards</h1>
        <p className="text-muted-foreground text-lg">
          Memorização eficiente através de repetição espaçada
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Criar Deck
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Play className="h-4 w-4" />
          Estudo Rápido
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Target className="h-4 w-4" />
          Revisão
        </Button>
      </div>

      {/* Deck Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          { 
            name: 'Direito Constitucional', 
            cards: 156, 
            progress: 78, 
            color: 'bg-blue-50 border-blue-200',
            icon: '📜'
          },
          { 
            name: 'Direito Penal', 
            cards: 89, 
            progress: 45, 
            color: 'bg-red-50 border-red-200',
            icon: '⚖️'
          },
          { 
            name: 'Direito Civil', 
            cards: 234, 
            progress: 62, 
            color: 'bg-green-50 border-green-200',
            icon: '📋'
          },
          { 
            name: 'Direito Trabalhista', 
            cards: 127, 
            progress: 34, 
            color: 'bg-amber-50 border-amber-200',
            icon: '👷'
          },
          { 
            name: 'Direito Administrativo', 
            cards: 98, 
            progress: 56, 
            color: 'bg-purple-50 border-purple-200',
            icon: '🏛️'
          },
          { 
            name: 'Direito Tributário', 
            cards: 76, 
            progress: 23, 
            color: 'bg-orange-50 border-orange-200',
            icon: '💰'
          }
        ].map((deck) => (
          <Card key={deck.name} className={`hover:shadow-lg transition-all duration-300 cursor-pointer border-2 ${deck.color}`}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{deck.icon}</span>
                <div className="flex-1">
                  <CardTitle className="text-lg">{deck.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{deck.cards} cards</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progresso</span>
                    <span>{deck.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-accent-legal h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${deck.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Estudar
                  </Button>
                  <Button variant="outline" size="sm">
                    <BookOpen className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Development Notice */}
      <Card className="bg-accent-legal/5 border-accent-legal/20">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold mb-2">Em Desenvolvimento</h3>
          <p className="text-muted-foreground">
            Sistema de flashcards com repetição espaçada está sendo desenvolvido para otimizar sua memorização.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
