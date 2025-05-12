
import React from "react";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

interface ShowDemographicButtonProps {
  onClick: () => void;
}

const ShowDemographicButton = ({ onClick }: ShowDemographicButtonProps) => {
  return (
    <div className="fixed bottom-6 right-6 z-20">
      <Button 
        onClick={onClick}
        className="bg-cta-orange text-black hover:bg-cta-orange/90 shadow-lg"
      >
        <Users className="h-4 w-4 mr-2" />
        Ver zoom demográfico (Demo)
      </Button>
    </div>
  );
};

export default ShowDemographicButton;
