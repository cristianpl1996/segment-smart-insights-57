
import React, { useState } from "react";
import NavigationSidebar from "@/components/NavigationSidebar";
import CollapsibleFilters from "@/components/CollapsibleFilters";
import SegmentTreeView from "@/components/SegmentTreeView";
import SegmentBubbleChart from "@/components/SegmentBubbleChart";
import DashboardHeader from "@/components/DashboardHeader";
import SalesHistoryView from "@/components/SalesHistoryView";
import CustomerProfileView from "@/components/CustomerProfileView";
import AIAgentsView from "@/components/AIAgentsView";
import IntegrationsView from "@/components/IntegrationsView";
import CoverageMapView from "@/components/CoverageMapView";

const Index = () => {
  const [activeView, setActiveView] = useState<'tree' | 'bubble'>('bubble');
  const [activeSection, setActiveSection] = useState<string>('dashboard');
  
  const renderMainContent = () => {
    switch (activeSection) {
      case 'sales':
        return <SalesHistoryView />;
      case 'customers':
        return <CustomerProfileView />;
      case 'ai-agents':
        return <AIAgentsView />;
      case 'integrations':
        return <IntegrationsView />;
      case 'coverage-map':
        return <CoverageMapView />;
      default:
        return (
          <>
            <CollapsibleFilters />
            <DashboardHeader activeView={activeView} setActiveView={setActiveView} />
            <div className="space-y-6">
              {activeView === 'tree' ? (
                <SegmentTreeView />
              ) : (
                <SegmentBubbleChart />
              )}
            </div>
          </>
        );
    }
  };
  
  return (
    <div className="min-h-screen flex bg-gradient-dashboard text-white">
      <NavigationSidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      
      <div className="flex-1 overflow-hidden">
        <div className="p-4 lg:p-6 space-y-6">
          {renderMainContent()}
        </div>
      </div>
    </div>
  );
};

export default Index;
