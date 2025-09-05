'use client';
import MainLayout from '@/components/main-layout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart as PieChartIcon,
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from 'recharts';

const portfolioChartData = [
  { date: 'Jan', value: 100000 },
  { date: 'Feb', value: 101500 },
  { date: 'Mar', value: 103000 },
  { date: 'Apr', value: 102500 },
  { date: 'May', value: 104000 },
  { date: 'Jun', value: 105234 },
];

const portfolioChartConfig = {
  value: {
    label: 'Portfolio Value',
    color: 'hsl(var(--primary))',
  },
};

const holdings = [
  {
    stock: 'RELIANCE',
    quantity: 10,
    avgPrice: 2850.75,
    currentPrice: 2890.1,
  },
  { stock: 'TCS', quantity: 5, avgPrice: 3800.2, currentPrice: 3825.5 },
  {
    stock: 'HDFCBANK',
    quantity: 15,
    avgPrice: 1670.5,
    currentPrice: 1660.0,
  },
  { stock: 'INFY', quantity: 20, avgPrice: 1650.0, currentPrice: 1680.0 },
];

const holdingsWithValues = holdings.map((h) => ({
  ...h,
  marketValue: h.quantity * h.currentPrice,
}));

const pieChartData = holdingsWithValues.map(h => ({ name: h.stock, value: h.marketValue }));
const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export default function PortfolioPage() {
  return (
    <MainLayout>
      <div className="flex-1 space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Portfolio</h2>
          <p className="text-muted-foreground">
            Track your virtual portfolio's performance.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Value</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹1,05,234.50</div>
              <p className="text-xs text-muted-foreground">
                Your portfolio's current worth
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Unrealized P/L
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">+₹1,234.50</div>
              <p className="text-xs text-muted-foreground">
                Profit if you sell now
              </p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Day's Gain/Loss
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">-₹150.75</div>
              <p className="text-xs text-muted-foreground">-0.14% today</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                All-time Return
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">+5.23%</div>
              <p className="text-xs text-muted-foreground">
                Since you started investing
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Performance History</CardTitle>
              <CardDescription>
                6-month virtual portfolio performance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={portfolioChartConfig} className="h-72 w-full">
                <AreaChart
                  accessibilityLayer
                  data={portfolioChartData}
                  margin={{
                    left: -20,
                    right: 20,
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
                    domain={['dataMin - 2000', 'dataMax + 2000']}
                    tickFormatter={(value) => `₹${Number(value) / 1000}k`}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" formatter={(value) => `₹${Number(value).toLocaleString()}`} />}
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
          <Card className="lg:col-span-1 flex flex-col">
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
              <CardDescription>
                How your portfolio is diversified.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center">
               <ChartContainer config={{}} className="h-48 w-full">
                <PieChart>
                  <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                     {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent nameKey="name" hideIndicator />} />
                </PieChart>
               </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Holdings</CardTitle>
            <CardDescription>
              Detailed view of your virtual stocks.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stock</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Avg. Price</TableHead>
                  <TableHead>Current Price</TableHead>
                  <TableHead>Market Value</TableHead>
                  <TableHead className="text-right">Today's P/L</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {holdingsWithValues.map((h) => {
                   const todaysGain = (h.currentPrice - (h.currentPrice * 0.995)) * h.quantity; // mock 0.5% gain
                   const isGain = todaysGain >= 0;
                  return (
                  <TableRow key={h.stock}>
                    <TableCell className="font-medium">{h.stock}</TableCell>
                    <TableCell>{h.quantity}</TableCell>
                    <TableCell>₹{h.avgPrice.toFixed(2)}</TableCell>
                    <TableCell>₹{h.currentPrice.toFixed(2)}</TableCell>
                    <TableCell>₹{h.marketValue.toFixed(2)}</TableCell>
                    <TableCell className={`text-right font-medium ${isGain ? 'text-green-500' : 'text-red-500'}`}>
                      {isGain ? '+' : '-'}₹{Math.abs(todaysGain).toFixed(2)}
                    </TableCell>
                  </TableRow>
                )})}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
