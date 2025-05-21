
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Filter, Save, Send, ArrowRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import DemographicZoom from "./DemographicZoom";
import SegmentTooltipCard from "./SegmentTooltipCard";

interface SegmentData {
  xValue: string;
  yValue: number;
  users: number;
  status: 'ideal' | 'risk' | 'lost' | 'potential';
  avgTicket: number;
  daysSinceLastPurchase: number;
  id: string;
}

// Sample data for the heatmap
const generateHeatmapData = (): SegmentData[] => {
  const data: SegmentData[] = [];
  const yValues = [1, 2, 3, 4, 5]; // Frequency values
  const xValues = ['<1', '1,2', '2,3', '4,4', '0,5', '4']; // Average order values
  
  let id = 1;

  for (const xValue of xValues) {
    for (const yValue of yValues) {
      // Determine status based on position
      let status: 'ideal' | 'risk' | 'lost' | 'potential';
      
      if (xValue === '2,3' && (yValue === 3 || yValue === 4)) {
        status = 'risk';
      } else if (yValue >= 4 && (xValue === '4' || xValue === '0,5')) {
        status = 'ideal';
      } else if (yValue <= 2 && (xValue === '<1' || xValue === '1,2')) {
        status = 'lost';
      } else {
        status = 'potential';
      }
      
      // Generate users count (higher in some specific areas)
      let users = Math.floor(Math.random() * 30) + 1;
      if (xValue === '2,3' && yValue === 3) users = 32;
      if (xValue === '2,3' && yValue === 4) users = 32;
      if (xValue === '<1' && yValue === 1) users = 43;
      if (xValue === '1,2' && yValue === 1) users = 31;
      if (xValue === '1,2' && yValue === 2) users = 16;
      if (xValue === '2,3' && yValue === 1) users = 22;
      if (xValue === '4,4' && yValue === 1) users = 23;
      if (xValue === '<1' && yValue === 2) users = 12;
      if (xValue === '4,4' && yValue === 2) users = 10;
      if (xValue === '1,2' && yValue === 3) users = 11;
      if (xValue === '4,4' && yValue === 3) users = 6;
      if (xValue === '<1' && yValue === 3) users = 6;
      
      data.push({
        xValue,
        yValue,
        users,
        status,
        avgTicket: parseFloat(xValue.replace(',', '.').replace('<', '')) || 0.5,
        daysSinceLastPurchase: Math.floor(Math.random() * 200) + 1,
        id: `segment-${id++}`
      });
    }
  }
  
  return data;
};

// Status colors for cells
const statusColors = {
  ideal: '#4ade80',
  risk: '#ef4444',
  lost: '#94a3b8',
  potential: '#f59e0b'
};

// Status names for legend
const statusNames = {
  ideal: 'Ideal',
  risk: 'En riesgo',
  lost: 'Perdido',
  potential: 'Potencial'
};

