import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Share2, 
  Star, 
  TrendingUp, 
  Users, 
  Calendar,
  MapPin,
  Award,
  ExternalLink,
  Copy,
  Check,
  Globe,
  Twitter,
  Instagram,
  Facebook
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { toast } from '../hooks/use-toast';

interface PublicProfileProps {
  type: 'user' | 'politician';
}

const PublicProfile: React.FC<PublicProfileProps> = ({ type }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading profile data
    setTimeout(() => {
      if (type === 'politician') {
        setProfile({
          id: id,
          name: id === 'jair-bolsonaro' ? 'Jair Bolsonaro' : 
                id === 'lula-da-silva' ? 'Luiz Inácio Lula da Silva' :
                id === 'sergio-moro' ? 'Sergio Moro' : 'Político Desconhecido',
          title: id === 'jair-bolsonaro' ? 'Ex-Presidente do Brasil' : 
                 id === 'lula-da-silva' ? 'Presidente do Brasil' :
                 id === 'sergio-moro' ? 'Ex-Ministro da Justiça' : 'Cargo Político',
          party: id === 'jair-bolsonaro' ? 'PL' : 
                 id === 'lula-da-silva' ? 'PT' :
                 id === 'sergio-moro' ? 'Podemos' : 'Partido',
          location: 'Brasília, DF',
          avatar: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face`,
          coverImage: 'https://images.unsplash.com/photo-1555848962-6e79363bfa19?w=800&h=300&fit=crop',
          bio: 'Político brasileiro comprometido com a transparência e o desenvolvimento do país.',
          stats: {
            transparencyScore: id === 'jair-bolsonaro' ? 72 : id === 'lula-da-silva' ? 85 : 78,
            followers: Math.floor(Math.random() * 1000000) + 100000,
            actions: Math.floor(Math.random() * 500) + 50,
            yearsActive: Math.floor(Math.random() * 30) + 5
          },
          metrics: {
            economy: id === 'jair-bolsonaro' ? 68 : id === 'lula-da-silva' ? 82 : 75,
            health: id === 'jair-bolsonaro' ? 65 : id === 'lula-da-silva' ? 88 : 80,
            education: id === 'jair-bolsonaro' ? 70 : id === 'lula-da-silva' ? 85 : 78,
            security: id === 'jair-bolsonaro' ? 85 : id === 'lula-da-silva' ? 72 : 90,
            environment: id === 'jair-bolsonaro' ? 45 : id === 'lula-da-silva' ? 78 : 82,
            infrastructure: id === 'jair-bolsonaro' ? 75 : id === 'lula-da-silva' ? 80 : 85
          },
          recentActions: [
            {
              id: '1',
              title: 'Votação sobre Lei Ambiental',
              description: 'Votou a favor da proteção de áreas de preservação',
              date: '2024-01-15',
              impact: 'positive',
              category: 'Meio Ambiente'
            },
            {
              id: '2',
              title: 'Proposta de Educação',
              description: 'Apresentou projeto para melhoria da educação básica',
              date: '2024-01-10',
              impact: 'positive',
              category: 'Educação'
            }
          ],
          achievements: [
            { title: 'Transparência Exemplar', description: 'Mantém alto nível de transparência', icon: '🏆' },
            { title: 'Engajamento Popular', description: 'Alta participação em debates públicos', icon: '👥' },
            { title: 'Inovação Política', description: 'Propostas inovadoras aprovadas', icon: '💡' }
          ]
        });
      } else {
        // User profile
        setProfile({
          id: id,
          name: 'Maria Silva',
          title: 'Analista Política',
          location: 'São Paulo, SP',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          coverImage: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=300&fit=crop',
          bio: 'Apaixonada por política e transparência. Acompanho de perto as ações dos nossos representantes.',
          joinDate: '2023-06-15',
          stats: {
            politiciansAnalyzed: 25,
            reportsGenerated: 12,
            communityRank: 'Top 5%',
            daysActive: 180
          },
          preferences: {
            economy: 85,
            health: 90,
            education: 95,
            security: 70,
            environment: 88,
            infrastructure: 75
          },
          favoriteTopics: ['Educação', 'Saúde', 'Meio Ambiente', 'Economia'],
          recentActivity: [
            {
              id: '1',
              action: 'Analisou perfil de Lula da Silva',
              date: '2024-01-18',
              score: 85
            },
            {
              id: '2',
              action: 'Gerou relatório semanal',
              date: '2024-01-15',
              score: null
            }
          ]
        });
      }
      setLoading(false);
    }, 1000);
  }, [id, type]);

  const shareProfile = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Perfil de ${profile?.name} - Voxa`,
          text: `Confira o perfil político de ${profile?.name} na plataforma Voxa`,
          url: url
        });
      } catch (error) {
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast({
        title: "Link copiado!",
        description: "O link do perfil foi copiado para a área de transferência.",
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <p className="text-slate-300">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Perfil não encontrado</h2>
          <p className="text-slate-300 mb-6">O perfil que você está procurando não existe.</p>
          <Button onClick={() => navigate('/')} className="bg-purple-600 hover:bg-purple-700">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative">
        <div 
          className="h-64 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${profile.coverImage})` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="absolute top-4 left-4 z-10">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          </div>
          <div className="absolute top-4 right-4 z-10">
            <Button
              variant="ghost"
              onClick={shareProfile}
              className="text-white hover:bg-white/20"
            >
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
              {copied ? 'Copiado!' : 'Compartilhar'}
            </Button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 -mt-16">
            <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback className="text-2xl bg-purple-600 text-white">
                {profile.name.split(' ').map((n: string) => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-white">
              <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
              <p className="text-xl text-purple-200 mb-2">{profile.title}</p>
              {profile.party && (
                <Badge variant="outline" className="border-purple-400 text-purple-300 mb-2">
                  {profile.party}
                </Badge>
              )}
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-4 h-4" />
                <span>{profile.location}</span>
              </div>
            </div>
          </div>
          
          <p className="text-slate-300 mt-4 max-w-2xl">{profile.bio}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 mb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {type === 'politician' ? (
            <>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">{profile.stats.transparencyScore}%</div>
                  <div className="text-sm text-slate-400">Transparência</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">{profile.stats.followers.toLocaleString()}</div>
                  <div className="text-sm text-slate-400">Seguidores</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">{profile.stats.actions}</div>
                  <div className="text-sm text-slate-400">Ações</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">{profile.stats.yearsActive}</div>
                  <div className="text-sm text-slate-400">Anos Ativo</div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">{profile.stats.politiciansAnalyzed}</div>
                  <div className="text-sm text-slate-400">Políticos Analisados</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">{profile.stats.reportsGenerated}</div>
                  <div className="text-sm text-slate-400">Relatórios</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">{profile.stats.communityRank}</div>
                  <div className="text-sm text-slate-400">Ranking</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-400">{profile.stats.daysActive}</div>
                  <div className="text-sm text-slate-400">Dias Ativo</div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-12">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="metrics" className="data-[state=active]:bg-purple-600">
              {type === 'politician' ? 'Métricas' : 'Preferências'}
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-purple-600">
              {type === 'politician' ? 'Ações Recentes' : 'Atividade'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {type === 'politician' ? (
                <>
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Award className="w-5 h-5 text-purple-400" />
                        Conquistas
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {profile.achievements.map((achievement: any, index: number) => (
                        <div key={index} className="flex items-start gap-3">
                          <span className="text-2xl">{achievement.icon}</span>
                          <div>
                            <h4 className="font-medium text-white">{achievement.title}</h4>
                            <p className="text-sm text-slate-400">{achievement.description}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-purple-400" />
                        Performance Geral
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center mb-4">
                        <div className="text-4xl font-bold text-purple-400 mb-2">
                          {Math.round(Object.values(profile.metrics).reduce((a: number, b: number) => a + b, 0) / Object.values(profile.metrics).length)}%
                        </div>
                        <p className="text-slate-400">Pontuação Média</p>
                      </div>
                      <Progress 
                        value={Math.round(Object.values(profile.metrics).reduce((a: number, b: number) => a + b, 0) / Object.values(profile.metrics).length)} 
                        className="h-2"
                      />
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Star className="w-5 h-5 text-purple-400" />
                        Tópicos Favoritos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {profile.favoriteTopics.map((topic: string, index: number) => (
                          <Badge key={index} variant="outline" className="border-purple-400 text-purple-300">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-purple-400" />
                        Membro desde
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg text-purple-400 font-semibold">
                        {new Date(profile.joinDate).toLocaleDateString('pt-BR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-slate-400 mt-2">
                        Ativo há {profile.stats.daysActive} dias
                      </p>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  {type === 'politician' ? 'Métricas por Área' : 'Preferências Políticas'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(type === 'politician' ? profile.metrics : profile.preferences).map(([key, value]) => (
                  <div key={key}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white capitalize">
                        {key === 'economy' ? 'Economia' :
                         key === 'health' ? 'Saúde' :
                         key === 'education' ? 'Educação' :
                         key === 'security' ? 'Segurança' :
                         key === 'environment' ? 'Meio Ambiente' :
                         key === 'infrastructure' ? 'Infraestrutura' : key}
                      </span>
                      <span className="text-purple-400 font-semibold">{value}%</span>
                    </div>
                    <Progress value={value as number} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  {type === 'politician' ? 'Ações Recentes' : 'Atividade Recente'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {(type === 'politician' ? profile.recentActions : profile.recentActivity).map((item: any, index: number) => (
                  <div key={item.id} className="flex items-start gap-4 p-4 rounded-lg bg-slate-700/50">
                    <div className={`p-2 rounded-full ${
                      type === 'politician' 
                        ? item.impact === 'positive' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        : 'bg-purple-500/20 text-purple-400'
                    }`}>
                      {type === 'politician' ? <Calendar className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-white">
                        {type === 'politician' ? item.title : item.action}
                      </h4>
                      {type === 'politician' && (
                        <p className="text-sm text-slate-400 mt-1">{item.description}</p>
                      )}
                      <div className="flex items-center gap-4 mt-2">
                        <span className="text-xs text-slate-500">
                          {new Date(item.date).toLocaleDateString('pt-BR')}
                        </span>
                        {type === 'politician' && (
                          <Badge variant="outline" className="border-purple-400 text-purple-300 text-xs">
                            {item.category}
                          </Badge>
                        )}
                        {type === 'user' && item.score && (
                          <Badge variant="outline" className="border-green-400 text-green-300 text-xs">
                            Score: {item.score}%
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Call to Action */}
      <div className="px-6 pb-12">
        <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/30">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Interessado em análise política?
            </h3>
            <p className="text-slate-300 mb-6">
              Junte-se à Voxa e tenha acesso a análises detalhadas de políticos brasileiros
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Acessar Plataforma
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PublicProfile;