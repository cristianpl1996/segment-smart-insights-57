
import React, { useState } from "react";
import { X, Filter, Download, Send, Tag, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
  gender: string;
  city: string;
  producto: string;
  lastPurchase: string;
  preferredChannel: string;
  purchaseCount: number;
  totalSpent: number;
}

interface DemographicZoomProps {
  isOpen: boolean;
  onClose: () => void;
  segmentName: string;
  segmentStatus: string;
}

const mockUsers: User[] = [
  { id: 1, name: "Ana García", email: "ana@example.com", age: 34, gender: "F", city: "Bogotá", lastPurchase: "2024-05-01", preferredChannel: "Web", purchaseCount: 5, totalSpent: 450.75, producto: "Revancha" },
  { id: 2, name: "Carlos Rodríguez", email: "carlos@example.com", age: 42, gender: "M", city: "Medellín", lastPurchase: "2024-04-15", preferredChannel: "App", purchaseCount: 3, totalSpent: 320.50, producto: "Baloto" },
  { id: 3, name: "Lucía Fernández", email: "lucia@example.com", age: 28, gender: "F", city: "Cali", lastPurchase: "2024-04-28", preferredChannel: "Web", purchaseCount: 7, totalSpent: 680.25, producto: "Baloto Revancha" },
  { id: 4, name: "Miguel López", email: "miguel@example.com", age: 39, gender: "M", city: "Bogotá", lastPurchase: "2024-03-20", preferredChannel: "App", purchaseCount: 2, totalSpent: 150.00, producto: "Miloto" },
  { id: 5, name: "Laura Díaz", email: "laura@example.com", age: 31, gender: "F", city: "Barranquilla", lastPurchase: "2024-05-05", preferredChannel: "Web", purchaseCount: 4, totalSpent: 390.75, producto: "Color loto" },
  { id: 6, name: "Javier Martínez", email: "javier@example.com", age: 45, gender: "M", city: "Medellín", lastPurchase: "2024-04-10", preferredChannel: "App", purchaseCount: 6, totalSpent: 580.50, producto: "Revancha" },
  { id: 7, name: "Carmen Sánchez", email: "carmen@example.com", age: 29, gender: "F", city: "Bogotá", lastPurchase: "2024-05-02", preferredChannel: "Web", purchaseCount: 3, totalSpent: 270.25, producto: "Baloto" },
  { id: 8, name: "David Pérez", email: "david@example.com", age: 37, gender: "M", city: "Cali", lastPurchase: "2024-04-05", preferredChannel: "Email", purchaseCount: 5, totalSpent: 420.00, producto: "Baloto Revancha" },
  { id: 9, name: "Sara González", email: "sara@example.com", age: 33, gender: "F", city: "Barranquilla", lastPurchase: "2024-04-22", preferredChannel: "App", purchaseCount: 4, totalSpent: 340.75, producto: "Miloto" },
  { id: 10, name: "Pablo Ruiz", email: "pablo@example.com", age: 40, gender: "M", city: "Bogotá", lastPurchase: "2024-03-15", preferredChannel: "Web", purchaseCount: 2, totalSpent: 195.50, producto: "Color loto" },
];

