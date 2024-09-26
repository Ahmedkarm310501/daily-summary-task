import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { DailySummaryResponse } from "@/hooks/useDailySummary";
import { Loader } from "lucide-react";

type DailySummaryCardProps = {
  dailySummary: DailySummaryResponse["data"] | undefined;
  isLoading: boolean;
};

const DailySummaryCard = ({
  dailySummary,
  isLoading,
}: DailySummaryCardProps) => {
  if (isLoading) {
    return <Loader className="mx-auto" />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Total Hours</Label>
            <Input value={dailySummary?.totalHours ?? 0} readOnly />
          </div>
          <div>
            <Label>Remaining Hours</Label>
            <Input value={dailySummary?.remainingHours ?? 0} readOnly />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySummaryCard;
