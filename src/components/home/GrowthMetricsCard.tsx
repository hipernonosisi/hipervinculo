import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { motion } from 'framer-motion';

export const GrowthMetricsCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <Card className="bg-white shadow-xl border-0 w-full min-w-[400px] rounded-2xl overflow-hidden">
        <CardHeader className="pb-4 pt-8 px-8">
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-lg font-semibold text-foreground">Growth Metrics</span>
            <motion.div
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            >
              <TrendingUp className="h-6 w-6" style={{ color: '#8BC34A' }} />
            </motion.div>
          </motion.div>
        </CardHeader>
        
        <CardContent className="space-y-5 pt-2 pb-10 px-8">
          <motion.div 
            className="space-y-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <span className="text-base text-muted-foreground">Revenue Growth</span>
            <motion.div 
              className="text-[44px] font-extrabold leading-tight"
              style={{ color: '#8BC34A' }}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 150, damping: 12 }}
            >
              +250%
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="space-y-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75, duration: 0.5 }}
          >
            <span className="text-base text-muted-foreground">ROAS Improvement</span>
            <motion.div 
              className="text-[44px] font-extrabold leading-tight"
              style={{ color: '#8BC34A' }}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1, type: "spring", stiffness: 150, damping: 12 }}
            >
              +180%
            </motion.div>
          </motion.div>

          <motion.div 
            className="space-y-1"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <span className="text-base text-muted-foreground">Qualified Leads</span>
            <motion.div 
              className="text-[44px] font-extrabold leading-tight"
              style={{ color: '#8BC34A' }}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.2, type: "spring", stiffness: 150, damping: 12 }}
            >
              +320%
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
