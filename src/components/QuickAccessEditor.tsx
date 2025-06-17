
import { useState } from 'react';
import { useAppFunctions } from '@/hooks/useAppFunctions';
import { X, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/ui/drawer';

interface QuickAccessEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickAccessEditor = ({ isOpen, onClose }: QuickAccessEditorProps) => {
  const { functions } = useAppFunctions();
  const [selectedFunctions, setSelectedFunctions] = useState<number[]>(
    functions.slice(0, 7).map(f => f.id)
  );

  const toggleFunction = (id: number) => {
    setSelectedFunctions(prev => {
      if (prev.includes(id)) {
        return prev.filter(fId => fId !== id);
      } else if (prev.length < 7) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const handleSave = () => {
    // Here you would save the selected functions to localStorage or a state management solution
    console.log('Saving selected functions:', selectedFunctions);
    onClose();
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader>
          <div className="flex items-center justify-between">
            <div>
              <DrawerTitle className="gradient-text-legal">Personalizar Acesso Rápido</DrawerTitle>
              <DrawerDescription>
                Escolha até 7 funções para o acesso rápido. Você pode reordenar arrastando os itens.
              </DrawerDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DrawerHeader>

        <div className="px-4 pb-6">
          {/* Selected Functions */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3 text-primary">
              Selecionadas ({selectedFunctions.length}/7)
            </h3>
            <div className="space-y-2">
              {selectedFunctions.map((id) => {
                const func = functions.find(f => f.id === id);
                if (!func) return null;
                
                return (
                  <div
                    key={id}
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg border border-primary/20"
                  >
                    <GripVertical className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{func.funcao}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFunction(id)}
                      className="text-destructive hover:text-destructive"
                    >
                      Remover
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Available Functions */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Funções Disponíveis</h3>
            <div className="max-h-60 overflow-y-auto space-y-2">
              {functions
                .filter(f => !selectedFunctions.includes(f.id))
                .map((func) => (
                  <div
                    key={func.id}
                    className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border/50 hover:border-border transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">{func.funcao}</p>
                      <p className="text-xs text-muted-foreground">
                        {func.descricao || 'Funcionalidade jurídica'}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleFunction(func.id)}
                      disabled={selectedFunctions.length >= 7}
                      className="border-primary/50 text-primary hover:bg-primary/10"
                    >
                      Adicionar
                    </Button>
                  </div>
                ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancelar
            </Button>
            <Button onClick={handleSave} className="flex-1 btn-legal-primary">
              Salvar Alterações
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
