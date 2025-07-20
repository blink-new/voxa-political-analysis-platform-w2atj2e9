import React from 'react'
import { ArrowLeft, MapPin, Calendar, Users, TrendingUp, Award, ExternalLink, Share2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar } from 'recharts'

interface PoliticianProfileProps {
  politicianId: string
  onBack: () => void
}

const PoliticianProfile: React.FC<PoliticianProfileProps> = ({ politicianId, onBack }) => {
  // Demo data for politician profile
  const politician = {
    id: politicianId,
    name: 'Eduardo Paes',
    position: 'Prefeito do Rio de Janeiro',
    party: 'PSD',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    location: 'Rio de Janeiro, RJ',
    termStart: '2021',
    termEnd: '2024',
    overallScore: 78,
    followers: 245000,
    description: 'Prefeito do Rio de Janeiro focado em infraestrutura urbana, mobilidade e sustentabilidade. Experiência anterior como prefeito entre 2009-2016.',
    achievements: [
      'Implementação do BRT TransOeste',
      'Revitalização da Zona Portuária',
      'Programa Rio Resiliente',
      'Expansão da Rede Cicloviária'
    ],
    metrics: {
      transparency: 85,
      efficiency: 72,
      innovation: 80,
      socialImpact: 75,
      economicManagement: 70,
      environmentalPolicy: 82
    },
    performanceHistory: [
      { month: 'Jan', score: 72 },
      { month: 'Fev', score: 74 },
      { month: 'Mar', score: 76 },
      { month: 'Abr', score: 78 },
      { month: 'Mai', score: 75 },
      { month: 'Jun', score: 78 }
    ],
    issueScores: [
      { issue: 'Saúde', score: 75, priority: 'high' },
      { issue: 'Educação', score: 68, priority: 'high' },
      { issue: 'Segurança', score: 72, priority: 'medium' },
      { issue: 'Transporte', score: 82, priority: 'high' },
      { issue: 'Meio Ambiente', score: 78, priority: 'medium' },
      { issue: 'Economia', score: 70, priority: 'low' }
    ],
    recentActions: [
      {
        date: '2024-01-15',
        title: 'Aprovação do Orçamento Municipal 2024',
        type: 'Votação',
        impact: 'positive'
      },
      {
        date: '2024-01-10',
        title: 'Lançamento do Programa Habitação Popular',
        type: 'Projeto',
        impact: 'positive'
      },
      {
        date: '2024-01-05',
        title: 'Reunião com Secretários de Saúde',
        type: 'Reunião',
        impact: 'neutral'
      }
    ]
  }

  const radarData = Object.entries(politician.metrics).map(([key, value]) => ({
    metric: key.charAt(0).toUpperCase() + key.slice(1),
    value,
    fullMark: 100
  }))

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F23] via-[#1E1B4B] to-[#7C3AED] p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        </div>

        {/* Profile Header */}
        <Card className="bg-white/5 border-white/10 backdrop-blur-sm mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <img 
                  src={politician.photo} 
                  alt={politician.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-purple-400/30"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-2">{politician.name}</h1>
                    <p className="text-purple-200 text-lg mb-2">{politician.position}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-300 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {politician.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {politician.termStart} - {politician.termEnd}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {politician.followers.toLocaleString()} seguidores
                      </div>
                    </div>
                    <p className="text-gray-300 max-w-2xl">{politician.description}</p>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white mb-1">{politician.overallScore}</div>
                      <div className="text-sm text-purple-200">Pontuação Geral</div>
                    </div>
                    <Badge variant="secondary" className="bg-purple-600/20 text-purple-200">
                      {politician.party}
                    </Badge>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <Share2 className="w-4 h-4 mr-1" />
                        Compartilhar
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Site Oficial
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-white/5 border-white/10">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600/30">
              Visão Geral
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-purple-600/30">
              Performance
            </TabsTrigger>
            <TabsTrigger value="actions" className="data-[state=active]:bg-purple-600/30">
              Ações Recentes
            </TabsTrigger>
            <TabsTrigger value="achievements" className="data-[state=active]:bg-purple-600/30">
              Conquistas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Radar Chart */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Análise de Competências</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="#ffffff20" />
                      <PolarAngleAxis dataKey="metric" tick={{ fill: '#ffffff', fontSize: 12 }} />
                      <PolarRadiusAxis 
                        angle={90} 
                        domain={[0, 100]} 
                        tick={{ fill: '#ffffff', fontSize: 10 }}
                      />
                      <Radar
                        name="Score"
                        dataKey="value"
                        stroke="#7C3AED"
                        fill="#7C3AED"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Issue Scores */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Pontuação por Área</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {politician.issueScores.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium">{item.issue}</span>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={item.priority === 'high' ? 'destructive' : item.priority === 'medium' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {item.priority === 'high' ? 'Alta' : item.priority === 'medium' ? 'Média' : 'Baixa'} Prioridade
                          </Badge>
                          <span className="text-white font-bold">{item.score}</span>
                        </div>
                      </div>
                      <Progress value={item.score} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Evolução da Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={politician.performanceHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="month" tick={{ fill: '#ffffff' }} />
                    <YAxis tick={{ fill: '#ffffff' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1E1B4B', 
                        border: '1px solid #7C3AED',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#7C3AED" 
                      strokeWidth={3}
                      dot={{ fill: '#7C3AED', strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Comparação por Área</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={politician.issueScores}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="issue" tick={{ fill: '#ffffff', fontSize: 12 }} />
                    <YAxis tick={{ fill: '#ffffff' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1E1B4B', 
                        border: '1px solid #7C3AED',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="score" fill="#7C3AED" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="actions" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Ações Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {politician.recentActions.map((action, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        action.impact === 'positive' ? 'bg-green-400' : 
                        action.impact === 'negative' ? 'bg-red-400' : 'bg-yellow-400'
                      }`} />
                      <div className="flex-1">
                        <h4 className="text-white font-medium mb-1">{action.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-gray-300">
                          <span>{new Date(action.date).toLocaleDateString('pt-BR')}</span>
                          <Badge variant="outline" className="border-white/20 text-white">
                            {action.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Principais Conquistas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {politician.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                      <TrendingUp className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-white">{achievement}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default PoliticianProfile