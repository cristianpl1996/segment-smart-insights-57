import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings2, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  XCircle,
  RefreshCw,
  Eye,
  Key,
  Webhook,
  LogIn,
  Database,
  Send,
  MessageSquare,
  Gamepad2,
  Activity,
  Clock,
  AlertTriangle,
  TestTube,
  Download
} from "lucide-react";

const IntegrationsView = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  // Mock integrations data
  const connectedIntegrations = [
    {
      id: 1,
      name: "CRM Principal",
      type: "CRM",
      status: "connected",
      lastSync: "2024-01-19 14:30",
      records: 2450,
      health: "excellent",
      version: "v2.1"
    },
    {
      id: 2,
      name: "Sistema ERP",
      type: "ERP",
      status: "connected",
      lastSync: "2024-01-19 12:15",
      records: 890,
      health: "good",
      version: "v1.8"
    },
    {
      id: 3,
      name: "WhatsApp Business",
      type: "Messaging",
      status: "warning",
      lastSync: "2024-01-18 09:22",
      records: 156,
      health: "warning",
      error: "Límite de API alcanzado"
    },
    {
      id: 4,
      name: "Email Marketing",
      type: "Email",
      status: "error",
      lastSync: "2024-01-17 16:45",
      records: 0,
      health: "error",
      error: "Token expirado"
    },
    {
      id: 5,
      name: "Plataforma Gaming",
      type: "Gaming",
      status: "connected",
      lastSync: "2024-01-19 11:00",
      records: 1200,
      health: "excellent",
      version: "v3.2"
    }
  ];

  const availableIntegrations = [
    {
      name: "Shopify",
      type: "E-commerce",
      description: "Sincroniza productos, pedidos y clientes",
      authType: "API Key",
      popular: true
    },
    {
      name: "Mailchimp",
      type: "Email Marketing",
      description: "Gestión avanzada de campañas de email",
      authType: "OAuth",
      popular: true
    },
    {
      name: "Slack",
      type: "Notifications",
      description: "Notificaciones de alertas y reportes",
      authType: "OAuth",
      popular: false
    },
    {
      name: "Google Analytics",
      type: "Analytics",
      description: "Métricas de comportamiento web",
      authType: "OAuth",
      popular: true
    },
    {
      name: "Zapier",
      type: "Automation",
      description: "Conecta con 3000+ aplicaciones",
      authType: "Webhook",
      popular: false
    },
    {
      name: "HubSpot",
      type: "CRM",
      description: "CRM y automatización de marketing",
      authType: "OAuth",
      popular: true
    }
  ];

  const syncHistory = [
    {
      id: 1,
      integration: "CRM Principal",
      timestamp: "2024-01-19 14:30",
      status: "success",
      records: 45,
      duration: "2.3s"
    },
    {
      id: 2,
      integration: "Sistema ERP",
      timestamp: "2024-01-19 12:15",
      status: "success",
      records: 12,
      duration: "1.8s"
    },
    {
      id: 3,
      integration: "WhatsApp Business",
      timestamp: "2024-01-18 09:22",
      status: "warning",
      records: 0,
      duration: "0.5s",
      error: "Límite de API alcanzado"
    },
    {
      id: 4,
      integration: "Email Marketing",
      timestamp: "2024-01-17 16:45",
      status: "error",
      records: 0,
      duration: "timeout",
      error: "Token de acceso expirado"
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'connected': return <CheckCircle2 className="h-4 w-4 text-status-green" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-cta-orange" />;
      case 'error': return <XCircle className="h-4 w-4 text-status-red" />;
      default: return <AlertCircle className="h-4 w-4 text-status-gray" />;
    }
  };

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'crm': return <Database className="h-5 w-5" />;
      case 'erp': return <Settings2 className="h-5 w-5" />;
      case 'email': return <Send className="h-5 w-5" />;
      case 'messaging': return <MessageSquare className="h-5 w-5" />;
      case 'gaming': return <Gamepad2 className="h-5 w-5" />;
      case 'e-commerce': return <Database className="h-5 w-5" />;
      case 'analytics': return <Activity className="h-5 w-5" />;
      case 'automation': return <Settings2 className="h-5 w-5" />;
      case 'notifications': return <Send className="h-5 w-5" />;
      default: return <Settings2 className="h-5 w-5" />;
    }
  };

  const getAuthIcon = (authType) => {
    switch (authType) {
      case 'API Key': return <Key className="h-4 w-4" />;
      case 'OAuth': return <LogIn className="h-4 w-4" />;
      case 'Webhook': return <Webhook className="h-4 w-4" />;
      default: return <Key className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-sora font-bold text-foreground">Integraciones</h1>
          <p className="text-sm text-muted-foreground mt-1">Gestiona conexiones con sistemas externos</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nueva integración
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Activas</p>
                <p className="text-2xl font-bold text-status-green">3</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-status-green" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Con advertencias</p>
                <p className="text-2xl font-bold text-cta-orange">1</p>
              </div>
              <AlertCircle className="h-8 w-8 text-cta-orange" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Con errores</p>
                <p className="text-2xl font-bold text-status-red">1</p>
              </div>
              <XCircle className="h-8 w-8 text-status-red" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Registros hoy</p>
                <p className="text-2xl font-bold text-foreground">4.7K</p>
              </div>
              <Database className="h-8 w-8 text-light-blue" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="available">Disponibles</TabsTrigger>
          <TabsTrigger value="history">Historial</TabsTrigger>
          <TabsTrigger value="sandbox">Sandbox</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4">
            {connectedIntegrations.map((integration) => (
              <Card key={integration.id} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-sidebar-accent rounded-lg">
                        {getTypeIcon(integration.type)}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-foreground">{integration.name}</h3>
                          {getStatusIcon(integration.status)}
                          <Badge variant="secondary" className="text-xs">
                            {integration.type}
                          </Badge>
                          {integration.version && (
                            <Badge variant="outline" className="text-xs">
                              {integration.version}
                            </Badge>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Última sincronización</p>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span className="text-foreground">{integration.lastSync}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Registros procesados</p>
                            <span className="text-foreground font-medium">{integration.records.toLocaleString()}</span>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Estado de salud</p>
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${
                                integration.health === 'excellent' ? 'bg-status-green/20 text-status-green border-status-green/30' :
                                integration.health === 'good' ? 'bg-status-blue/20 text-status-blue border-status-blue/30' :
                                integration.health === 'warning' ? 'bg-cta-orange/20 text-cta-orange border-cta-orange/30' :
                                'bg-status-red/20 text-status-red border-status-red/30'
                              }`}
                            >
                              {integration.health}
                            </Badge>
                          </div>
                        </div>
                        {integration.error && (
                          <div className="flex items-center gap-2 p-2 bg-status-red/10 rounded-lg">
                            <AlertTriangle className="h-4 w-4 text-status-red" />
                            <span className="text-sm text-status-red">{integration.error}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Ver detalles
                      </Button>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Sincronizar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings2 className="h-4 w-4 mr-1" />
                        Configurar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="available" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableIntegrations.map((integration, index) => (
              <Card key={index} className="bg-card border-border hover:border-light-blue/50 transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-sidebar-accent rounded-lg">
                          {getTypeIcon(integration.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{integration.name}</h3>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {integration.type}
                          </Badge>
                        </div>
                      </div>
                      {integration.popular && (
                        <Badge variant="default" className="text-xs bg-cta-orange/20 text-cta-orange border-cta-orange/30">
                          Popular
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{integration.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {getAuthIcon(integration.authType)}
                        <span>{integration.authType}</span>
                      </div>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Conectar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Historial de sincronización</h3>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar logs
            </Button>
          </div>
          
          <Card className="bg-card border-border">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-6 text-muted-foreground font-medium">Integración</th>
                      <th className="text-left py-3 px-6 text-muted-foreground font-medium">Timestamp</th>
                      <th className="text-left py-3 px-6 text-muted-foreground font-medium">Estado</th>
                      <th className="text-left py-3 px-6 text-muted-foreground font-medium">Registros</th>
                      <th className="text-left py-3 px-6 text-muted-foreground font-medium">Duración</th>
                      <th className="text-left py-3 px-6 text-muted-foreground font-medium">Detalles</th>
                    </tr>
                  </thead>
                  <tbody>
                    {syncHistory.map((sync) => (
                      <tr key={sync.id} className="border-b border-border hover:bg-sidebar-accent transition-colors">
                        <td className="py-3 px-6 text-foreground font-medium">{sync.integration}</td>
                        <td className="py-3 px-6 text-foreground">{sync.timestamp}</td>
                        <td className="py-3 px-6">
                          <Badge 
                            variant="secondary" 
                            className={`text-xs ${
                              sync.status === 'success' ? 'bg-status-green/20 text-status-green border-status-green/30' :
                              sync.status === 'warning' ? 'bg-cta-orange/20 text-cta-orange border-cta-orange/30' :
                              'bg-status-red/20 text-status-red border-status-red/30'
                            }`}
                          >
                            {sync.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-6 text-foreground">{sync.records}</td>
                        <td className="py-3 px-6 text-foreground">{sync.duration}</td>
                        <td className="py-3 px-6">
                          {sync.error ? (
                            <span className="text-sm text-status-red">{sync.error}</span>
                          ) : (
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sandbox" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <TestTube className="h-5 w-5 text-light-blue" />
                Sandbox de pruebas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground">
                Verifica que los datos lleguen correctamente antes de activar la integración en producción.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Configuración de prueba</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-foreground">URL de prueba</label>
                      <Input placeholder="https://sandbox.api.ejemplo.com" className="mt-1" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">API Key de prueba</label>
                      <Input placeholder="test_key_123..." type="password" className="mt-1" />
                    </div>
                    <Button className="w-full">
                      <TestTube className="h-4 w-4 mr-2" />
                      Ejecutar prueba
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-foreground">Resultado de la prueba</h4>
                  <div className="p-4 bg-sidebar-accent rounded-lg">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-status-green" />
                        <span className="text-sm text-foreground">Conexión establecida</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-status-green" />
                        <span className="text-sm text-foreground">Autenticación exitosa</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-status-green" />
                        <span className="text-sm text-foreground">5 registros de prueba recibidos</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IntegrationsView;