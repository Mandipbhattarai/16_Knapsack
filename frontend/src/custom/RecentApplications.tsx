// RecentApplications.tsx
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const RecentApplications: React.FC = () => {
  return (
    <div className="mt-8">
      <Card>
        <CardHeader>
          <CardTitle>Recent Loan Applications</CardTitle>
          <CardDescription>
            You have 3 applications pending review.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={`/placeholder-avatar-${i}.jpg`}
                    alt="Avatar"
                  />
                  <AvatarFallback>UD</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">User {i}</p>
                  <p className="text-sm text-muted-foreground">
                    Applied for: $50,000 - Home Loan
                  </p>
                </div>
                <div className="ml-auto font-medium">Pending Review</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentApplications;
