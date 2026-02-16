import { useState, useCallback } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Download, CheckCircle, XCircle, TrendingUp, DollarSign, ShoppingCart, BarChart3, Copy, Check, Users, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { hesacoreReport } from './data/hesacoreReportData';
import { HesacorePDFDocument } from './pdf/HesacorePDFReport';
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

interface HesacoreReportProps {
  isPublic?: boolean;
}

export function HesacoreReport({ isPublic = false }: HesacoreReportProps) {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [copied, setCopied] = useState(false);
  const report = hesacoreReport;

  const chartData = report.monthlyData.map(m => ({
    name: m.monthShort,
    'Inversión': Math.round(m.spend),
    'Revenue': Math.round(m.revenue),
    'ROAS': m.roas,
    'Pedidos': m.purchases,
  }));

  const exportToPDF = useCallback(async () => {
    setIsExporting(true);
    try {
      const logoBase64 = await imageToBase64(logoHipervinculo);
      const blob = await pdf(
        <HesacorePDFDocument report={report} logoBase64={logoBase64} />
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `reporte-meta-ads-hesacore-2025.pdf`;
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
    const url = `${window.location.origin}/report/hesacore`;
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

        {/* Secondary KPIs */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <Card className="border-0 shadow-md rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4" style={{ color: '#8BC34A' }} />
                <span className="text-xs text-muted-foreground">Leads Generados</span>
              </div>
              <p className="text-lg font-bold" style={{ color: '#2d4a2d' }}>
                {report.yearTotals.totalLeads.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingBag className="w-4 h-4" style={{ color: '#8BC34A' }} />
                <span className="text-xs text-muted-foreground">Add to Cart</span>
              </div>
              <p className="text-lg font-bold" style={{ color: '#2d4a2d' }}>
                {report.yearTotals.totalAddToCart.toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4" style={{ color: '#8BC34A' }} />
                <span className="text-xs text-muted-foreground">CPA Promedio</span>
              </div>
              <p className="text-lg font-bold" style={{ color: '#2d4a2d' }}>
                ${report.yearTotals.avgCpa.toFixed(2)}
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
                    <TableHead className="text-right font-semibold">Leads</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {report.monthlyData.map((m, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{m.month}</TableCell>
                      <TableCell className="text-right">${fmt(m.spend)}</TableCell>
                      <TableCell className="text-right">{m.purchases}</TableCell>
                      <TableCell className="text-right">${fmt(m.revenue)}</TableCell>
                      <TableCell className="text-right">
                        <Badge 
                          variant="secondary" 
                          className="rounded-full font-mono"
                          style={{ 
                            backgroundColor: m.roas >= 3 ? '#e8f5e9' : m.roas >= 2 ? '#fff8e1' : '#fce4ec',
                            color: m.roas >= 3 ? '#2e7d32' : m.roas >= 2 ? '#f57f17' : '#c62828'
                          }}
                        >
                          {m.roas.toFixed(2)}x
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">${fmt(m.cpa)}</TableCell>
                      <TableCell className="text-right">{m.leads}</TableCell>
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
                    <TableCell className="text-right">{report.yearTotals.totalLeads}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

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
                <XCircle className="w-6 h-6 text-yellow-600" />
                <h3 className="font-semibold" style={{ color: '#2d4a2d' }}>Conversion API</h3>
              </div>
              <Badge className="rounded-full mb-2" style={{ backgroundColor: '#fff8e1', color: '#f57f17' }}>No activo</Badge>
              <p className="text-sm text-muted-foreground">{report.capiStatus.note}</p>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground pt-4 border-t">
          Reporte generado por Hipervínculo · hipervinculo.net · {report.generatedDate}
        </div>
      </div>
    </div>
  );
}
