import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Lightbulb, 
  AlertTriangle, 
  Zap, 
  Brain, 
  Target, 
  Users, 
  TrendingUp,
  MessageCircle,
  Mail,
  Smartphone,
  Eye,
  Play,
  Settings,
  Info
} from "lucide-react";

const AIAgentsView = () => {
  const [selectedAgent, setSelectedAgent] = useState("suggestions");

  // Mock data for AI suggestions
  const campaignSuggestions = [
    {
      id: 1,
      segment: "Clientes VIP",
      users: 234,
      title: "Campaña de fidelización premium",
      description: "Ofrecer beneficios exclusivos para mantener engagement",
      channel: "WhatsApp",
      expectedRevenue: 45600,
      confidence: 92,
      content: "🌟 Acceso exclusivo a productos premium con 20% de descuento"
    },
    {
      id: 2,
      segment: "Abandonadores recientes",
      users: 156,
      title: "Recuperación con incentivo",
      description: "Descuento progresivo basado en tiempo sin compra",
      channel: "Email",
      expectedRevenue: 18900,
      confidence: 78,
      content: "¡Te extrañamos! Vuelve con 15% de descuento en tu próxima compra"
    },
    {
      id: 3,
      segment: "Nuevos usuarios",
      users: 89,
      title: "Onboarding personalizado",
      description: "Secuencia de bienvenida con productos recomendados",
      channel: "App",
      expectedRevenue: 12300,
      confidence: 85,
      content: "Bienvenido a tu nueva experiencia de compra personalizada"
    }
  ];

  const abandonmentAlerts = [
    {
      id: 1,
      type: "Crítico",
      segment: "Clientes ideales inactivos",
      users: 47,
      criteria: "Sin compras en 45 días",
      riskLevel: "high",
      action: "Campaña urgente de reactivación"
    },
    {
      id: 2,
      type: "Medio",
      segment: "Frecuencia descendente",
      users: 123,
      criteria: "Reducción del 50% en frecuencia",
      riskLevel: "medium",
      action: "Recordatorio suave con incentivo"
    },
    {
      id: 3,
      type: "Bajo",
      segment: "Primeras señales",
      users: 89,
      criteria: "15 días sin interacción",
      riskLevel: "low",
      action: "Contenido de valor agregado"
    }
  ];

  const aiRecommendations = [
    {
      id: 1,
      title: "Optimizar horarios de envío",
      description: "Los martes a las 2 PM tienen 34% más apertura",
      impact: "Incremento estimado del 25% en engagement",
      category: "Timing",
      status: "pending"
    },
    {
      id: 2,
      title: "Segmentar por dispositivo preferido",
      description: "Usuarios móviles responden mejor a mensajes cortos",
      impact: "Mejora del 18% en conversión móvil",
      category: "Personalización",
      status: "pending"
    },
    {
      id: 3,
      title: "Crear audiencia lookalike",
      description: "Basada en top 20% de clientes más valiosos",
      impact: "Potencial de 156% ROI en adquisición",
      category: "Audiencias",
      status: "implemented"
    }
  ];

  const getChannelIcon = (channel) => {
    switch (channel.toLowerCase()) {
      case 'whatsapp': return <MessageCircle className="h-4 w-4" />;
      case 'email': return <Mail className="h-4 w-4" />;
      case 'app': return <Smartphone className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-sora font-bold text-foreground">Agentes de IA</h1>
          <p className="text-sm text-muted-foreground mt-1">Asistentes inteligentes para marketing automatizado</p>
        </div>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Configurar agentes
        </Button>
      </div>

      {/* Agent Tabs */}
      <Tabs value={selectedAgent} onValueChange={setSelectedAgent}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="suggestions" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            Campañas Sugeridas
          </TabsTrigger>
          <TabsTrigger value="alerts" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Alertas de Abandono
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            Recomendaciones IA
          </TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions" className="space-y-4">
          <div className="grid gap-4">
            {campaignSuggestions.map((suggestion) => (
              <Card key={suggestion.id} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <Target className="h-5 w-5 text-cta-orange" />
                        <div>
                          <h3 className="font-semibold text-foreground">{suggestion.title}</h3>
                          <p className="text-sm text-muted-foreground">{suggestion.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Segmento</p>
                          <p className="text-sm font-medium text-foreground">{suggestion.segment}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Usuarios</p>
                          <p className="text-sm font-medium text-foreground">{suggestion.users.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Canal recomendado</p>
                          <div className="flex items-center gap-1">
                            {getChannelIcon(suggestion.channel)}
                            <span className="text-sm font-medium text-foreground">{suggestion.channel}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Ingresos estimados</p>
                          <p className="text-sm font-medium text-foreground">${suggestion.expectedRevenue.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="p-3 bg-sidebar-accent rounded-lg">
                        <p className="text-sm text-foreground mb-2">Contenido propuesto:</p>
                        <p className="text-sm text-muted-foreground italic">"{suggestion.content}"</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-status-green/20 text-status-green border-status-green/30">
                            {suggestion.confidence}% confianza
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <Info className="h-4 w-4 mr-1" />
                            Ver cálculo
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Previsualizar
                          </Button>
                          <Button size="sm">
                            <Play className="h-4 w-4 mr-2" />
                            Activar campaña
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid gap-4">
            {abandonmentAlerts.map((alert) => (
              <Card key={alert.id} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className={`h-5 w-5 ${
                          alert.riskLevel === 'high' ? 'text-status-red' :
                          alert.riskLevel === 'medium' ? 'text-cta-orange' :
                          'text-status-blue'
                        }`} />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">{alert.segment}</h3>
                            <Badge 
                              variant="secondary" 
                              className={`
                                ${alert.riskLevel === 'high' ? 'bg-status-red/20 text-status-red border-status-red/30' : ''}
                                ${alert.riskLevel === 'medium' ? 'bg-cta-orange/20 text-cta-orange border-cta-orange/30' : ''}
                                ${alert.riskLevel === 'low' ? 'bg-status-blue/20 text-status-blue border-status-blue/30' : ''}
                              `}
                            >
                              Riesgo {alert.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{alert.criteria}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Usuarios afectados</p>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-light-blue" />
                            <p className="text-sm font-medium text-foreground">{alert.users} clientes</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Acción recomendada</p>
                          <p className="text-sm font-medium text-foreground">{alert.action}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Tiempo estimado</p>
                          <p className="text-sm font-medium text-foreground">5 min para configurar</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Button variant="ghost" size="sm">
                          <Info className="h-4 w-4 mr-1" />
                          Ver detalle de detección
                        </Button>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Ver usuarios
                          </Button>
                          <Button size="sm" className={
                            alert.riskLevel === 'high' ? 'bg-status-red hover:bg-status-red/90' : ''
                          }>
                            <Play className="h-4 w-4 mr-2" />
                            Lanzar recuperación
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid gap-4">
            {aiRecommendations.map((rec) => (
              <Card key={rec.id} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <Brain className="h-5 w-5 text-light-blue" />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">{rec.title}</h3>
                            <Badge variant="secondary" className="bg-light-blue/20 text-light-blue border-light-blue/30">
                              {rec.category}
                            </Badge>
                            {rec.status === 'implemented' && (
                              <Badge variant="secondary" className="bg-status-green/20 text-status-green border-status-green/30">
                                Implementado
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{rec.description}</p>
                        </div>
                      </div>

                      <div className="p-3 bg-sidebar-accent rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <TrendingUp className="h-4 w-4 text-status-green" />
                          <p className="text-sm font-medium text-foreground">Impacto esperado:</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{rec.impact}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <Button variant="ghost" size="sm">
                          <Info className="h-4 w-4 mr-1" />
                          Ver metodología
                        </Button>
                        {rec.status === 'pending' && (
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              Editar antes de ejecutar
                            </Button>
                            <Button size="sm">
                              <Play className="h-4 w-4 mr-2" />
                              Crear estrategia
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIAgentsView;