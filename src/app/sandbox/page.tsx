'use client';
import { useState, useMemo } from 'react';
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
  AlertCircle,
  PlusCircle,
  MinusCircle
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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';


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

type Holding = {
  ticker: string;
  quantity: number;
  avgPrice: number;
};


export default function SandboxPage() {
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStock, setSelectedStock] = useState<{ ticker: string, price: number, name: string, chart: any[] } | null>(null);
    const [quantity, setQuantity] = useState(1);
    
    const [holdings, setHoldings] = useState<Holding[]>([
        { ticker: 'INFY', quantity: 20, avgPrice: 1650.0 },
        { ticker: 'HDFCBANK', quantity: 15, avgPrice: 1670.5 },
    ]);
    const [availableFunds, setAvailableFunds] = useState(24200.75);
    const [transactions, setTransactions] = useState([
        { type: 'Buy', stock: 'INFY', quantity: 20, price: 1650.0, date: '2024-07-26' },
        { type: 'Buy', stock: 'HDFCBANK', quantity: 15, price: 1670.5, date: '2024-07-27' },
    ]);

    const portfolioValue = useMemo(() => {
        return holdings.reduce((total, holding) => {
            const currentPrice = mockStockData[holding.ticker]?.price || holding.avgPrice;
            return total + (holding.quantity * currentPrice);
        }, 0);
    }, [holdings]);


    const handleSearch = () => {
        const stockTicker = searchTerm.toUpperCase();
        const stock = mockStockData[stockTicker];
        if (stock) {
            setSelectedStock({ ticker: stockTicker, ...stock });
        } else {
            setSelectedStock(null);
            toast({
                variant: 'destructive',
                title: 'Stock not found',
                description: `We couldn't find a stock with the ticker "${searchTerm}". Please try another.`,
            });
        }
    };

    const handleTrade = (type: 'Buy' | 'Sell', ticker: string, tradeQuantity: number) => {
        const stockData = mockStockData[ticker];
        if (!stockData || tradeQuantity <= 0) return;

        const tradeValue = stockData.price * tradeQuantity;

        if (type === 'Buy') {
            if (tradeValue > availableFunds) {
                toast({
                    variant: 'destructive',
                    title: 'Insufficient Funds',
                    description: `You need ₹${tradeValue.toFixed(2)} to buy ${tradeQuantity} share(s) of ${ticker}.`,
                });
                return;
            }
            
            setAvailableFunds(availableFunds - tradeValue);
            setHoldings(prev => {
                const existingHolding = prev.find(h => h.ticker === ticker);
                if (existingHolding) {
                    const totalQuantity = existingHolding.quantity + tradeQuantity;
                    const newAvgPrice = ((existingHolding.avgPrice * existingHolding.quantity) + tradeValue) / totalQuantity;
                    return prev.map(h => h.ticker === ticker ? { ...h, quantity: totalQuantity, avgPrice: newAvgPrice } : h);
                } else {
                    return [...prev, { ticker, quantity: tradeQuantity, avgPrice: stockData.price }];
                }
            });

        } else { // Sell
            const holding = holdings.find(h => h.ticker === ticker);
            if (!holding || tradeQuantity > holding.quantity) {
                 toast({
                    variant: 'destructive',
                    title: 'Not enough shares',
                    description: `You can't sell more shares of ${ticker} than you own.`,
                });
                return;
            }
            
            setAvailableFunds(availableFunds + tradeValue);
            setHoldings(prev => {
                const newQuantity = holding.quantity - tradeQuantity;
                if (newQuantity === 0) {
                    return prev.filter(h => h.ticker !== ticker);
                } else {
                    return prev.map(h => h.ticker === ticker ? { ...h, quantity: newQuantity } : h);
                }
            });
        }
        
        const newTransaction = {
            type,
            stock: ticker,
            quantity: tradeQuantity,
            price: stockData.price,
            date: new Date().toISOString().split('T')[0],
        };

        setTransactions([newTransaction, ...transactions]);

        toast({
            title: `Trade Successful`,
            description: `You have successfully ${type === 'Buy' ? 'bought' : 'sold'} ${tradeQuantity} share(s) of ${ticker}.`,
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
              <div className="text-2xl font-bold">₹{portfolioValue.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
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
              <div className="text-2xl font-bold">₹{availableFunds.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-6">
             <Card>
              <CardHeader>
                <CardTitle>Simulate a Trade</CardTitle>
                 <CardDescription>
                  Search for a stock to buy and add to your portfolio.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row items-center gap-4">
                 <div className="relative flex-grow w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        placeholder="Search for a stock to buy (e.g., INFY, SBIN)" 
                        className="pl-10" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                 </div>
                 <Button onClick={handleSearch} className='w-full sm:w-auto'>
                    Search Stock
                 </Button>
              </CardContent>
              {selectedStock && (
                <CardFooter className='flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between'>
                    <div>
                        <h3 className='font-bold text-lg'>{selectedStock.ticker} - {selectedStock.name}</h3>
                        <p className='text-2xl font-bold'>₹{selectedStock.price.toFixed(2)}</p>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <TrendingUp className="mr-2 h-5 w-5" /> Buy
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Buy {selectedStock.ticker}</DialogTitle>
                                <DialogDescription>
                                    Current Price: ₹{selectedStock.price.toFixed(2)}. Available Funds: ₹{availableFunds.toFixed(2)}
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
                                <div className='text-center font-bold text-lg'>
                                    Total Cost: ₹{(selectedStock.price * quantity).toFixed(2)}
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" onClick={() => handleTrade('Buy', selectedStock.ticker, quantity)}>Confirm Purchase</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
              )}
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Your Holdings</CardTitle>
                    <CardDescription>
                    All the stocks you currently own in your virtual portfolio.
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
                        <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {holdings.length > 0 ? holdings.map((holding) => {
                            const stockData = mockStockData[holding.ticker];
                            const marketValue = stockData.price * holding.quantity;
                            return (
                                <TableRow key={holding.ticker}>
                                    <TableCell className="font-medium">{holding.ticker}</TableCell>
                                    <TableCell>{holding.quantity}</TableCell>
                                    <TableCell>₹{holding.avgPrice.toFixed(2)}</TableCell>
                                    <TableCell>₹{stockData.price.toFixed(2)}</TableCell>
                                    <TableCell>₹{marketValue.toFixed(2)}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button size="icon" variant="outline" className='text-green-600 hover:text-green-600 hover:bg-green-500/10 border-green-600/50 hover:border-green-600'><PlusCircle className="h-4 w-4" /></Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Buy more {holding.ticker}</DialogTitle>
                                                </DialogHeader>
                                                <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor={`quantity-buy-${holding.ticker}`} className="text-right">Quantity</Label>
                                                        <Input id={`quantity-buy-${holding.ticker}`} type="number" defaultValue={1} min={1} className="col-span-3" onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}/>
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <DialogClose asChild><Button type="button" onClick={() => handleTrade('Buy', holding.ticker, quantity)}>Confirm Purchase</Button></DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button size="icon" variant="outline" className='text-red-600 hover:text-red-600 hover:bg-red-500/10 border-red-600/50 hover:border-red-600'><MinusCircle className="h-4 w-4" /></Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Sell {holding.ticker}</DialogTitle>
                                                </DialogHeader>
                                                 <div className="grid gap-4 py-4">
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label htmlFor={`quantity-sell-${holding.ticker}`} className="text-right">Quantity</Label>
                                                        <Input id={`quantity-sell-${holding.ticker}`} type="number" defaultValue={1} min={1} max={holding.quantity} className="col-span-3" onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}/>
                                                    </div>
                                                </div>
                                                <DialogFooter>
                                                    <DialogClose asChild><Button variant="destructive" type="button" onClick={() => handleTrade('Sell', holding.ticker, quantity)}>Confirm Sale</Button></DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </TableCell>
                                </TableRow>
                            );
                        }) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center text-muted-foreground">
                                You don't own any stocks yet. Use the search above to buy some!
                            </TableCell>
                        </TableRow>
                        )}
                    </TableBody>
                    </Table>
                </CardContent>
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
                    {transactions.length > 0 ? transactions.slice(0, 5).map((tx, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Badge
                            className={
                              tx.type === 'Buy'
                                ? 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-700'
                                : 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700'
                            }
                            variant="outline"
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
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{selectedStock ? `${selectedStock.ticker} Performance` : "Stock Performance"}</CardTitle>
              <CardDescription>
                {selectedStock ? `7-day virtual performance data for ${selectedStock.ticker}.` : "Search for a stock to see its performance."}
              </CardDescription>
            </CardHeader>
            <CardContent>
                {selectedStock ? (
                <div className="h-80 w-full">
                  <ChartContainer config={chartConfig}>
                    <AreaChart
                      accessibilityLayer
                      data={selectedStock.chart}
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
                        domain={['dataMin - 20', 'dataMax + 20']}
                        tickFormatter={(value) => `₹${value}`}
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
                </div>
                ) : (
                    <div className='h-80 flex flex-col items-center justify-center text-center text-muted-foreground bg-secondary/50 rounded-lg'>
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
}

    