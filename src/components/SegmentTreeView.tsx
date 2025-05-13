import React, { useState } from "react";
import { ChevronDown, ChevronRight, MoreHorizontal, Users, ArrowDown, ArrowUp, Activity, AlertTriangle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Alert } from "@/components/ui/alert";
import { DemographicZoom } from "@/components/ui/demographic-zoom";

type SegmentStatus = 'ideal' | 'risk' | 'lost' | 'potential';

interface Segment {
  id: string;
  name: string;
  users: number;
  avgTicket: number;
  frequency: number;
  daysSinceLastPurchase: number;
  percentOfTotal: number;
  status: SegmentStatus;
  children?: Segment[];
  isExpanded?: boolean;
  similarTo?: string;
}

const statusColors = {
  ideal: 'status-green',
  risk: 'status-red',
  lost: 'status-gray',
  potential: 'status-blue'
};

const statusNames = {
  ideal: 'Ideal',
  risk: 'En riesgo',
  lost: 'Perdido',
  potential: 'Potencial'
};

// Sample data
const segmentData: Segment[] = [
  {
    id: '1',
    name: 'Clientes Ideales',
    users: 5420,
    avgTicket: 0,
    frequency: 0,
    daysSinceLastPurchase: 0,
    percentOfTotal: 32,
    status: 'ideal',
    children: [
      {
        id: '1-1',
        name: 'Compradores frecuentes',
        users: 3250,
        avgTicket: 85.50,
        frequency: 4.2,
        daysSinceLastPurchase: 12,
        percentOfTotal: 19,
        status: 'ideal',
      },
      {
        id: '1-2',
        name: 'Ticket alto',
        users: 2170,
        avgTicket: 160.25,
        frequency: 1.5,
        daysSinceLastPurchase: 25,
        percentOfTotal: 13,
        status: 'ideal',
        similarTo: 'Compradores de valor premium'
      },
    ],
  },
  {
    id: '2',
    name: 'Clientes en Riesgo',
    users: 3840,
    avgTicket: 0,
    frequency: 0,
    daysSinceLastPurchase: 0,
    percentOfTotal: 22,
    status: 'risk',
    children: [
      {
        id: '2-1',
        name: 'Recencia en riesgo',
        users: 2350,
        avgTicket: 75.40,
        frequency: 2.1,
        daysSinceLastPurchase: 45,
        percentOfTotal: 14,
        status: 'risk',
      },
      {
        id: '2-2',
        name: 'Frecuencia en caída',
        users: 1490,
        avgTicket: 82.10,
        frequency: 1.2,
        daysSinceLastPurchase: 30,
        percentOfTotal: 8,
        status: 'risk',
      },
    ],
  },
  {
    id: '3',
    name: 'Clientes Perdidos',
    users: 4200,
    avgTicket: 0,
    frequency: 0,
    daysSinceLastPurchase: 0,
    percentOfTotal: 24,
    status: 'lost',
    children: [
      {
        id: '3-1',
        name: 'Sin compras +180 días',
        users: 3100,
        avgTicket: 54.75,
        frequency: 0.8,
        daysSinceLastPurchase: 210,
        percentOfTotal: 18,
        status: 'lost',
      },
      {
        id: '3-2',
        name: 'Compradores únicos antiguos',
        users: 1100,
        avgTicket: 42.30,
        frequency: 1,
        daysSinceLastPurchase: 190,
        percentOfTotal: 6,
        status: 'lost',
      },
    ],
  },
  {
    id: '4',
    name: 'Clientes Potenciales',
    users: 3840,
    avgTicket: 0,
    frequency: 0,
    daysSinceLastPurchase: 0,
    percentOfTotal: 22,
    status: 'potential',
    children: [
      {
        id: '4-1',
        name: 'Compradores recientes',
        users: 1980,
        avgTicket: 45.60,
        frequency: 1.1,
        daysSinceLastPurchase: 15,
        percentOfTotal: 12,
        status: 'potential',
      },
      {
        id: '4-2',
        name: 'Nuevos leads',
        users: 1860,
        avgTicket: 0,
        frequency: 0,
        daysSinceLastPurchase: 0,
        percentOfTotal: 10,
        status: 'potential',
      },
    ],
  },
];

