import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
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
  Age: number;
  AnnualIncome: number;
  CreditScore: number;
  EmploymentStatus: string;
  EducationLevel: string;
  Experience: number;
  LoanAmount: number;
  LoanDuration: number;
  MaritalStatus: string;
  NumberOfDependents: number;
  HomeOwnershipStatus: string;
  MonthlyDebtPayments: number;
  CreditCardUtilizationRate: number;
  NumberOfOpenCreditLines: number;
  NumberOfCreditInquiries: number;
  DebtToIncomeRatio: number;
  BankruptcyHistory: number;
  LoanPurpose: string;
  PreviousLoanDefaults: number;
  PaymentHistory: number;
  LengthOfCreditHistory: number;
  SavingsAccountBalance: number;
  CheckingAccountBalance: number;
  TotalAssets: number;
  TotalLiabilities: number;
  MonthlyIncome: number;
  UtilityBillsPaymentHistory: number;
  JobTenure: number;
  NetWorth: number;
  BaseInterestRate: number;
  InterestRate: number;
  MonthlyLoanPayment: number;
  TotalDebtToIncomeRatio: number;
};

// Create a union type for field names
type FieldNames = keyof FormValues;

// Array of form fields with types and labels
const formFields: Array<{
  name: FieldNames;
  label: string;
  type: string;
  options?: string[];
}> = [
  { name: "Age", label: "Age", type: "number" },
  { name: "AnnualIncome", label: "Annual Income", type: "number" },
  { name: "CreditScore", label: "Credit Score", type: "number" },
  {
    name: "EmploymentStatus",
    label: "Employment Status",
    type: "select",
    options: ["Employed", "Self-Employed", "Unemployed"],
  },
  {
    name: "EducationLevel",
    label: "Education Level",
    type: "select",
    options: ["High School", "Bachelor's Degree", "Master's Degree", "PhD"],
  },
  { name: "Experience", label: "Experience (Years)", type: "number" },
  { name: "LoanAmount", label: "Loan Amount", type: "number" },
  { name: "LoanDuration", label: "Loan Duration (Months)", type: "number" },
  {
    name: "MaritalStatus",
    label: "Marital Status",
    type: "select",
    options: ["Single", "Married", "Divorced"],
  },
  { name: "NumberOfDependents", label: "Number of Dependents", type: "number" },
  {
    name: "HomeOwnershipStatus",
    label: "Home Ownership Status",
    type: "select",
    options: ["Owned", "Rented", "Mortgaged"],
  },
  {
    name: "MonthlyDebtPayments",
    label: "Monthly Debt Payments",
    type: "number",
  },
  {
    name: "CreditCardUtilizationRate",
    label: "Credit Card Utilization Rate (%)",
    type: "number",
  },
  {
    name: "NumberOfOpenCreditLines",
    label: "Number of Open Credit Lines",
    type: "number",
  },
  {
    name: "NumberOfCreditInquiries",
    label: "Number of Credit Inquiries",
    type: "number",
  },
  {
    name: "DebtToIncomeRatio",
    label: "Debt to Income Ratio (%)",
    type: "number",
  },
  {
    name: "BankruptcyHistory",
    label: "Bankruptcy History (0: No, 1: Yes)",
    type: "number",
  },
  { name: "LoanPurpose", label: "Loan Purpose", type: "text" },
  {
    name: "PreviousLoanDefaults",
    label: "Previous Loan Defaults (0: No, 1: Yes)",
    type: "number",
  },
  {
    name: "PaymentHistory",
    label: "Payment History (0: Poor, 1: Good)",
    type: "number",
  },
  {
    name: "LengthOfCreditHistory",
    label: "Length of Credit History (Years)",
    type: "number",
  },
  {
    name: "SavingsAccountBalance",
    label: "Savings Account Balance",
    type: "number",
  },
  {
    name: "CheckingAccountBalance",
    label: "Checking Account Balance",
    type: "number",
  },
  { name: "TotalAssets", label: "Total Assets", type: "number" },
  { name: "TotalLiabilities", label: "Total Liabilities", type: "number" },
  { name: "MonthlyIncome", label: "Monthly Income", type: "number" },
  {
    name: "UtilityBillsPaymentHistory",
    label: "Utility Bills Payment History (0: Poor, 1: Good)",
    type: "number",
  },
  { name: "JobTenure", label: "Job Tenure (Years)", type: "number" },
  { name: "NetWorth", label: "Net Worth", type: "number" },
  { name: "BaseInterestRate", label: "Base Interest Rate (%)", type: "number" },
  { name: "InterestRate", label: "Interest Rate (%)", type: "number" },
  { name: "MonthlyLoanPayment", label: "Monthly Loan Payment", type: "number" },
  {
    name: "TotalDebtToIncomeRatio",
    label: "Total Debt to Income Ratio (%)",
    type: "number",
  },
];

export default function LoanFormFields() {
  const form = useForm<FormValues>({
    defaultValues: {
      Age: 30,
      AnnualIncome: 50000,
      CreditScore: 720,
      EmploymentStatus: "Employed",
      EducationLevel: "Bachelor's Degree",
      Experience: 7,
      LoanAmount: 15000,
      LoanDuration: 36,
      MaritalStatus: "Single",
      NumberOfDependents: 0,
      HomeOwnershipStatus: "Rented",
      MonthlyDebtPayments: 300,
      CreditCardUtilizationRate: 25,
      NumberOfOpenCreditLines: 5,
      NumberOfCreditInquiries: 2,
      DebtToIncomeRatio: 35,
      BankruptcyHistory: 0,
      LoanPurpose: "Personal Loan",
      PreviousLoanDefaults: 0,
      PaymentHistory: 1,
      LengthOfCreditHistory: 10,
      SavingsAccountBalance: 5000,
      CheckingAccountBalance: 2000,
      TotalAssets: 25000,
      TotalLiabilities: 10000,
      MonthlyIncome: 4000,
      UtilityBillsPaymentHistory: 1,
      JobTenure: 5,
      NetWorth: 15000,
      BaseInterestRate: 3.5,
      InterestRate: 5.0,
      MonthlyLoanPayment: 450,
      TotalDebtToIncomeRatio: 40,
    },
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle form submission
  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    const payload = { ...values };

    try {
      const response = await axios.post(
        "https://loan-approval-si4u.onrender.com/predict",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      // Handle the prediction response
      const prediction = response.data.prediction[0][0];
      const approvalMessage =
        prediction === 1 ? "Loan Approved!" : "Loan Not Approved.";
      setResponseMessage(approvalMessage);
      setDialogOpen(true);
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponseMessage("An error occurred while submitting the form.");
      setDialogOpen(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="container mx-auto p-8">
      <CardHeader>
        <CardTitle className={"text-[32px]"}>Loan Application Form</CardTitle>
        <CardDescription>Please fill out the fields below:</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {formFields.map((field) => (
              <FormField
                key={field.name}
                control={form.control}
                name={field.name}
                render={({ field: formField }) => (
                  <FormItem>
                    <FormLabel>{field.label}</FormLabel>
                    <FormControl>
                      {field.type === "select" ? (
                        <select {...formField} className="input">
                          {field.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <Input type={field.type} {...formField} />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </Form>
      </CardContent>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <h2 className="text-lg font-medium">Response</h2>
          </DialogHeader>
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
