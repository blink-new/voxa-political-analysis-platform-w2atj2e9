import React, { useEffect } from 'react';
import { toast } from '../hooks/use-toast';

interface NotificationTriggersProps {
  user: any;
}

const NotificationTriggers: React.FC<NotificationTriggersProps> = ({ user }) => {
  
  useEffect(() => {
    // Simulate real-time political updates
    const triggerPoliticalUpdate = () => {
      const politicians = ['Jair Bolsonaro', 'Lula da Silva', 'Sergio Moro', 'Tabata Amaral'];
      const actions = [
        'votou a favor de projeto sobre meio ambiente',
        'apresentou nova proposta de lei',
        'participou de debate público',
        'fez declaração sobre economia',
        'votou contra projeto polêmico'
      ];
      
      const randomPolitician = politicians[Math.floor(Math.random() * politicians.length)];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      const scoreChange = Math.floor(Math.random() * 20) - 10; // -10 to +10
      
      toast({
        title: `Nova Ação: ${randomPolitician}`,
        description: `${randomPolitician} ${randomAction}. Impacto na sua pontuação: ${scoreChange > 0 ? '+' : ''}${scoreChange} pontos.`,
        duration: 5000,
      });
    };

    // Simulate score changes
    const triggerScoreChange = () => {
      const politicians = ['Eduardo Paes', 'Manuela D\'Ávila', 'João Doria'];
      const randomPolitician = politicians[Math.floor(Math.random() * politicians.length)];
      const scoreChange = Math.floor(Math.random() * 15) + 5; // 5 to 20
      
      toast({
        title: "Mudança Significativa na Pontuação",
        description: `${randomPolitician} teve uma mudança de +${scoreChange} pontos baseada nas suas preferências políticas.`,
        duration: 4000,
      });
    };

    // Simulate weekly reports
    const triggerWeeklyReport = () => {
      toast({
        title: "📊 Relatório Semanal Disponível",
        description: "Seu relatório semanal de análise política está pronto. Veja as principais mudanças e tendências.",
        duration: 6000,
      });
    };

    // Simulate achievement unlocks
    const triggerAchievement = () => {
      const achievements = [
        { title: "Analista Dedicado", description: "Você analisou 5 políticos diferentes esta semana!" },
        { title: "Observador Atento", description: "Você acompanhou 10 ações políticas recentes!" },
        { title: "Cidadão Engajado", description: "Você está entre os 10% mais ativos da plataforma!" },
        { title: "Especialista Regional", description: "Você se tornou especialista em política da sua região!" }
      ];
      
      const randomAchievement = achievements[Math.floor(Math.random() * achievements.length)];
      
      toast({
        title: `🏆 Conquista Desbloqueada: ${randomAchievement.title}`,
        description: randomAchievement.description,
        duration: 5000,
      });
    };

    // Simulate transparency alerts
    const triggerTransparencyAlert = () => {
      const politicians = ['Jair Bolsonaro', 'Lula da Silva', 'Sergio Moro'];
      const randomPolitician = politicians[Math.floor(Math.random() * politicians.length)];
      
      toast({
        title: "🔍 Alerta de Transparência",
        description: `${randomPolitician} publicou novos dados de transparência. Score de transparência atualizado para 85%.`,
        duration: 4000,
      });
    };

    // Set up random notification triggers
    const intervals = [
      setTimeout(triggerPoliticalUpdate, 10000), // 10 seconds
      setTimeout(triggerScoreChange, 25000), // 25 seconds
      setTimeout(triggerWeeklyReport, 40000), // 40 seconds
      setTimeout(triggerAchievement, 55000), // 55 seconds
      setTimeout(triggerTransparencyAlert, 70000), // 70 seconds
      
      // Additional random triggers
      setTimeout(triggerPoliticalUpdate, 90000), // 1.5 minutes
      setTimeout(triggerScoreChange, 120000), // 2 minutes
    ];

    // Welcome notification for new users
    if (user) {
      setTimeout(() => {
        toast({
          title: `Bem-vindo, ${user.email?.split('@')[0]}! 👋`,
          description: "Explore os perfis políticos e configure suas preferências para receber análises personalizadas.",
          duration: 6000,
        });
      }, 3000);
    }

    // Cleanup intervals on unmount
    return () => {
      intervals.forEach(interval => clearTimeout(interval));
    };
  }, [user]);

  // This component doesn't render anything, it just triggers notifications
  return null;
};

export default NotificationTriggers;