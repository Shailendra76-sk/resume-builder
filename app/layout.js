import './globals.css'

export const metadata = {
  title: 'Resume Builder - Create Professional Resume',
  description: 'Free resume builder with professional templates',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