const SegmentTreeView = () => {
  const [segments, setSegments] = useState(segmentData.map(s => ({ ...s, isExpanded: true })));
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null);
  const [showSimilarityAlert, setShowSimilarityAlert] = useState(true);
  const [showDemoZoom, setShowDemoZoom] = useState(false);
  const [currentSegmentForZoom, setCurrentSegmentForZoom] = useState<Segment | null>(null);

  const handleToggleExpand = (id: string) => {
    setSegments(prevSegments => 
      prevSegments.map(segment => {
        if (segment.id === id) {
          return { ...segment, isExpanded: !segment.isExpanded };
        }
        return segment;
      })
    );
  };

  const handleSort = (field: string) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortField(field);
  };

  const handleViewCustomers = (segment: Segment) => {
    setSelectedSegment(segment);
    toast.success(`Viendo clientes del segmento: ${segment.name}`);
    // Here we would trigger the sidebar or modal to show customers
  };

  const handleCreateCampaign = (segment: Segment) => {
    toast.success(`Creando campaña para: ${segment.name}`);
    // Here we would navigate to campaign creation flow
  };

  const handleExportSegment = (segment: Segment) => {
    toast.success(`Exportando segmento: ${segment.name}`);
    // Here we would trigger the export functionality
  };

  const handleAddToDynamicList = (segment: Segment) => {
    toast.success(`Agregando a lista dinámica: ${segment.name}`);
    // Here we would add to dynamic list
  };

  const handleDemographicZoom = (segment: Segment) => {
    setCurrentSegmentForZoom(segment);
    setShowDemoZoom(true);
  };

  const handleTagSegment = (segment: Segment) => {
    toast.success(`Etiquetando segmento: ${segment.name}`);
  };

  const handleMergeSimilarSegments = () => {
    toast.success("Segmentos fusionados correctamente");
    setShowSimilarityAlert(false);
  };

  const handleRenameSimilarSegment = () => {
    toast.success("Por favor ingresa un nuevo nombre para el segmento");
    setShowSimilarityAlert(false);
  };

  const handleIgnoreSimilarSegments = () => {
    setShowSimilarityAlert(false);
  };

  // Calculates totals
  const totalUsers = segmentData.reduce((acc, segment) => acc + segment.users, 0);

  return (
    <div className="space-y-4">
      {showSimilarityAlert && (
        <Alert className="bg-status-blue/20 border-status-blue text-white mb-4 relative">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 mr-2 text-status-blue" />
            <div>
              <h4 className="font-medium mb-1">Segmentos similares detectados</h4>
              <p className="text-sm text-gray-300">
                El segmento "Ticket alto" es 85% similar a "Compradores de valor premium". 
              </p>
              <div className="flex space-x-2 mt-2">
                <Button 
                  size="sm" 
                  className="bg-status-blue text-white hover:bg-status-blue/90"
                  onClick={handleMergeSimilarSegments}
                >
                  Fusionar
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-status-blue text-status-blue hover:bg-status-blue/10"
                  onClick={handleRenameSimilarSegment}
                >
                  Renombrar
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-300 hover:bg-gray-700/50"
                  onClick={handleIgnoreSimilarSegments}
                >
                  Ignorar
                </Button>
              </div>
            </div>
          </div>
        </Alert>
      )}

      <div className="overflow-hidden bg-black/30 backdrop-blur-sm rounded-lg border border-gray-800">
        {/* Table Header */}
        <div className="segment-row bg-gray-900 sticky top-0 z-10">
          <div className="segment-cell segment-header w-64">
            Segmento
          </div>
          <div className="segment-cell segment-header flex items-center cursor-pointer" onClick={() => handleSort('users')}>
            Usuarios
            {sortField === 'users' && (
              sortDirection === 'asc' ? <ArrowUp className="ml-1 h-3 w-3" /> : <ArrowDown className="ml-1 h-3 w-3" />
            )}
          </div>
          <div className="segment-cell segment-header flex items-center cursor-pointer" onClick={() => handleSort('avgTicket')}>
            Ticket Prom.
            {sortField === 'avgTicket' && (
              sortDirection === 'asc' ? <ArrowUp className="ml-1 h-3 w-3" /> : <ArrowDown className="ml-1 h-3 w-3" />
            )}
          </div>
          <div className="segment-cell segment-header flex items-center cursor-pointer" onClick={() => handleSort('frequency')}>
            Frecuencia
            {sortField === 'frequency' && (
              sortDirection === 'asc' ? <ArrowUp className="ml-1 h-3 w-3" /> : <ArrowDown className="ml-1 h-3 w-3" />
            )}
          </div>
          <div className="segment-cell segment-header flex items-center cursor-pointer" onClick={() => handleSort('daysSinceLastPurchase')}>
            Días Última Compra
            {sortField === 'daysSinceLastPurchase' && (
              sortDirection === 'asc' ? <ArrowUp className="ml-1 h-3 w-3" /> : <ArrowDown className="ml-1 h-3 w-3" />
            )}
          </div>
          <div className="segment-cell segment-header flex items-center cursor-pointer" onClick={() => handleSort('percentOfTotal')}>
            % Total
            {sortField === 'percentOfTotal' && (
              sortDirection === 'asc' ? <ArrowUp className="ml-1 h-3 w-3" /> : <ArrowDown className="ml-1 h-3 w-3" />
            )}
          </div>
          <div className="segment-cell segment-header text-center">
            Estado
          </div>
          <div className="segment-cell segment-header text-center w-64">
            Acciones
          </div>
        </div>

        {/* Table Body */}
        <div className="max-h-[calc(100vh-16rem)] overflow-auto">
          {segments.map(segment => (
            <React.Fragment key={segment.id}>
              {/* Parent Row */}
              <div className={`segment-row bg-gray-800/50 font-semibold`}>
                <div className="segment-cell w-64 flex items-center">
                  <button 
                    className="mr-2 focus:outline-none" 
                    onClick={() => handleToggleExpand(segment.id)}
                  >
                    {segment.isExpanded ? (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                  {segment.name}
                </div>
                <div className="segment-cell segment-metric">
                  {segment.users.toLocaleString()}
                </div>
                <div className="segment-cell segment-metric">
                  {segment.children ? '-' : `$${segment.avgTicket.toFixed(2)}`}
                </div>
                <div className="segment-cell segment-metric">
                  {segment.children ? '-' : segment.frequency.toFixed(1)}
                </div>
                <div className="segment-cell segment-metric">
                  {segment.children ? '-' : segment.daysSinceLastPurchase}
                </div>
                <div className="segment-cell segment-metric">
                  {segment.percentOfTotal}%
                </div>
                <div className="segment-cell flex justify-center">
                  <div className={`status-indicator bg-${statusColors[segment.status]}`} 
                      title={statusNames[segment.status]}></div>
                </div>
                <div className="segment-cell flex justify-end space-x-2 w-64">
                  <Button 
                    variant="outline"
                    size="sm" 
                    onClick={() => handleViewCustomers(segment)}
                    className="action-button-secondary"
                  >
                    <Users className="h-3 w-3 mr-1" /> 
                    Ver Clientes
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm" 
                    onClick={() => handleDemographicZoom(segment)}
                    className="action-button-secondary bg-gray-800 text-light-blue border-light-blue hover:bg-light-blue/10"
                  >
                    <Activity className="h-3 w-3 mr-1" /> 
                    Zoom
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
                      <DropdownMenuItem onClick={() => handleCreateCampaign(segment)} className="text-white hover:bg-gray-800">
                        Crear campaña
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleTagSegment(segment)} className="text-white hover:bg-gray-800">
                        Etiquetar segmento
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleExportSegment(segment)} className="text-white hover:bg-gray-800">
                        Exportar a Excel
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-700" />
                      <DropdownMenuItem onClick={() => handleAddToDynamicList(segment)} className="text-white hover:bg-gray-800">
                        Agregar a lista dinámica
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Child Rows */}
              {segment.isExpanded && segment.children?.map(child => (
                <div className="segment-row pl-10" key={child.id}>
                  <div className="segment-cell w-64 relative">
                    {child.name}
                    {child.similarTo && (
                      <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
                        <div 
                          className="bg-status-blue text-xs px-1 rounded-sm cursor-help" 
                          title={`Similar a: ${child.similarTo}`}
                        >
                          <AlertTriangle className="h-3 w-3" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="segment-cell segment-metric">
                    {child.users.toLocaleString()}
                  </div>
                  <div className="segment-cell segment-metric">
                    ${child.avgTicket.toFixed(2)}
                  </div>
                  <div className="segment-cell segment-metric">
                    {child.frequency.toFixed(1)}
                  </div>
                  <div className="segment-cell segment-metric">
                    {child.daysSinceLastPurchase}
                  </div>
                  <div className="segment-cell segment-metric">
                    {child.percentOfTotal}%
                  </div>
                  <div className="segment-cell flex justify-center">
                    <div className={`status-indicator bg-${statusColors[child.status]}`}
                        title={statusNames[child.status]}></div>
                  </div>
                  <div className="segment-cell flex justify-end space-x-2 w-64">
                    <Button 
                      variant="outline"
                      size="sm" 
                      onClick={() => handleViewCustomers(child)}
                      className="action-button-secondary"
                    >
                      <Users className="h-3 w-3 mr-1" /> 
                      Ver Clientes
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm" 
                      onClick={() => handleDemographicZoom(child)}
                      className="action-button-secondary bg-gray-800 text-light-blue border-light-blue hover:bg-light-blue/10"
                    >
                      <Activity className="h-3 w-3 mr-1" /> 
                      Zoom
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
                        <DropdownMenuItem onClick={() => handleCreateCampaign(child)} className="text-white hover:bg-gray-800">
                          Crear campaña
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleTagSegment(child)} className="text-white hover:bg-gray-800">
                          Etiquetar segmento
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleExportSegment(child)} className="text-white hover:bg-gray-800">
                          Exportar a Excel
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-700" />
                        <DropdownMenuItem onClick={() => handleAddToDynamicList(child)} className="text-white hover:bg-gray-800">
                          Agregar a lista dinámica
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* Summary Row */}
        <div className="segment-row bg-dark-blue/80 sticky bottom-0 font-bold border-t border-gray-700">
          <div className="segment-cell w-64">
            Total
          </div>
          <div className="segment-cell">
            {totalUsers.toLocaleString()}
          </div>
          <div className="segment-cell">-</div>
          <div className="segment-cell">-</div>
          <div className="segment-cell">-</div>
          <div className="segment-cell">100%</div>
          <div className="segment-cell"></div>
          <div className="segment-cell w-64"></div>
        </div>
      </div>

      {/* Demographic Zoom Modal - Now contextual to the selected segment */}
      {currentSegmentForZoom && (
        <DemographicZoom 
          isOpen={showDemoZoom}
          onClose={() => setShowDemoZoom(false)}
          segmentName={currentSegmentForZoom.name}
          segmentStatus={currentSegmentForZoom.status}
        />
      )}
    </div>
  );
};

export default SegmentTreeView;
