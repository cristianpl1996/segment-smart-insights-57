
import React, { useState } from "react";
import NavigationSidebar from "@/components/NavigationSidebar";
import CollapsibleFilters from "@/components/CollapsibleFilters";
import SegmentTreeView from "@/components/SegmentTreeView";
import SegmentBubbleChart from "@/components/SegmentBubbleChart";
import DashboardHeader from "@/components/DashboardHeader";

const Index = () => {
  const [activeView, setActiveView] = useState<'tree' | 'bubble'>('bubble');
  
  return (
    <div className="min-h-screen flex bg-gradient-dashboard text-white">
      <NavigationSidebar activeView={activeView} setActiveView={setActiveView} />
      
      <div className="flex-1 overflow-hidden">
        <div className="p-4 lg:p-6 space-y-6">
          <CollapsibleFilters />
          <DashboardHeader activeView={activeView} setActiveView={setActiveView} />
          
          <div className="space-y-6">
            {activeView === 'tree' ? (
              <SegmentTreeView />
            ) : (
              <SegmentBubbleChart />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
