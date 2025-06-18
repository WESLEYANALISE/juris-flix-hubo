
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Search, Edit, Trash2, Save, X, Tag, Calendar, FileText, Bold, Italic, List, Hash } from 'lucide-react';
import { useNavigation } from '@/context/NavigationContext';
import { useToast } from '@/hooks/use-toast';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  category: string;
  createdAt: string;
  updatedAt: string;
}

export const Anotacoes = () => {
  const { setCurrentFunction } = useNavigation();
  const { toast } = useToast();
  
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('user-notes');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: '',
    category: ''
  });

  const categories = ['Direito Civil', 'Direito Penal', 'Direito Constitucional', 'Direito Administrativo', 'Direito Tributário', 'Direito Trabalhista', 'Outros'];
  
  const allTags = [...new Set(notes.flatMap(note => note.tags))];

  useEffect(() => {
    localStorage.setItem('user-notes', JSON.stringify(notes));
  }, [notes]);

  const handleBack = () => {
    setCurrentFunction(null);
  };

  const handleSaveNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Título e conteúdo são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const noteData: Note = {
      id: editingNote?.id || Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      tags: newNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      category: newNote.category || 'Outros',
      createdAt: editingNote?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (editingNote) {
      setNotes(notes.map(note => note.id === editingNote.id ? noteData : note));
      toast({
        title: "Anotação atualizada!",
        description: "Sua anotação foi atualizada com sucesso."
      });
    } else {
      setNotes([noteData, ...notes]);
      toast({
        title: "Anotação criada!",
        description: "Sua anotação foi criada com sucesso."
      });
    }

    setNewNote({ title: '', content: '', tags: '', category: '' });
    setIsCreating(false);
    setEditingNote(null);
  };

  const handleEditNote = (note: Note) => {
    setEditingNote(note);
    setNewNote({
      title: note.title,
      content: note.content,
      tags: note.tags.join(', '),
      category: note.category
    });
    setIsCreating(true);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    toast({
      title: "Anotação excluída",
      description: "A anotação foi excluída com sucesso."
    });
  };

  const formatContent = (content: string, format: string) => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);

    let formattedText = '';
    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`;
        break;
      case 'italic':
        formattedText = `*${selectedText}*`;
        break;
      case 'list':
        formattedText = `\n• ${selectedText}`;
        break;
      default:
        formattedText = selectedText;
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setNewNote({ ...newNote, content: newContent });
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || note.category === selectedCategory;
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(tag => note.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });

  if (isCreating) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" onClick={() => { setIsCreating(false); setEditingNote(null); setNewNote({ title: '', content: '', tags: '', category: '' }); }} size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold gradient-text">
            {editingNote ? 'Editar Anotação' : 'Nova Anotação'}
          </h1>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Título</label>
              <Input
                placeholder="Título da anotação"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Categoria</label>
              <select
                className="w-full p-2 border rounded-lg"
                value={newNote.category}
                onChange={(e) => setNewNote({ ...newNote, category: e.target.value })}
              >
                <option value="">Selecione uma categoria</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Tags</label>
              <Input
                placeholder="Tags separadas por vírgula (ex: importante, revisão, prova)"
                value={newNote.tags}
                onChange={(e) => setNewNote({ ...newNote, tags: e.target.value })}
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">Conteúdo</label>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => formatContent(newNote.content, 'bold')}
                  >
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => formatContent(newNote.content, 'italic')}
                  >
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => formatContent(newNote.content, 'list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <Textarea
                placeholder="Digite sua anotação aqui... Você pode usar **negrito**, *itálico* e • listas"
                value={newNote.content}
                onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                className="min-h-[300px]"
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={handleSaveNote} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Salvar Anotação
              </Button>
              <Button 
                variant="outline" 
                onClick={() => { setIsCreating(false); setEditingNote(null); setNewNote({ title: '', content: '', tags: '', category: '' }); }}
              >
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={handleBack} size="sm">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold gradient-text mb-2">📝 Minhas Anotações</h1>
          <p className="text-muted-foreground">
            Organize seus estudos com anotações inteligentes
          </p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Nova Anotação
        </Button>
      </div>

      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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
          className="p-2 border rounded-lg"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Todas as categorias</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <div className="flex gap-2 flex-wrap">
          {allTags.slice(0, 5).map(tag => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => {
                if (selectedTags.includes(tag)) {
                  setSelectedTags(selectedTags.filter(t => t !== tag));
                } else {
                  setSelectedTags([...selectedTags, tag]);
                }
              }}
            >
              <Hash className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Lista de Anotações */}
      {filteredNotes.length === 0 ? (
        <Card className="text-center p-8">
          <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-semibold mb-2">Nenhuma anotação encontrada</h3>
          <p className="text-muted-foreground mb-4">
            {notes.length === 0 
              ? 'Comece criando sua primeira anotação!' 
              : 'Tente ajustar os filtros de busca.'
            }
          </p>
          {notes.length === 0 && (
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar primeira anotação
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">{note.category}</Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(note.updatedAt).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEditNote(note)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteNote(note.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {note.content.replace(/[*#•]/g, '').substring(0, 150)}...
                </p>
                
                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {note.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        <Tag className="h-2 w-2 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                    {note.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{note.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Estatísticas */}
      {notes.length > 0 && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent-legal">{notes.length}</div>
              <div className="text-sm text-muted-foreground">Total de Anotações</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent-legal">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Categorias</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent-legal">{allTags.length}</div>
              <div className="text-sm text-muted-foreground">Tags Únicas</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent-legal">
                {notes.filter(note => {
                  const today = new Date();
                  const noteDate = new Date(note.updatedAt);
                  return today.toDateString() === noteDate.toDateString();
                }).length}
              </div>
              <div className="text-sm text-muted-foreground">Editadas Hoje</div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
