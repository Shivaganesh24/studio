'use client';
import { useState } from 'react';
import MainLayout from '@/components/main-layout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  Search,
  AlertCircle
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';


// Mock stock data
const mockStockData: { [key: string]: { name: string, price: number, chart: any[] } } = {
  RELIANCE: { name: 'Reliance Industries', price: 2890.10, chart: [{ date: '24-07', value: 2850 }, { date: '25-07', value: 2865 }, { date: '26-07', value: 2870 }, { date: '27-07', value: 2880 }, { date: '28-07', value: 2875 }, { date: '29-07', value: 2890 }, { date: '30-07', value: 2905 }] },
  TCS: { name: 'Tata Consultancy Services', price: 3825.50, chart: [{ date: '24-07', value: 3800 }, { date: '25-07', value: 3810 }, { date: '26-07', value: 3805 }, { date: '27-07', value: 3815 }, { date: '28-07', value: 3820 }, { date: '29-07', value: 3825 }, { date: '30-07', value: 3830 }] },
  HDFCBANK: { name: 'HDFC Bank Ltd.', price: 1660.00, chart: [{ date: '24-07', value: 1670 }, { date: '25-07', value: 1665 }, { date: '26-07', value: 1668 }, { date: '27-07', value: 1662 }, { date: '28-07', value: 1655 }, { date: '29-07', value: 1660 }, { date: '30-07', value: 1664 }] },
  INFY: { name: 'Infosys Ltd.', price: 1680.00, chart: [{ date: '24-07', value: 1640 }, { date: '25-07', value: 1645 }, { date: '26-07', value: 1650 }, { date: '27-07', value: 1670 }, { date: '28-07', value: 1665 }, { date: '29-07', value: 1680 }, { date: '30-07', value: 1690 }] },
  SBIN: { name: 'State Bank of India', price: 830.45, chart: [{ date: '24-07', value: 820 }, { date: '25-07', value: 825 }, { date: '26-07', value: 822 }, { date: '27-07', value: 828 }, { date: '28-07', value: 835 }, { date: '29-07', value: 830 }, { date: '30-07', value: 832 }] },
};


const chartConfig = {
  value: {
    label: 'Price',
    color: 'hsl(var(--primary))',
  },
};


