import MainLayout from '@/components/main-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { PieChart } from 'lucide-react';

export default function PortfolioPage() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">My Portfolio</h2>
        <Card className="text-center shadow-sm">
          <CardHeader>
            <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full mb-4 w-fit">
              <PieChart className="w-10 h-10" />
            </div>
            <CardTitle>Coming Soon!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Soon you will be able to track your virtual portfolio's
              performance right here.
              <br />
              Compare your results against the NIFTY index and refine your
              strategy!
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
