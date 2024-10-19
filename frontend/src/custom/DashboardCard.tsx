import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, DollarSign } from "lucide-react";

type Customer = {
  status: string;
  loanAmount?: number; // Optional, adjust if necessary
};

type CardData = {
  title: string;
  value: number;
  icon: React.ReactNode;
};

const DashboardCards: React.FC = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Fetch customer data from API
        const response = await axios.get<Customer[]>(
          "http://localhost:3000/user/all"
        );
        const customers = response.data;

        // Calculate values based on customer data
        const totalApplications = customers.length; // Total applications
        const approvedLoans = customers.filter(
          (customer) => customer.status === "Approved"
        ).length; // Count approved loans
        const totalLoanAmount = customers.reduce(
          (sum, customer) => sum + (customer.loanAmount || 0),
          0
        ); // Sum of loan amounts

        const formattedData: CardData[] = [
          {
            title: "Total Applications",
            value: totalApplications,
            icon: <FileText className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: "Approved Loans",
            value: approvedLoans,
            icon: <Users className="h-4 w-4 text-muted-foreground" />,
          },
          {
            title: "Total Loan Amount",
            value: totalLoanAmount,
            icon: <DollarSign className="h-4 w-4 text-muted-foreground" />,
          },
        ];

        setCards(formattedData);
      } catch (err) {
        console.error(err); // Log the error for debugging
        setError("An error occurred while fetching customer data");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-4">
      <div className="flex flex-wrap -mx-6">
        {cards.map((card, index) => (
          <div key={index} className="w-full px-6 sm:w-1/2 xl:w-1/3 mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                {card.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardCards;
