import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { ThemeProvider } from "@/components/theme-provider"
import './App.css'

function App() {

  return (
    <BrowserRouter>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
