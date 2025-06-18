
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Search, Download, ArrowLeft } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigation } from '@/context/NavigationContext';

export const Mapas = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { goHome } = useNavigation();

  const mentalMaps = [
    {
      title: 'Princípios Constitucionais',
      description: 'Mapa mental dos princípios fundamentais da Constituição',
      area: 'Direito Constitucional',
      topics: ['Legalidade', 'Impessoalidade', 'Moralidade', 'Publicidade', 'Eficiência']
    },
    {
      title: 'Teoria do Crime',
      description: 'Elementos do crime: fato típico, antijurídico e culpável',
      area: 'Direito Penal',
      topics: ['Fato Típico', 'Antijuridicidade', 'Culpabilidade', 'Punibilidade']
    },
    {
      title: 'Contratos Civis',
      description: 'Classificação e características dos contratos',
      area: 'Direito Civil',
      topics: ['Bilaterais', 'Onerosos', 'Consensuais', 'Típicos', 'Nominados']
    },
    {
      title: 'Processo Civil',
      description: 'Fases do processo civil brasileiro',
      area: 'Direito Processual Civil',
      topics: ['Petição Inicial', 'Citação', 'Defesa', 'Instrução', 'Sentença']
    }
  ];

  const filteredMaps = mentalMaps.filter(map =>
    map.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    map.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
    map.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Brain className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">Mapas Mentais</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Visualize e organize conceitos jurídicos de forma clara e didática
        </p>
      </div>

      {/* Busca */}
      <div className="relative max-w-md mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Buscar mapas mentais..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Grid de Mapas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMaps.map((map, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1">{map.title}</CardTitle>
                  <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                    {map.area}
                  </span>
                </div>
                <Brain className="h-6 w-6 text-primary flex-shrink-0" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{map.description}</p>
              
              {/* Preview dos tópicos */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Tópicos principais:</h4>
                <div className="flex flex-wrap gap-2">
                  {map.topics.slice(0, 3).map((topic, idx) => (
                    <span key={idx} className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded">
                      {topic}
                    </span>
                  ))}
                  {map.topics.length > 3 && (
                    <span className="text-xs text-muted-foreground">
                      +{map.topics.length - 3} mais
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Brain className="h-4 w-4 mr-1" />
                  Visualizar
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Download className="h-4 w-4 mr-1" />
                  Baixar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMaps.length === 0 && (
        <Card className="text-center p-12">
          <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Nenhum mapa mental encontrado</h3>
          <p className="text-muted-foreground">
            Tente ajustar os termos de busca para encontrar o que procura.
          </p>
        </Card>
      )}
    </div>
  );
};