const SegmentBubbleChart = () => {
  const [heatmapData, setHeatmapData] = useState<SegmentData[]>(generateHeatmapData());
  const [xAxis, setXAxis] = useState<'avgTicket' | 'recency'>('avgTicket');
  const [yAxis, setYAxis] = useState<'frequency'>('frequency');
  const [selectedCells, setSelectedCells] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState<SegmentData | null>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const [tooltipSegment, setTooltipSegment] = useState<SegmentData | null>(null);
  const [totalUsers, setTotalUsers] = useState(0);
  
  useEffect(() => {
    // Calculate total users for percentage calculation
    const total = heatmapData.reduce((sum, segment) => sum + segment.users, 0);
    setTotalUsers(total);
  }, [heatmapData]);
  
  // Calculate color intensity based on users count
  const getColorIntensity = (users: number) => {
    const max = Math.max(...heatmapData.map(d => d.users));
    const intensity = Math.max(0.3, Math.min(1, users / max));
    return intensity;
  };
  
  // Calculate percentage of total users
  const getUserPercentage = (users: number) => {
    return totalUsers > 0 ? Math.round((users / totalUsers) * 100) : 0;
  };
  
  const handleFilterChange = (value: string) => {
    setFilterType(value);
    // Filter implementation would go here
    // For now, we'll just use the full dataset
  };
  
  const handleCellClick = (segment: SegmentData, event: React.MouseEvent) => {
    setSelectedSegment(segment);
    setTooltipSegment(segment);
    setTooltipVisible(true);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };
  
  const handleCellMouseEnter = (segment: SegmentData, event: React.MouseEvent) => {
    setTooltipSegment(segment);
    setTooltipVisible(true);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };
  
  const handleCellMouseLeave = () => {
    // Add a small delay before hiding to allow users to move to the tooltip
    setTimeout(() => {
      setTooltipVisible(false);
    }, 100);
  };
  
  const handleCellSelect = (segment: SegmentData) => {
    if (selectedCells.includes(segment.id)) {
      setSelectedCells(selectedCells.filter(id => id !== segment.id));
    } else {
      setSelectedCells([...selectedCells, segment.id]);
    }
  };
  
  const handleCompare = () => {
    const selectedNames = selectedCells.map(id => 
      heatmapData.find(item => item.id === id)?.xValue + " / " + 
      heatmapData.find(item => item.id === id)?.yValue
    ).filter(Boolean);
    toast.success(`Comparando segmentos: ${selectedNames.join(', ')}`);
  };
  
  const handleExport = () => {
    toast.success('Descargando gráfico como Excel');
  };
  
  const handleDetailClose = () => {
    setIsDetailOpen(false);
    setSelectedSegment(null);
  };
  
  const handleViewDetail = () => {
    if (tooltipSegment) {
      setSelectedSegment(tooltipSegment);
      setIsDetailOpen(true);
      setTooltipVisible(false);
    }
  };
  
  const handleCreateCampaign = () => {
    if (tooltipSegment) {
      toast.success(`Creando campaña para segmento ${tooltipSegment.xValue}/${tooltipSegment.yValue}`);
      setTooltipVisible(false);
    }
  };
  
  const handleAxisChange = (axis: string, value: string) => {
    if (axis === 'x') {
      setXAxis(value as 'avgTicket' | 'recency');
    } else if (axis === 'y') {
      setYAxis(value as 'frequency');
    }
  };
  
  // Create a 2D structure for the heatmap for easier rendering
  const getHeatmapGrid = () => {
    const xValues = ['<1', '1,2', '2,3', '4,4', '0,5', '4'];
    const yValues = [5, 4, 3, 2, 1]; // Reversed for rendering top to bottom
    
    const grid: SegmentData[][] = [];
    
    for (const yValue of yValues) {
      const row: SegmentData[] = [];
      for (const xValue of xValues) {
        const cell = heatmapData.find(d => d.xValue === xValue && d.yValue === yValue);
        if (cell) {
          row.push(cell);
        }
      }
      grid.push(row);
    }
    
    return grid;
  };
  
  const heatmapGrid = getHeatmapGrid();
  
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-lg border border-gray-800 p-5 h-full">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-sora font-extrabold text-white">Segmentación de Usuarios</h2>
        
        <div className="flex flex-wrap gap-4">
          <div>
            <Select value={filterType} onValueChange={handleFilterChange}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white w-[200px]">
                <SelectValue placeholder="Filtrar segmentos" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="all">Todos los segmentos</SelectItem>
                <SelectItem value="top-users">Top por usuarios</SelectItem>
                <SelectItem value="top-risk">Segmentos en riesgo</SelectItem>
                <SelectItem value="top-potential">Mayor potencial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            variant="outline" 
            className="bg-transparent border-light-blue text-light-blue hover:bg-light-blue/10"
            onClick={handleExport}
          >
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          
          {selectedCells.length > 0 && (
            <Button 
              className="bg-cta-orange text-black hover:bg-cta-orange/90"
              onClick={handleCompare}
            >
              Comparar ({selectedCells.length})
            </Button>
          )}
        </div>
      </div>
      
      <div className="flex flex-col space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-300 mb-2">X-axis</p>
            <Select value={xAxis} onValueChange={(value) => handleAxisChange('x', value)}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="Seleccionar variable X" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="avgTicket">Average order value</SelectItem>
                <SelectItem value="recency">Recency (days)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <p className="text-gray-300 mb-2">Y-axis</p>
            <Select value={yAxis} onValueChange={(value) => handleAxisChange('y', value)}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="Seleccionar variable Y" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="frequency">Purchase frequency</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-center mt-2">
          <div className="flex items-center justify-between space-x-4">
            {Object.entries(statusColors).map(([status, color]) => (
              <div key={status} className="flex items-center">
                <div 
                  className="w-3 h-3 mr-1 rounded-sm" 
                  style={{ backgroundColor: color }} 
                />
                <span className="text-sm text-gray-300">
                  {statusNames[status as keyof typeof statusNames]}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-gray-400 whitespace-nowrap">
              Purchase frequency
            </div>
            
            <div className="mx-auto">
              <div className="flex flex-col">
                {heatmapGrid.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex">
                    <div className="flex items-center justify-center w-8 h-24 text-gray-400">
                      {heatmapGrid.length - rowIndex}
                    </div>
                    {row.map((cell, cellIndex) => (
                      <div 
                        key={`${rowIndex}-${cellIndex}`}
                        className={`
                          relative flex items-center justify-center h-24 w-24 m-0.5 cursor-pointer 
                          hover:ring-2 hover:ring-white transition-all duration-150
                          ${selectedCells.includes(cell.id) ? 'ring-2 ring-white' : ''}
                        `}
                        style={{ 
                          backgroundColor: statusColors[cell.status], 
                          opacity: getColorIntensity(cell.users)
                        }}
                        onClick={(e) => handleCellClick(cell, e)}
                        onMouseEnter={(e) => handleCellMouseEnter(cell, e)}
                        onMouseLeave={handleCellMouseLeave}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          handleCellSelect(cell);
                        }}
                      >
                        <span className="text-xl font-semibold text-white">{cell.users}</span>
                        <span className="absolute bottom-1 right-1 text-[10px] text-white/70">
                          {getUserPercentage(cell.users)}%
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
                
                <div className="flex mt-2">
                  <div className="w-8"></div>
                  {heatmapGrid[0].map((cell, index) => (
                    <div key={index} className="flex items-center justify-center h-8 w-24 text-gray-400">
                      {cell.xValue}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="text-center text-gray-400 mt-4">
                {xAxis === 'avgTicket' ? 'Average order value' : 'Recency (days)'}
              </div>
            </div>
          </div>
        </div>
        
        {selectedCells.length > 0 && (
          <div className="bg-gray-800/50 p-3 rounded-md border border-gray-700 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-white">
                {selectedCells.length} segmentos seleccionados
              </span>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-gray-600"
                  onClick={() => setSelectedCells([])}
                >
                  Limpiar selección
                </Button>
                <Button 
                  size="sm" 
                  className="bg-cta-orange text-black hover:bg-cta-orange/90"
                  onClick={handleCompare}
                >
                  Comparar segmentos
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {tooltipVisible && tooltipSegment && (
        <SegmentTooltipCard
          isVisible={tooltipVisible}
          position={tooltipPosition}
          segmentName={`Segmento ${tooltipSegment.xValue}/${tooltipSegment.yValue}`}
          users={tooltipSegment.users}
          avgTicket={tooltipSegment.avgTicket}
          daysSinceLastPurchase={tooltipSegment.daysSinceLastPurchase}
          status={tooltipSegment.status}
          onDetailClick={handleViewDetail}
          onCampaignClick={handleCreateCampaign}
        />
      )}
      
      {isDetailOpen && selectedSegment && (
        <DemographicZoom 
          isOpen={isDetailOpen}
          onClose={handleDetailClose}
          segmentName={`Segmento ${selectedSegment.xValue}/${selectedSegment.yValue}`}
          segmentStatus={selectedSegment.status}
        />
      )}
    </div>
  );
};

export default SegmentBubbleChart;
