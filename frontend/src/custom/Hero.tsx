import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, DollarSign, ShieldCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import axios from "axios"; // Make sure to import axios

export default function Hero() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleClick = (): void => {
    navigate("/signup");
  };

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
        const response = await axios.post(
          `http://localhost:3000/subscribe/`,
          {
            email,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

      if (!response) {
        throw new Error("Subscription failed");
      }

      toast({
        title: "Success",
        description: "You have successfully subscribed to updates!",
      });

      setEmail(""); // Clear the input field after successful subscription
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-primary/10 via-background to-background">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Fast & Easy Loan Approvals
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Get the funds you need in as little as 24 hours. No hidden fees,
                no hassle.
              </p>
            </div>
            <div className="space-x-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
                onClick={handleClick}
              >
                Apply Now
              </Button>
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
            Why Choose QuickLoan?
          </h2>
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            {[
              {
                icon: Clock,
                title: "Quick Approval",
                description: "Get approved in as little as 10 minutes",
              },
              {
                icon: ShieldCheck,
                title: "Secure Process",
                description: "Your data is protected with bank-level security",
              },
              {
                icon: DollarSign,
                title: "Competitive Rates",
                description: "We offer some of the best rates in the industry",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="flex flex-col items-center text-center"
              >
                <CardHeader>
                  <div className="p-2 rounded-full bg-primary/10">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="w-full py-12 md:py-24 lg:py-32 bg-secondary"
      >
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
            How It Works
          </h2>
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
            {[
              {
                step: 1,
                title: "Apply Online",
                description:
                  "Fill out our simple online application in minutes",
              },
              {
                step: 2,
                title: "Get Approved",
                description:
                  "Receive a decision quickly, often within the same day",
              },
              {
                step: 3,
                title: "Receive Funds",
                description:
                  "Once approved, get funds deposited directly to your account",
              },
            ].map((step, index) => (
              <Card
                key={index}
                className="flex flex-col items-center text-center"
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold mb-4">
                    {step.step}
                  </div>
                  <CardTitle>{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section
        id="apply"
        className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground"
      >
        <div className="container max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
                Apply now and get a decision in minutes. It's quick, easy, and
                won't affect your credit score.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form
                className="flex flex-col space-y-2"
                onSubmit={handleSubscribe}
              >
                <Input
                  className="bg-primary-foreground text-primary placeholder-primary/50"
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  type="submit"
                  className="w-full bg-background text-primary hover:bg-background/90"
                >
                  Send Updates
                </Button>
              </form>
              <p className="text-xs text-primary-foreground/60">
                By applying, you agree to our Terms of Service and Privacy
                Policy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
