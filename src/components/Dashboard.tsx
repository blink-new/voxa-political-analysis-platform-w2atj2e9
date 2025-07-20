import { useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Avatar, AvatarFallback } from './ui/avatar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Settings, 
  LogOut,
  Search,
  Filter,
  Star,
  MapPin,
  User,
  Eye,
  ChevronDown,
  Bell,
  Share2
} from 'lucide-react'
import { blink } from '../blink/client'
import Notifications from './Notifications'
import ShareProfile from './ShareProfile'
import NotificationTriggers from './NotificationTriggers'

interface DashboardProps {
  user: any
  onStateChange: (state: 'landing' | 'onboarding' | 'dashboard') => void
  onNavigate: (page: 'settings' | 'politician', data?: any) => void
}

export default function Dashboard({ user, onStateChange, onNavigate }: DashboardProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [shareProfile, setShareProfile] = useState<{
    isOpen: boolean;
    type: 'user' | 'politician';
    profileId: string;
    profileName: string;
  }>({
    isOpen: false,
    type: 'politician',
    profileId: '',
    profileName: ''
  })

  const handleLogout = async () => {
    await blink.auth.logout()
    localStorage.removeItem('voxa_onboarding_completed')
    onStateChange('landing')
  }

  const handleShareProfile = (type: 'user' | 'politician', profileId: string, profileName: string) => {
    setShareProfile({
      isOpen: true,
      type,
      profileId,
      profileName
    })
  }

  // Demo politicians data with more detailed information
  const politicians = [
    {
      id: 'eduardo-paes',
      name: "Eduardo Paes",
      party: "PSD",
      position: "Prefeito do Rio de Janeiro",
      region: "Rio de Janeiro, RJ",
      score: 78,
      trend: "up",
      avatar: "EP",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      description: "Prefeito do Rio de Janeiro focado em infraestrutura urbana e mobilidade.",
      metrics: {
        transparency: 85,
        efficiency: 72,
        innovation: 80,
        socialImpact: 75
      }
    },
    {
      id: 'tabata-amaral',
      name: "Tabata Amaral",
      party: "PSB",
      position: "Deputada Federal",
      region: "São Paulo, SP",
      score: 82,
      trend: "up",
      avatar: "TA",
      photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      description: "Deputada Federal com foco em educação e inovação tecnológica.",
      metrics: {
        transparency: 90,
        efficiency: 78,
        innovation: 88,
        socialImpact: 85
      }
    },
    {
      id: 'joao-doria',
      name: "João Doria",
      party: "PSDB",
      position: "Ex-Governador de SP",
      region: "São Paulo, SP",
      score: 65,
      trend: "down",
      avatar: "JD",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      description: "Ex-governador de São Paulo com experiência em gestão empresarial.",
      metrics: {
        transparency: 70,
        efficiency: 75,
        innovation: 68,
        socialImpact: 60
      }
    },
    {
      id: 'manuela-davila',
      name: "Manuela D'Ávila",
      party: "PCdoB",
      position: "Deputada Estadual",
      region: "Rio Grande do Sul, RS",
      score: 74,
      trend: "up",
      avatar: "MD",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      description: "Deputada Estadual com atuação em direitos humanos e tecnologia.",
      metrics: {
        transparency: 88,
        efficiency: 70,
        innovation: 75,
        socialImpact: 82
      }
    }
  ]

  const filteredPoliticians = politicians.filter(politician =>
    politician.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    politician.party.toLowerCase().includes(searchQuery.toLowerCase()) ||
    politician.position.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const metrics = [
    {
      title: "Políticos Analisados",
      value: "1,247",
      change: "+12%",
      icon: Users,
      color: "text-blue-400"
    },
    {
      title: "Análises Realizadas",
      value: "3,891",
      change: "+8%",
      icon: BarChart3,
      color: "text-green-400"
    },
    {
      title: "Score Médio",
      value: "7.8",
      change: "+0.3",
      icon: TrendingUp,
      color: "text-purple-400"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-accent/20 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">V</span>
                </div>
                <span className="text-2xl font-bold gradient-text">Voxa</span>
              </div>
              <Badge className="bg-accent/20 text-accent border-accent/30">
                Dashboard
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowNotifications(true)}
                className="border-accent/30 relative"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                  2
                </span>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-accent/30 flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-accent text-white text-xs">
                        {user?.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline">{user?.email?.split('@')[0]}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card border-accent/20">
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <User className="w-4 h-4" />
                    <span>Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => handleShareProfile('user', user?.id || 'demo-user', user?.email?.split('@')[0] || 'Usuário')}
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Compartilhar Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => onNavigate('settings')}
                  >
                    <Settings className="w-4 h-4" />
                    <span>Configurações</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-accent/20" />
                  <DropdownMenuItem 
                    className="flex items-center gap-2 cursor-pointer text-red-400 focus:text-red-400"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Bem-vindo de volta! 👋
          </h1>
          <p className="text-muted-foreground">
            Aqui estão as últimas análises políticas personalizadas para você.
          </p>
        </div>

        {/* Metrics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <Card key={index} className="p-6 gradient-card border-accent/20 hover-lift">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-sm text-green-400">{metric.change}</p>
                </div>
                <metric.icon className={`w-8 h-8 ${metric.color}`} />
              </div>
            </Card>
          ))}
        </div>

        {/* Search and Filter */}
        <Card className="p-6 mb-8 border-accent/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar políticos por nome, partido ou cargo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-background border border-accent/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <Button variant="outline" className="border-accent/30 hover:border-accent">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>
        </Card>

        {/* Politicians List */}
        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Políticos em Destaque
              {searchQuery && (
                <span className="text-lg font-normal text-muted-foreground ml-2">
                  ({filteredPoliticians.length} resultado{filteredPoliticians.length !== 1 ? 's' : ''})
                </span>
              )}
            </h2>
            <Badge className="bg-accent/20 text-accent border-accent/30">
              Demo Mode
            </Badge>
          </div>
          
          {filteredPoliticians.length === 0 ? (
            <Card className="p-8 text-center border-accent/20">
              <p className="text-muted-foreground">
                Nenhum político encontrado para "{searchQuery}"
              </p>
            </Card>
          ) : (
            filteredPoliticians.map((politician) => (
              <Card 
                key={politician.id} 
                className="p-6 gradient-card border-accent/20 hover-lift cursor-pointer transition-all duration-300 hover:border-accent/40"
                onClick={() => onNavigate('politician', politician.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="bg-accent text-white text-lg">
                        {politician.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl mb-1">{politician.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                        <span>{politician.position}</span>
                        <span>•</span>
                        <Badge variant="outline" className="border-accent/30 text-accent">
                          {politician.party}
                        </Badge>
                        <span>•</span>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {politician.region}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground max-w-md">
                        {politician.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    {/* Quick Metrics */}
                    <div className="hidden lg:flex space-x-4 text-center">
                      <div>
                        <div className="text-sm font-medium text-blue-400">{politician.metrics.transparency}</div>
                        <div className="text-xs text-muted-foreground">Transparência</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-green-400">{politician.metrics.efficiency}</div>
                        <div className="text-xs text-muted-foreground">Eficiência</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-purple-400">{politician.metrics.innovation}</div>
                        <div className="text-xs text-muted-foreground">Inovação</div>
                      </div>
                    </div>
                    
                    {/* Overall Score */}
                    <div className="text-center">
                      <div className="flex items-center space-x-1 mb-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        <span className="font-bold text-2xl">{politician.score}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Score Voxa</p>
                      <div className={`w-2 h-2 rounded-full mx-auto mt-1 ${
                        politician.trend === 'up' ? 'bg-green-400' : 'bg-red-400'
                      }`} />
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-accent/30 hover:border-accent"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleShareProfile('politician', politician.id, politician.name)
                        }}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-accent/30 hover:border-accent"
                        onClick={(e) => {
                          e.stopPropagation()
                          onNavigate('politician', politician.id)
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Perfil
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Coming Soon */}
        <Card className="p-8 text-center mt-8 gradient-card border-accent/20">
          <h3 className="text-xl font-bold mb-2">Mais Recursos em Breve!</h3>
          <p className="text-muted-foreground mb-4">
            Gráficos avançados, comparações detalhadas e análises em tempo real estão chegando.
          </p>
          <Badge className="bg-accent/20 text-accent border-accent/30">
            🚀 Em Desenvolvimento
          </Badge>
        </Card>
      </div>

      {/* Notifications Modal */}
      <Notifications 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />

      {/* Share Profile Modal */}
      <ShareProfile
        type={shareProfile.type}
        profileId={shareProfile.profileId}
        profileName={shareProfile.profileName}
        isOpen={shareProfile.isOpen}
        onClose={() => setShareProfile(prev => ({ ...prev, isOpen: false }))}
      />

      {/* Notification Triggers */}
      <NotificationTriggers user={user} />
    </div>
  )
}