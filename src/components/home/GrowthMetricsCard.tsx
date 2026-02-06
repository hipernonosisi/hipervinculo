import { TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { motion } from 'framer-motion';

export const GrowthMetricsCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* Animated color splash background */}
      <div className="absolute -inset-6 -z-10">
        {/* Green blob */}
        <motion.div
          className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-40 blur-3xl"
          style={{ backgroundColor: '#8BC34A' }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Dark green blob */}
        <motion.div
          className="absolute bottom-0 left-0 w-40 h-40 rounded-full opacity-30 blur-3xl"
          style={{ backgroundColor: '#2F4F2F' }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -15, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        {/* Lime accent blob */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full opacity-50 blur-2xl"
          style={{ backgroundColor: '#d4e5a2' }}
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <Card className="relative bg-white/95 backdrop-blur-sm shadow-2xl border border-border/20 w-full max-w-md rounded-3xl overflow-hidden">
        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-3xl p-[2px] -z-10">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/30 via-transparent to-primary/20" />
        </div>
        
        <CardHeader className="pb-4 pt-8 px-8">
          <motion.div 
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <span className="text-lg font-semibold text-foreground">Growth Metrics</span>
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <TrendingUp className="h-7 w-7 text-accent" />
            </motion.div>
          </motion.div>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-2 pb-8 px-8">
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <span className="text-base text-muted-foreground font-medium">Revenue Growth</span>
            <motion.div 
              className="text-5xl font-extrabold"
              style={{ color: '#8BC34A' }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
            >
              +250%
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <span className="text-base text-muted-foreground font-medium">ROAS Improvement</span>
            <motion.div 
              className="text-5xl font-extrabold"
              style={{ color: '#8BC34A' }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
            >
              +180%
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
