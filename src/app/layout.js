import "./globals.css";

export const metadata = {
  title: 'Weather App',
  description: 'App de clima com login e favoritos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body>
        {children}
      </body>
    </html>
  );
}
