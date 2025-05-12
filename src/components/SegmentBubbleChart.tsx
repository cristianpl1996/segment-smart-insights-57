
import React, { useState, useEffect, useRef } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Download } from "lucide-react";

interface BubbleDataPoint {
  name: string;
  avgTicket: number;
  frequency: number;
  users: number;
  status: 'ideal' | 'risk' | 'lost' | 'potential';
  daysSinceLastPurchase: number;
  id: string;
}

// Sample data for the chart
const bubbleData: BubbleDataPoint[] = [
  // Ideal customers
  { id: '1-1', name: 'Compradores frecuentes', avgTicket: 85.50, frequency: 4.2, users: 3250, status: 'ideal', daysSinceLastPurchase: 12 },
  { id: '1-2', name: 'Ticket alto', avgTicket: 160.25, frequency: 1.5, users: 2170, status: 'ideal', daysSinceLastPurchase: 25 },
  
  // At risk customers
  { id: '2-1', name: 'Recencia en riesgo', avgTicket: 75.40, frequency: 2.1, users: 2350, status: 'risk', daysSinceLastPurchase: 45 },
  { id: '2-2', name: 'Frecuencia en caída', avgTicket: 82.10, frequency: 1.2, users: 1490, status: 'risk', daysSinceLastPurchase: 30 },
  
  // Lost customers
  { id: '3-1', name: 'Sin compras +180 días', avgTicket: 54.75, frequency: 0.8, users: 3100, status: 'lost', daysSinceLastPurchase: 210 },
  { id: '3-2', name: 'Compradores únicos antiguos', avgTicket: 42.30, frequency: 1, users: 1100, status: 'lost', daysSinceLastPurchase: 190 },
  
  // Potential customers
  { id: '4-1', name: 'Compradores recientes', avgTicket: 45.60, frequency: 1.1, users: 1980, status: 'potential', daysSinceLastPurchase: 15 },
  { id: '4-2', name: 'Nuevos leads', avgTicket: 0, frequency: 0, users: 1860, status: 'potential', daysSinceLastPurchase: 0 },
];

// Status colors for bubbles
const statusColors = {
  ideal: '#4ade80',
  risk: '#ef4444',
  lost: '#94a3b8',
  potential: '#3b82f6'
};

// Status names for legend
const statusNames = {
  ideal: 'Ideal',
  risk: 'En riesgo',
  lost: 'Perdido',
  potential: 'Potencial'
};

