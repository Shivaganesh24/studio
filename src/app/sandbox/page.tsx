import MainLayout from '@/components/main-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FlaskConical } from 'lucide-react';

export default function SandboxPage() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Trading Sandbox</h2>
        <Card className="text-center shadow-sm">
          <CardHeader>
            <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full mb-4 w-fit">
              <FlaskConical className="w-10 h-10" />
            </div>
            <CardTitle>Coming Soon!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              The virtual trading sandbox is being built!
              <br />
              You'll soon be able to practice buying and selling with ₹1,00,000
              in virtual funds.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
