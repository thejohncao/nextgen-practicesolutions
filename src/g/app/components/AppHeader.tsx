
import React from 'react';
import { useAuth } from "../../../hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react"; // Added User icon
import "../../o/app/styles/apple-design.css"; // Reusing styles

const AppHeader = () => {
  const { profile, signOut } = useAuth();

  return (
    <header className="px-6 py-3 bg-white/60 backdrop-blur-md border-b border-white/40 flex justify-between items-center sticky top-0 z-10 min-h-[60px]"> {/* Ensure a minimum height */}
      <div className="text-xl font-bold text-[#00274D]">NextGen OS (Google AI)</div>
      {profile && (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[#00274D]">
            <User className="w-4 h-4" />
            <span className="text-sm">
              {profile.email}
            </span>
          </div>
          <Button
            onClick={signOut}
            variant="ghost"
            size="sm"
            className="text-[#00274D] hover:bg-gray-200/40 !p-2" // Adjusted padding
          >
            <LogOut className="w-4 h-4 mr-1" /> 
            Logout
          </Button>
        </div>
      )}
    </header>
  );
};

export default AppHeader;
