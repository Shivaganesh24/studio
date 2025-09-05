import MainLayout from '@/components/main-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { User } from 'lucide-react';

export default function ProfilePage() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-4">
        <h2 className="text-3xl font-bold tracking-tight">User Profile</h2>
        <Card className="text-center shadow-sm">
          <CardHeader>
            <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full mb-4 w-fit">
              <User className="w-10 h-10" />
            </div>
            <CardTitle>Coming Soon!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Your personal profile page is under construction.
              <br />
              Soon you'll be able to view your learning progress, XP, badges,
              and unlockable levels here.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