export default function SandboxPage() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStock, setSelectedStock] = useState<{ ticker: string, price: number, name: string, chart: any[] } | null>(null);
    const [quantity, setQuantity] = useState(1);

    const [portfolioValue, setPortfolioValue] = useState(105234.50);
    const [availableFunds, setAvailableFunds] = useState(24200.75);
    const [transactions, setTransactions] = useState([
        { type: 'Buy', stock: 'INFY', quantity: 20, price: 1650.0, date: '2024-07-26' },
        { type: 'Buy', stock: 'HDFCBANK', quantity: 15, price: 1670.5, date: '2024-07-27' },
    ]);

    const handleSearch = () => {
        const stock = mockStockData[searchTerm.toUpperCase()];
        if (stock) {
            setSelectedStock({ ticker: searchTerm.toUpperCase(), ...stock });
        } else {
            setSelectedStock(null);
            toast({
                variant: 'destructive',
                title: 'Stock not found',
                description: `We couldn't find a stock with the ticker "${searchTerm}". Please try another.`,
            });
        }
    };

    const handleTrade = (type: 'Buy' | 'Sell') => {
        if (!selectedStock || quantity <= 0) return;

        const tradeValue = selectedStock.price * quantity;

        if (type === 'Buy' && tradeValue > availableFunds) {
            toast({
                variant: 'destructive',
                title: 'Insufficient Funds',
                description: `You need ₹${tradeValue.toFixed(2)} to buy ${quantity} share(s) of ${selectedStock.ticker}.`,
            });
            return;
        }
        
        // In a real app, you'd also check if the user owns enough stock to sell.
        // For this demo, we will allow it.

        const newTransaction = {
            type,
            stock: selectedStock.ticker,
            quantity,
            price: selectedStock.price,
            date: new Date().toISOString().split('T')[0],
        };

        setTransactions([newTransaction, ...transactions]);
        
        if (type === 'Buy') {
            setAvailableFunds(availableFunds - tradeValue);
            setPortfolioValue(portfolioValue + tradeValue);
        } else {
            setAvailableFunds(availableFunds + tradeValue);
            setPortfolioValue(portfolioValue - tradeValue);
        }

        toast({
            title: `Trade Successful`,
            description: `You have successfully ${type === 'Buy' ? 'bought' : 'sold'} ${quantity} share(s) of ${selectedStock.ticker}.`,
        });
        
        setQuantity(1); // Reset quantity
    };


  return (
    <MainLayout>
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Trading Sandbox
            </h2>
            <p className="text-muted-foreground">
              Practice trading with virtual funds. No real money involved!
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
              <div className="text-2xl font-bold">₹{portfolioValue.toLocaleString('en-IN')}</div>
              <p className="text-xs text-muted-foreground">
                Based on your virtual holdings
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
              <div className="text-2xl font-bold">₹{availableFunds.toLocaleString('en-IN')}</div>
              <p className="text-xs text-muted-foreground">
                Ready to be invested
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's P/L (Mock)
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
              <div className="text-2xl font-bold">{transactions.length}</div>
              <p className="text-xs text-muted-foreground">
                in this session
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
                  Search for a stock ticker and decide your next move.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row items-center gap-4">
                 <div className="relative flex-grow w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        placeholder="Search for a stock (e.g., INFY, SBIN)" 
                        className="pl-10" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                 </div>
                 <Button onClick={handleSearch} className='w-full sm:w-auto'>
                    Search
                 </Button>
              </CardContent>
              {selectedStock && (
                <CardFooter className='flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between'>
                    <div>
                        <h3 className='font-bold text-lg'>{selectedStock.ticker} - {selectedStock.name}</h3>
                        <p className='text-2xl font-bold'>₹{selectedStock.price.toFixed(2)}</p>
                    </div>
                    <div className='flex gap-2 w-full sm:w-auto'>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="flex-1">
                                    <TrendingUp className="mr-2 h-5 w-5" /> Buy
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Buy {selectedStock.ticker}</DialogTitle>
                                    <DialogDescription>
                                        Current Price: ₹{selectedStock.price.toFixed(2)}. Total Cost: ₹{(selectedStock.price * quantity).toFixed(2)}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="quantity" className="text-right">Quantity</Label>
                                        <Input
                                            id="quantity"
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                            className="col-span-3"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" onClick={() => handleTrade('Buy')}>Confirm Purchase</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="destructive" className="flex-1">
                                    <TrendingDown className="mr-2 h-5 w-5" /> Sell
                                </Button>
                            </DialogTrigger>
                             <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Sell {selectedStock.ticker}</DialogTitle>
                                    <DialogDescription>
                                        Current Price: ₹{selectedStock.price.toFixed(2)}. Total Value: ₹{(selectedStock.price * quantity).toFixed(2)}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="quantity-sell" className="text-right">Quantity</Label>
                                        <Input
                                            id="quantity-sell"
                                            type="number"
                                            value={quantity}
                                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                            className="col-span-3"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="button" onClick={() => handleTrade('Sell')}>Confirm Sale</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardFooter>
              )}
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Your latest virtual transactions in this session.
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
                    {transactions.length > 0 ? transactions.map((tx, i) => (
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
                    )) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center text-muted-foreground">
                            No transactions yet.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>{selectedStock ? `${selectedStock.ticker} Performance` : "Stock Performance"}</CardTitle>
              <CardDescription>
                {selectedStock ? `7-day virtual performance data for ${selectedStock.ticker}.` : "Search for a stock to see its performance."}
              </CardDescription>
            </CardHeader>
            <CardContent>
                {selectedStock ? (
                <ChartContainer config={chartConfig} className="h-64 w-full">
                  <AreaChart
                    accessibilityLayer
                    data={selectedStock.chart}
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
                ) : (
                    <div className='h-64 flex flex-col items-center justify-center text-center text-muted-foreground bg-secondary/50 rounded-lg'>
                        <AlertCircle className='w-10 h-10 mb-4' />
                        <p>No stock selected.</p>
                        <p className='text-xs'>Use the search bar to find a stock.</p>
                    </div>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
