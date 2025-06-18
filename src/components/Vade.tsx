
import { Scale, Search, BookOpen, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Vade = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Scale className="h-16 w-16 text-accent-legal" />
        </div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Vade Mecum</h1>
        <p className="text-muted-foreground text-lg">
          Acesso rápido às principais leis e códigos brasileiros
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar lei, artigo ou código..."
            className="pl-10 h-12 text-lg"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'Constituição Federal', icon: BookOpen, color: 'text-red-600' },
          { name: 'Código Civil', icon: FileText, color: 'text-blue-600' },
          { name: 'Código Penal', icon: Scale, color: 'text-amber-600' },
          { name: 'CLT', icon: FileText, color: 'text-green-600' },
          { name: 'Código de Processo Civil', icon: BookOpen, color: 'text-purple-600' },
          { name: 'Código de Processo Penal', icon: Scale, color: 'text-orange-600' }
        ].map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.name} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
              <CardHeader className="text-center">
                <Icon className={`h-12 w-12 mx-auto mb-2 ${category.color}`} />
                <CardTitle className="text-lg">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">
                  Acessar
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Development Notice */}
      <Card className="mt-8 bg-accent-legal/5 border-accent-legal/20">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold mb-2">Em Desenvolvimento</h3>
          <p className="text-muted-foreground">
            Esta funcionalidade está sendo desenvolvida e em breve estará disponível com acesso completo aos códigos e leis.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
