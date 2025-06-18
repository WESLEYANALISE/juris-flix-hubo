
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { Upload, MessageCircle, Clock, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface SuporteFormData {
  nome: string;
  email: string;
  assunto: string;
  descricao: string;
  imagem?: FileList;
}

export const SuporteTab = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const form = useForm<SuporteFormData>();

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      console.log('Iniciando upload da imagem:', file.name);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `suporte/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('support-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Erro no upload da imagem:', uploadError);
        return null;
      }

      const { data } = supabase.storage
        .from('support-images')
        .getPublicUrl(filePath);

      console.log('Upload concluído, URL:', data.publicUrl);
      return data.publicUrl;
    } catch (error) {
      console.error('Erro inesperado no upload:', error);
      return null;
    }
  };

  const submitToGoogleSheets = async (data: any) => {
    try {
      console.log('Enviando dados para Google Sheets:', data);
      
      // URL da sua planilha Google Sheets (substitua pela sua URL do SheetDB)
      const SHEET_URL = 'https://sheetdb.io/api/v1/YOUR_SHEET_ID';
      
      const response = await fetch(SHEET_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [{
            nome: data.nome,
            email: data.email,
            assunto: data.assunto,
            descricao: data.descricao,
            imagem_url: data.imagem_url || '',
            data_envio: data.data_envio,
            status: data.status
          }]
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const result = await response.json();
      console.log('Dados salvos com sucesso no Google Sheets:', result);
      
      return result;
    } catch (error) {
      console.error('Erro ao enviar para Google Sheets:', error);
      throw error;
    }
  };

  const submitToSupabase = async (data: any) => {
    try {
      console.log('Enviando dados para Supabase:', data);
      
      const { error } = await supabase
        .from('suporte_requests')
        .insert([data]);

      if (error) {
        console.error('Erro ao inserir no Supabase:', error);
        throw error;
      }

      console.log('Dados salvos com sucesso no Supabase');
    } catch (error) {
      console.error('Erro detalhado ao enviar para Supabase:', error);
      throw error;
    }
  };

  const onSubmit = async (data: SuporteFormData) => {
    console.log('Iniciando envio do formulário:', data);
    setIsSubmitting(true);
    
    try {
      let imageUrl = '';
      
      if (selectedImage) {
        console.log('Fazendo upload da imagem...');
        const uploadedUrl = await uploadImage(selectedImage);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
          console.log('Imagem carregada com sucesso');
        } else {
          console.warn('Falha no upload da imagem, continuando sem imagem');
          toast({
            title: "Aviso",
            description: "Não foi possível fazer upload da imagem. Enviando formulário sem imagem...",
            variant: "destructive",
          });
        }
      }

      const submitData = {
        nome: data.nome || 'Não informado',
        email: data.email || 'Não informado',
        assunto: data.assunto || 'Não informado',
        descricao: data.descricao || '',
        imagem_url: imageUrl,
        data_envio: new Date().toISOString(),
        status: 'Pendente'
      };

      console.log('Dados a serem enviados:', submitData);

      // Tentar primeiro o Google Sheets, depois Supabase como fallback
      try {
        await submitToGoogleSheets(submitData);
        console.log('Dados salvos com sucesso no Google Sheets');
        toast({
          title: "Solicitação enviada com sucesso!",
          description: "Sua solicitação foi registrada no Google Sheets. Retornaremos em até 24 horas!",
        });
      } catch (sheetsError) {
        console.warn('Erro no Google Sheets, tentando Supabase:', sheetsError);
        
        // Fallback: tentar Supabase
        try {
          await submitToSupabase(submitData);
          toast({
            title: "Solicitação enviada com sucesso!",
            description: "Sua solicitação foi registrada. Retornaremos em até 24 horas!",
          });
        } catch (supabaseError) {
          console.warn('Erro no Supabase, salvando localmente:', supabaseError);
          
          // Fallback final: salvar no localStorage
          const existingRequests = JSON.parse(localStorage.getItem('suporte_requests') || '[]');
          existingRequests.push({ ...submitData, id: Date.now() });
          localStorage.setItem('suporte_requests', JSON.stringify(existingRequests));
          
          toast({
            title: "Solicitação registrada!",
            description: "Sua solicitação foi salva localmente. Entre em contato conosco diretamente se necessário.",
          });
        }
      }

      form.reset();
      setSelectedImage(null);
      console.log('Formulário resetado com sucesso');
      
    } catch (error) {
      console.error('Erro completo no envio:', error);
      
      toast({
        title: "Erro ao enviar solicitação",
        description: "Ocorreu um erro inesperado. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Arquivo selecionado:', file.name, 'Tamanho:', file.size);
      setSelectedImage(file);
    }
  };

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <Card className="bg-slate-900/95 backdrop-blur-xl border-slate-700/50 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MessageCircle className="h-8 w-8 text-amber-400" />
              <CardTitle className="text-3xl font-bold gradient-text">Central de Suporte</CardTitle>
            </div>
            <CardDescription className="text-slate-300 text-lg">
              Precisa de ajuda? Estamos aqui para você!
            </CardDescription>
            
            {/* Badges de confiança */}
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2 text-sm text-amber-400">
                <Clock className="h-5 w-5" />
                <span>Resposta em até 24h</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-green-400">
                <Shield className="h-5 w-5" />
                <span>100% Seguro</span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Campos Nome e Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="nome"
                    rules={{ required: "Por favor, informe seu nome" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-200 text-base">Nome Completo</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite seu nome completo"
                            className="bg-slate-800 border-slate-600 text-slate-200 placeholder:text-slate-400 h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    rules={{ 
                      required: "Por favor, informe seu email",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email inválido"
                      }
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-200 text-base">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Digite seu email"
                            className="bg-slate-800 border-slate-600 text-slate-200 placeholder:text-slate-400 h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Campos Assunto e Upload */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="assunto"
                    rules={{ required: "Por favor, selecione um assunto" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-200 text-base">Assunto</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-slate-800 border-slate-600 text-slate-200 h-12">
                              <SelectValue placeholder="Selecione o assunto" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-slate-800 border-slate-600">
                            <SelectItem value="ajuda-app">Ajuda com o App</SelectItem>
                            <SelectItem value="duvida">Dúvida</SelectItem>
                            <SelectItem value="bug">Reportar Bug</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="imagem"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-200 text-base">Imagem (opcional)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="bg-slate-800 border-slate-600 text-slate-200 file:bg-amber-500 file:text-slate-900 file:border-0 file:rounded file:px-3 file:py-2 h-12"
                            />
                            {selectedImage && (
                              <div className="mt-3 text-sm text-amber-400 flex items-center gap-2">
                                <Upload className="h-4 w-4" />
                                {selectedImage.name}
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Campo Descrição */}
                <FormField
                  control={form.control}
                  name="descricao"
                  rules={{ required: "Por favor, descreva sua solicitação" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-200 text-base">Descrição</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Descreva detalhadamente sua solicitação, dúvida ou problema..."
                          className="bg-slate-800 border-slate-600 text-slate-200 placeholder:text-slate-400 min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Botão Submit */}
                <div className="flex justify-center pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-900 font-semibold px-10 py-3 rounded-lg transition-all duration-300 disabled:opacity-50 text-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-900"></div>
                        Enviando...
                      </div>
                    ) : (
                      'Enviar Solicitação'
                    )}
                  </Button>
                </div>
              </form>
            </Form>

            {/* Texto de confiança */}
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-400">
                🔒 Suas informações estão seguras e protegidas. Nossa equipe de suporte técnico 
                analisará sua solicitação e retornará em <span className="text-amber-400 font-semibold">até 24 horas</span>.
              </p>
              <p className="text-xs text-slate-500 mt-2">
                ⚠️ Para que funcione com Google Sheets, substitua 'YOUR_SHEET_ID' no código pela sua URL do SheetDB.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
