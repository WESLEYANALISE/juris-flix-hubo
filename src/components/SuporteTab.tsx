
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
      const SHEET_URL = 'https://sheetdb.io/api/v1/ekjnh0u3gmc8q';

      const response = await fetch(SHEET_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Nome: data.nome,
          email: data.email,
          assunto: data.assunto,
          imagem: data.imagem_url || '',
          descricao: data.descricao,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro HTTP:', response.status, errorText);
        throw new Error(`Erro HTTP: ${response.status} - ${errorText}`);
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
        status: 'Pendente',
      };

      console.log('Dados a serem enviados:', submitData);

      try {
        await submitToGoogleSheets(submitData);
        console.log('Dados salvos com sucesso no Google Sheets');
        toast({
          title: "Solicitação enviada com sucesso!",
          description: "Sua solicitação foi registrada no Google Sheets. Retornaremos em até 24 horas!",
        });
      } catch (sheetsError) {
        console.warn('Erro no Google Sheets, tentando Supabase:', sheetsError);

        try {
          await submitToSupabase(submitData);
          toast({
            title: "Solicitação enviada com sucesso!",
            description: "Sua solicitação foi registrada. Retornaremos em até 24 horas!",
          });
        } catch (supabaseError) {
          console.warn('Erro no Supabase, salvando localmente:', supabaseError);

          const existingRequests = JSON.parse(localStorage.getItem('suporte_requests') || '[]');
          existingRequests.push({
            ...submitData,
            id: Date.now(),
          });
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
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold gradient-text-legal">Central de Suporte</h2>
        <p className="text-muted-foreground">
          Precisa de ajuda? Nossa equipe está pronta para auxiliá-lo
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="text-center">
          <CardContent className="pt-6">
            <MessageCircle className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <h3 className="font-semibold">Chat Online</h3>
            <p className="text-sm text-muted-foreground">Resposta imediata</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <Clock className="h-8 w-8 mx-auto mb-2 text-orange-500" />
            <h3 className="font-semibold">24-48h</h3>
            <p className="text-sm text-muted-foreground">Tempo de resposta</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <Shield className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <h3 className="font-semibold">100% Seguro</h3>
            <p className="text-sm text-muted-foreground">Dados protegidos</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Envie sua solicitação</CardTitle>
          <CardDescription>
            Preencha o formulário abaixo e nossa equipe entrará em contato
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome completo" {...field} />
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
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="seu@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="assunto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assunto</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de solicitação" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="duvida-tecnica">Dúvida Técnica</SelectItem>
                          <SelectItem value="problema-acesso">Problema de Acesso</SelectItem>
                          <SelectItem value="sugestao">Sugestão</SelectItem>
                          <SelectItem value="reclamacao">Reclamação</SelectItem>
                          <SelectItem value="outros">Outros</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="descricao"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição detalhada</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Descreva detalhadamente sua solicitação..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium">Anexar imagem (opcional)</label>
                <div className="flex items-center gap-3">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                  />
                  {selectedImage && (
                    <span className="text-sm text-green-600">
                      ✓ {selectedImage.name}
                    </span>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Enviar Solicitação'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
