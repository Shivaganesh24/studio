'use client';
import { useState, useEffect } from 'react';
import MainLayout from '@/components/main-layout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Award, Shield, Zap, TrendingUp, CheckCircle } from 'lucide-react';

const achievements = [
  {
    icon: <Award className="h-6 w-6" />,
    title: 'First Trade',
    description: 'Placed your first virtual trade in the sandbox.',
    unlocked: true,
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: 'Quiz Whiz',
    description: 'Completed the investor profile quiz.',
    unlocked: true,
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: '5-Day Streak',
    description: 'Completed a lesson for 5 consecutive days.',
    unlocked: true,
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Novice Investor',
    description: 'Reached Level 5.',
    unlocked: true,
  },
  {
    icon: <Award className="h-6 w-6 text-muted-foreground/50" />,
    title: 'Portfolio Pro',
    description: 'Grow your portfolio value to ₹1,25,000.',
    unlocked: false,
  },
  {
    icon: <CheckCircle className="h-6 w-6 text-muted-foreground/50" />,
    title: 'Lesson Leader',
    description: 'Complete all available lessons.',
    unlocked: false,
  },
];

export default function ProfilePage() {
  const [riskProfile, setRiskProfile] = useState<string | null>(null);

  useEffect(() => {
    const profile = localStorage.getItem('riskProfile');
    setRiskProfile(profile);
  }, []);

  return (
    <MainLayout>
      <div className="flex-1 space-y-6">
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <Avatar className="h-24 w-24 border-4 border-primary/20">
            <AvatarImage src="https://picsum.photos/100" alt="User Avatar" data-ai-hint="person" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Virtual Investor</h2>
            {riskProfile && (
              <div className="flex items-center gap-2 mt-1">
                <Shield className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">
                  Your profile:{' '}
                  <span className="font-bold text-foreground">{riskProfile}</span>
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Zap className="h-5 w-5" />
                Current Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">Level 5</p>
              <p className="text-sm text-muted-foreground">Stock Novice</p>
              <Progress value={50} className="mt-3 h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                1250 / 2500 XP to next level
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5" />
                Learning Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">5 Days</p>
              <p className="text-sm text-muted-foreground">
                Keep it up to earn more XP!
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Award className="h-5 w-5" />
                Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge>Newbie</Badge>
                <Badge>First Trade</Badge>
                <Badge>Quiz Whiz</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>
              Unlock achievements by learning and practicing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {achievements.map((ach) => (
                <div
                  key={ach.title}
                  className={`flex items-start gap-4 p-4 rounded-lg border ${
                    ach.unlocked
                      ? 'bg-accent/50'
                      : 'bg-card'
                  }`}
                >
                  <span
                    className={`p-2 rounded-full ${
                      ach.unlocked
                        ? 'bg-primary/20 text-primary'
                        : 'bg-muted text-muted-foreground/50'
                    }`}
                  >
                    {ach.icon}
                  </span>
                  <div>
                    <h4
                      className={`font-semibold ${
                        !ach.unlocked && 'text-muted-foreground'
                      }`}
                    >
                      {ach.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {ach.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
