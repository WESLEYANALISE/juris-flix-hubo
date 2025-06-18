
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
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `suporte/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('support-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        return null;
      }

      const { data } = supabase.storage
        .from('support-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error in uploadImage:', error);
      return null;
    }
  };

  const submitToSheetDB = async (data: any) => {
    try {
      const response = await fetch('https://sheetdb.io/api/v1/ekjnh0u3gmc8q', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [data]
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar dados para SheetDB');
      }

      return await response.json();
    } catch (error) {
      console.error('Error submitting to SheetDB:', error);
      throw error;
    }
  };

  const onSubmit = async (data: SuporteFormData) => {
    setIsSubmitting(true);
    
    try {
      let imageUrl = '';
      
      if (selectedImage) {
        const uploadedUrl = await uploadImage(selectedImage);
        if (uploadedUrl) {
          imageUrl = uploadedUrl;
        } else {
          toast({
            title: "Erro no upload",
            description: "Não foi possível fazer upload da imagem. Tentando enviar sem imagem...",
            variant: "destructive",
          });
        }
      }

      const submitData = {
        assunto: data.assunto,
        descricao: data.descricao,
        imagem_url: imageUrl,
        data_envio: new Date().toLocaleString('pt-BR'),
        status: 'Pendente'
      };

      await submitToSheetDB(submitData);

      toast({
        title: "Solicitação enviada com sucesso!",
        description: "Retornaremos em até 24 horas. Obrigado!",
      });

      form.reset();
      setSelectedImage(null);
    } catch (error) {
      console.error('Error submitting support request:', error);
      toast({
        title: "Erro ao enviar solicitação",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Campo Assunto */}
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

                  {/* Campo Upload de Imagem */}
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
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
