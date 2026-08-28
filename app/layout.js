export const metadata = {
  title: 'Corretor IA',
  description: 'Assistente de marketing e vendas imobiliárias com IA'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', background: '#f5f5f5', color: '#111' }}>
        {children}
      </body>
    </html>
  );
}
