
import { useAppFunctions } from '@/hooks/useAppFunctions';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const Suporte = () => {
  const { functions, loading, error } = useAppFunctions();
  
  // Encontrar o link do Suporte na tabela APP
  const suporteFunction = functions.find(func => 
    func.funcao.toLowerCase().includes('suporte')
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-red-500" />
          <p className="text-muted-foreground">Carregando suporte...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto text-center p-8">
          <h2 className="text-red-500 mb-4 font-semibold">Erro ao carregar suporte</h2>
          <p className="text-muted-foreground">{error}</p>
        </Card>
      </div>
    );
  }

  if (suporteFunction?.link && suporteFunction.link.trim() !== '') {
    return (
      <div className="h-screen w-full">
        <iframe 
          src={suporteFunction.link} 
          className="w-full h-full border-0" 
          title="Suporte"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
          loading="lazy"
        />
      </div>
    );
  }

  // Fallback para o formulário de suporte local se não houver link
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold gradient-text mb-2">Suporte ao Cliente</h1>
          <p className="text-muted-foreground">Sistema de suporte em configuração</p>
        </div>
        
        <Card className="text-center p-8">
          <h3 className="font-semibold mb-4">Suporte Temporariamente Indisponível</h3>
          <p className="text-muted-foreground mb-6">
            O sistema de suporte está sendo configurado. Entre em contato conosco pelo WhatsApp.
          </p>
          <Button 
            onClick={() => window.open('https://api.whatsapp.com/send/?phone=5511940432865&text=Ol%C3%A1%2C+preciso+de+suporte!&type=phone_number&app_absent=0', '_blank')}
            className="bg-green-500 hover:bg-green-600"
          >
            Contatar via WhatsApp
          </Button>
        </Card>
      </div>
    </div>
  );
};
