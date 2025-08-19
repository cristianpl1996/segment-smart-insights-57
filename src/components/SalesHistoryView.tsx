import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Calendar,
  Filter,
  Download
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const SalesHistoryView = () => {
  const [period, setPeriod] = useState("week");
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data
  const salesData = [
    { name: 'Lun', ventas: 12500, proyectadas: 11000 },
    { name: 'Mar', ventas: 15200, proyectadas: 13500 },
    { name: 'Mié', ventas: 18300, proyectadas: 16000 },
    { name: 'Jue', ventas: 21400, proyectadas: 18500 },
    { name: 'Vie', ventas: 19800, proyectadas: 20000 },
    { name: 'Sáb', ventas: 25600, proyectadas: 22000 },
    { name: 'Dom', ventas: 16900, proyectadas: 15000 }
  ];

  const kpiData = [
    {
      title: "Total Ventas",
      value: "$129,700",
      change: "+12.5%",
      isPositive: true,
      icon: DollarSign
    },
    {
      title: "Ticket Promedio",
      value: "$247",
      change: "+8.2%",
      isPositive: true,
      icon: ShoppingCart
    },
    {
      title: "Número de Compras",
      value: "525",
      change: "+4.1%",
      isPositive: true,
      icon: TrendingUp
    },
    {
      title: "Nuevos Clientes",
      value: "68",
      change: "-2.3%",
      isPositive: false,
      icon: Users
    }
  ];

  const transactionData = [
    { segmento: "Ideal", canal: "Web", ingresos: 45600, frecuencia: 4.2, conversion: "85%" },
    { segmento: "Potencial", canal: "App", ingresos: 32100, frecuencia: 2.8, conversion: "72%" },
    { segmento: "En Riesgo", canal: "WhatsApp", ingresos: 18900, frecuencia: 1.9, conversion: "45%" },
    { segmento: "Perdido", canal: "Web", ingresos: 8200, frecuencia: 0.5, conversion: "18%" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-sora font-bold text-foreground">Historial de Ventas</h1>
          <p className="text-sm text-muted-foreground mt-1">Análisis detallado de rendimiento comercial</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Día</SelectItem>
              <SelectItem value="week">Semana</SelectItem>
              <SelectItem value="month">Mes</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    {kpi.isPositive ? (
                      <TrendingUp className="h-4 w-4 text-status-green mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-status-red mr-1" />
                    )}
                    <span className={`text-sm ${kpi.isPositive ? 'text-status-green' : 'text-status-red'}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-sidebar-accent rounded-lg">
                  <kpi.icon className="h-6 w-6 text-light-blue" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="trends">Tendencias</TabsTrigger>
          <TabsTrigger value="segments">Por Segmento</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Main Chart */}
          <Card className="bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-foreground">Tendencia de Ventas</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-light-blue rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Ventas Reales</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-cta-orange rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Proyectadas</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ventas" 
                    stroke="#72e0e8" 
                    strokeWidth={3}
                    dot={{ fill: '#72e0e8', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="proyectadas" 
                    stroke="#f19532" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#f19532', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Análisis de Tendencias</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))', 
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="ventas" fill="#72e0e8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="segments" className="space-y-6">
          {/* Transaction Table */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Ventas por Segmento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Segmento</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Canal</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Ingresos</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Frecuencia</th>
                      <th className="text-left py-3 px-4 text-muted-foreground font-medium">Conversión</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionData.map((row, index) => (
                      <tr key={index} className="border-b border-border hover:bg-sidebar-accent transition-colors">
                        <td className="py-3 px-4">
                          <Badge 
                            variant="secondary" 
                            className={`
                              ${row.segmento === 'Ideal' ? 'bg-status-green/20 text-status-green border-status-green/30' : ''}
                              ${row.segmento === 'Potencial' ? 'bg-status-blue/20 text-status-blue border-status-blue/30' : ''}
                              ${row.segmento === 'En Riesgo' ? 'bg-cta-orange/20 text-cta-orange border-cta-orange/30' : ''}
                              ${row.segmento === 'Perdido' ? 'bg-status-red/20 text-status-red border-status-red/30' : ''}
                            `}
                          >
                            {row.segmento}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-foreground">{row.canal}</td>
                        <td className="py-3 px-4 text-foreground font-medium">${row.ingresos.toLocaleString()}</td>
                        <td className="py-3 px-4 text-foreground">{row.frecuencia}</td>
                        <td className="py-3 px-4 text-foreground">{row.conversion}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SalesHistoryView;