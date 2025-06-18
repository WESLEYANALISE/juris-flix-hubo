
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User, Mail, CheckCircle, ExternalLink, Zap, Shield } from 'lucide-react';
import { DesktopPlatformCarousel } from '@/components/DesktopPlatformCarousel';

const formSchema = z.object({
  nome: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Digite um email válido'),
});

type FormData = z.infer<typeof formSchema>;

export const PlataformaDesktop = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      email: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    
    const scriptURL = 'https://sheetdb.io/api/v1/29eaz3rsm73qu';

    try {
      console.log('Dados originais do formulário:', data);
      
      // Formato específico para SheetDB com colunas nomeadas
      const sheetData = {
        Nome: data.nome,
        email: data.email
      };
      
      console.log('Dados formatados para SheetDB:', sheetData);
      
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify([sheetData]), // Array com o objeto formatado
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('Resposta da API:', response.status, response.statusText);

      if (response.ok) {
        const result = await response.json();
        console.log('Dados enviados com sucesso:', result);
        
        setIsSuccess(true);
        form.reset();
        
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Você receberá o link de acesso da plataforma desktop no seu email em instantes.",
        });
      } else {
        const errorText = await response.text();
        console.error('Erro na resposta:', response.status, errorText);
        throw new Error(`Erro ${response.status}: ${errorText}`);
      }

    } catch (error) {
      console.error('Erro ao enviar:', error);
      
      toast({
        variant: "destructive",
        title: "Erro ao enviar",
        description: "Tente novamente em alguns instantes.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
        <Card className="text-center border-0 bg-card/50 backdrop-blur-sm shadow-2xl">
          <CardHeader className="pb-4">
            <div className="mx-auto w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-6 animate-scale-in">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="gradient-text-legal text-3xl mb-2">
              🎉 Cadastro Realizado com Sucesso!
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              Perfeito! Seu acesso à plataforma desktop está sendo preparado.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-card/70 rounded-lg p-6 mb-6 border border-border">
              <h3 className="font-bold text-lg mb-4 text-green-400">📧 Próximos passos:</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-blue-400 font-bold text-sm">1</div>
                  <p className="text-sm text-muted-foreground">Verifique sua caixa de entrada (e spam) nos próximos minutos</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-400 font-bold text-sm">2</div>
                  <p className="text-sm text-muted-foreground">Clique no link de acesso que você receberá por email</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center text-green-400 font-bold text-sm">3</div>
                  <p className="text-sm text-muted-foreground">Acesse diretamente a plataforma completa pelo navegador!</p>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 justify-center">
              <Button 
                onClick={() => setIsSuccess(false)} 
                variant="outline"
                className="border-green-500/30 text-green-400 hover:bg-green-500/10 hover:border-green-500/50"
              >
                Fazer novo cadastro
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
      {/* Carrossel de imagens da plataforma */}
      <div className="mb-12">
        <DesktopPlatformCarousel />
      </div>

      {/* Seção de benefícios */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-2xl border border-border animate-fade-in-up">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ExternalLink className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-blue-400">Link de Acesso</h3>
          <p className="text-sm text-muted-foreground">Receba o link de acesso por email e entre direto pela web</p>
        </div>

        <div className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-2xl border border-border animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-purple-400">Acesso Imediato</h3>
          <p className="text-sm text-muted-foreground">Sem espera! Comece a usar assim que receber o link</p>
        </div>

        <div className="text-center p-6 bg-card/30 backdrop-blur-sm rounded-2xl border border-border animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-green-400">100% Seguro</h3>
          <p className="text-sm text-muted-foreground">Plataforma confiável e dados protegidos</p>
        </div>
      </div>

      {/* Formulário de cadastro */}
      <Card className="border-0 bg-card/50 backdrop-blur-sm shadow-2xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="gradient-text-legal text-3xl sm:text-4xl mb-4">
            Acesse a Versão Desktop Completa
          </CardTitle>
          <CardDescription className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed text-muted-foreground">
            Preencha os dados abaixo e receba o <strong className="text-primary">link de acesso da plataforma desktop</strong> diretamente no seu email. 
            Acesso completo a todas as funcionalidades profissionais!
          </CardDescription>
          
          {/* Banner explicativo */}
          <div className="mt-6 p-4 bg-primary/10 backdrop-blur-sm rounded-xl border border-primary/20">
            <p className="text-sm font-medium text-primary flex items-center justify-center gap-2">
              <Mail className="w-4 h-4" />
              Você receberá um email com o link de acesso da plataforma
            </p>
          </div>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-semibold flex items-center gap-2 text-base">
                        <User className="w-5 h-5 text-primary" />
                        Nome Completo
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Digite seu nome completo" 
                          {...field}
                          className="h-14 text-base bg-background/50 backdrop-blur-sm border-border focus:border-primary transition-all duration-300"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-foreground font-semibold flex items-center gap-2 text-base">
                        <Mail className="w-5 h-5 text-primary" />
                        E-mail para receber o link
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="Digite seu melhor e-mail" 
                          {...field}
                          className="h-14 text-base bg-background/50 backdrop-blur-sm border-border focus:border-primary transition-all duration-300"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full h-16 text-lg font-bold bg-gradient-to-r from-primary via-accent-legal to-primary hover:from-primary/90 hover:via-accent-legal/90 hover:to-primary/90 transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-6 h-6 mr-3 animate-spin" />
                    Enviando para seu email...
                  </>
                ) : (
                  <>
                    <ExternalLink className="w-6 h-6 mr-3" />
                    Receber Link de Acesso por Email
                  </>
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-8 p-6 bg-muted/20 backdrop-blur-sm rounded-xl border border-border">
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                ✅ Ao se cadastrar, você receberá o link de acesso por email
              </p>
              <p className="text-sm text-muted-foreground">
                🔒 Seus dados estão seguros e protegidos
              </p>
              <p className="text-sm text-muted-foreground">
                📧 Verifique também sua caixa de spam
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
