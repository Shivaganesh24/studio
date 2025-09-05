'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Award,
  BookOpen,
  FlaskConical,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

const chartData = [
  { month: 'January', nifty: 180 },
  { month: 'February', nifty: 190 },
  { month: 'March', nifty: 200 },
  { month: 'April', nifty: 210 },
  { month: 'May', nifty: 250 },
  { month: 'June', nifty: 230 },
];

const chartConfig = {
  nifty: {
    label: 'NIFTY 50',
    color: 'hsl(var(--primary))',
  },
};

const RiskProfilerPrompt = () => (
  <div className="flex items-center justify-center h-full">
    <Card className="w-full max-w-md text-center shadow-lg">
      <CardHeader>
        <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full mb-4">
          <Target className="w-10 h-10" />
        </div>
        <CardTitle>Welcome to FinLit Leap!</CardTitle>
        <CardDescription>
          Discover your investment style to get personalized lessons.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="mb-6">
          Take a quick 1-minute quiz to understand your risk tolerance and unlock
          your dashboard.
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href="/onboarding">
            Find Your Investor Profile <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  </div>
);

export default function Dashboard() {
  const [riskProfile, setRiskProfile] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This code runs only on the client
    const profile = localStorage.getItem('riskProfile');
    setRiskProfile(profile);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>
  }

  if (!riskProfile) {
    return <RiskProfilerPrompt />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome Back, Investor!
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s your progress overview. Keep the momentum going!
          </p>
        </div>
        <Badge variant="outline" className="text-sm py-1 px-3">
          Your Profile: <span className="font-bold ml-1">{riskProfile}</span>
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">XP & Level</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250 XP</div>
            <p className="text-xs text-muted-foreground">Level 5 - Stock Novice</p>
            <Progress value={50} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 Days</div>
            <p className="text-xs text-muted-foreground">
              You&apos;re on a roll! Complete a lesson tomorrow to extend it.
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 Badges</div>
            <p className="text-xs text-muted-foreground">
              Newbie, First Trade, Quiz Whiz
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle>Market Snapshot</CardTitle>
            <CardDescription>
              Virtual NIFTY 50 Index Performance (Delayed Data)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-48 w-full">
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Area
                  dataKey="nifty"
                  type="natural"
                  fill="var(--color-nifty)"
                  fillOpacity={0.4}
                  stroke="var(--color-nifty)"
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Continue Learning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold">What is Diversification?</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-4">
                Learn how to spread your risk across different assets.
              </p>
              <Button asChild variant="outline" size="sm">
                <Link href="/lessons">
                  Start Lesson <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5" />
                Trading Sandbox
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Your virtual portfolio is valued at{' '}
                <span className="font-bold text-foreground">₹1,05,234.50</span>.
              </p>
              <Button asChild size="sm">
                <Link href="/sandbox">
                  Go to Sandbox <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