const DemographicZoom = ({ isOpen, onClose, segmentName, segmentStatus }: DemographicZoomProps) => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [filters, setFilters] = useState({
    age: [18, 65] as number[],
    gender: "all",
    city: "all",
    channel: "all",
    producto: "all"
  });
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [savedFilter, setSavedFilter] = useState<boolean>(false);
  
  const handleAgeChange = (value: number[]) => {
    setFilters({ ...filters, age: value });
  };
  
  const handleGenderChange = (value: string) => {
    setFilters({ ...filters, gender: value });
  };
  
  const handleCityChange = (value: string) => {
    setFilters({ ...filters, city: value });
  };
  
  const handleChannelChange = (value: string) => {
    setFilters({ ...filters, channel: value });
  };

  const handleProductoChange = (value: string) => {
    setFilters({ ...filters, producto: value });
  };
  
  const handleUserSelect = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter(id => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };
  
  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };
  
  const handleCreateCampaign = () => {
    toast.success(`Creando campaña para ${selectedUsers.length} usuarios del segmento ${segmentName}`);
  };
  
  const handleExportUsers = () => {
    toast.success(`Exportando datos de ${selectedUsers.length || filteredUsers.length} usuarios`);
  };
  
  const handleTagUsers = () => {
    toast.success(`Etiquetando ${selectedUsers.length} usuarios`);
  };
  
  const handleSaveFilter = () => {
    setSavedFilter(true);
    toast.success(`Filtro guardado como "Subsegmento de ${segmentName}"`);
  };
  
  // Filter users based on current filters
  const filteredUsers = users.filter(user => {
    return (
      (user.age >= filters.age[0] && user.age <= filters.age[1]) &&
      (filters.gender === "all" || user.gender === filters.gender) &&
      (filters.city === "all" || user.city === filters.city) &&
      (filters.channel === "all" || user.preferredChannel === filters.channel) &&
      (filters.producto === "all" || user.producto === filters.producto)
    );
  });

  const statusColors: Record<string, string> = {
    ideal: 'bg-status-green',
    risk: 'bg-status-red',
    lost: 'bg-status-gray',
    potential: 'bg-status-blue'
  };
  
  const statusNames: Record<string, string> = {
    ideal: 'Ideal',
    risk: 'En riesgo',
    lost: 'Perdido',
    potential: 'Potencial'
  };

  // If not open, don't render
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative w-full max-w-3xl h-full bg-gradient-to-br from-dark-blue via-gray-900 to-black border-l border-gray-800 overflow-hidden animate-slide-in-right flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center">
            <h2 className="text-xl font-sora font-extrabold text-white">
              Zoom demográfico: {segmentName}
            </h2>
            <Badge className={`ml-2 ${statusColors[segmentStatus]}`}>
              {statusNames[segmentStatus]}
            </Badge>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5 text-gray-400" />
          </Button>
        </div>
        
        <Tabs defaultValue="list" className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-800 bg-black/20">
            <TabsList className="grid grid-cols-3 bg-gray-800">
              <TabsTrigger value="list">Lista de Usuarios</TabsTrigger>
              <TabsTrigger value="stats">Estadísticas</TabsTrigger>
              <TabsTrigger value="actions">Acciones</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="list" className="flex-1 overflow-hidden flex flex-col">
            <div className="p-4 bg-black/20 border-b border-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-300 mb-2 block">Edad</Label>
                  <div className="px-3">
                    <Slider defaultValue={[18, 65]} min={18} max={65} step={1} value={filters.age} onValueChange={handleAgeChange} className="my-6" />
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>{filters.age[0]}</span>
                      <span>{filters.age[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-300 mb-2 block">Género</Label>
                  <Select value={filters.gender} onValueChange={handleGenderChange}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="M">Masculino</SelectItem>
                      <SelectItem value="F">Femenino</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-300 mb-2 block">Ciudad</Label>
                  <Select value={filters.city} onValueChange={handleCityChange}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Todas las ciudades" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas</SelectItem>
                      <SelectItem value="Bogotá">Bogotá</SelectItem>
                      <SelectItem value="Medellín">Medellín</SelectItem>
                      <SelectItem value="Cali">Cali</SelectItem>
                      <SelectItem value="Barranquilla">Barranquilla</SelectItem>
                      <SelectItem value="Valencia">Valencia</SelectItem>
                      <SelectItem value="Sevilla">Sevilla</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-gray-300 mb-2 block">Canal preferido</Label>
                  <Select value={filters.channel} onValueChange={handleChannelChange}>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Todos los canales" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="Web">Web</SelectItem>
                      <SelectItem value="App">App</SelectItem>
                      <SelectItem value="Email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                  </div>

                  {/* Filtro de Producto */}
                  <div>
                    <Label className="text-sm font-medium text-gray-300 mb-2 block">Producto</Label>
                    <Select value={filters.producto} onValueChange={handleProductoChange}>
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                        <SelectValue placeholder="Todos los productos" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="all">Todos los productos</SelectItem>
                        <SelectItem value="Revancha">Revancha</SelectItem>
                        <SelectItem value="Baloto">Baloto</SelectItem>
                        <SelectItem value="Baloto Revancha">Baloto Revancha</SelectItem>
                        <SelectItem value="Miloto">Miloto</SelectItem>
                        <SelectItem value="Color loto">Color loto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
              
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-300">
                  {filteredUsers.length} usuarios encontrados
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    onClick={() => setFilters({ age: [18, 65], gender: "all", city: "all", channel: "all", producto: "all" })}
                  >
                    <Filter className="h-4 w-4 mr-1" />
                    Limpiar
                  </Button>
                  <Button 
                    variant="outline"
                    size="sm"
                    className={`border-light-blue text-light-blue hover:bg-light-blue/10 ${savedFilter ? 'bg-light-blue/10' : ''}`}
                    onClick={handleSaveFilter}
                  >
                    <Save className="h-4 w-4 mr-1" />
                    {savedFilter ? 'Filtro guardado' : 'Guardar filtro'}
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-900 sticky top-0">
                  <tr>
                    <th className="py-3 px-4 text-left">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          className="mr-2"
                          checked={filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                          onChange={handleSelectAll}
                        />
                        <span className="text-sm text-gray-400 font-medium">Usuario</span>
                      </div>
                    </th>
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Edad</th>
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Producto</th>
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Ciudad</th>
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Canal</th>
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Compras</th>
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Total</th>
                    <th className="py-3 px-4 text-left text-sm text-gray-400 font-medium">Última compra</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map(user => (
                    <tr 
                      key={user.id} 
                      className={`border-b border-gray-800 hover:bg-gray-800/50 ${selectedUsers.includes(user.id) ? 'bg-gray-800/30' : ''}`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <input 
                            type="checkbox" 
                            className="mr-2"
                            checked={selectedUsers.includes(user.id)}
                            onChange={() => handleUserSelect(user.id)}
                          />
                          <div>
                            <div className="text-sm font-medium text-white">{user.name}</div>
                            <div className="text-xs text-gray-400">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-300">{user.age}</td>
                      <td className="py-3 px-4 text-sm text-gray-300">{user.city}</td>
                      <td className="py-3 px-4 text-sm text-gray-300">
                        {new Date(user.lastPurchase).toLocaleDateString('es-ES')}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="bg-gray-800/50">{user.preferredChannel}</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {filteredUsers.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <p>No se encontraron usuarios con los filtros seleccionados</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="stats" className="flex-1 overflow-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/30 rounded-lg p-4 border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-3">Distribución por Edad</h3>
                <div className="h-60 flex items-end justify-between gap-2 mt-4">
                  <div className="flex flex-col items-center">
                    <div className="h-20 w-12 bg-light-blue/70 rounded-t-md"></div>
                    <span className="text-xs text-gray-400 mt-2">18-25</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-40 w-12 bg-light-blue/70 rounded-t-md"></div>
                    <span className="text-xs text-gray-400 mt-2">26-35</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-32 w-12 bg-light-blue/70 rounded-t-md"></div>
                    <span className="text-xs text-gray-400 mt-2">36-45</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-16 w-12 bg-light-blue/70 rounded-t-md"></div>
                    <span className="text-xs text-gray-400 mt-2">46-55</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-8 w-12 bg-light-blue/70 rounded-t-md"></div>
                    <span className="text-xs text-gray-400 mt-2">56+</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/30 rounded-lg p-4 border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-3">Distribución por Género</h3>
                <div className="h-60 flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="relative w-32 h-32">
                      <div className="absolute inset-0 rounded-full border-8 border-light-blue/70"></div>
                      <div 
                        className="absolute inset-0 rounded-full border-8 border-cta-orange"
                        style={{
                          clipPath: 'polygon(0 0, 50% 0, 50% 50%, 0 50%)',
                          transform: 'rotate(-45deg)'
                        }}
                      ></div>
                      <div className="absolute top-full mt-4 left-0 right-0 flex justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-cta-orange rounded-full mr-1"></div>
                          <span className="text-xs text-gray-300">Masculino</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-light-blue/70 rounded-full mr-1"></div>
                          <span className="text-xs text-gray-300">Femenino</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/30 rounded-lg p-4 border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-3">Distribución por Ciudad</h3>
                <div className="h-60 flex items-center justify-center">
                  <div className="w-full space-y-4">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-300 w-24">Madrid</span>
                      <div className="flex-1 h-5 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-light-blue/70 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                      <span className="text-sm text-gray-300 w-12 text-right">45%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-300 w-24">Barcelona</span>
                      <div className="flex-1 h-5 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-light-blue/70 rounded-full" style={{ width: "30%" }}></div>
                      </div>
                      <span className="text-sm text-gray-300 w-12 text-right">30%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-300 w-24">Valencia</span>
                      <div className="flex-1 h-5 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-light-blue/70 rounded-full" style={{ width: "15%" }}></div>
                      </div>
                      <span className="text-sm text-gray-300 w-12 text-right">15%</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-300 w-24">Sevilla</span>
                      <div className="flex-1 h-5 bg-gray-800 rounded-full overflow-hidden">
                        <div className="h-full bg-light-blue/70 rounded-full" style={{ width: "10%" }}></div>
                      </div>
                      <span className="text-sm text-gray-300 w-12 text-right">10%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/30 rounded-lg p-4 border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-3">Canal Preferido</h3>
                <div className="h-60 flex items-end justify-between gap-2 mt-4">
                  <div className="flex flex-col items-center">
                    <div className="h-40 w-12 bg-cta-orange rounded-t-md"></div>
                    <span className="text-xs text-gray-400 mt-2">Web</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-28 w-12 bg-cta-orange rounded-t-md"></div>
                    <span className="text-xs text-gray-400 mt-2">App</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="h-16 w-12 bg-cta-orange rounded-t-md"></div>
                    <span className="text-xs text-gray-400 mt-2">Email</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="actions" className="flex-1 overflow-auto p-4">
            <div className="bg-black/30 rounded-lg p-4 border border-gray-800 mb-4">
              <h3 className="text-lg font-semibold text-white mb-3">Crear Campaña</h3>
              <p className="text-sm text-gray-300 mb-4">
                Envía una campaña personalizada a los {selectedUsers.length > 0 ? selectedUsers.length : 'todos los'} usuarios seleccionados de {segmentName}.
              </p>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-300 mb-2 block">Nombre de la campaña</Label>
                  <Input placeholder={`Campaña para ${segmentName}`} className="bg-gray-800 border-gray-600 text-white" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-300 mb-2 block">Tipo de campaña</Label>
                  <Select>
                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="push">Notificación Push</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button 
                className="mt-4 bg-cta-orange text-black hover:bg-cta-orange/90 w-full"
                onClick={handleCreateCampaign}
              >
                <Send className="h-4 w-4 mr-2" />
                Crear campaña
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-black/30 rounded-lg p-4 border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-3">Exportar Datos</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Descarga los datos de los usuarios en formato Excel o CSV.
                </p>
                <Button 
                  className="w-full bg-gray-800 text-white hover:bg-gray-700"
                  onClick={handleExportUsers}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exportar datos
                </Button>
              </div>
              
              <div className="bg-black/30 rounded-lg p-4 border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-3">Etiquetar Usuarios</h3>
                <p className="text-sm text-gray-300 mb-4">
                  Agregar etiquetas a los usuarios seleccionados.
                </p>
                <Button 
                  className="w-full bg-gray-800 text-white hover:bg-gray-700"
                  onClick={handleTagUsers}
                >
                  <Tag className="h-4 w-4 mr-2" />
                  Etiquetar usuarios
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {selectedUsers.length > 0 && (
          <div className="border-t border-gray-800 p-3 flex items-center justify-between bg-black/30">
            <div className="text-sm text-white">
              <span className="font-bold">{selectedUsers.length}</span> usuarios seleccionados
            </div>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
                onClick={() => setSelectedUsers([])}
              >
                Limpiar selección
              </Button>
              <Button 
                size="sm" 
                className="bg-cta-orange text-black hover:bg-cta-orange/90"
                onClick={handleCreateCampaign}
              >
                <Send className="h-3 w-3 mr-1" />
                Acción rápida
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DemographicZoom;
