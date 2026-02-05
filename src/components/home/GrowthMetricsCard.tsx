import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { motion } from 'framer-motion';

export const GrowthMetricsCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Card className="bg-white shadow-xl border border-border/30 w-full max-w-sm rounded-2xl">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Growth Metrics</span>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-2">
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">Revenue Growth</span>
            <div className="text-2xl font-bold text-accent">+250%</div>
          </div>
          <div className="space-y-1">
            <span className="text-sm text-muted-foreground">ROAS Improvement</span>
            <div className="text-2xl font-bold text-accent">+180%</div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};