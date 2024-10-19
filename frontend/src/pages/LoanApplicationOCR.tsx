import Header from "@/custom/Header";
import LoanApplicationOCR from "@/custom/Ocr";
import Sidebar from "@/custom/Sidebar";
import React from "react";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <LoanApplicationOCR />
          </div>
        </main>
      </div>
    </div>
  );
}
