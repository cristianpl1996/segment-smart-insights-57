import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  Mail, 
  Phone, 
  MessageCircle, 
  Calendar, 
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  Send,
  UserPlus,
  Target,
  Clock,
  DollarSign,
  ShoppingBag
} from "lucide-react";

const CustomerProfileView = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Mock customer data
  const mockCustomer = {
    id: "CL-2024-001",
    name: "María González",
    email: "maria.gonzalez@email.com",
    phone: "+52 55 1234 5678",
    segment: "Ideal",
    lastPurchase: "2024-01-15",
    lifetimeValue: 2847,
    preferredChannel: "WhatsApp",
    joinDate: "2023-08-12",
    totalOrders: 12,
    avgTicket: 237
  };

  const purchaseHistory = [
    { date: "2024-01-15", amount: 320, channel: "Web", status: "Completado" },
    { date: "2024-01-08", amount: 185, channel: "App", status: "Completado" },
    { date: "2023-12-22", amount: 450, channel: "WhatsApp", status: "Completado" },
    { date: "2023-12-10", amount: 275, channel: "Web", status: "Completado" },
    { date: "2023-11-28", amount: 390, channel: "App", status: "Completado" }
  ];

  const campaigns = [
    { name: "Black Friday 2023", sent: "2023-11-24", channel: "Email", opened: true, clicked: true },
    { name: "Navidad Especial", sent: "2023-12-15", channel: "WhatsApp", opened: true, clicked: false },
    { name: "Año Nuevo", sent: "2024-01-01", channel: "SMS", opened: false, clicked: false }
  ];

  const aiRecommendations = [
    {
      type: "channel",
      title: "Este cliente suele responder mejor por WhatsApp",
      description: "88% de apertura vs 45% por email",
      icon: MessageCircle,
      priority: "high"
    },
    {
      type: "risk",
      title: "Riesgo de abandono > 80%",
      description: "Sin compras en los últimos 30 días",
      icon: AlertTriangle,
      priority: "critical"
    },
    {
      type: "opportunity",
      title: "Oportunidad de upselling",
      description: "Interés en categoría premium detectado",
      icon: TrendingUp,
      priority: "medium"
    }
  ];

  const recentCustomers = [
    { id: 1, name: "María González", email: "maria@email.com", segment: "Ideal" },
    { id: 2, name: "Carlos Ruiz", email: "carlos@email.com", segment: "Potencial" },
    { id: 3, name: "Ana López", email: "ana@email.com", segment: "En Riesgo" },
    { id: 4, name: "Pedro Martín", email: "pedro@email.com", segment: "Ideal" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-sora font-bold text-foreground">Vista 360° de Clientes</h1>
          <p className="text-sm text-muted-foreground mt-1">Perfil completo y análisis de comportamiento</p>
        </div>
      </div>

      {/* Search */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input 
              placeholder="Buscar por nombre, email o ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Recent Customers */}
          <div className="mt-4">
            <p className="text-sm font-medium text-foreground mb-3">Clientes recientes</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {recentCustomers.map((customer) => (
                <div 
                  key={customer.id}
                  className="p-3 rounded-lg bg-sidebar-accent border border-sidebar-border hover:bg-sidebar-accent/80 cursor-pointer transition-colors"
                  onClick={() => setSelectedCustomer(mockCustomer)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-light-blue/20 text-light-blue text-xs">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{customer.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{customer.email}</p>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs
                        ${customer.segment === 'Ideal' ? 'bg-status-green/20 text-status-green border-status-green/30' : ''}
                        ${customer.segment === 'Potencial' ? 'bg-status-blue/20 text-status-blue border-status-blue/30' : ''}
                        ${customer.segment === 'En Riesgo' ? 'bg-cta-orange/20 text-cta-orange border-cta-orange/30' : ''}
                      `}
                    >
                      {customer.segment}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Profile */}
      {selectedCustomer && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer Info */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Información del Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-light-blue/20 text-light-blue text-lg">
                    {mockCustomer.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{mockCustomer.name}</h3>
                  <p className="text-sm text-muted-foreground">ID: {mockCustomer.id}</p>
                  <Badge 
                    variant="secondary" 
                    className="mt-1 bg-status-green/20 text-status-green border-status-green/30"
                  >
                    {mockCustomer.segment}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{mockCustomer.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">{mockCustomer.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">Canal preferido: {mockCustomer.preferredChannel}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">Última compra: {mockCustomer.lastPurchase}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-muted-foreground">Valor de vida</p>
                  <p className="text-lg font-semibold text-foreground">${mockCustomer.lifetimeValue}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Pedidos totales</p>
                  <p className="text-lg font-semibold text-foreground">{mockCustomer.totalOrders}</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2 pt-4 border-t border-border">
                <Button className="w-full" size="sm">
                  <Send className="h-4 w-4 mr-2" />
                  Enviar campaña individual
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Agregar a audiencia
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  <Target className="h-4 w-4 mr-2" />
                  Ver en segmentación
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Recommendations */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-cta-orange" />
                  Recomendaciones IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiRecommendations.map((rec, index) => (
                    <div key={index} className={`rounded-lg p-4 border ${
                      rec.priority === 'critical' ? 'bg-status-red/10 border-status-red/30' :
                      rec.priority === 'high' ? 'bg-status-green/10 border-status-green/30' :
                      'bg-sidebar-accent border-sidebar-border'
                    }`}>
                      <div className="flex items-start gap-3">
                        <rec.icon className={`h-5 w-5 mt-0.5 ${
                          rec.priority === 'critical' ? 'text-status-red' :
                          rec.priority === 'high' ? 'text-status-green' :
                          'text-light-blue'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{rec.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{rec.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="history">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="history">Historial</TabsTrigger>
                <TabsTrigger value="campaigns">Campañas</TabsTrigger>
                <TabsTrigger value="timeline">Línea de tiempo</TabsTrigger>
              </TabsList>

              <TabsContent value="history">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Historial de Compras</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {purchaseHistory.map((purchase, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-sidebar-accent">
                          <div className="flex items-center gap-3">
                            <ShoppingBag className="h-4 w-4 text-light-blue" />
                            <div>
                              <p className="text-sm font-medium text-foreground">${purchase.amount}</p>
                              <p className="text-xs text-muted-foreground">{purchase.date} • {purchase.channel}</p>
                            </div>
                          </div>
                          <Badge variant="secondary" className="bg-status-green/20 text-status-green border-status-green/30">
                            {purchase.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="campaigns">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Campañas Recibidas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {campaigns.map((campaign, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-sidebar-accent">
                          <div className="flex items-center gap-3">
                            <Send className="h-4 w-4 text-light-blue" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{campaign.name}</p>
                              <p className="text-xs text-muted-foreground">{campaign.sent} • {campaign.channel}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant={campaign.opened ? "default" : "secondary"} className="text-xs">
                              {campaign.opened ? "Abierto" : "No abierto"}
                            </Badge>
                            {campaign.clicked && (
                              <Badge variant="default" className="text-xs bg-status-green/20 text-status-green">
                                Click
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">Línea de Tiempo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-status-green rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Compra realizada</p>
                          <p className="text-xs text-muted-foreground">15 de enero, 2024 • $320</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-light-blue rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Campaña abierta</p>
                          <p className="text-xs text-muted-foreground">10 de enero, 2024 • Email promocional</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-status-green rounded-full mt-2"></div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Compra realizada</p>
                          <p className="text-xs text-muted-foreground">8 de enero, 2024 • $185</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerProfileView;