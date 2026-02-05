import { useEffect, useState } from 'react';
import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

interface MetricProps {
  label: string;
  value: number;
  suffix: string;
  progress: number;
  delay: number;
}

const AnimatedMetric = ({ label, value, suffix, progress, delay }: MetricProps) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const duration = 1500;
      const steps = 60;
      const increment = value / steps;
      const progressIncrement = progress / steps;
      let current = 0;
      let prog = 0;

      const interval = setInterval(() => {
        current += increment;
        prog += progressIncrement;
        if (current >= value) {
          setCurrentValue(value);
          setCurrentProgress(progress);
          clearInterval(interval);
        } else {
          setCurrentValue(Math.floor(current));
          setCurrentProgress(prog);
        }
      }, duration / steps);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, progress, delay]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-muted-foreground">{label}</span>
        <span className="text-lg font-bold text-primary">
          +{currentValue}{suffix}
        </span>
      </div>
      <Progress value={currentProgress} className="h-2" />
    </div>
  );
};

export const GrowthMetricsCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <Card className="bg-white shadow-xl border border-border/50 w-full max-w-sm rounded-2xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base font-medium text-muted-foreground">Growth Metrics</CardTitle>
            <TrendingUp className="h-5 w-5 text-accent" />
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <AnimatedMetric 
            label="Revenue Growth" 
            value={250} 
            suffix="%" 
            progress={85}
            delay={500}
          />
          <AnimatedMetric 
            label="ROAS Improvement" 
            value={180} 
            suffix="%" 
            progress={15}
            delay={800}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};