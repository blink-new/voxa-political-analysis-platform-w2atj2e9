import React, { useState } from 'react';
import { Share2, Copy, Check, ExternalLink, QrCode, Twitter, Facebook, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { toast } from '../hooks/use-toast';

interface ShareProfileProps {
  type: 'user' | 'politician';
  profileId: string;
  profileName: string;
  isOpen: boolean;
  onClose: () => void;
}

const ShareProfile: React.FC<ShareProfileProps> = ({ 
  type, 
  profileId, 
  profileName, 
  isOpen, 
  onClose 
}) => {
  const [copied, setCopied] = useState(false);
  
  const baseUrl = window.location.origin;
  const profileUrl = `${baseUrl}/profile/${type}/${profileId}`;
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      toast({
        title: "Link copiado!",
        description: "O link do perfil foi copiado para a área de transferência.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({
        title: "Erro ao copiar",
        description: "Não foi possível copiar o link. Tente novamente.",
        variant: "destructive"
      });
    }
  };

  const shareViaWeb = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Perfil de ${profileName} - Voxa`,
          text: `Confira o perfil ${type === 'politician' ? 'político' : 'do usuário'} de ${profileName} na plataforma Voxa`,
          url: profileUrl
        });
      } catch (error) {
        // User cancelled sharing or error occurred
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const shareOnSocial = (platform: 'twitter' | 'facebook' | 'whatsapp') => {
    const text = `Confira o perfil ${type === 'politician' ? 'político' : 'do usuário'} de ${profileName} na plataforma Voxa`;
    const encodedText = encodeURIComponent(text);
    const encodedUrl = encodeURIComponent(profileUrl);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const generateQRCode = () => {
    // Simple QR code generation using a free service
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(profileUrl)}`;
    window.open(qrUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-900/95 border-slate-700 shadow-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-white flex items-center gap-2">
            <Share2 className="w-5 h-5 text-purple-400" />
            Compartilhar Perfil
          </CardTitle>
          <p className="text-slate-400 text-sm">
            Compartilhe o perfil {type === 'politician' ? 'político' : 'do usuário'} de <span className="text-purple-400 font-medium">{profileName}</span>
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Profile URL */}
          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">
              Link do Perfil
            </label>
            <div className="flex gap-2">
              <Input
                value={profileUrl}
                readOnly
                className="bg-slate-800 border-slate-600 text-slate-300 text-sm"
              />
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                className="border-slate-600 hover:border-purple-500 shrink-0"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Este link pode ser acessado por qualquer pessoa, sem necessidade de login
            </p>
          </div>

          <Separator className="bg-slate-700" />

          {/* Quick Share Options */}
          <div>
            <label className="text-sm font-medium text-slate-300 mb-3 block">
              Compartilhamento Rápido
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={shareViaWeb}
                variant="outline"
                className="border-slate-600 hover:border-purple-500 justify-start"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
              
              <Button
                onClick={generateQRCode}
                variant="outline"
                className="border-slate-600 hover:border-purple-500 justify-start"
              >
                <QrCode className="w-4 h-4 mr-2" />
                QR Code
              </Button>
            </div>
          </div>

          <Separator className="bg-slate-700" />

          {/* Social Media Sharing */}
          <div>
            <label className="text-sm font-medium text-slate-300 mb-3 block">
              Redes Sociais
            </label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={() => shareOnSocial('twitter')}
                variant="outline"
                size="sm"
                className="border-slate-600 hover:border-blue-400 hover:text-blue-400"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              
              <Button
                onClick={() => shareOnSocial('facebook')}
                variant="outline"
                size="sm"
                className="border-slate-600 hover:border-blue-600 hover:text-blue-600"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              
              <Button
                onClick={() => shareOnSocial('whatsapp')}
                variant="outline"
                size="sm"
                className="border-slate-600 hover:border-green-500 hover:text-green-500"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Separator className="bg-slate-700" />

          {/* Profile Preview */}
          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">
              Prévia do Perfil
            </label>
            <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {profileName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h4 className="text-white font-medium text-sm">{profileName}</h4>
                  <p className="text-slate-400 text-xs">
                    {type === 'politician' ? 'Perfil Político' : 'Perfil de Usuário'} • Voxa
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="border-purple-400 text-purple-300 text-xs mt-2">
                Acesso Público
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              onClick={() => window.open(profileUrl, '_blank')}
              variant="outline"
              className="flex-1 border-purple-500/50 text-purple-400 hover:bg-purple-500/20"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Visualizar
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border-slate-600 hover:border-slate-500"
            >
              Fechar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShareProfile;