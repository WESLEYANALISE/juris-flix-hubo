
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
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Nome: data.nome,
          email: data.email,
          assunto: data.assunto,
          imagem: data.imagem_url || '',
          descricao: data.descricao
        })
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
            variant: "destructive"
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

      try {
        await submitToGoogleSheets(submitData);
        console.log('Dados salvos com sucesso no Google Sheets');
        toast({
          title: "Solicitação enviada com sucesso!",
          description: "Sua solicitação foi registrada. Retornaremos em até 24 horas!"
        });
      } catch (sheetsError) {
        console.warn('Erro no Google Sheets, salvando localmente:', sheetsError);
        
        const existingRequests = JSON.parse(localStorage.getItem('suporte_requests') || '[]');
        existingRequests.push({
          ...submitData,
          id: Date.now()
        });
        localStorage.setItem('suporte_requests', JSON.stringify(existingRequests));
        
        toast({
          title: "Solicitação registrada!",
          description: "Sua solicitação foi salva localmente. Entre em contato conosco diretamente se necessário."
        });
      }

      form.reset();
      setSelectedImage(null);
      console.log('Formulário resetado com sucesso');
    } catch (error) {
      console.error('Erro completo no envio:', error);
      toast({
        title: "Erro ao enviar solicitação",
        description: "Ocorreu um erro inesperado. Por favor, tente novamente.",
        variant: "destructive"
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
    <section className="py-8 sm:py-12 px-3 sm:px-4 md:px-8 bg-secondary/10">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 gradient-text">
            Central de Suporte
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Precisa de ajuda? Nossa equipe está pronta para atendê-lo. Envie sua solicitação e retornaremos em até 24 horas.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Formulário de Contato */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Enviar Solicitação
                </CardTitle>
                <CardDescription>
                  Preencha o formulário abaixo com detalhes do seu problema ou dúvida
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="nome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nome Completo</FormLabel>
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
                    </div>

                    <FormField
                      control={form.control}
                      name="assunto"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assunto</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o tipo de solicitação" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="duvida-tecnica">Dúvida Técnica</SelectItem>
                              <SelectItem value="problema-acesso">Problema de Acesso</SelectItem>
                              <SelectItem value="sugestao">Sugestão</SelectItem>
                              <SelectItem value="bug-report">Relatar Bug</SelectItem>
                              <SelectItem value="outros">Outros</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="descricao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descrição</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Descreva detalhadamente seu problema ou dúvida..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Anexar Imagem (opcional)
                      </label>
                      <div className="flex items-center gap-4">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                        />
                        {selectedImage && (
                          <span className="text-sm text-muted-foreground">
                            {selectedImage.name}
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
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Enviar Solicitação
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Informações de Contato */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Tempo de Resposta
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Nossa equipe está comprometida em oferecer suporte rápido e eficiente.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Dúvidas Técnicas:</span>
                    <span className="font-medium">2-4 horas</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Problemas de Acesso:</span>
                    <span className="font-medium">1-2 horas</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Outras Solicitações:</span>
                    <span className="font-medium">24 horas</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Suporte Especializado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Nossa equipe é formada por profissionais com experiência em direito e tecnologia, 
                  garantindo respostas precisas e especializadas para suas necessidades jurídicas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
