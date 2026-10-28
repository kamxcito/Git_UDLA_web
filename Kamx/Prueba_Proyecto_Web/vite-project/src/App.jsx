import { createTheme, ThemeProvider } from '@mui/material/styles'
import './App.css'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import Main from './components/Main/Main.jsx'

const theme = createTheme({
  palette: {
    primary: { main: '#294936' },
    background: { default: '#f8f7f0', paper: '#fffef9' },
    text: { primary: '#233c2c', secondary: '#656c60' },
  },
  typography: { fontFamily: '"Segoe UI", Arial, sans-serif' },
  shape: { borderRadius: 16 },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <a className="skip-link" href="#contenido">Saltar al contenido</a>
      <Header />
      <Main />
      <Footer />
    </ThemeProvider>
  )
}

export default App
