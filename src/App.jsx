import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './store'; // Importe a sua store aqui
import { GlobalStyle } from './styles/GlobalStyle';
import Rotas from './routes';
import Cart from './components/Cart';

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <GlobalStyle />
        <Rotas />
        <Cart />
      </BrowserRouter>
    </Provider>
  );
}