const SegmentBubbleChart = () => {
  const [selectedData, setSelectedData] = useState<BubbleDataPoint[]>(bubbleData);
  const [viewMode, setViewMode] = useState<'frequency' | 'recency'>('frequency');
  const [selectedBubbles, setSelectedBubbles] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  
  const handleFilterChange = (value: string) => {
    setFilterType(value);
    if (value === 'all') {
      setSelectedData(bubbleData);
    } else if (value === 'top5-size') {
      // Top 5 by users count
      setSelectedData([...bubbleData].sort((a, b) => b.users - a.users).slice(0, 5));
    } else if (value === 'top5-risk') {
      // All risk segments and top others by risk (days since last purchase)
      const riskSegments = bubbleData.filter(d => d.status === 'risk');
      const otherSegments = bubbleData.filter(d => d.status !== 'risk')
                                     .sort((a, b) => b.daysSinceLastPurchase - a.daysSinceLastPurchase)
                                     .slice(0, 5 - riskSegments.length);
      setSelectedData([...riskSegments, ...otherSegments]);
    } else if (value === 'top5-ticket') {
      // Top 5 by average ticket
      setSelectedData([...bubbleData].sort((a, b) => b.avgTicket - a.avgTicket).slice(0, 5));
    }
  };

  const handleBubbleClick = (data: BubbleDataPoint) => {
    if (selectedBubbles.includes(data.id)) {
      setSelectedBubbles(selectedBubbles.filter(id => id !== data.id));
    } else {
      setSelectedBubbles([...selectedBubbles, data.id]);
    }
  };

  const handleCompare = () => {
    const selectedNames = selectedBubbles.map(id => 
      bubbleData.find(item => item.id === id)?.name
    ).filter(Boolean);
    toast.success(`Comparando segmentos: ${selectedNames.join(', ')}`);
  };

  const handleExport = () => {
    toast.success('Descargando gráfico como PNG');
  };

  const handleViewDetail = (data: BubbleDataPoint) => {
    toast.success(`Viendo detalles de: ${data.name}`);
  };

  const handleCreateCampaign = (data: BubbleDataPoint) => {
    toast.success(`Creando campaña para: ${data.name}`);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 p-3 border border-gray-700 rounded-md shadow-lg">
          <p className="font-semibold text-white mb-1">{data.name}</p>
          <p className="text-sm text-gray-300">Usuarios: {data.users.toLocaleString()}</p>
          <p className="text-sm text-gray-300">Ticket promedio: ${data.avgTicket.toFixed(2)}</p>
          {viewMode === 'frequency' ? (
            <p className="text-sm text-gray-300">Frecuencia: {data.frequency.toFixed(1)}</p>
          ) : (
            <p className="text-sm text-gray-300">Días última compra: {data.daysSinceLastPurchase}</p>
          )}
          <p className="text-sm text-gray-300 mt-1 font-semibold">
            Estado: <span style={{ color: statusColors[data.status] }}>{statusNames[data.status]}</span>
          </p>
          <div className="mt-2 pt-2 border-t border-gray-700 flex space-x-2">
            <button 
              onClick={() => handleViewDetail(data)}
              className="text-xs px-2 py-1 bg-light-blue/20 hover:bg-light-blue/30 text-light-blue rounded"
            >
              Ver detalle
            </button>
            <button 
              onClick={() => handleCreateCampaign(data)}
              className="text-xs px-2 py-1 bg-cta-orange/90 hover:bg-cta-orange text-black rounded"
            >
              Crear campaña
            </button>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderLegend = (props: any) => {
    const { payload } = props;
    const uniqueStatuses = Array.from(new Set(selectedData.map(item => item.status)));
    
    return (
      <div className="flex justify-center mb-4">
        {uniqueStatuses.map((status) => (
          <div key={status} className="flex items-center mx-3">
            <div 
              className="w-3 h-3 mr-1 rounded-full" 
              style={{ backgroundColor: statusColors[status as keyof typeof statusColors] }} 
            />
            <span className="text-sm text-gray-300">
              {statusNames[status as keyof typeof statusNames]}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-gray-800 p-5 h-full">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-sora font-extrabold text-white">Visualización de Segmentos</h2>
        
        <div className="flex flex-wrap gap-4">
          <div>
            <Select value={filterType} onValueChange={handleFilterChange}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white w-[200px]">
                <SelectValue placeholder="Filtrar segmentos" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="all">Todos los segmentos</SelectItem>
                <SelectItem value="top5-size">Top 5 por tamaño</SelectItem>
                <SelectItem value="top5-risk">Top 5 por riesgo</SelectItem>
                <SelectItem value="top5-ticket">Top 5 por ticket</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex bg-gray-800 rounded-md">
            <Button 
              variant="ghost" 
              className={`rounded-r-none ${viewMode === 'frequency' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
              onClick={() => setViewMode('frequency')}
            >
              Frecuencia
            </Button>
            <Button 
              variant="ghost" 
              className={`rounded-l-none ${viewMode === 'recency' ? 'bg-gray-700 text-white' : 'text-gray-400'}`}
              onClick={() => setViewMode('recency')}
            >
              Recencia
            </Button>
          </div>
          
          <Button 
            variant="outline" 
            className="bg-transparent border-light-blue text-light-blue hover:bg-light-blue/10"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          
          {selectedBubbles.length > 0 && (
            <Button 
              className="bg-cta-orange text-black hover:bg-cta-orange/90"
              onClick={handleCompare}
            >
              Comparar ({selectedBubbles.length})
            </Button>
          )}
        </div>
      </div>
      
      <div className="h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          >
            <XAxis 
              type="number" 
              dataKey="avgTicket" 
              name="Ticket promedio" 
              domain={['auto', 'auto']}
              label={{ value: 'Ticket Promedio ($)', position: 'bottom', style: { fill: '#94a3b8' } }}
              tick={{ fill: '#94a3b8' }}
              stroke="#4b5563"
            />
            <YAxis 
              type="number" 
              dataKey={viewMode === 'frequency' ? 'frequency' : 'daysSinceLastPurchase'} 
              name={viewMode === 'frequency' ? 'Frecuencia' : 'Días última compra'} 
              domain={['auto', 'auto']}
              label={{ 
                value: viewMode === 'frequency' ? 'Frecuencia' : 'Días última compra', 
                angle: -90, 
                position: 'insideLeft',
                style: { fill: '#94a3b8' } 
              }}
              tick={{ fill: '#94a3b8' }}
              stroke="#4b5563"
            />
            <ZAxis 
              type="number" 
              dataKey="users" 
              range={[400, 2000]} 
              name="Usuarios" 
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }} 
              wrapperStyle={{ zIndex: 100 }}
              content={<CustomTooltip />} 
            />
            <Legend content={renderLegend} />
            <Scatter 
              name="Segmentos" 
              data={selectedData} 
              onClick={(data) => handleBubbleClick(data)}
            >
              {selectedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={statusColors[entry.status]}
                  fillOpacity={selectedBubbles.includes(entry.id) ? 1 : 0.6}
                  stroke={selectedBubbles.includes(entry.id) ? '#ffffff' : 'none'}
                  strokeWidth={2}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SegmentBubbleChart;
