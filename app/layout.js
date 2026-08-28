import './globals.css';

export const metadata = {
  title: 'Corretor IA',
  description: 'Assistente de marketing e vendas imobiliárias com IA'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
