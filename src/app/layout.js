// src/app/layout.js
import AuthProvider from './providers'; // Import the provider
import './globals.css'; // Assuming your Tailwind CSS is here

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}