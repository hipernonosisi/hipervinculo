import { useState, useCallback } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Download, CheckCircle, XCircle, TrendingUp, DollarSign, ShoppingCart, BarChart3, Share2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { lalenasFoodReport } from './data/lalenasFoodReportData';
import { LalenasFoodPDFDocument } from './pdf/LalenasFoodPDFReport';
import logoHipervinculo from '@/assets/logo-hipervinculo.png';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';

function imageToBase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(img, 0, 0);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = reject;
    img.src = url;
  });
}

interface LalenasFoodReportProps {
  isPublic?: boolean;
}

export function LalenasFoodReport({ isPublic = false }: LalenasFoodReportProps) {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const report = lalenasFoodReport;

  const chartData = report.monthlyData.map(m => ({
    name: m.monthShort,
    'Inversión': Math.round(m.totals.spend),
    'Revenue': Math.round(m.totals.revenue),
    'ROAS': m.totals.roas,
    'Pedidos': m.totals.purchases,
  }));

  const exportToPDF = useCallback(async () => {
    setIsExporting(true);
    try {
      const logoBase64 = await imageToBase64(logoHipervinculo);
      const blob = await pdf(
        <LalenasFoodPDFDocument report={report} logoBase64={logoBase64} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `reporte-meta-ads-lalenas-food-2025.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast({ title: 'PDF descargado', description: 'El reporte se ha descargado correctamente.' });
    } catch (error) {
      console.error('PDF export error:', error);
      toast({ title: 'Error', description: 'No se pudo generar el PDF.', variant: 'destructive' });
    } finally {
      setIsExporting(false);
    }
  }, [report, toast]);

  const copyLink = () => {
    const url = `${window.location.origin}/report/lalenas-food`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast({ title: 'Link copiado', description: 'El enlace del reporte ha sido copiado al portapapeles.' });
    setTimeout(() => setCopied(false), 2000);
  };

  const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className={`${isPublic ? 'min-h-screen bg-[#f8f9f5]' : ''}`}>
      <div className={`${isPublic ? 'max-w-6xl mx-auto px-4 py-8 sm:py-12' : 'p-4 sm:p-6'}`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <div className="bg-white p-3 rounded-xl shadow-sm">
              <img src={logoHipervinculo} alt="Hipervinculo" className="h-8 sm:h-10" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold" style={{ color: '#2d4a2d' }}>
                Reporte de Meta Ads
              </h1>
              <p className="text-sm text-muted-foreground">
                {report.clientName} &middot; {report.reportPeriod}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {!isPublic && (
              <Button variant="outline" size="sm" className="gap-2 rounded-full" onClick={copyLink}>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copiado' : 'Copiar Link'}
              </Button>
            )}
            <Button
              size="sm"
              className="gap-2 rounded-full text-white"
              style={{ backgroundColor: '#8BC34A' }}
              onClick={exportToPDF}
              disabled={isExporting}
            >
              <Download className="w-4 h-4" />
              {isExporting ? 'Generando...' : 'Descargar PDF'}
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 shadow-md rounded-2xl">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5" style={{ color: '#8BC34A' }} />
                <span className="text-xs text-muted-foreground">Inversión Total</span>
              </div>
              <p className="text-lg sm:text-2xl font-bold" style={{ color: '#2d4a2d' }}>
                ${fmt(report.yearTotals.totalSpend)}
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md rounded-2xl">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" style={{ color: '#8BC34A' }} />
                <span className="text-xs text-muted-foreground">Revenue Atribuido</span>
              </div>
              <p className="text-lg sm:text-2xl font-bold" style={{ color: '#2d4a2d' }}>
                ${fmt(report.yearTotals.totalRevenue)}
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md rounded-2xl">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-5 h-5" style={{ color: '#8BC34A' }} />
                <span className="text-xs text-muted-foreground">ROAS Promedio</span>
              </div>
              <p className="text-lg sm:text-2xl font-bold" style={{ color: '#2d4a2d' }}>
                {report.yearTotals.overallRoas.toFixed(2)}x
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md rounded-2xl">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart className="w-5 h-5" style={{ color: '#8BC34A' }} />
                <span className="text-xs text-muted-foreground">Pedidos Totales</span>
              </div>
              <p className="text-lg sm:text-2xl font-bold" style={{ color: '#2d4a2d' }}>
                {report.yearTotals.totalPurchases.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-md rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold" style={{ color: '#2d4a2d' }}>
                Inversión vs Revenue por Mes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" fontSize={11} />
                    <YAxis fontSize={11} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
                    <Legend />
                    <Bar dataKey="Inversión" fill="#2d4a2d" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Revenue" fill="#8BC34A" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md rounded-2xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold" style={{ color: '#2d4a2d' }}>
                ROAS y Pedidos por Mes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" fontSize={11} />
                    <YAxis yAxisId="left" fontSize={11} />
                    <YAxis yAxisId="right" orientation="right" fontSize={11} />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="ROAS" stroke="#8BC34A" strokeWidth={2} dot={{ fill: '#8BC34A' }} />
                    <Line yAxisId="right" type="monotone" dataKey="Pedidos" stroke="#2d4a2d" strokeWidth={2} dot={{ fill: '#2d4a2d' }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Detail Table */}
        <Card className="border-0 shadow-md rounded-2xl mb-8 overflow-hidden">
          <CardHeader>
            <CardTitle className="text-base font-semibold" style={{ color: '#2d4a2d' }}>
              Desglose Mensual — Todas las Campañas
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Mes</TableHead>
                    <TableHead className="text-right font-semibold">Inversión</TableHead>
                    <TableHead className="text-right font-semibold">Compras</TableHead>
                    <TableHead className="text-right font-semibold">Revenue</TableHead>
                    <TableHead className="text-right font-semibold">ROAS</TableHead>
                    <TableHead className="text-right font-semibold">CPA</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {report.monthlyData.map((m, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{m.month}</TableCell>
                      <TableCell className="text-right">${fmt(m.totals.spend)}</TableCell>
                      <TableCell className="text-right">{m.totals.purchases}</TableCell>
                      <TableCell className="text-right">${fmt(m.totals.revenue)}</TableCell>
                      <TableCell className="text-right">
                        <Badge 
                          variant="secondary" 
                          className="rounded-full font-mono"
                          style={{ 
                            backgroundColor: m.totals.roas >= 3 ? '#e8f5e9' : m.totals.roas >= 2 ? '#fff8e1' : '#fce4ec',
                            color: m.totals.roas >= 3 ? '#2e7d32' : m.totals.roas >= 2 ? '#f57f17' : '#c62828'
                          }}
                        >
                          {m.totals.roas.toFixed(2)}x
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">${fmt(m.totals.cpa)}</TableCell>
                    </TableRow>
                  ))}
                  {/* Totals row */}
                  <TableRow className="bg-gray-50 font-bold">
                    <TableCell>Total 2025</TableCell>
                    <TableCell className="text-right">${fmt(report.yearTotals.totalSpend)}</TableCell>
                    <TableCell className="text-right">{report.yearTotals.totalPurchases}</TableCell>
                    <TableCell className="text-right">${fmt(report.yearTotals.totalRevenue)}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant="secondary" className="rounded-full font-mono" style={{ backgroundColor: '#e8f5e9', color: '#2e7d32' }}>
                        {report.yearTotals.overallRoas.toFixed(2)}x
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">${fmt(report.yearTotals.avgCpa)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Campaign Breakdown */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-0 shadow-md rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-base font-semibold" style={{ color: '#2d4a2d' }}>
                Retargeting Campaign
              </CardTitle>
              <p className="text-xs text-muted-foreground">Hipervinculo - Sales - Retargeting</p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Mes</TableHead>
                      <TableHead className="text-right">Inversión</TableHead>
                      <TableHead className="text-right">Compras</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">ROAS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.monthlyData.map((m, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium text-sm">{m.monthShort}</TableCell>
                        <TableCell className="text-right text-sm">${fmt(m.retargeting.spend)}</TableCell>
                        <TableCell className="text-right text-sm">{m.retargeting.purchases}</TableCell>
                        <TableCell className="text-right text-sm">${fmt(m.retargeting.revenue)}</TableCell>
                        <TableCell className="text-right text-sm">{m.retargeting.roas.toFixed(2)}x</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md rounded-2xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-base font-semibold" style={{ color: '#2d4a2d' }}>
                Advantage+ Shopping Campaign
              </CardTitle>
              <p className="text-xs text-muted-foreground">BOF - Sales - Dynamic Catalog</p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      <TableHead>Mes</TableHead>
                      <TableHead className="text-right">Inversión</TableHead>
                      <TableHead className="text-right">Compras</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">ROAS</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {report.monthlyData.map((m, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium text-sm">{m.monthShort}</TableCell>
                        <TableCell className="text-right text-sm">${fmt(m.advantagePlus.spend)}</TableCell>
                        <TableCell className="text-right text-sm">{m.advantagePlus.purchases}</TableCell>
                        <TableCell className="text-right text-sm">${fmt(m.advantagePlus.revenue)}</TableCell>
                        <TableCell className="text-right text-sm">{m.advantagePlus.roas.toFixed(2)}x</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Cards */}
        <h2 className="text-lg font-bold mb-4" style={{ color: '#2d4a2d' }}>Estado de Integraciones</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <Card className="border-0 shadow-md rounded-2xl">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold" style={{ color: '#2d4a2d' }}>Meta Pixel</h3>
              </div>
              <Badge className="rounded-full mb-2" style={{ backgroundColor: '#e8f5e9', color: '#2e7d32' }}>Activo</Badge>
              <p className="text-sm text-muted-foreground">{report.pixelStatus.note}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md rounded-2xl">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold" style={{ color: '#2d4a2d' }}>Shopify + Meta</h3>
              </div>
              <Badge className="rounded-full mb-2" style={{ backgroundColor: '#e8f5e9', color: '#2e7d32' }}>Conectado</Badge>
              <p className="text-sm text-muted-foreground">{report.shopifyConnection.note}</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md rounded-2xl">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <XCircle className="w-6 h-6 text-amber-500" />
                <h3 className="font-semibold" style={{ color: '#2d4a2d' }}>Conversion API</h3>
              </div>
              <Badge className="rounded-full mb-2" style={{ backgroundColor: '#fff8e1', color: '#f57f17' }}>No activo</Badge>
              <p className="text-sm text-muted-foreground">{report.capiStatus.note}</p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center py-6 border-t">
          <div className="flex items-center justify-center gap-3 mb-2">
            <img src={logoHipervinculo} alt="Hipervinculo" className="h-6" />
          </div>
          <p className="text-xs text-muted-foreground">
            Reporte generado por Hipervinculo &middot; {report.generatedDate}
          </p>
          <p className="text-xs text-muted-foreground">
            hipervinculo.com &middot; hola@hipervinculo.com
          </p>
        </div>
      </div>
    </div>
  );
}
