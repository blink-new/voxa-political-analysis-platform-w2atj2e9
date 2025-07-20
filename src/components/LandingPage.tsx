import { useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { blink } from '../blink/client'
import { 
  BarChart3, 
  Users, 
  Shield, 
  Zap, 
  TrendingUp, 
  MapPin,
  Star,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

interface LandingPageProps {
  onStateChange: (state: 'landing' | 'onboarding' | 'dashboard') => void
}

export default function LandingPage({ onStateChange }: LandingPageProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleGetStarted = async () => {
    setIsLoading(true)
    try {
      await blink.auth.login()
    } catch (error) {
      console.error('Login error:', error)
      setIsLoading(false)
    }
  }

  const features = [
    {
      icon: BarChart3,
      title: "Análise Personalizada",
      description: "Métricas customizadas baseadas em suas prioridades políticas"
    },
    {
      icon: TrendingUp,
      title: "Atualizações em Tempo Real",
      description: "Performance dos políticos atualizada constantemente"
    },
    {
      icon: Shield,
      title: "Transparência Total",
      description: "Dados verificados e fontes confiáveis"
    },
    {
      icon: Users,
      title: "Comparação Inteligente",
      description: "Compare múltiplos políticos lado a lado"
    },
    {
      icon: MapPin,
      title: "Foco Regional",
      description: "Municipal, Estadual e Federal"
    },
    {
      icon: Zap,
      title: "IA Avançada",
      description: "Algoritmos de última geração para análise política"
    }
  ]

  const benefits = [
    "Decisões eleitorais mais informadas",
    "Acompanhamento contínuo de promessas",
    "Análise baseada em dados reais",
    "Interface intuitiva e moderna",
    "Privacidade e segurança garantidas"
  ]

  return (
    <div className="min-h-screen animated-bg relative overflow-hidden">
      {/* Particles Background */}
      <div className="particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">V</span>
            </div>
            <span className="text-2xl font-bold gradient-text">Voxa</span>
          </div>
          <Button 
            variant="outline" 
            onClick={handleGetStarted}
            disabled={isLoading}
            className="border-accent/30 hover:border-accent hover:bg-accent/10"
          >
            Entrar
          </Button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20 text-center">
        <Badge className="mb-6 bg-accent/20 text-accent border-accent/30">
          🇧🇷 Feito para o Brasil
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Análise Política
          <br />
          <span className="gradient-text">Inteligente</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
          Capacite-se com métricas personalizadas baseadas em IA para analisar políticos brasileiros. 
          Transparência, dados em tempo real e insights que importam para você.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            onClick={handleGetStarted}
            disabled={isLoading}
            className="gradient-primary hover:opacity-90 text-lg px-8 py-4 h-auto"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <ArrowRight className="w-5 h-5 mr-2" />
            )}
            Começar Análise Gratuita
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-accent/30 hover:border-accent hover:bg-accent/10 text-lg px-8 py-4 h-auto"
          >
            Ver Demo
          </Button>
        </div>

        {/* Benefits List */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-accent mr-2" />
              {benefit}
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Recursos <span className="gradient-text">Revolucionários</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tecnologia de ponta para análise política transparente e personalizada
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 gradient-card border-accent/20 hover-lift cursor-pointer group"
            >
              <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <Card className="gradient-card border-accent/20 p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Pronto para Transformar sua
            <br />
            <span className="gradient-text">Participação Política?</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de brasileiros que já usam o Voxa para tomar decisões políticas mais informadas.
          </p>
          <Button 
            size="lg" 
            onClick={handleGetStarted}
            disabled={isLoading}
            className="gradient-primary hover:opacity-90 text-lg px-12 py-4 h-auto"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
            ) : (
              <Star className="w-5 h-5 mr-2" />
            )}
            Começar Agora - É Grátis
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-4 py-12 border-t border-accent/20">
        <div className="text-center text-muted-foreground">
          <p>&copy; 2024 Voxa. Democratizando a análise política no Brasil.</p>
        </div>
      </footer>
    </div>
  )
}