export function auditIdentityLabel(source: unknown, language: 'en' | 'es', companyLabel: string): string {
  return source === 'shopify-audit' ? (language === 'es' ? 'Nombre:' : 'Name:') : companyLabel;
}