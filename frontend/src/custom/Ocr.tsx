import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios"; // Ensure you import axios
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
// Define the form value types
type FormValues = {
  [key: string]: string | number; // Dynamic object to store form values
};

// Define the form field configuration type
type FormFieldType = {
  name: string; // Ensure the name is always a string
  label: string;
  type?: string; // Field type like text, number, select, etc.
  options?: string[]; // Used for select fields
};

// Array of form fields with types and labels
const formFields: FormFieldType[] = [
  { name: "applicationDate", label: "Loan Application Date", type: "date" },
  { name: "age", label: "Applicant's Age", type: "number" },
  { name: "annualIncome", label: "Annual Income", type: "number" },
  { name: "creditScore", label: "Credit Score", type: "number" },
  {
    name: "employmentStatus",
    label: "Employment Status",
    type: "select",
    options: ["Employed", "Self-Employed", "Unemployed"],
  },
  {
    name: "educationLevel",
    label: "Education Level",
    type: "select",
    options: ["High School", "Bachelor's", "Master's", "PhD"],
  },
  { name: "experience", label: "Work Experience", type: "number" },
  { name: "loanAmount", label: "Requested Loan Size", type: "number" },
  { name: "loanDuration", label: "Loan Repayment Period", type: "number" },
  {
    name: "maritalStatus",
    label: "Marital Status",
    type: "select",
    options: ["Single", "Married", "Divorced"],
  },
  { name: "numberOfDependents", label: "Number of Dependents", type: "number" },
  {
    name: "homeOwnershipStatus",
    label: "Home Ownership Status",
    type: "select",
    options: ["Owned", "Rented", "Mortgaged"],
  },
  {
    name: "monthlyDebtPayments",
    label: "Monthly Debt Payments",
    type: "number",
  },
  {
    name: "creditCardUtilizationRate",
    label: "Credit Card Utilization Rate (%)",
    type: "number",
  },
  {
    name: "numberOfOpenCreditLines",
    label: "Number of Open Credit Lines",
    type: "number",
  },
  {
    name: "numberOfCreditInquiries",
    label: "Number of Credit Inquiries",
    type: "number",
  },
  {
    name: "debtToIncomeRatio",
    label: "Debt to Income Ratio (%)",
    type: "number",
  },
  {
    name: "bankruptcyHistory",
    label: "Bankruptcy History",
    type: "select",
    options: ["Yes", "No"],
  },
  {
    name: "loanPurpose",
    label: "Loan Purpose",
    type: "text",
  },
  {
    name: "previousLoanDefaults",
    label: "Previous Loan Defaults",
    type: "select",
    options: ["Yes", "No"],
  },
  {
    name: "paymentHistory",
    label: "Payment History",
    type: "select",
    options: ["Good", "Average", "Poor"],
  },
  {
    name: "lengthOfCreditHistory",
    label: "Length of Credit History (Years)",
    type: "number",
  },
  {
    name: "savingsAccountBalance",
    label: "Savings Account Balance",
    type: "number",
  },
  {
    name: "checkingAccountBalance",
    label: "Checking Account Balance",
    type: "number",
  },
  {
    name: "totalAssets",
    label: "Total Assets",
    type: "number",
  },
  {
    name: "totalLiabilities",
    label: "Total Liabilities",
    type: "number",
  },
  {
    name: "monthlyIncome",
    label: "Monthly Income",
    type: "number",
  },
  {
    name: "utilityBillsPaymentHistory",
    label: "Utility Bills Payment History",
    type: "select",
    options: ["Good", "Average", "Poor"],
  },
  {
    name: "jobTenure",
    label: "Job Tenure (Years)",
    type: "number",
  },
  {
    name: "netWorth",
    label: "Total Financial Worth",
    type: "number",
  },
  {
    name: "baseInterestRate",
    label: "Base Interest Rate (%)",
    type: "number",
  },
  {
    name: "interestRate",
    label: "Applied Interest Rate (%)",
    type: "number",
  },
  {
    name: "monthlyLoanPayment",
    label: "Monthly Loan Payment",
    type: "number",
  },
  {
    name: "totalDebtToIncomeRatio",
    label: "Total Debt to Income Ratio (%)",
    type: "number",
  },
];

export default function LoanFormFields() {
  const form = useForm<FormValues>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle form submission
  async function onSubmit(values: FormValues) {
    setIsLoading(true);

    // Convert form values to an array
    const inputDataArray = Object.values(values).map((value) =>
      typeof value === "string" ? Number(value) : value
    );

    // Prepare the payload for API submission
    const payload = {
      input_data: inputDataArray,
    };

    try {
      const response = await axios.post(
        "https://loan-approval-si4u.onrender.com/predict",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResponseMessage(JSON.stringify(response.data, null, 2));
      setDialogOpen(true);
      form.reset(); // Resets the form after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponseMessage("An error occurred while submitting the form.");
      setDialogOpen(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="container mx-auto px-6 py-8">
      <CardHeader>
        <CardTitle className="text-[32px]">Loan Application Form</CardTitle>
        <CardDescription>Please fill out all fields below.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {formFields.map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name} // Ensure name is always a string
                  render={({ field: formField }) => (
                    <FormItem>
                      <FormLabel>{field.label}</FormLabel>
                      <FormControl>
                        {/* Render input based on field type */}
                        {field.type === "select" ? (
                          <select {...formField} className="border p-2 w-full">
                            <option value="">Select {field.label}</option>
                            {field.options?.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <Input
                            type={field.type || "text"}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            {...formField}
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Loan Application"}
            </Button>
          </form>
        </Form>
      </CardContent>
      {/* Dialog to show the response */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>Response</DialogHeader>
          <DialogDescription>
            <pre>{responseMessage}</pre>
          </DialogDescription>
          <DialogFooter>
            <Button onClick={() => setDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
