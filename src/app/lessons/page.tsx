import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/components/main-layout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight, Clock, PlayCircle, Video } from 'lucide-react';

const lessons = [
  {
    id: 'stock-market-basics',
    title: 'Stock Market Basics',
    description:
      'Learn the fundamentals of how the stock market works, what stocks are, and why companies issue them. Your first step to becoming an investor!',
    time: 15,
    href: '#',
  },
  {
    id: 'what-is-diversification',
    title: 'What is Diversification?',
    description:
      "Don't put all your eggs in one basket! Discover how to spread your risk across different assets to build a more resilient portfolio.",
    time: 10,
    href: '#',
  },
  {
    id: 'risk-assessment',
    title: 'Understanding Your Risk Profile',
    description:
      'Explore the relationship between risk and reward. Understand your own tolerance for risk to make smarter investment choices.',
    time: 12,
    href: '#',
  },
  {
    id: 'intro-to-algo-trading',
    title: 'Intro to Algorithmic Trading',
    description:
      "Get a glimpse into the world of automated trading. Learn what algorithmic trading is and how it's used in modern markets.",
    time: 20,
    href: '#',
  },
  {
    id: 'portfolio-diversification',
    title: 'Advanced Portfolio Diversification',
    description:
      'Dive deeper into strategies for diversifying your investments across sectors, geographies, and asset classes for long-term growth.',
    time: 18,
    href: '#',
  },
  {
    id: 'reading-financial-statements',
    title: 'How to Read Financial Statements',
    description:
      "Learn to analyze a company's balance sheet, income statement, and cash flow statement to evaluate its financial health.",
    time: 25,
    href: '#',
  },
];

const videoTutorials = [
  {
    id: 1,
    title: 'How to Place Your First Virtual Trade',
    duration: '5:42',
    thumbnail: 'https://picsum.photos/400/225',
    href: '#',
    dataAiHint: 'trading tutorial',
  },
  {
    id: 2,
    title: 'Understanding Market Orders vs. Limit Orders',
    duration: '7:15',
    thumbnail: 'https://picsum.photos/400/225',
    href: '#',
    dataAiHint: 'stock market',
  },
  {
    id: 3,
    title: 'Basic Chart Analysis for Beginners',
    duration: '10:30',
    thumbnail: 'https://picsum.photos/400/225',
    href: '#',
    dataAiHint: 'financial chart',
  },
];


export default function LessonsPage() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-8">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Interactive Lessons</h2>
              <p className="text-muted-foreground">
                Expand your financial knowledge with these step-by-step guides.
              </p>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="w-5 h-5" />
              <span>{lessons.length} Lessons</span>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
            {lessons.map((lesson) => (
              <Card
                key={lesson.id}
                className="flex flex-col shadow-sm hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle>{lesson.title}</CardTitle>
                  <CardDescription className="flex items-center pt-1">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{lesson.time} min read</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground">
                    {lesson.description}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild variant="secondary" className="w-full">
                    <Link href={lesson.href}>
                      Start Lesson <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div>
           <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Video Tutorials</h2>
              <p className="text-muted-foreground">
                Learn by watching. See trading concepts in action.
              </p>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Video className="w-5 h-5" />
              <span>{videoTutorials.length} Videos</span>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
            {videoTutorials.map((video) => (
              <Link href={video.href} key={video.id}>
                <Card className="overflow-hidden group hover:shadow-xl transition-shadow">
                  <div className="relative">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      width={400}
                      height={225}
                      className="object-cover w-full aspect-video"
                      data-ai-hint={video.dataAiHint}
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <PlayCircle className="w-16 h-16 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-base mb-1">
                      {video.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Duration: {video.duration}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
