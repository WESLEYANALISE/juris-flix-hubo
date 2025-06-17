
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User, Mail, CheckCircle } from 'lucide-react';

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
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify({ data: data }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        setIsSuccess(true);
        form.reset();
        
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Seus dados foram enviados para nossa equipe.",
        });
      } else {
        throw new Error('Erro na resposta do servidor');
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
      <div className="max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="gradient-text text-2xl">Cadastro Realizado!</CardTitle>
            <CardDescription className="text-lg">
              Obrigado por se cadastrar na Plataforma Desktop. Nossa equipe entrará em contato em breve.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setIsSuccess(false)} 
              variant="outline"
              className="mt-4"
            >
              Fazer novo cadastro
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
      <Card className="shadow-legal">
        <CardHeader className="text-center">
          <CardTitle className="gradient-text text-2xl sm:text-3xl mb-2">
            Plataforma Desktop
          </CardTitle>
          <CardDescription className="text-base sm:text-lg">
            Cadastre-se para ter acesso completo à nossa plataforma jurídica desktop
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground font-medium flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Nome Completo
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Digite seu nome completo" 
                        {...field}
                        className="h-12 text-base"
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
                    <FormLabel className="text-foreground font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      E-mail
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="Digite seu e-mail" 
                        {...field}
                        className="h-12 text-base"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-accent-legal to-primary hover:from-accent-legal/90 hover:to-primary/90 transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Cadastrar-se'
                )}
              </Button>
            </form>
          </Form>

          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              Ao se cadastrar, você concorda com nossos termos de uso e política de privacidade.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
