import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import {
  ImageIcon, Play, ShoppingCart, DollarSign, TrendingUp,
  RefreshCw, Search, Eye, MousePointerClick
} from 'lucide-react';

interface AdAccount {
  id: string;
  account_id: string;
  name: string;
  currency: string;
}

interface TopAd {
  adId: string;
  adName: string;
  campaignName: string;
  adsetName: string;
  spend: number;
  purchases: number;
  revenue: number;
  cpa: number;
  roas: number;
  impressions: number;
  clicks: number;
  ctr: number;
  creative: {
    creativeTitle: string;
    creativeBody: string;
    thumbnailUrl: string;
    imageUrl: string;
    isVideo: boolean;
  };
  weightedScore?: number;
  purchaseScore?: number;
  cpaScore?: number;
}

export function TopCreativesDashboard() {
  const [accounts, setAccounts] = useState<AdAccount[]>([]);
  const [selectedAccount, setSelectedAccount] = useState<string>('');
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [topAds, setTopAds] = useState<TopAd[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalAnalyzed, setTotalAnalyzed] = useState(0);
  const [since, setSince] = useState('2025-01-01');
  const [until, setUntil] = useState('2025-12-31');
  const [topN, setTopN] = useState(10);
  const [selectedAd, setSelectedAd] = useState<TopAd | null>(null);

  // Fetch ad accounts
  useEffect(() => {
    async function fetchAccounts() {
      setLoadingAccounts(true);
      try {
        const { data, error: fnError } = await supabase.functions.invoke('meta-ads', {
          body: { action: 'list_accounts' },
        });
        if (fnError) throw fnError;
        if (data?.data) {
          setAccounts(data.data);
          if (data.data.length > 0) {
            setSelectedAccount(data.data[0].account_id);
          }
        }
      } catch (err: any) {
        console.error('Error fetching accounts:', err);
      } finally {
        setLoadingAccounts(false);
      }
    }
    fetchAccounts();
  }, []);

  const fetchTopCreatives = useCallback(async () => {
    if (!selectedAccount) return;
    setLoading(true);
    setError(null);
    setSelectedAd(null);
    try {
      const { data, error: fnError } = await supabase.functions.invoke('meta-ads-top-creatives', {
        body: { adAccountId: selectedAccount, since, until, topN },
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
  }, [selectedAccount, since, until, topN]);

  const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtInt = (n: number) => n.toLocaleString('en-US');

  return (
    <div className="space-y-6">
      {/* Controls */}
      <Card className="border-0 shadow-lg rounded-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold" style={{ color: '#2d4a2d' }}>
            🏆 Top Creatives Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Account selector */}
            <div className="lg:col-span-2">
              <label className="text-xs text-muted-foreground mb-1 block">Cuenta de Anuncios</label>
              {loadingAccounts ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                  <SelectTrigger className="rounded-lg">
                    <SelectValue placeholder="Selecciona una cuenta" />
                  </SelectTrigger>
                  <SelectContent>
                    {accounts.map((acc) => (
                      <SelectItem key={acc.account_id} value={acc.account_id}>
                        {acc.name} ({acc.currency})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>

            {/* Date range */}
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Desde</label>
              <Input
                type="date"
                value={since}
                onChange={(e) => setSince(e.target.value)}
                className="rounded-lg"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Hasta</label>
              <Input
                type="date"
                value={until}
                onChange={(e) => setUntil(e.target.value)}
                className="rounded-lg"
              />
            </div>

            {/* Action */}
            <div className="flex items-end">
              <Button
                onClick={fetchTopCreatives}
                disabled={loading || !selectedAccount}
                className="w-full gap-2 rounded-lg text-white"
                style={{ backgroundColor: '#8BC34A' }}
              >
                {loading ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
                {loading ? 'Analizando...' : 'Analizar'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error */}
      {error && (
        <Card className="border-0 shadow-md rounded-2xl border-l-4" style={{ borderLeftColor: '#c62828' }}>
          <CardContent className="p-4 text-sm text-red-700">{error}</CardContent>
        </Card>
      )}

      {/* Results */}
      {topAds.length > 0 && (
        <>
          {/* Summary */}
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Top {topAds.length} de {totalAnalyzed} ads con compras · {since} a {until}
            </p>
            <Badge variant="secondary" className="rounded-full">
              {accounts.find(a => a.account_id === selectedAccount)?.name}
            </Badge>
          </div>

          {/* Creative Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {topAds.map((ad, index) => {
              const imageUrl = ad.creative.imageUrl || ad.creative.thumbnailUrl;
              const isSelected = selectedAd?.adId === ad.adId;
              return (
                <Card
                  key={ad.adId}
                  className={`border-0 shadow-md rounded-2xl overflow-hidden cursor-pointer transition-all hover:shadow-lg ${isSelected ? 'ring-2 ring-offset-2 ring-[#8BC34A]' : ''}`}
                  onClick={() => setSelectedAd(isSelected ? null : ad)}
                >
                  <div className="relative">
                    <div className="absolute top-2 left-2 z-10">
                      <Badge
                        className="rounded-full font-bold text-white shadow-md"
                        style={{ backgroundColor: index < 3 ? '#8BC34A' : '#2d4a2d' }}
                      >
                        #{index + 1}
                      </Badge>
                    </div>
                    {ad.creative.isVideo && (
                      <div className="absolute top-2 right-2 z-10">
                        <Badge className="rounded-full bg-black/60 text-white border-0">
                          <Play className="w-3 h-3 mr-1" /> Video
                        </Badge>
                      </div>
                    )}
                    <div className="aspect-square bg-gray-100 overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={ad.adName}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <div className={`${imageUrl ? 'hidden' : ''} w-full h-full flex items-center justify-center bg-gray-100`}>
                        <ImageIcon className="w-12 h-12 text-gray-300" />
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-3">
                    <p className="text-xs font-semibold truncate mb-2" style={{ color: '#2d4a2d' }} title={ad.adName}>
                      {ad.adName}
                    </p>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                      <div className="flex items-center gap-1">
                        <ShoppingCart className="w-3 h-3" style={{ color: '#8BC34A' }} />
                        <span className="text-xs font-bold" style={{ color: '#2d4a2d' }}>{ad.purchases}</span>
                        <span className="text-[10px] text-muted-foreground">pedidos</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" style={{ color: '#8BC34A' }} />
                        <span className="text-xs font-bold" style={{ color: '#2d4a2d' }}>${fmt(ad.cpa)}</span>
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
                        <span className="text-[10px] text-muted-foreground">${fmt(ad.spend)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Detail Panel */}
          {selectedAd && (
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="pb-2" style={{ backgroundColor: '#2d4a2d' }}>
                <CardTitle className="text-white text-sm font-medium flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Detalle del Creativo
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Image */}
                  <div className="lg:col-span-1">
                    <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                      {(selectedAd.creative.imageUrl || selectedAd.creative.thumbnailUrl) ? (
                        <img
                          src={selectedAd.creative.imageUrl || selectedAd.creative.thumbnailUrl}
                          alt={selectedAd.adName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-16 h-16 text-gray-300" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <h3 className="font-bold text-lg" style={{ color: '#2d4a2d' }}>{selectedAd.adName}</h3>
                      <p className="text-sm text-muted-foreground">{selectedAd.campaignName}</p>
                      <p className="text-xs text-muted-foreground">{selectedAd.adsetName}</p>
                    </div>

                    {selectedAd.creative.creativeBody && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">Copy del Anuncio</p>
                        <p className="text-sm">{selectedAd.creative.creativeBody}</p>
                      </div>
                    )}

                    {/* KPIs Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <ShoppingCart className="w-4 h-4 mx-auto mb-1" style={{ color: '#8BC34A' }} />
                        <p className="text-lg font-bold" style={{ color: '#2d4a2d' }}>{selectedAd.purchases}</p>
                        <p className="text-[10px] text-muted-foreground">Pedidos</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <DollarSign className="w-4 h-4 mx-auto mb-1" style={{ color: '#8BC34A' }} />
                        <p className="text-lg font-bold" style={{ color: '#2d4a2d' }}>${fmt(selectedAd.cpa)}</p>
                        <p className="text-[10px] text-muted-foreground">CPA</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <TrendingUp className="w-4 h-4 mx-auto mb-1" style={{ color: '#8BC34A' }} />
                        <p className="text-lg font-bold" style={{ color: '#2d4a2d' }}>{selectedAd.roas.toFixed(2)}x</p>
                        <p className="text-[10px] text-muted-foreground">ROAS</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <DollarSign className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-lg font-bold" style={{ color: '#2d4a2d' }}>${fmt(selectedAd.revenue)}</p>
                        <p className="text-[10px] text-muted-foreground">Revenue</p>
                      </div>
                    </div>

                    {/* Secondary KPIs */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Impresiones:</span>
                        <span className="font-medium">{fmtInt(selectedAd.impressions)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MousePointerClick className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Clicks:</span>
                        <span className="font-medium">{fmtInt(selectedAd.clicks)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Inversión:</span>
                        <span className="font-medium">${fmt(selectedAd.spend)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      {/* Loading state */}
      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {Array.from({ length: topN }).map((_, i) => (
            <Card key={i} className="border-0 shadow-md rounded-2xl overflow-hidden">
              <Skeleton className="w-full aspect-square" />
              <CardContent className="p-3 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && topAds.length === 0 && !error && selectedAccount && (
        <Card className="border-0 shadow-md rounded-2xl">
          <CardContent className="p-12 text-center">
            <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Selecciona una cuenta y haz clic en "Analizar" para ver los top creativos</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
