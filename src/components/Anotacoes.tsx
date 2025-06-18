
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { StickyNote, Plus, Search, Edit3, Trash2, Calendar, Clock, Tag, Save, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  category: string;
}

export const Anotacoes = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('user-notes');
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: 'geral',
    tags: ''
  });

  const { toast } = useToast();

  const categories = [
    { id: 'all', name: 'Todas', color: 'bg-slate-500' },
    { id: 'geral', name: 'Geral', color: 'bg-blue-500' },
    { id: 'estudo', name: 'Estudo', color: 'bg-green-500' },
    { id: 'trabalho', name: 'Trabalho', color: 'bg-purple-500' },
    { id: 'lembrete', name: 'Lembrete', color: 'bg-orange-500' },
    { id: 'ideia', name: 'Ideia', color: 'bg-pink-500' }
  ];

  useEffect(() => {
    localStorage.setItem('user-notes', JSON.stringify(notes));
  }, [notes]);

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSaveNote = () => {
    if (!newNote.title.trim() || !newNote.content.trim()) {
      toast({
        title: "Erro",
        description: "Título e conteúdo são obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    const note: Note = {
      id: Date.now().toString(),
      title: newNote.title,
      content: newNote.content,
      category: newNote.category,
      tags: newNote.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setNotes(prev => [note, ...prev]);
    setNewNote({ title: '', content: '', category: 'geral', tags: '' });
    setIsCreating(false);
    
    toast({
      title: "Anotação salva!",
      description: "Sua anotação foi criada com sucesso."
    });
  };

  const handleUpdateNote = () => {
    if (!editingNote || !editingNote.title.trim() || !editingNote.content.trim()) return;

    setNotes(prev => prev.map(note => 
      note.id === editingNote.id 
        ? { ...editingNote, updatedAt: new Date().toISOString() }
        : note
    ));
    setEditingNote(null);
    
    toast({
      title: "Anotação atualizada!",
      description: "Suas alterações foram salvas."
    });
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    toast({
      title: "Anotação excluída",
      description: "A anotação foi removida com sucesso."
    });
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
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1">
          <h1 className="text-3xl font-bold gradient-text mb-2 flex items-center gap-3">
            <StickyNote className="h-8 w-8 text-accent-legal" />
            Minhas Anotações
          </h1>
          <p className="text-muted-foreground">
            Organize seus pensamentos e ideias de forma eficiente
          </p>
        </div>
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-accent-legal hover:bg-accent-legal/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nova Anotação
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar anotações..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={`${selectedCategory === category.id ? category.color : ''} text-white`}
            >
              {category.name}
              {category.id !== 'all' && (
                <span className="ml-2 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                  {notes.filter(note => note.category === category.id).length}
                </span>
              )}
            </Button>
          ))}
        </div>
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingNote) && (
        <Card className="border-accent-legal/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Edit3 className="h-5 w-5" />
              {editingNote ? 'Editar Anotação' : 'Nova Anotação'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Título da anotação..."
              value={editingNote ? editingNote.title : newNote.title}
              onChange={(e) => editingNote 
                ? setEditingNote({...editingNote, title: e.target.value})
                : setNewNote({...newNote, title: e.target.value})
              }
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                className="px-3 py-2 border rounded-md bg-background"
                value={editingNote ? editingNote.category : newNote.category}
                onChange={(e) => editingNote
                  ? setEditingNote({...editingNote, category: e.target.value})
                  : setNewNote({...newNote, category: e.target.value})
                }
              >
                {categories.slice(1).map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              
              <Input
                placeholder="Tags (separadas por vírgula)"
                value={editingNote 
                  ? editingNote.tags.join(', ') 
                  : newNote.tags
                }
                onChange={(e) => editingNote
                  ? setEditingNote({...editingNote, tags: e.target.value.split(',').map(tag => tag.trim())})
                  : setNewNote({...newNote, tags: e.target.value})
                }
              />
            </div>
            
            <Textarea
              placeholder="Conteúdo da anotação..."
              value={editingNote ? editingNote.content : newNote.content}
              onChange={(e) => editingNote
                ? setEditingNote({...editingNote, content: e.target.value})
                : setNewNote({...newNote, content: e.target.value})
              }
              className="min-h-[120px]"
            />
            
            <div className="flex gap-2">
              <Button
                onClick={editingNote ? handleUpdateNote : handleSaveNote}
                className="bg-accent-legal hover:bg-accent-legal/90"
              >
                <Save className="h-4 w-4 mr-2" />
                {editingNote ? 'Atualizar' : 'Salvar'}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreating(false);
                  setEditingNote(null);
                  setNewNote({ title: '', content: '', category: 'geral', tags: '' });
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Cancelar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notes Grid */}
      {filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNotes.map(note => {
            const category = categories.find(cat => cat.id === note.category);
            return (
              <Card key={note.id} className="hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2 mb-2">
                        {note.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(note.createdAt)}</span>
                        {note.updatedAt !== note.createdAt && (
                          <>
                            <span>•</span>
                            <Clock className="h-3 w-3" />
                            <span>Editado</span>
                          </>
                        )}
                      </div>
                    </div>
                    <Badge className={`${category?.color} text-white text-xs`}>
                      {category?.name}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                    {note.content}
                  </p>
                  
                  {note.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {note.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          <Tag className="h-2 w-2 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingNote(note)}
                      className="flex-1"
                    >
                      <Edit3 className="h-3 w-3 mr-1" />
                      Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="text-center p-8">
          <StickyNote className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="font-semibold mb-2">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Nenhuma anotação encontrada' 
              : 'Suas anotações aparecerão aqui'
            }
          </h3>
          <p className="text-muted-foreground mb-4">
            {searchTerm || selectedCategory !== 'all'
              ? 'Tente ajustar os filtros ou criar uma nova anotação.'
              : 'Comece criando sua primeira anotação para organizar suas ideias.'
            }
          </p>
          {!searchTerm && selectedCategory === 'all' && (
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Criar Primeira Anotação
            </Button>
          )}
        </Card>
      )}
    </div>
  );
};
