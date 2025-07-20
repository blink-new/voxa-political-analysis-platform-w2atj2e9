import React, { useState, useEffect } from 'react';
import { Bell, X, Check, AlertTriangle, Info, Star, TrendingUp, Users, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

interface Notification {
  id: string;
  type: 'politician_update' | 'score_change' | 'new_action' | 'weekly_report' | 'system' | 'achievement';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  politicianName?: string;
  actionType?: string;
  scoreChange?: number;
}

interface NotificationsProps {
  isOpen: boolean;
  onClose: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'politician_update',
      title: 'Nova Ação de Jair Bolsonaro',
      message: 'Votou a favor do projeto de lei sobre meio ambiente. Impacto na sua pontuação: +15 pontos.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: false,
      priority: 'high',
      politicianName: 'Jair Bolsonaro',
      actionType: 'vote',
      scoreChange: 15
    },
    {
      id: '2',
      type: 'score_change',
      title: 'Mudança Significativa na Pontuação',
      message: 'Lula da Silva teve uma mudança de -8 pontos baseada nas suas preferências políticas.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: false,
      priority: 'medium',
      politicianName: 'Lula da Silva',
      scoreChange: -8
    },
    {
      id: '3',
      type: 'weekly_report',
      title: 'Relatório Semanal Disponível',
      message: 'Seu relatório semanal de análise política está pronto. Veja as principais mudanças.',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      read: true,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'new_action',
      title: 'Nova Proposta de Sergio Moro',
      message: 'Apresentou projeto sobre segurança pública. Alinhamento com suas preferências: 92%.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      read: true,
      priority: 'low',
      politicianName: 'Sergio Moro',
      actionType: 'proposal'
    },
    {
      id: '5',
      type: 'achievement',
      title: 'Conquista Desbloqueada!',
      message: 'Você analisou 10 políticos diferentes. Continue explorando para descobrir mais insights.',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      read: true,
      priority: 'low'
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'politician_update':
        return <Users className="w-4 h-4" />;
      case 'score_change':
        return <TrendingUp className="w-4 h-4" />;
      case 'new_action':
        return <Calendar className="w-4 h-4" />;
      case 'weekly_report':
        return <Info className="w-4 h-4" />;
      case 'achievement':
        return <Star className="w-4 h-4" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Agora mesmo';
    if (hours < 24) return `${hours}h atrás`;
    if (days === 1) return 'Ontem';
    return `${days} dias atrás`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <Card className="w-full max-w-md mx-4 bg-slate-900/95 border-slate-700 shadow-2xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-400" />
            <h3 className="font-semibold text-white">Notificações</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-purple-600 text-white">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/20"
              >
                <Check className="w-4 h-4 mr-1" />
                Marcar todas
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-slate-400 hover:text-white hover:bg-slate-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <ScrollArea className="max-h-96">
          <div className="p-2">
            {notifications.length === 0 ? (
              <div className="text-center py-8 text-slate-400">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Nenhuma notificação</p>
              </div>
            ) : (
              notifications.map((notification, index) => (
                <div key={notification.id}>
                  <div
                    className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                      notification.read 
                        ? 'bg-slate-800/50 hover:bg-slate-800' 
                        : 'bg-slate-700/50 hover:bg-slate-700 border-l-4 border-purple-500'
                    }`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${getPriorityColor(notification.priority)}`}>
                        {getNotificationIcon(notification.type)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={`font-medium text-sm ${
                            notification.read ? 'text-slate-300' : 'text-white'
                          }`}>
                            {notification.title}
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="text-slate-500 hover:text-slate-300 p-1 h-auto"
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <p className={`text-xs mt-1 ${
                          notification.read ? 'text-slate-400' : 'text-slate-300'
                        }`}>
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-slate-500">
                            {formatTimestamp(notification.timestamp)}
                          </span>
                          
                          {notification.scoreChange && (
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                notification.scoreChange > 0 
                                  ? 'border-green-500/50 text-green-400' 
                                  : 'border-red-500/50 text-red-400'
                              }`}
                            >
                              {notification.scoreChange > 0 ? '+' : ''}{notification.scoreChange} pts
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {index < notifications.length - 1 && (
                    <Separator className="my-2 bg-slate-700" />
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default Notifications;