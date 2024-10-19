// Sidebar.tsx
import React from "react";
import { DollarSign, Home, FileText, Users, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const handleOcr = () => {
    navigate("/ocr");
  };
  const handleCustomer = () => {
    navigate("/customer");
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };
  return (
    <div
      className={cn(
        "bg-primary text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform transition duration-200 ease-in-out z-30 md:relative md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-8 w-8 text-white" />
          <span className="text-2xl font-extrabold">LoanPro</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>
      <nav>
        <Button
          variant="ghost"
          className="w-full justify-start text-white
        "
          onClick={handleDashboard}
        >
          <Home className="mr-3 h-5 w-5" />
          Dashboard
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-white"
          onClick={handleOcr}
        >
          <FileText className="mr-3 h-5 w-5" />
          Loan Applications
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start text-white"
          onClick={handleCustomer}
        >
          <Users className="mr-3 h-5 w-5" />
          Customers
        </Button>
      </nav>
    </div>
  );
};

export default Sidebar;
