
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Scale, Search, BookOpen, ArrowLeft } from 'lucide-react';
import { useNavigation } from '@/context/NavigationContext';

export const Vade = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { goHome } = useNavigation();

  const legalCodes = [
    { name: 'Constituição Federal', description: 'Carta Magna do Brasil' },
    { name: 'Código Civil', description: 'Direitos e obrigações civis' },
    { name: 'Código Penal', description: 'Crimes e contravenções' },
    { name: 'Código de Processo Civil', description: 'Processo civil brasileiro' },
    { name: 'Código de Processo Penal', description: 'Processo penal brasileiro' },
    { name: 'CLT', description: 'Consolidação das Leis do Trabalho' },
    { name: 'Código Tributário Nacional', description: 'Legislação tributária' },
    { name: 'Código de Defesa do Consumidor', description: 'Proteção ao consumidor' }
  ];

  const filteredCodes = legalCodes.filter(code =>
    code.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    code.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Scale className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">Vade Mecum Digital</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Acesse toda a legislação brasileira de forma rápida e organizada
        </p>
      </div>

      {/* Busca */}
      <div className="relative max-w-md mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Buscar código ou lei..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Grid de Códigos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCodes.map((code, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-primary" />
                <CardTitle className="text-lg">{code.name}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{code.description}</p>
              <Button variant="outline" className="w-full">
                Consultar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCodes.length === 0 && (
        <Card className="text-center p-12">
          <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Nenhum código encontrado</h3>
          <p className="text-muted-foreground">
            Tente ajustar os termos de busca para encontrar o que procura.
          </p>
        </Card>
      )}
    </div>
  );
};
