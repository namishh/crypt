import './globals.css'
import { Dosis } from 'next/font/google'
import { GameProvider } from './context/game'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const dosis = Dosis({ subsets: ['latin'] })

export const metadata = {
  title: 'Cyquest',
  description: '2024',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/logo.svg" sizes="any" />
      <body className={`${dosis.className} dosis bg-darkbg min-h-screen overflow-x-hidden`}>
        <GameProvider>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          {children}
        </GameProvider>
      </body>
    </html>
  )
}
