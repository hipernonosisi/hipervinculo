import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { supabase } from '@/integrations/supabase/client';
import { ImageIcon, Play, ShoppingCart, DollarSign, TrendingUp, Award } from 'lucide-react';

interface TopAd {
  adId: string;
  adName: string;
  campaignName: string;
  adStatus: string;
  spend: number;
  purchases: number;
  revenue: number;
  cpa: number;
  roas: number;
  impressions: number;
  clicks: number;
  creative: {
    creativeTitle: string;
    creativeBody: string;
    thumbnailUrl: string;
    imageUrl: string;
    isVideo: boolean;
  };
  weightedScore?: number;
}

interface TopCreativesSectionProps {
  adAccountId: string;
  since: string;
  until: string;
  topN?: number;
}

export function TopCreativesSection({ adAccountId, since, until, topN = 10 }: TopCreativesSectionProps) {
  const [topAds, setTopAds] = useState<TopAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalAnalyzed, setTotalAnalyzed] = useState(0);

  useEffect(() => {
    async function fetchTopCreatives() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: fnError } = await supabase.functions.invoke('meta-ads-top-creatives', {
          body: { adAccountId, since, until, topN },
        });

        if (fnError) throw fnError;
        if (data?.error) throw new Error(data.error);

        setTopAds(data.topAds || []);
        setTotalAnalyzed(data.totalAdsAnalyzed || 0);
      } catch (err: any) {
        console.error('Error fetching top creatives:', err);
        setError(err.message || 'Error al cargar creativos');
      } finally {
        setLoading(false);
      }
    }

    fetchTopCreatives();
  }, [adAccountId, since, until, topN]);

  const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4" style={{ color: '#2d4a2d' }}>🏆 Top Creativos</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {Array.from({ length: topN }).map((_, i) => (
            <Card key={i} className="border-0 shadow-md rounded-2xl overflow-hidden">
              <Skeleton className="w-full aspect-square" />
              <CardContent className="p-3 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-4" style={{ color: '#2d4a2d' }}>🏆 Top Creativos</h2>
        <Card className="border-0 shadow-md rounded-2xl">
          <CardContent className="p-6 text-center text-muted-foreground">
            <p>No se pudieron cargar los creativos: {error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (topAds.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold" style={{ color: '#2d4a2d' }}>🏆 Top {topAds.length} Creativos</h2>
        <span className="text-xs text-muted-foreground">
          De {totalAnalyzed} ads con compras · {since} a {until}
        </span>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {topAds.map((ad, index) => {
          // Prefer full-size imageUrl, use thumbnailUrl only as fallback
          const imageUrl = ad.creative.imageUrl || ad.creative.thumbnailUrl;
          // Try to get higher resolution by appending width parameter for Meta CDN
          const hiResUrl = imageUrl && imageUrl.includes('fbcdn') 
            ? `${imageUrl}${imageUrl.includes('?') ? '&' : '?'}width=600` 
            : imageUrl;
          
          const statusColor = ad.adStatus === 'ACTIVE' ? '#8BC34A' : ad.adStatus === 'PAUSED' ? '#FFC107' : '#9E9E9E';
          const statusLabel = ad.adStatus === 'ACTIVE' ? 'Activo' : ad.adStatus === 'PAUSED' ? 'Pausado' : ad.adStatus;

          return (
            <Card key={ad.adId} className="border-0 shadow-md rounded-2xl overflow-hidden group hover:shadow-lg transition-shadow">
              {/* Rank badge */}
              <div className="relative">
                <div className="absolute top-2 left-2 z-10">
                  <Badge 
                    className="rounded-full font-bold text-white shadow-md"
                    style={{ backgroundColor: index < 3 ? '#8BC34A' : '#2d4a2d' }}
                  >
                    #{index + 1}
                  </Badge>
                </div>
                <div className="absolute top-2 right-2 z-10 flex gap-1">
                  {ad.creative.isVideo && (
                    <Badge className="rounded-full bg-black/60 text-white border-0">
                      <Play className="w-3 h-3 mr-1" /> Video
                    </Badge>
                  )}
                  <Badge 
                    className="rounded-full text-white border-0 text-[10px]"
                    style={{ backgroundColor: statusColor }}
                  >
                    {statusLabel}
                  </Badge>
                </div>
                {/* Creative image - higher quality */}
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  {hiResUrl ? (
                    <img
                      src={hiResUrl}
                      alt={ad.adName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        // Fallback: try original URL without width param
                        if (img.src !== imageUrl && imageUrl) {
                          img.src = imageUrl;
                        } else {
                          img.style.display = 'none';
                          img.nextElementSibling?.classList.remove('hidden');
                        }
                      }}
                    />
                  ) : null}
                  <div className={`${hiResUrl ? 'hidden' : ''} w-full h-full flex items-center justify-center bg-gray-100`}>
                    <ImageIcon className="w-12 h-12 text-gray-300" />
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <CardContent className="p-3">
                <p className="text-xs font-semibold truncate mb-0.5" style={{ color: '#2d4a2d' }} title={ad.adName}>
                  {ad.adName}
                </p>
                <p className="text-[10px] text-muted-foreground truncate mb-2" title={ad.campaignName}>
                  📁 {ad.campaignName}
                </p>
                
                <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                  <div className="flex items-center gap-1">
                    <ShoppingCart className="w-3 h-3" style={{ color: '#8BC34A' }} />
                    <span className="text-xs font-bold" style={{ color: '#2d4a2d' }}>
                      {ad.purchases}
                    </span>
                    <span className="text-[10px] text-muted-foreground">pedidos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" style={{ color: '#8BC34A' }} />
                    <span className="text-xs font-bold" style={{ color: '#2d4a2d' }}>
                      ${fmt(ad.cpa)}
                    </span>
                    <span className="text-[10px] text-muted-foreground">CPA</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" style={{ color: '#8BC34A' }} />
                    <Badge 
                      variant="secondary" 
                      className="rounded-full text-[10px] px-1.5 py-0"
                      style={{
                        backgroundColor: ad.roas >= 3 ? '#e8f5e9' : ad.roas >= 2 ? '#fff8e1' : '#fce4ec',
                        color: ad.roas >= 3 ? '#2e7d32' : ad.roas >= 2 ? '#f57f17' : '#c62828',
                      }}
                    >
                      {ad.roas.toFixed(2)}x
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3 text-muted-foreground" />
                    <span className="text-[10px] text-muted-foreground">
                      ${fmt(ad.spend)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
