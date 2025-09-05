'use client';
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
  Search,
  LineChart
} from 'lucide-react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';


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

const chartData = [
  { date: '24-07', value: 1640 },
  { date: '25-07', value: 1645 },
  { date: '26-07', value: 1650 },
  { date: '27-07', value: 1670 },
  { date: '28-07', value: 1665 },
  { date: '29-07', value: 1680 },
  { date: '30-07', value: 1690 },
];

const chartConfig = {
  value: {
    label: 'Price',
    color: 'hsl(var(--primary))',
  },
};


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
          <div className="lg:col-span-2 space-y-6">
             <Card>
              <CardHeader>
                <CardTitle>Simulate a Trade</CardTitle>
                 <CardDescription>
                  Search for a stock and decide your next move.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row items-center gap-4">
                 <div className="relative flex-grow w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="Search for a stock (e.g., INFY, SBIN)" className="pl-10" />
                 </div>
                <div className='flex gap-2 w-full sm:w-auto'>
                   <Button className="flex-1">
                    <TrendingUp className="mr-2 h-5 w-5" /> Buy
                  </Button>
                  <Button variant="destructive" className="flex-1">
                    <TrendingDown className="mr-2 h-5 w-5" /> Sell
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
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
          </div>
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>INFY Mock Performance</CardTitle>
              <CardDescription>
                7-day virtual performance data.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-64 w-full">
                  <AreaChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: -10,
                      right: 10,
                      top: 5,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      domain={['dataMin - 10', 'dataMax + 10']}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Area
                      dataKey="value"
                      type="natural"
                      fill="var(--color-value)"
                      fillOpacity={0.2}
                      stroke="var(--color-value)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
