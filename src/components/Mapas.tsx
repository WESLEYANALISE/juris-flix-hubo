
import { Brain, Plus, Share, Download, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Mapas = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Brain className="h-16 w-16 text-accent-legal" />
        </div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Mapas Mentais</h1>
        <p className="text-muted-foreground text-lg">
          Visualize e organize conhecimentos de forma estruturada
        </p>
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar mapas mentais..."
            className="pl-10"
          />
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Criar Mapa
        </Button>
      </div>

      {/* Mind Maps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[
          {
            title: 'Processo Civil - Petição Inicial',
            area: 'Direito Processual Civil',
            nodes: 24,
            color: 'bg-blue-50 border-blue-200',
            preview: '🏛️'
          },
          {
            title: 'Crimes contra a Honra',
            area: 'Direito Penal',
            nodes: 18,
            color: 'bg-red-50 border-red-200',
            preview: '⚖️'
          },
          {
            title: 'Contratos - Classificação',
            area: 'Direito Civil',
            nodes: 32,
            color: 'bg-green-50 border-green-200',
            preview: '📋'
          },
          {
            title: 'FGTS e Rescisão',
            area: 'Direito Trabalhista',
            nodes: 21,
            color: 'bg-amber-50 border-amber-200',
            preview: '👷'
          },
          {
            title: 'Licitações - Modalidades',
            area: 'Direito Administrativo',
            nodes: 15,
            color: 'bg-purple-50 border-purple-200',
            preview: '🏛️'
          },
          {
            title: 'ICMS - Incidência',
            area: 'Direito Tributário',
            nodes: 28,
            color: 'bg-orange-50 border-orange-200',
            preview: '💰'
          }
        ].map((mapa, index) => (
          <Card key={index} className={`hover:shadow-lg transition-all duration-300 cursor-pointer border-2 ${mapa.color}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2 mb-2">{mapa.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{mapa.area}</p>
                  <p className="text-xs text-accent-legal font-medium mt-1">
                    {mapa.nodes} conceitos
                  </p>
                </div>
                <span className="text-2xl">{mapa.preview}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  Visualizar
                </Button>
                <Button variant="outline" size="sm">
                  <Share className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="text-center p-6">
          <Brain className="h-12 w-12 mx-auto mb-4 text-accent-legal" />
          <h3 className="font-semibold mb-2">Organização Visual</h3>
          <p className="text-sm text-muted-foreground">
            Estruture conhecimentos de forma hierárquica e visual
          </p>
        </Card>
        <Card className="text-center p-6">
          <Share className="h-12 w-12 mx-auto mb-4 text-accent-legal" />
          <h3 className="font-semibold mb-2">Colaboração</h3>
          <p className="text-sm text-muted-foreground">
            Compartilhe e colabore em mapas mentais com outros usuários
          </p>
        </Card>
        <Card className="text-center p-6">
          <Download className="h-12 w-12 mx-auto mb-4 text-accent-legal" />
          <h3 className="font-semibold mb-2">Export</h3>
          <p className="text-sm text-muted-foreground">
            Exporte seus mapas em diversos formatos (PDF, PNG, etc.)
          </p>
        </Card>
      </div>

      {/* Development Notice */}
      <Card className="bg-accent-legal/5 border-accent-legal/20">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold mb-2">Em Desenvolvimento</h3>
          <p className="text-muted-foreground">
            Ferramenta de criação de mapas mentais interativos está sendo desenvolvida para facilitar seus estudos.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
