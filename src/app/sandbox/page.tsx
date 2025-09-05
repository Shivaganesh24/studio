"use client";
import { useState, useMemo } from "react";
import MainLayout from "@/components/main-layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  Search,
  AlertCircle,
  PlusCircle,
  MinusCircle,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

// ✅ Directly use recharts
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// 🔹 Mock stock data
const mockStockData: {
  [key: string]: { name: string; price: number; chart: any[] };
} = {
  RELIANCE: {
    name: "Reliance Industries",
    price: 2890.1,
    chart: [
      { date: "24-07", value: 2850 },
      { date: "25-07", value: 2865 },
      { date: "26-07", value: 2870 },
      { date: "27-07", value: 2880 },
      { date: "28-07", value: 2875 },
      { date: "29-07", value: 2890 },
      { date: "30-07", value: 2905 },
    ],
  },
  TCS: {
    name: "Tata Consultancy Services",
    price: 3825.5,
    chart: [
      { date: "24-07", value: 3800 },
      { date: "25-07", value: 3810 },
      { date: "26-07", value: 3805 },
      { date: "27-07", value: 3815 },
      { date: "28-07", value: 3820 },
      { date: "29-07", value: 3825 },
      { date: "30-07", value: 3830 },
    ],
  },
  HDFCBANK: {
    name: "HDFC Bank Ltd.",
    price: 1660.0,
    chart: [
      { date: "24-07", value: 1670 },
      { date: "25-07", value: 1665 },
      { date: "26-07", value: 1668 },
      { date: "27-07", value: 1662 },
      { date: "28-07", value: 1655 },
      { date: "29-07", value: 1660 },
      { date: "30-07", value: 1664 },
    ],
  },
  INFY: {
    name: "Infosys Ltd.",
    price: 1680.0,
    chart: [
      { date: "24-07", value: 1640 },
      { date: "25-07", value: 1645 },
      { date: "26-07", value: 1650 },
      { date: "27-07", value: 1670 },
      { date: "28-07", value: 1665 },
      { date: "29-07", value: 1680 },
      { date: "30-07", value: 1690 },
    ],
  },
  SBIN: {
    name: "State Bank of India",
    price: 830.45,
    chart: [
      { date: "24-07", value: 820 },
      { date: "25-07", value: 825 },
      { date: "26-07", value: 822 },
      { date: "27-07", value: 828 },
      { date: "28-07", value: 835 },
      { date: "29-07", value: 830 },
      { date: "30-07", value: 832 },
    ],
  },
};

type Holding = {
  ticker: string;
  quantity: number;
  avgPrice: number;
};

export default function SandboxPage() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStock, setSelectedStock] = useState<{
    ticker: string;
    price: number;
    name: string;
    chart: any[];
  } | null>(null);
  const [quantity, setQuantity] = useState(1);

  const [holdings, setHoldings] = useState<Holding[]>([
    { ticker: "INFY", quantity: 20, avgPrice: 1650.0 },
    { ticker: "HDFCBANK", quantity: 15, avgPrice: 1670.5 },
  ]);
  const [availableFunds, setAvailableFunds] = useState(24200.75);
  const [transactions, setTransactions] = useState([
    {
      type: "Buy",
      stock: "INFY",
      quantity: 20,
      price: 1650.0,
      date: "2024-07-26",
    },
    {
      type: "Buy",
      stock: "HDFCBANK",
      quantity: 15,
      price: 1670.5,
      date: "2024-07-27",
    },
  ]);

  const portfolioValue = useMemo(() => {
    return holdings.reduce((total, holding) => {
      const currentPrice =
        mockStockData[holding.ticker]?.price || holding.avgPrice;
      return total + holding.quantity * currentPrice;
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
        variant: "destructive",
        title: "Stock not found",
        description: `No stock found with ticker "${searchTerm}".`,
      });
    }
  };

  const handleTrade = (
    type: "Buy" | "Sell",
    ticker: string,
    tradeQuantity: number
  ) => {
    const stockData = mockStockData[ticker];
    if (!stockData || tradeQuantity <= 0) return;

    const tradeValue = stockData.price * tradeQuantity;

    if (type === "Buy") {
      if (tradeValue > availableFunds) {
        toast({
          variant: "destructive",
          title: "Insufficient Funds",
          description: `You need ₹${tradeValue.toFixed(
            2
          )} to buy ${tradeQuantity} share(s).`,
        });
        return;
      }
      setAvailableFunds(availableFunds - tradeValue);
      setHoldings((prev) => {
        const existingHolding = prev.find((h) => h.ticker === ticker);
        if (existingHolding) {
          const totalQuantity = existingHolding.quantity + tradeQuantity;
          const newAvgPrice =
            (existingHolding.avgPrice * existingHolding.quantity +
              tradeValue) /
            totalQuantity;
          return prev.map((h) =>
            h.ticker === ticker
              ? { ...h, quantity: totalQuantity, avgPrice: newAvgPrice }
              : h
          );
        } else {
          return [
            ...prev,
            { ticker, quantity: tradeQuantity, avgPrice: stockData.price },
          ];
        }
      });
    } else {
      const holding = holdings.find((h) => h.ticker === ticker);
      if (!holding || tradeQuantity > holding.quantity) {
        toast({
          variant: "destructive",
          title: "Not enough shares",
          description: `You can't sell more ${ticker} shares than you own.`,
        });
        return;
      }
      setAvailableFunds(availableFunds + tradeValue);
      setHoldings((prev) => {
        const newQuantity = holding.quantity - tradeQuantity;
        if (newQuantity === 0) {
          return prev.filter((h) => h.ticker !== ticker);
        } else {
          return prev.map((h) =>
            h.ticker === ticker ? { ...h, quantity: newQuantity } : h
          );
        }
      });
    }

    const newTransaction = {
      type,
      stock: ticker,
      quantity: tradeQuantity,
      price: stockData.price,
      date: new Date().toISOString().split("T")[0],
    };
    setTransactions([newTransaction, ...transactions]);
    setQuantity(1);

    toast({
      title: "Trade Successful",
      description: `${type} ${tradeQuantity} ${ticker} @ ₹${stockData.price}`,
    });
  };

  return (
    <MainLayout>
      {/* ... all your cards & tables remain unchanged ... */}

      {/* Stock Performance Chart */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>
            {selectedStock
              ? `${selectedStock.ticker} Performance`
              : "Stock Performance"}
          </CardTitle>
          <CardDescription>
            {selectedStock
              ? `7-day performance data for ${selectedStock.ticker}`
              : "Search for a stock to see its performance."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedStock ? (
            <div className="h-80 w-full">
              <AreaChart
                data={selectedStock.chart}
                margin={{ left: -20, right: 20, top: 5, bottom: 0 }}
                width={600}
                height={300}
              >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  domain={["dataMin - 20", "dataMax + 20"]}
                  tickFormatter={(v) => `₹${v}`}
                />
                <Tooltip
                  formatter={(val: any) =>
                    `₹${Number(val).toLocaleString("en-IN")}`
                  }
                />
                <Area
                  dataKey="value"
                  type="monotone"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.2}
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
              </AreaChart>
            </div>
          ) : (
            <div className="h-80 flex flex-col items-center justify-center text-muted-foreground bg-secondary/50 rounded-lg">
              <AlertCircle className="w-10 h-10 mb-4" />
              <p>No stock selected.</p>
              <p className="text-xs">Use the search bar to find a stock.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </MainLayout>
  );
}
