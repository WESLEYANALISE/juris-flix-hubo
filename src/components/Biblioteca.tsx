
import { Library, Search, BookOpen, Download, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Biblioteca = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Library className="h-16 w-16 text-accent-legal" />
        </div>
        <h1 className="text-3xl font-bold gradient-text mb-2">Biblioteca Jurídica</h1>
        <p className="text-muted-foreground text-lg">
          Acervo completo de livros, artigos e documentos jurídicos
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar livros, artigos ou autores..."
            className="pl-10 h-12 text-lg"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { name: 'Direito Civil', count: '1.2k livros', color: 'bg-blue-50 text-blue-700 border-blue-200' },
          { name: 'Direito Penal', count: '856 livros', color: 'bg-red-50 text-red-700 border-red-200' },
          { name: 'Direito Trabalhista', count: '643 livros', color: 'bg-green-50 text-green-700 border-green-200' },
          { name: 'Direito Constitucional', count: '432 livros', color: 'bg-amber-50 text-amber-700 border-amber-200' }
        ].map((category) => (
          <Card key={category.name} className={`hover:shadow-lg transition-all duration-300 cursor-pointer border-2 ${category.color}`}>
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">{category.name}</h3>
              <p className="text-sm opacity-70">{category.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Featured Books */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Livros em Destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Manual de Direito Civil', author: 'Flávio Tartuce', area: 'Direito Civil' },
            { title: 'Direito Penal Esquematizado', author: 'Rogério Sanches', area: 'Direito Penal' },
            { title: 'CLT Comentada', author: 'Mauricio Godinho', area: 'Direito do Trabalho' }
          ].map((book, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2 mb-2">{book.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">por {book.author}</p>
                    <p className="text-xs text-accent-legal font-medium mt-1">{book.area}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Ler
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Development Notice */}
      <Card className="bg-accent-legal/5 border-accent-legal/20">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold mb-2">Em Desenvolvimento</h3>
          <p className="text-muted-foreground">
            Nossa biblioteca está sendo desenvolvida com milhares de livros e artigos jurídicos para seus estudos.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
