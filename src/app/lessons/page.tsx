import MainLayout from '@/components/main-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export default function LessonsPage() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">Lessons</h2>
        <Card className="text-center shadow-sm">
          <CardHeader>
            <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full mb-4 w-fit">
              <BookOpen className="w-10 h-10" />
            </div>
            <CardTitle>Coming Soon!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Interactive lessons on stock market basics, risk assessment, algo
              trading, and portfolio diversification will be available here.
              <br />
              Get ready to level up your financial knowledge!
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
