
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Library, Search, BookOpen, Download, ArrowLeft } from 'lucide-react';
import { useNavigation } from '@/context/NavigationContext';

export const Biblioteca = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { goHome } = useNavigation();

  const books = [
    { 
      title: 'Direito Civil Brasileiro', 
      author: 'Carlos Roberto Gonçalves',
      category: 'Direito Civil',
      description: 'Curso completo de Direito Civil'
    },
    { 
      title: 'Direito Penal - Parte Geral', 
      author: 'Rogério Greco',
      category: 'Direito Penal',
      description: 'Fundamentos do Direito Penal'
    },
    { 
      title: 'Curso de Direito Constitucional', 
      author: 'Alexandre de Moraes',
      category: 'Direito Constitucional',
      description: 'Princípios constitucionais fundamentais'
    },
    { 
      title: 'Direito Administrativo', 
      author: 'Hely Lopes Meirelles',
      category: 'Direito Administrativo',
      description: 'Administração Pública e seus princípios'
    }
  ];

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Library className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold gradient-text">Biblioteca Jurídica</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Acervo completo de livros, doutrinas e jurisprudências organizadas
        </p>
      </div>

      {/* Busca */}
      <div className="relative max-w-md mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Buscar livros, autores ou categorias..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Grid de Livros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1">{book.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">por {book.author}</p>
                  <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded mt-2">
                    {book.category}
                  </span>
                </div>
                <BookOpen className="h-6 w-6 text-primary flex-shrink-0" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{book.description}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <BookOpen className="h-4 w-4 mr-1" />
                  Ler
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

      {filteredBooks.length === 0 && (
        <Card className="text-center p-12">
          <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Nenhum livro encontrado</h3>
          <p className="text-muted-foreground">
            Tente ajustar os termos de busca para encontrar o que procura.
          </p>
        </Card>
      )}
    </div>
  );
};
