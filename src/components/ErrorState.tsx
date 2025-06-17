
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  onGoHome?: () => void;
  showRetry?: boolean;
  showGoHome?: boolean;
}

export const ErrorState = ({
  title = "Serviço Indisponível",
  description = "Esta funcionalidade está temporariamente indisponível. Tente novamente mais tarde.",
  onRetry,
  onGoHome,
  showRetry = true,
  showGoHome = true
}: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="mb-6 p-4 rounded-full bg-destructive/10 border border-destructive/20">
        <AlertTriangle className="h-12 w-12 text-destructive" />
      </div>
      
      <h2 className="text-2xl font-bold mb-4 gradient-text-legal">
        {title}
      </h2>
      
      <p className="text-muted-foreground mb-8 max-w-md leading-relaxed">
        {description}
      </p>
      
      <div className="flex gap-4">
        {showRetry && onRetry && (
          <Button 
            onClick={onRetry}
            className="bg-primary hover:bg-primary/90"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Tentar Novamente
          </Button>
        )}
        
        {showGoHome && onGoHome && (
          <Button 
            variant="outline" 
            onClick={onGoHome}
            className="border-primary/30 hover:bg-primary/10"
          >
            <Home className="h-4 w-4 mr-2" />
            Voltar ao Início
          </Button>
        )}
      </div>
    </div>
  );
};
