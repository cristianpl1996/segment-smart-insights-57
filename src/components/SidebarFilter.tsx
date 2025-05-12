
import React from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/DateRangePicker";
import { Button } from "@/components/ui/button";
import { Filter, Save } from "lucide-react";

const SidebarFilter = () => {
  return (
    <div className="w-80 bg-black/30 backdrop-blur-sm border-r border-gray-800 h-screen p-4 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-sora font-extrabold text-white">Filtros</h2>
        <Button variant="outline" size="sm" className="text-light-blue border-light-blue hover:bg-light-blue/10">
          <Filter className="h-4 w-4 mr-2" />
          Reiniciar
        </Button>
      </div>

      <div className="space-y-6">
        <div className="filter-container">
          <h3 className="text-md font-sora font-semibold text-white mb-3">Periodo de tiempo</h3>
          <DatePickerWithRange />
        </div>

        <div className="filter-container">
          <h3 className="text-md font-sora font-semibold text-white mb-3">Tipo de cliente</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <input type="checkbox" id="ideal" className="mr-2" />
              <label htmlFor="ideal" className="text-sm text-white">Ideales</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="risk" className="mr-2" />
              <label htmlFor="risk" className="text-sm text-white">En riesgo</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="lost" className="mr-2" />
              <label htmlFor="lost" className="text-sm text-white">Perdidos</label>
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="potential" className="mr-2" />
              <label htmlFor="potential" className="text-sm text-white">Potenciales</label>
            </div>
          </div>
        </div>

        <div className="filter-container">
          <h3 className="text-md font-sora font-semibold text-white mb-3">Métricas</h3>
          
          <div className="mb-4">
            <Label className="filter-label">Ticket promedio</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Input type="number" placeholder="Min" className="filter-input" />
              <span className="text-gray-400">-</span>
              <Input type="number" placeholder="Max" className="filter-input" />
            </div>
          </div>
          
          <div className="mb-4">
            <Label className="filter-label">Frecuencia de compra</Label>
            <Slider defaultValue={[0, 100]} className="my-6" />
            <div className="flex justify-between text-xs text-gray-400">
              <span>0</span>
              <span>50</span>
              <span>100</span>
            </div>
          </div>
          
          <div className="mb-4">
            <Label className="filter-label">Días desde última compra</Label>
            <Select>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="Selecciona..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">< 30 días</SelectItem>
                <SelectItem value="60">30-60 días</SelectItem>
                <SelectItem value="90">60-90 días</SelectItem>
                <SelectItem value="more">+ 90 días</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="filter-container">
          <h3 className="text-md font-sora font-semibold text-white mb-3">Categorías</h3>
          <Select>
            <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
              <SelectValue placeholder="Todas las categorías" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las categorías</SelectItem>
              <SelectItem value="tech">Tecnología</SelectItem>
              <SelectItem value="fashion">Moda</SelectItem>
              <SelectItem value="home">Hogar</SelectItem>
              <SelectItem value="food">Alimentación</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="pt-4 flex space-x-2">
          <Button className="flex-1 bg-cta-orange text-black hover:bg-cta-orange/90">
            Aplicar filtros
          </Button>
          <Button variant="outline" className="border-light-blue text-light-blue hover:bg-light-blue/10">
            <Save className="h-4 w-4 mr-2" />
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SidebarFilter;
