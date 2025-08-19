import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  Layers, 
  TrendingUp, 
  Users, 
  Search, 
  Bot, 
  Settings2,
  ChevronRight,
  AlertTriangle,
  Lightbulb,
  Zap
} from "lucide-react";


interface NavigationSidebarProps {
  activeView: 'tree' | 'bubble';
  setActiveView: (view: 'tree' | 'bubble') => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const NavigationSidebar = ({ activeView, setActiveView, activeSection, setActiveSection }: NavigationSidebarProps) => {
  return (
    <div className="w-80 bg-sidebar border-r border-sidebar-border h-screen overflow-y-auto">
      <div className="p-6">
        <h1 className="text-xl font-sora font-extrabold text-sidebar-foreground mb-8">
          Dashboard
        </h1>

        {/* Selector de vista */}
        <div className="mb-8">
          <h2 className="text-sm font-sora font-semibold text-sidebar-foreground mb-4 uppercase tracking-wider">
            Selector de Vista
          </h2>
          <div className="space-y-2">
            <Button
              variant={activeView === 'tree' ? "default" : "ghost"}
              onClick={() => setActiveView('tree')}
              className={`w-full justify-start ${
                activeView === 'tree' 
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
            >
              <Layers className="h-4 w-4 mr-3" />
              Vista Jerárquica
            </Button>
            <Button
              variant={activeView === 'bubble' ? "default" : "ghost"}
              onClick={() => setActiveView('bubble')}
              className={`w-full justify-start ${
                activeView === 'bubble' 
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
            >
              <BarChart3 className="h-4 w-4 mr-3" />
              Vista de Burbujas
            </Button>
          </div>
        </div>

        {/* Historial de ventas */}
        <div className="mb-8">
          <h2 className="text-sm font-sora font-semibold text-sidebar-foreground mb-4 uppercase tracking-wider">
            Historial de Ventas
          </h2>
          <Card className="bg-sidebar-accent border-sidebar-border p-4">
            <div className="flex items-center justify-between mb-3">
              <TrendingUp className="h-5 w-5 text-light-blue" />
              <Badge variant="secondary" className="bg-status-green/20 text-status-green border-status-green/30">
                +12%
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-sidebar-foreground/70">Esta semana</span>
                <span className="text-sidebar-foreground font-medium">$24,580</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-sidebar-foreground/70">Este mes</span>
                <span className="text-sidebar-foreground font-medium">$98,230</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full mt-3 text-light-blue hover:bg-light-blue/10">
              Ver detalle
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          </Card>
        </div>

        {/* Clientes */}
        <div className="mb-8">
          <h2 className="text-sm font-sora font-semibold text-sidebar-foreground mb-4 uppercase tracking-wider">
            Clientes
          </h2>
          <div className="space-y-3">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-sidebar-foreground/50" />
              <Input 
                placeholder="Buscar por nombre, email o ID..."
                className="pl-10 bg-sidebar-accent border-sidebar-border text-sidebar-foreground"
              />
            </div>
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${
                activeSection === 'customers' 
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
              onClick={() => setActiveSection('customers')}
            >
              <Users className="h-4 w-4 mr-3" />
              Vista 360° de clientes
              <ChevronRight className="h-3 w-3 ml-auto" />
            </Button>
          </div>
        </div>

        {/* Agentes de IA */}
        <div className="mb-8">
          <h2 className="text-sm font-sora font-semibold text-sidebar-foreground mb-4 uppercase tracking-wider">
            Agentes de IA
          </h2>
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              className={`w-full justify-start ${
                activeSection === 'ai-agents' 
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground' 
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
              onClick={() => setActiveSection('ai-agents')}
            >
              <Lightbulb className="h-4 w-4 mr-3 text-cta-orange" />
              Campañas sugeridas
              <Badge variant="secondary" className="ml-auto bg-cta-orange/20 text-cta-orange">3</Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <AlertTriangle className="h-4 w-4 mr-3 text-status-red" />
              Alertas de abandono
              <Badge variant="secondary" className="ml-auto bg-status-red/20 text-status-red">7</Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent">
              <Zap className="h-4 w-4 mr-3 text-light-blue" />
              Recomendaciones IA
              <Badge variant="secondary" className="ml-auto bg-light-blue/20 text-light-blue">12</Badge>
            </Button>
          </div>
        </div>

        {/* Integraciones */}
        <div className="mb-8">
          <h2 className="text-sm font-sora font-semibold text-sidebar-foreground mb-4 uppercase tracking-wider">
            Integraciones
          </h2>
          <Card className="bg-sidebar-accent border-sidebar-border p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-sidebar-foreground">Sistemas conectados</span>
                <Badge variant="secondary" className="bg-status-green/20 text-status-green">5/8</Badge>
              </div>
              <div className="space-y-2 text-xs text-sidebar-foreground/70">
                <div className="flex items-center justify-between">
                  <span>CRM</span>
                  <div className="h-2 w-2 rounded-full bg-status-green"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span>ERP</span>
                  <div className="h-2 w-2 rounded-full bg-status-green"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Email Marketing</span>
                  <div className="h-2 w-2 rounded-full bg-status-red"></div>
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className={`w-full mt-3 ${
                activeSection === 'integrations' 
                  ? 'bg-light-blue text-primary-foreground' 
                  : 'text-light-blue hover:bg-light-blue/10'
              }`}
              onClick={() => setActiveSection('integrations')}
            >
              <Settings2 className="h-3 w-3 mr-2" />
              Gestionar integraciones
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NavigationSidebar;