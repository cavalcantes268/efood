import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderHome = styled.header`
  background-color: #FFEBD9;
  background-image: url('https://raw.githubusercontent.com/yujinak/efood/main/src/assets/images/fundo.png');
  padding: 64px 0 40px 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 138px;
`;

const HeaderPerfil = styled.header`
  background-color: #FFEBD9;
  background-image: url('https://raw.githubusercontent.com/yujinak/efood/main/src/assets/images/fundo.png');
  padding: 40px 0;
`;

const HeaderContainer = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
`;

const Logo = styled.h1`
  font-size: 36px;
  font-weight: 900;
  color: #E66767;
  a { text-decoration: none; color: inherit; }
`;

const HeroTitle = styled.h2`
  font-size: 36px;
  font-weight: 900;
  max-width: 540px;
  line-height: 42px;
  color: #E66767;
`;

const CartButton = styled.button`
  background: none;
  border: none;
  color: #E66767;
  font-size: 18px;
  font-weight: 900;
  cursor: pointer;
`;

export function Header({ type, cartCount, onOpenCart }) {
    if (type === 'home') {
        return (
            <HeaderHome>
                <Logo><Link to="/">efood</Link></Logo>
                <HeroTitle>Viva experiências gastronômicas no conforto da sua casa</HeroTitle>
            </HeaderHome>
        );
    }

    return (
        <HeaderPerfil>
            <HeaderContainer>
                <Link to="/" style={{ color: '#E66767', fontWeight: 900, textDecoration: 'none', fontSize: 18 }}>
                    Restaurantes
                </Link>
                <Logo><Link to="/">efood</Link></Logo>
                <CartButton onClick={onOpenCart}>
                    {cartCount} produto(s) no carrinho
                </CartButton>
            </HeaderContainer>
        </HeaderPerfil>
    );
}

export default Header;