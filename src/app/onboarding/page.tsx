'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

const questions = [
  {
    id: 'q1',
    text: 'Your friend suggests a "hot" new stock. They say it could double in a month, but it is also very risky. What do you do?',
    options: [
      {
        value: '1',
        label:
          "Politely decline and stick to your own research and well-known companies.",
      },
      {
        value: '2',
        label:
          'Invest a small amount that you are okay with losing, just in case.',
      },
      {
        value: '3',
        label:
          'Go for it! High risk often means high reward, and you don\'t want to miss out.',
      },
    ],
  },
  {
    id: 'q2',
    text: 'Imagine your stock portfolio loses 20% of its value in a month during a market downturn. How do you react?',
    options: [
      {
        value: '1',
        label:
          'Panic and sell everything to prevent further losses.',
      },
      {
        value: '2',
        label:
          'Hold on and wait for the market to recover, maybe consider buying more at a discount.',
      },
      {
        value: '3',
        label:
          'See it as a great buying opportunity and invest more money.',
      },
    ],
  },
  {
    id: 'q3',
    text: 'What is your primary goal for investing in the stock market?',
    options: [
      {
        value: '1',
        label:
          'To preserve my capital and get returns slightly better than a savings account.',
      },
      {
        value: '2',
        label:
          'To achieve a balance of growth and safety for long-term goals like retirement.',
      },
      {
        value: '3',
        label:
          'To maximize my returns as quickly as possible, even if it means taking on significant risk.',
      },
    ],
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      const score = Object.values(answers).reduce(
        (acc, val) => acc + parseInt(val, 10),
        0
      );
      let profile = 'Moderate';
      if (score <= 4) {
        profile = 'Conservative';
      } else if (score >= 8) {
        profile = 'Aggressive';
      }
      localStorage.setItem('riskProfile', profile);
      router.push('/');
    }
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };
  
  const isCurrentQuestionAnswered = !!answers[questions[currentQuestion].id];
  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="size-8 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">FinLit Leap</h1>
      </div>
      <Card className="w-full max-w-2xl shadow-xl">
        <CardHeader>
          <Progress value={progressPercentage} className="mb-4 h-2" />
          <CardTitle className="text-xl md:text-2xl">
            Investor Profile Quiz
          </CardTitle>
          <CardDescription>
            Question {currentQuestion + 1} of {questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="font-semibold text-base md:text-lg">
              {questions[currentQuestion].text}
            </p>
            <RadioGroup
              value={answers[questions[currentQuestion].id]}
              onValueChange={(value) =>
                handleAnswerChange(questions[currentQuestion].id, value)
              }
              className="space-y-3"
            >
              {questions[currentQuestion].options.map((option) => (
                <div
                  key={option.value}
                  className="flex items-center space-x-3 rounded-md border p-4 transition-all hover:bg-accent/50 has-[[data-state=checked]]:bg-accent/80 has-[[data-state=checked]]:border-primary"
                >
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="font-normal flex-1 cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleNext}
            disabled={!isCurrentQuestionAnswered}
            className="w-full"
          >
            {currentQuestion < questions.length - 1 ? 'Next' : 'Finish & See My Profile'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
