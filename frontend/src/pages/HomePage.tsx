import { Link } from "react-router-dom";
import { DollarSign } from "lucide-react";
import Hero from "@/custom/Hero";

export default function LoanApprovalLanding() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex h-14 items-center justify-between">
            <Link className="flex items-center justify-center" to="#">
              <DollarSign className="h-6 w-6 text-primary" />
              <span className="ml-2 text-lg font-bold">QuickLoan</span>
            </Link>
            <nav className="flex gap-4 sm:gap-6">
              <Link
                className="text-sm font-medium hover:text-primary"
                to="#features"
              >
                Features
              </Link>
              <Link
                className="text-sm font-medium hover:text-primary"
                to="#how-it-works"
              >
                How It Works
              </Link>
              <Link
                className="text-sm font-medium hover:text-primary"
                to="/signup"
              >
                Apply Now
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <Hero />
      <footer className="w-full py-6 bg-background border-t">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 QuickLoan. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
