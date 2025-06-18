
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  FileText, 
  Calendar, 
  Tag, 
  Trash2, 
  Edit3, 
  Save, 
  X,
  Download,
  Upload,
  Star,
  StarOff
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  category: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

const categories = [
  'Geral',
  'Direito Civil',
  'Direito Penal',
  'Direito Administrativo',
  'Direito Constitucional',
  'Direito Tributário',
  'Direito do Trabalho',
  'Videoaulas',
  'Estudos',
  'Jurisprudência'
];

export const Anotacoes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [showFavorites, setShowFavorites] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: '',
    category: 'Geral'
  });

  const { toast } = useToast();

  // Carregar anotações do localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('user-notes');
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      setNotes(parsedNotes);
      setFilteredNotes(parsedNotes);
    }
  }, []);

  // Filtrar anotações
  useEffect(() => {
    let filtered = notes;

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtro por categoria
    if (selectedCategory !== 'Todas') {
      filtered = filtered.filter(note => note.category === selectedCategory);
    }

    // Filtro por favoritos
    if (showFavorites) {
      filtered = filtered.filter(note => note.isFavorite);
    }

    setFilteredNotes(filtered);
  }, [notes, searchTerm, selectedCategory, showFavorites]);

  const saveNotesToStorage = (updatedNotes: Note[]) => {
    localStorage.setItem('user-notes', JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const createNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Título e conteúdo são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      tags: newNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      category: newNote.category,
      isFavorite: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const updatedNotes = [note, ...notes];
    saveNotesToStorage(updatedNotes);

    setNewNote({ title: '', content: '', tags: '', category: 'Geral' });
    setIsCreating(false);

    toast({
      title: "Anotação criada!",
      description: "Sua anotação foi salva com sucesso."
    });
  };

  const updateNote = (updatedNote: Note) => {
    const updatedNotes = notes.map(note => 
      note.id === updatedNote.id 
        ? { ...updatedNote, updatedAt: new Date().toISOString() }
        : note
    );
    saveNotesToStorage(updatedNotes);
    setEditingNote(null);

    toast({
      title: "Anotação atualizada!",
      description: "Suas alterações foram salvas."
    });
  };

  const deleteNote = (noteId: string) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    saveNotesToStorage(updatedNotes);

    toast({
      title: "Anotação excluída",
      description: "A anotação foi removida permanentemente."
    });
  };

  const toggleFavorite = (noteId: string) => {
    const updatedNotes = notes.map(note => 
      note.id === noteId ? { ...note, isFavorite: !note.isFavorite } : note
    );
    saveNotesToStorage(updatedNotes);
  };

  const exportNotes = () => {
    const dataStr = JSON.stringify(notes, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'minhas-anotacoes.json';
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Anotações exportadas!",
      description: "Arquivo baixado com sucesso."
    });
  };

  const importNotes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedNotes = JSON.parse(e.target?.result as string);
        if (Array.isArray(importedNotes)) {
          saveNotesToStorage([...importedNotes, ...notes]);
          toast({
            title: "Anotações importadas!",
            description: `${importedNotes.length} anotações foram adicionadas.`
          });
        }
      } catch (error) {
        toast({
          title: "Erro na importação",
          description: "Arquivo inválido ou corrompido.",
          variant: "destructive"
        });
      }
    };
    reader.readAsText(file);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold gradient-text mb-2">📝 Minhas Anotações</h1>
          <p className="text-muted-foreground">
            Organize seus estudos e conhecimentos jurídicos
          </p>
        </div>
        <div className="flex gap-2">
          <input
            type="file"
            accept=".json"
            onChange={importNotes}
            className="hidden"
            id="import-notes"
          />
          <Button
            variant="outline"
            onClick={() => document.getElementById('import-notes')?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
          <Button variant="outline" onClick={exportNotes}>
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button onClick={() => setIsCreating(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nova Anotação
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar anotações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border rounded-md bg-background"
        >
          <option value="Todas">Todas as categorias</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <Button
          variant={showFavorites ? "default" : "outline"}
          onClick={() => setShowFavorites(!showFavorites)}
        >
          <Star className="h-4 w-4 mr-2" />
          Favoritas
        </Button>

        <div className="text-sm text-muted-foreground flex items-center">
          <FileText className="h-4 w-4 mr-1" />
          {filteredNotes.length} anotações
        </div>
      </div>

      {/* Criar Nova Anotação */}
      {isCreating && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Nova Anotação
              <Button variant="ghost" size="sm" onClick={() => setIsCreating(false)}>
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Título da anotação"
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
            />
            
            <select
              value={newNote.category}
              onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
              className="w-full px-3 py-2 border rounded-md bg-background"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <Input
              placeholder="Tags (separadas por vírgula)"
              value={newNote.tags}
              onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
            />

            <Textarea
              placeholder="Conteúdo da anotação..."
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              className="min-h-[200px]"
            />

            <div className="flex gap-2">
              <Button onClick={createNote}>
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lista de Anotações */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map(note => (
          <Card key={note.id} className="group hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(note.id)}
                  >
                    {note.isFavorite ? (
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ) : (
                      <StarOff className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingNote(note)}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteNote(note.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary">{note.category}</Badge>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(note.createdAt)}
                </span>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                {note.content}
              </p>
              
              {note.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {note.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Editar Anotação */}
      {editingNote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Editar Anotação
                <Button variant="ghost" size="sm" onClick={() => setEditingNote(null)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={editingNote.title}
                onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
              />
              
              <select
                value={editingNote.category}
                onChange={(e) => setEditingNote({ ...editingNote, category: e.target.value })}
                className="w-full px-3 py-2 border rounded-md bg-background"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              <Input
                value={editingNote.tags.join(', ')}
                onChange={(e) => setEditingNote({ 
                  ...editingNote, 
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag)
                })}
                placeholder="Tags (separadas por vírgula)"
              />

              <Textarea
                value={editingNote.content}
                onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                className="min-h-[300px]"
              />

              <div className="flex gap-2">
                <Button onClick={() => updateNote(editingNote)}>
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Alterações
                </Button>
                <Button variant="outline" onClick={() => setEditingNote(null)}>
                  Cancelar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Estado vazio */}
      {filteredNotes.length === 0 && !isCreating && (
        <Card className="text-center p-12">
          <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            {notes.length === 0 ? 'Nenhuma anotação ainda' : 'Nenhuma anotação encontrada'}
          </h3>
          <p className="text-muted-foreground mb-6">
            {notes.length === 0 
              ? 'Comece criando sua primeira anotação para organizar seus estudos.'
              : 'Tente ajustar os filtros ou termos de busca.'
            }
          </p>
          {notes.length === 0 && (
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar primeira anotação
            </Button>
          )}
        </Card>
      )}
    </div>
  );
};
