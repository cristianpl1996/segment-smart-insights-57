
import React, { useState } from "react";
import SidebarFilter from "@/components/SidebarFilter";
import SegmentTreeView from "@/components/SegmentTreeView";
import SegmentBubbleChart from "@/components/SegmentBubbleChart";
import DashboardHeader from "@/components/DashboardHeader";

const Index = () => {
  const [activeView, setActiveView] = useState<'tree' | 'bubble'>('tree');
  
  return (
    <div className="min-h-screen flex bg-gradient-dashboard text-white">
      <SidebarFilter />
      
      <div className="flex-1 overflow-hidden p-4 lg:p-6">
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
  );
};

export default Index;
