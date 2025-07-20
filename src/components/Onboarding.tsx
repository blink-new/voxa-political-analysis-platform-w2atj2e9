import { useState } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import { Checkbox } from './ui/checkbox'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  Users, 
  Heart, 
  Briefcase, 
  GraduationCap,
  Home,
  CheckCircle
} from 'lucide-react'

interface OnboardingProps {
  onComplete: () => void
  user: any
}

export default function Onboarding({ onComplete, user }: OnboardingProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [profile, setProfile] = useState({
    region: '',
    level: '',
    priorities: [] as string[],
    interests: [] as string[],
    experience: ''
  })

  const totalSteps = 5

  const regions = [
    { id: 'sp', name: 'São Paulo', icon: '🏙️' },
    { id: 'rj', name: 'Rio de Janeiro', icon: '🏖️' },
    { id: 'mg', name: 'Minas Gerais', icon: '⛰️' },
    { id: 'rs', name: 'Rio Grande do Sul', icon: '🌾' },
    { id: 'pr', name: 'Paraná', icon: '🌲' },
    { id: 'sc', name: 'Santa Catarina', icon: '🏔️' },
    { id: 'ba', name: 'Bahia', icon: '🏝️' },
    { id: 'go', name: 'Goiás', icon: '🌻' },
    { id: 'pe', name: 'Pernambuco', icon: '🎭' },
    { id: 'ce', name: 'Ceará', icon: '☀️' },
    { id: 'other', name: 'Outro Estado', icon: '📍' }
  ]

  const levels = [
    { id: 'municipal', name: 'Municipal', description: 'Prefeitos, vereadores e políticas locais', icon: Home },
    { id: 'estadual', name: 'Estadual', description: 'Governadores, deputados estaduais', icon: MapPin },
    { id: 'federal', name: 'Federal', description: 'Presidente, senadores, deputados federais', icon: Users }
  ]

  const priorities = [
    { id: 'economia', name: 'Economia', icon: '💰' },
    { id: 'saude', name: 'Saúde', icon: '🏥' },
    { id: 'educacao', name: 'Educação', icon: '📚' },
    { id: 'seguranca', name: 'Segurança', icon: '🛡️' },
    { id: 'meio-ambiente', name: 'Meio Ambiente', icon: '🌱' },
    { id: 'transporte', name: 'Transporte', icon: '🚌' },
    { id: 'habitacao', name: 'Habitação', icon: '🏠' },
    { id: 'cultura', name: 'Cultura', icon: '🎨' },
    { id: 'tecnologia', name: 'Tecnologia', icon: '💻' },
    { id: 'direitos-humanos', name: 'Direitos Humanos', icon: '⚖️' }
  ]

  const interests = [
    { id: 'propostas', name: 'Propostas de Lei', icon: Briefcase },
    { id: 'votacoes', name: 'Histórico de Votações', icon: CheckCircle },
    { id: 'gastos', name: 'Gastos Públicos', icon: Heart },
    { id: 'presenca', name: 'Presença em Sessões', icon: Users },
    { id: 'parcerias', name: 'Parcerias Políticas', icon: GraduationCap }
  ]

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    } else {
      onComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePriorityToggle = (priorityId: string) => {
    setProfile(prev => ({
      ...prev,
      priorities: prev.priorities.includes(priorityId)
        ? prev.priorities.filter(p => p !== priorityId)
        : [...prev.priorities, priorityId]
    }))
  }

  const handleInterestToggle = (interestId: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(i => i !== interestId)
        : [...prev.interests, interestId]
    }))
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return true // Welcome step
      case 2: return profile.region !== ''
      case 3: return profile.level !== ''
      case 4: return profile.priorities.length >= 3
      case 5: return profile.interests.length >= 2
      default: return false
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center">
            <div className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">👋</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Bem-vindo ao <span className="gradient-text">Voxa</span>!
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Olá, <span className="text-accent font-medium">{user?.email}</span>! 
              Vamos personalizar sua experiência de análise política em apenas 5 passos.
            </p>
            <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
              <p className="text-sm text-accent">
                ✨ Suas preferências nos ajudam a criar métricas personalizadas para você
              </p>
            </div>
          </div>
        )

      case 2:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-2">Qual é sua região?</h2>
            <p className="text-muted-foreground mb-6">
              Isso nos ajuda a focar nos políticos mais relevantes para você.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {regions.map((region) => (
                <Card
                  key={region.id}
                  className={`p-4 cursor-pointer hover-lift transition-all ${
                    profile.region === region.id 
                      ? 'border-accent bg-accent/10' 
                      : 'border-muted hover:border-accent/50'
                  }`}
                  onClick={() => setProfile(prev => ({ ...prev, region: region.id }))}
                >
                  <div className="text-center">
                    <div className="text-2xl mb-2">{region.icon}</div>
                    <div className="font-medium text-sm">{region.name}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-2">Nível de interesse político</h2>
            <p className="text-muted-foreground mb-6">
              Em qual esfera política você tem mais interesse?
            </p>
            <RadioGroup 
              value={profile.level} 
              onValueChange={(value) => setProfile(prev => ({ ...prev, level: value }))}
              className="space-y-4"
            >
              {levels.map((level) => (
                <div key={level.id} className="flex items-center space-x-3">
                  <RadioGroupItem value={level.id} id={level.id} />
                  <Label htmlFor={level.id} className="flex-1 cursor-pointer">
                    <Card className="p-4 hover-lift transition-all hover:border-accent/50">
                      <div className="flex items-center space-x-3">
                        <level.icon className="w-6 h-6 text-accent" />
                        <div>
                          <div className="font-medium">{level.name}</div>
                          <div className="text-sm text-muted-foreground">{level.description}</div>
                        </div>
                      </div>
                    </Card>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )

      case 4:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-2">Suas prioridades políticas</h2>
            <p className="text-muted-foreground mb-6">
              Selecione pelo menos 3 áreas que são mais importantes para você.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {priorities.map((priority) => (
                <Card
                  key={priority.id}
                  className={`p-4 cursor-pointer hover-lift transition-all ${
                    profile.priorities.includes(priority.id)
                      ? 'border-accent bg-accent/10'
                      : 'border-muted hover:border-accent/50'
                  }`}
                  onClick={() => handlePriorityToggle(priority.id)}
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      checked={profile.priorities.includes(priority.id)}
                      readOnly
                    />
                    <div className="text-xl">{priority.icon}</div>
                    <div className="font-medium text-sm">{priority.name}</div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Badge variant="outline" className="border-accent text-accent">
                {profile.priorities.length} de 10 selecionadas (mínimo 3)
              </Badge>
            </div>
          </div>
        )

      case 5:
        return (
          <div>
            <h2 className="text-2xl font-bold mb-2">Métricas de interesse</h2>
            <p className="text-muted-foreground mb-6">
              Que tipo de informação você gostaria de acompanhar? (Selecione pelo menos 2)
            </p>
            <div className="space-y-3">
              {interests.map((interest) => (
                <Card
                  key={interest.id}
                  className={`p-4 cursor-pointer hover-lift transition-all ${
                    profile.interests.includes(interest.id)
                      ? 'border-accent bg-accent/10'
                      : 'border-muted hover:border-accent/50'
                  }`}
                  onClick={() => handleInterestToggle(interest.id)}
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox 
                      checked={profile.interests.includes(interest.id)}
                      readOnly
                    />
                    <interest.icon className="w-5 h-5 text-accent" />
                    <div className="font-medium">{interest.name}</div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Badge variant="outline" className="border-accent text-accent">
                {profile.interests.length} de 5 selecionadas (mínimo 2)
              </Badge>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen animated-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl gradient-card border-accent/20">
        <div className="p-8">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">
                Passo {currentStep} de {totalSteps}
              </span>
              <span className="text-sm text-accent font-medium">
                {Math.round((currentStep / totalSteps) * 100)}%
              </span>
            </div>
            <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {renderStep()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="border-accent/30 hover:border-accent hover:bg-accent/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="gradient-primary hover:opacity-90"
            >
              {currentStep === totalSteps ? 'Finalizar' : 'Próximo'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}