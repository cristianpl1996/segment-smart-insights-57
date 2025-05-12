
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Save, 
  BarChart3, 
  ListTree,
  HelpCircle
} from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DashboardHeaderProps {
  activeView: 'tree' | 'bubble';
  setActiveView: (view: 'tree' | 'bubble') => void;
}

const DashboardHeader = ({ activeView, setActiveView }: DashboardHeaderProps) => {
  const handleDownloadReport = () => {
    toast.success("Descargando informe completo en Excel");
  };

  const handleSaveView = () => {
    toast.success("Vista actual guardada como favorita");
  };

  return (
    <div className="flex items-center justify-between mb-6 px-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-sora font-extrabold text-white">
          Segmentación de Usuarios
        </h1>
        <p className="text-sm md:text-base text-gray-300 mt-1">
          Visualiza, analiza y actúa sobre los segmentos de usuarios
        </p>
      </div>

      <div className="flex space-x-2">
        <div className="bg-gray-800 rounded-md hidden md:flex">
          <Button
            variant="ghost"
            className={`rounded-r-none ${
              activeView === "tree"
                ? "bg-gray-700 text-white"
                : "text-gray-400"
            }`}
            onClick={() => setActiveView("tree")}
          >
            <ListTree className="h-4 w-4 mr-2" />
            Vista Jerárquica
          </Button>
          <Button
            variant="ghost"
            className={`rounded-l-none ${
              activeView === "bubble"
                ? "bg-gray-700 text-white"
                : "text-gray-400"
            }`}
            onClick={() => setActiveView("bubble")}
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Gráfico de Burbujas
          </Button>
        </div>
        
        {/* Mobile view selector */}
        <div className="md:hidden bg-gray-800 rounded-md">
          <Button
            variant="ghost"
            className={`rounded-r-none ${
              activeView === "tree"
                ? "bg-gray-700 text-white"
                : "text-gray-400"
            }`}
            onClick={() => setActiveView("tree")}
          >
            <ListTree className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            className={`rounded-l-none ${
              activeView === "bubble"
                ? "bg-gray-700 text-white"
                : "text-gray-400"
            }`}
            onClick={() => setActiveView("bubble")}
          >
            <BarChart3 className="h-4 w-4" />
          </Button>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="border-light-blue text-light-blue hover:bg-light-blue/10"
                onClick={handleSaveView}
              >
                <Save className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Guardar vista</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Guardar configuración actual</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="border-light-blue text-light-blue hover:bg-light-blue/10"
                onClick={handleDownloadReport}
              >
                <Download className="h-4 w-4 md:mr-2" />
                <span className="hidden md:inline">Descargar reporte</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Descargar informe completo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <HelpCircle className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ayuda sobre segmentación</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default DashboardHeader;
