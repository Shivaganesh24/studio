import MainLayout from '@/components/main-layout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  PlayCircle,
} from 'lucide-react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

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

const transactions = [
  {
    type: 'Buy',
    stock: 'RELIANCE',
    quantity: 10,
    price: 2850.75,
    date: '2024-07-29',
  },
  {
    type: 'Sell',
    stock: 'TCS',
    quantity: 5,
    price: 3800.2,
    date: '2024-07-28',
  },
  {
    type: 'Buy',
    stock: 'HDFCBANK',
    quantity: 15,
    price: 1670.5,
    date: '2024-07-27',
  },
  {
    type: 'Buy',
    stock: 'INFY',
    quantity: 20,
    price: 1650.0,
    date: '2024-07-26',
  },
];

export default function SandboxPage() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Trading Sandbox
            </h2>
            <p className="text-muted-foreground">
              Practice trading with ₹1,00,000 in virtual funds. No real money
              involved!
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Portfolio Value
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹1,05,234.50</div>
              <p className="text-xs text-muted-foreground">
                +5.23% all-time return
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Available Funds
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹24,200.75</div>
              <p className="text-xs text-muted-foreground">
                Ready to be invested
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Gain/Loss
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">+₹850.25</div>
              <p className="text-xs text-muted-foreground">+0.81% today</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Trades
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">
                in the last 7 days
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Your last 4 virtual transactions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Badge
                          variant={
                            tx.type === 'Buy' ? 'default' : 'destructive'
                          }
                          className={
                            tx.type === 'Buy'
                              ? 'bg-green-500/20 text-green-700 hover:bg-green-500/30'
                              : 'bg-red-500/20 text-red-700 hover:bg-red-500/30'
                          }
                        >
                          {tx.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{tx.stock}</TableCell>
                      <TableCell className="text-right">
                        {tx.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        ₹{tx.price.toFixed(2)}
                      </TableCell>
                      <TableCell>{tx.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Simulate your next market move.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Button size="lg">
                <TrendingUp className="mr-2 h-5 w-5" /> Buy a Stock
              </Button>
              <Button size="lg" variant="destructive">
                <TrendingDown className="mr-2 h-5 w-5" /> Sell a Stock
              </Button>
              <Button size="lg" variant="secondary">
                View My Virtual Holdings
              </Button>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="text-2xl font-bold tracking-tight mb-4">
            Video Tutorials
          </h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
