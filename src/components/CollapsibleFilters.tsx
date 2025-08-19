import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DatePickerWithRange } from "@/components/DateRangePicker";
import { Button } from "@/components/ui/button";
import { Filter, Save, ChevronDown, ChevronUp, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const CollapsibleFilters = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-sora font-semibold text-foreground">Filtros Avanzados</h2>
              {isOpen && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-primary border-primary hover:bg-primary/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Reset filters logic here
                  }}
                >
                  Reiniciar
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              {!isOpen && (
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                  <div className="h-2 w-2 rounded-full bg-muted"></div>
                </div>
              )}
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="px-4 pb-4 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* Periodo de tiempo */}
              <div className="filter-container">
                <h3 className="text-sm font-sora font-semibold text-foreground mb-3">Periodo de tiempo</h3>
                <DatePickerWithRange />
              </div>

              {/* Tipo de cliente */}
              <div className="filter-container">
                <h3 className="text-sm font-sora font-semibold text-foreground mb-3">Tipo de cliente</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="ideal" className="mr-2" />
                    <label htmlFor="ideal" className="text-sm text-foreground">Ideales</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="risk" className="mr-2" />
                    <label htmlFor="risk" className="text-sm text-foreground">En riesgo</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="lost" className="mr-2" />
                    <label htmlFor="lost" className="text-sm text-foreground">Perdidos</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="potential" className="mr-2" />
                    <label htmlFor="potential" className="text-sm text-foreground">Potenciales</label>
                  </div>
                </div>
              </div>

              {/* Métricas */}
              <div className="filter-container">
                <h3 className="text-sm font-sora font-semibold text-foreground mb-3">Métricas</h3>
                
                <div className="mb-4">
                  <Label className="filter-label">Ticket promedio</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <Input type="number" placeholder="Min" className="filter-input" />
                    <span className="text-muted-foreground">-</span>
                    <Input type="number" placeholder="Max" className="filter-input" />
                  </div>
                </div>
                
                <div className="mb-4">
                  <Label className="filter-label">Frecuencia de compra</Label>
                  <Slider defaultValue={[0, 100]} className="my-6" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>0</span>
                    <span>50</span>
                    <span>100</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <Label className="filter-label">Días desde última compra</Label>
                  <Select>
                    <SelectTrigger className="bg-input border-border text-foreground">
                      <SelectValue placeholder="Selecciona..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">{"< 30 días"}</SelectItem>
                      <SelectItem value="60">30-60 días</SelectItem>
                      <SelectItem value="90">60-90 días</SelectItem>
                      <SelectItem value="more">+ 90 días</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Categorías */}
              <div className="filter-container">
                <h3 className="text-sm font-sora font-semibold text-foreground mb-3">Categorías</h3>
                <Select>
                  <SelectTrigger className="bg-input border-border text-foreground">
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
            </div>

            {/* Botones de acción */}
            <div className="flex justify-center gap-4 pt-4 border-t border-border">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Aplicar filtros
              </Button>
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                <Save className="h-4 w-4 mr-2" />
                Guardar preset
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default CollapsibleFilters;