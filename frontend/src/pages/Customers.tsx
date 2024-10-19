import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/custom/Sidebar";
import Header from "@/custom/Header";
import { Button } from "@/components/ui/button";

interface Customer {
  id: string;
  username: string;
  email: string;
}

export default function CustomerPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        // Explicitly typing the response as Customer[]
        const response = await axios.get<Customer[]>(
          "http://localhost:3000/user/all"
        );
        setCustomers(response.data); // Now TypeScript knows it's an array of Customer
        setIsLoading(false);
      } catch (err) {
        setError("An error occurred while fetching customer data");
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />

        <div className="container mx-auto px-6 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Customer List</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>{customer.username}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>
                        {customer.status === "Approved" ? (
                          <Button className="bg-slate-500 text-white">
                            Approved
                          </Button>
                        ) : customer.status === "Pending" ? (
                          <Button className="bg-yellow-500 text-white">
                            Pending
                          </Button>
                        ) : (
                          <Button className="bg-gray-300 text-black hover:text-white">
                            Not Approved
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
