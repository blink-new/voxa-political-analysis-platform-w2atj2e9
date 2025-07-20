import React, { useState } from 'react'
import { ArrowLeft, User, Bell, Shield, Palette, Globe, Download, Trash2, Save } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Textarea } from './ui/textarea'
import { Slider } from './ui/slider'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'

interface SettingsProps {
  onBack: () => void
}

const Settings: React.FC<SettingsProps> = ({ onBack }) => {
  const [settings, setSettings] = useState({
    // Profile Settings
    name: 'João Silva',
    email: 'joao.silva@email.com',
    location: 'São Paulo, SP',
    bio: 'Cidadão interessado em transparência política e boa governança.',
    
    // Political Preferences
    politicalLevel: 'all',
    region: 'SP',
    priorities: {
      economy: 80,
      health: 90,
      education: 85,
      security: 70,
      environment: 75,
      infrastructure: 65
    },
    
    // Notification Settings
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    politicianUpdates: true,
    scoreChanges: false,
    
    // Privacy Settings
    profileVisibility: 'private',
    dataSharing: false,
    analyticsTracking: true,
    
    // Display Settings
    theme: 'dark',
    language: 'pt-BR',
    compactMode: false,
    animationsEnabled: true
  })

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handlePriorityChange = (priority: string, value: number[]) => {
    setSettings(prev => ({
      ...prev,
      priorities: {
        ...prev.priorities,
        [priority]: value[0]
      }
    }))
  }

  const brazilianStates = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F0F23] via-[#1E1B4B] to-[#7C3AED] p-4">
      <div className="max-w-4xl mx-auto">
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
          <h1 className="text-2xl font-bold text-white">Configurações</h1>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-white/5 border-white/10 grid grid-cols-5 w-full">
            <TabsTrigger value="profile" className="data-[state=active]:bg-purple-600/30">
              <User className="w-4 h-4 mr-2" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="political" className="data-[state=active]:bg-purple-600/30">
              <Globe className="w-4 h-4 mr-2" />
              Político
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-purple-600/30">
              <Bell className="w-4 h-4 mr-2" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="privacy" className="data-[state=active]:bg-purple-600/30">
              <Shield className="w-4 h-4 mr-2" />
              Privacidade
            </TabsTrigger>
            <TabsTrigger value="display" className="data-[state=active]:bg-purple-600/30">
              <Palette className="w-4 h-4 mr-2" />
              Exibição
            </TabsTrigger>
          </TabsList>

          {/* Profile Settings */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white">Nome Completo</Label>
                    <Input
                      id="name"
                      value={settings.name}
                      onChange={(e) => handleSettingChange('name', e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => handleSettingChange('email', e.target.value)}
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-white">Localização</Label>
                  <Input
                    id="location"
                    value={settings.location}
                    onChange={(e) => handleSettingChange('location', e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-white">Biografia</Label>
                  <Textarea
                    id="bio"
                    value={settings.bio}
                    onChange={(e) => handleSettingChange('bio', e.target.value)}
                    className="bg-white/10 border-white/20 text-white min-h-[100px]"
                    placeholder="Conte um pouco sobre você e seus interesses políticos..."
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Political Preferences */}
          <TabsContent value="political" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Preferências Políticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Nível Político de Interesse</Label>
                    <Select value={settings.politicalLevel} onValueChange={(value) => handleSettingChange('politicalLevel', value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os Níveis</SelectItem>
                        <SelectItem value="federal">Federal</SelectItem>
                        <SelectItem value="state">Estadual</SelectItem>
                        <SelectItem value="municipal">Municipal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white">Estado de Interesse</Label>
                    <Select value={settings.region} onValueChange={(value) => handleSettingChange('region', value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {brazilianStates.map(state => (
                          <SelectItem key={state} value={state}>{state}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator className="bg-white/20" />

                <div className="space-y-4">
                  <h3 className="text-white font-medium">Prioridades Políticas</h3>
                  <p className="text-gray-300 text-sm">Ajuste a importância de cada área para personalizar suas análises</p>
                  
                  {Object.entries(settings.priorities).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="text-white capitalize">
                          {key === 'economy' ? 'Economia' :
                           key === 'health' ? 'Saúde' :
                           key === 'education' ? 'Educação' :
                           key === 'security' ? 'Segurança' :
                           key === 'environment' ? 'Meio Ambiente' :
                           key === 'infrastructure' ? 'Infraestrutura' : key}
                        </Label>
                        <Badge variant="outline" className="border-white/20 text-white">
                          {value}%
                        </Badge>
                      </div>
                      <Slider
                        value={[value]}
                        onValueChange={(newValue) => handlePriorityChange(key, newValue)}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Configurações de Notificação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white">Notificações por Email</Label>
                    <p className="text-sm text-gray-300">Receba atualizações importantes por email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white">Notificações Push</Label>
                    <p className="text-sm text-gray-300">Receba notificações em tempo real</p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white">Relatórios Semanais</Label>
                    <p className="text-sm text-gray-300">Resumo semanal das atividades políticas</p>
                  </div>
                  <Switch
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) => handleSettingChange('weeklyReports', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white">Atualizações de Políticos</Label>
                    <p className="text-sm text-gray-300">Notificações sobre ações dos políticos seguidos</p>
                  </div>
                  <Switch
                    checked={settings.politicianUpdates}
                    onCheckedChange={(checked) => handleSettingChange('politicianUpdates', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white">Mudanças de Pontuação</Label>
                    <p className="text-sm text-gray-300">Alertas quando a pontuação de um político muda significativamente</p>
                  </div>
                  <Switch
                    checked={settings.scoreChanges}
                    onCheckedChange={(checked) => handleSettingChange('scoreChanges', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Configurações de Privacidade</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-white">Visibilidade do Perfil</Label>
                  <Select value={settings.profileVisibility} onValueChange={(value) => handleSettingChange('profileVisibility', value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Público</SelectItem>
                      <SelectItem value="private">Privado</SelectItem>
                      <SelectItem value="friends">Apenas Amigos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white">Compartilhamento de Dados</Label>
                    <p className="text-sm text-gray-300">Permitir uso de dados para pesquisas acadêmicas</p>
                  </div>
                  <Switch
                    checked={settings.dataSharing}
                    onCheckedChange={(checked) => handleSettingChange('dataSharing', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white">Rastreamento de Analytics</Label>
                    <p className="text-sm text-gray-300">Ajudar a melhorar a plataforma com dados de uso</p>
                  </div>
                  <Switch
                    checked={settings.analyticsTracking}
                    onCheckedChange={(checked) => handleSettingChange('analyticsTracking', checked)}
                  />
                </div>

                <Separator className="bg-white/20" />

                <div className="space-y-4">
                  <h3 className="text-white font-medium">Gerenciamento de Dados</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <Download className="w-4 h-4 mr-2" />
                      Exportar Dados
                    </Button>
                    <Button variant="destructive" className="bg-red-600/20 border-red-600/30 text-red-200 hover:bg-red-600/30">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir Conta
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Display Settings */}
          <TabsContent value="display" className="space-y-6">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Configurações de Exibição</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white">Tema</Label>
                    <Select value={settings.theme} onValueChange={(value) => handleSettingChange('theme', value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dark">Escuro</SelectItem>
                        <SelectItem value="light">Claro</SelectItem>
                        <SelectItem value="auto">Automático</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-white">Idioma</Label>
                    <Select value={settings.language} onValueChange={(value) => handleSettingChange('language', value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                        <SelectItem value="en-US">English (US)</SelectItem>
                        <SelectItem value="es-ES">Español</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white">Modo Compacto</Label>
                    <p className="text-sm text-gray-300">Interface mais densa com menos espaçamento</p>
                  </div>
                  <Switch
                    checked={settings.compactMode}
                    onCheckedChange={(checked) => handleSettingChange('compactMode', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label className="text-white">Animações</Label>
                    <p className="text-sm text-gray-300">Habilitar animações e transições</p>
                  </div>
                  <Switch
                    checked={settings.animationsEnabled}
                    onCheckedChange={(checked) => handleSettingChange('animationsEnabled', checked)}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end mt-6">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <Save className="w-4 h-4 mr-2" />
            Salvar Configurações
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Settings