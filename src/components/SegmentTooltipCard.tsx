
import React from "react";
import { Button } from "@/components/ui/button";
import { Eye, Rocket } from "lucide-react";
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger 
} from "@/components/ui/hover-card";

interface SegmentTooltipCardProps {
  isVisible: boolean;
  position: { x: number; y: number } | null;
  segmentName: string;
  users: number;
  avgTicket: number;
  daysSinceLastPurchase: number;
  status: 'ideal' | 'risk' | 'lost' | 'potential';
  onDetailClick: () => void;
  onCampaignClick: () => void;
}

const statusNames = {
  ideal: 'Ideal',
  risk: 'En riesgo',
  lost: 'Perdido',
  potential: 'Potencial'
};

const statusColors = {
  ideal: 'bg-status-green',
  risk: 'bg-status-red',
  lost: 'bg-status-gray',
  potential: 'bg-cta-orange'
};

const SegmentTooltipCard: React.FC<SegmentTooltipCardProps> = ({
  isVisible,
  position,
  segmentName,
  users,
  avgTicket,
  daysSinceLastPurchase,
  status,
  onDetailClick,
  onCampaignClick
}) => {
  if (!isVisible || !position) return null;

  return (
    <div 
      className="fixed z-50 w-64 rounded-lg border border-gray-700 bg-black/90 backdrop-blur-sm shadow-xl p-4 text-white"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(10px, 10px)'
      }}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className={`h-3 w-3 rounded-full ${statusColors[status]}`}></div>
            <h3 className="font-bold">{segmentName}</h3>
          </div>
          <div className="text-xs text-gray-400">
            Estado: {statusNames[status]}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Usuarios:</span>
            <span className="font-medium">{users.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Ticket promedio:</span>
            <span className="font-medium">${avgTicket.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Días desde compra:</span>
            <span className="font-medium">{daysSinceLastPurchase}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            variant="outline"
            size="sm" 
            className="flex-1 border-gray-600 hover:border-gray-500 hover:bg-gray-800"
            onClick={onDetailClick}
          >
            <Eye className="mr-1 h-3 w-3" />
            Ver detalle
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-cta-orange text-black hover:bg-cta-orange/90"
            onClick={onCampaignClick}
          >
            <Rocket className="mr-1 h-3 w-3" />
            Crear campaña
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SegmentTooltipCard;
