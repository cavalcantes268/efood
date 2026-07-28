import { BrowserRouter } from 'react-router-dom'
import { GlobalStyle } from './styles/GlobalStyle'
import Rotas from './routes'
import Cart from './components/Cart' // 👈 1. Importe o carrinho

export default function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Rotas />
      <Cart /> {/* 👈 2. Renderize o carrinho aqui */}
    </BrowserRouter>
  )
}
