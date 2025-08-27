import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Map, 
  Target, 
  Users, 
  Eye, 
  Send, 
  History,
  Filter,
  Download
} from "lucide-react";

interface CoverageCell {
  xValue: string;
  yValue: string;
  userCount: number;
  impactStatus: 'impacted' | 'not-impacted' | 'partial';
  campaignCount: number;
  lastCampaign?: string;
}

interface CampaignHistory {
  id: string;
  name: string;
  date: string;
  segments: string[];
  userCount: number;
  filters: string[];
}

const CoverageMapView = () => {
  const [xAxis, setXAxis] = useState<string>('age');
  const [yAxis, setYAxis] = useState<string>('ticket');
  const [selectedCell, setSelectedCell] = useState<CoverageCell | null>(null);

  // Mock data for coverage matrix
  const coverageData: CoverageCell[] = [
    { xValue: '18-25', yValue: 'Alto', userCount: 1250, impactStatus: 'impacted', campaignCount: 3, lastCampaign: '2024-01-15' },
    { xValue: '18-25', yValue: 'Medio', userCount: 2100, impactStatus: 'partial', campaignCount: 1, lastCampaign: '2024-01-10' },
    { xValue: '18-25', yValue: 'Bajo', userCount: 890, impactStatus: 'not-impacted', campaignCount: 0 },
    { xValue: '26-35', yValue: 'Alto', userCount: 1890, impactStatus: 'impacted', campaignCount: 2, lastCampaign: '2024-01-20' },
    { xValue: '26-35', yValue: 'Medio', userCount: 3200, impactStatus: 'partial', campaignCount: 1, lastCampaign: '2024-01-08' },
    { xValue: '26-35', yValue: 'Bajo', userCount: 1560, impactStatus: 'not-impacted', campaignCount: 0 },
    { xValue: '36-45', yValue: 'Alto', userCount: 980, impactStatus: 'impacted', campaignCount: 4, lastCampaign: '2024-01-18' },
    { xValue: '36-45', yValue: 'Medio', userCount: 1780, impactStatus: 'partial', campaignCount: 2, lastCampaign: '2024-01-12' },
    { xValue: '36-45', yValue: 'Bajo', userCount: 670, impactStatus: 'not-impacted', campaignCount: 0 },
  ];

  // Mock campaign history
  const campaignHistory: CampaignHistory[] = [
    {
      id: '1',
      name: 'Campaña Black Friday',
      date: '2024-01-20',
      segments: ['18-25 Alto', '26-35 Alto', '36-45 Alto'],
      userCount: 4120,
      filters: ['Edad: 18-45', 'Ticket: Alto', 'Canal: Email']
    },
    {
      id: '2',
      name: 'Reactivación Enero',
      date: '2024-01-15',
      segments: ['18-25 Alto', '36-45 Alto'],
      userCount: 2230,
      filters: ['Última compra: >30 días', 'Ticket: Alto']
    },
    {
      id: '3',
      name: 'Bienvenida Nuevos',
      date: '2024-01-12',
      segments: ['26-35 Medio', '36-45 Medio'],
      userCount: 4980,
      filters: ['Registro: Últimos 7 días', 'Primera compra: Sí']
    }
  ];

  const getImpactColor = (status: string) => {
    switch (status) {
      case 'impacted':
        return 'bg-status-green/20 border-status-green/30 text-status-green';
      case 'not-impacted':
        return 'bg-status-red/20 border-status-red/30 text-status-red';
      case 'partial':
        return 'bg-cta-orange/20 border-cta-orange/30 text-cta-orange';
      default:
        return 'bg-sidebar-accent border-sidebar-border text-sidebar-foreground';
    }
  };

  const getImpactIcon = (status: string) => {
    switch (status) {
      case 'impacted':
        return '🟢';
      case 'not-impacted':
        return '🔴';
      case 'partial':
        return '🟡';
      default:
        return '⚪';
    }
  };

  const xAxisOptions = [
    { value: 'age', label: 'Edad' },
    { value: 'city', label: 'Ciudad' },
    { value: 'product', label: 'Producto Preferido' },
    { value: 'channel', label: 'Canal Preferido' },
  ];

  const yAxisOptions = [
    { value: 'ticket', label: 'Ticket Promedio' },
    { value: 'frequency', label: 'Frecuencia' },
    { value: 'recency', label: 'Recencia' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Map className="h-6 w-6 text-light-blue" />
          <div>
            <h1 className="text-2xl font-sora font-bold text-foreground">
              Mapa de Cobertura
            </h1>
            <p className="text-muted-foreground">
              Visualiza el impacto de campañas por segmentos de usuarios
            </p>
          </div>
        </div>
        <Button variant="outline" className="text-foreground border-border">
          <Download className="h-4 w-4 mr-2" />
          Exportar
        </Button>
      </div>

      <Tabs defaultValue="matrix" className="space-y-6">
        <TabsList className="bg-sidebar-accent">
          <TabsTrigger value="matrix" className="data-[state=active]:bg-sidebar-primary data-[state=active]:text-sidebar-primary-foreground">
            <Target className="h-4 w-4 mr-2" />
            Matriz de Cobertura
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-sidebar-primary data-[state=active]:text-sidebar-primary-foreground">
            <History className="h-4 w-4 mr-2" />
            Historial de Impacto
          </TabsTrigger>
        </TabsList>

        <TabsContent value="matrix" className="space-y-6">
          {/* Controls */}
          <div className="flex items-center space-x-4 p-4 bg-sidebar-accent rounded-lg border border-sidebar-border">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <label className="text-sm font-medium text-foreground">Eje X:</label>
              <Select value={xAxis} onValueChange={setXAxis}>
                <SelectTrigger className="w-48 bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {xAxisOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-foreground">Eje Y:</label>
              <Select value={yAxis} onValueChange={setYAxis}>
                <SelectTrigger className="w-48 bg-background border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {yAxisOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Coverage Matrix */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <span>🟢</span>
                <span>Ya impactados</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🟡</span>
                <span>Parcialmente impactados</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>🔴</span>
                <span>No impactados</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {coverageData.map((cell, index) => (
                <Card
                  key={index}
                  className={`p-4 cursor-pointer transition-all hover:scale-105 border ${getImpactColor(cell.impactStatus)}`}
                  onClick={() => setSelectedCell(cell)}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-lg">{getImpactIcon(cell.impactStatus)}</span>
                      <Badge variant="secondary" className="text-xs">
                        {cell.campaignCount} campañas
                      </Badge>
                    </div>
                    <div className="text-sm font-medium">
                      {cell.xValue} × {cell.yValue}
                    </div>
                    <div className="text-2xl font-bold">
                      {cell.userCount.toLocaleString()}
                    </div>
                    <div className="text-xs opacity-70">
                      usuarios
                    </div>
                    {cell.lastCampaign && (
                      <div className="text-xs opacity-50">
                        Último: {new Date(cell.lastCampaign).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Selected Cell Details */}
          {selectedCell && (
            <Card className="p-6 bg-sidebar-accent border-sidebar-border">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">
                    Segmento: {selectedCell.xValue} × {selectedCell.yValue}
                  </h3>
                  <Badge className={getImpactColor(selectedCell.impactStatus)}>
                    {getImpactIcon(selectedCell.impactStatus)} {
                      selectedCell.impactStatus === 'impacted' ? 'Completamente impactado' :
                      selectedCell.impactStatus === 'partial' ? 'Parcialmente impactado' :
                      'No impactado'
                    }
                  </Badge>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-light-blue">
                      {selectedCell.userCount.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Usuarios</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cta-orange">
                      {selectedCell.campaignCount}
                    </div>
                    <div className="text-sm text-muted-foreground">Campañas previas</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-status-green">
                      {selectedCell.lastCampaign ? 
                        Math.floor((new Date().getTime() - new Date(selectedCell.lastCampaign).getTime()) / (1000 * 60 * 60 * 24)) 
                        : '-'
                      }
                    </div>
                    <div className="text-sm text-muted-foreground">Días desde última</div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    Ver usuarios
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <History className="h-4 w-4 mr-2" />
                    Ver historial
                  </Button>
                  <Button className="flex-1 bg-light-blue hover:bg-light-blue/90">
                    <Send className="h-4 w-4 mr-2" />
                    Nueva campaña
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">
              Historial de Campañas e Impacto
            </h3>
            
            {campaignHistory.map((campaign) => (
              <Card key={campaign.id} className="p-6 bg-sidebar-accent border-sidebar-border">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">{campaign.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(campaign.date).toLocaleDateString()} • {campaign.userCount.toLocaleString()} usuarios impactados
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Ver detalles
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-foreground">Segmentos impactados:</div>
                    <div className="flex flex-wrap gap-2">
                      {campaign.segments.map((segment, idx) => (
                        <Badge key={idx} variant="secondary" className="bg-light-blue/20 text-light-blue">
                          {segment}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-foreground">Filtros aplicados:</div>
                    <div className="flex flex-wrap gap-2">
                      {campaign.filters.map((filter, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {filter}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoverageMapView;