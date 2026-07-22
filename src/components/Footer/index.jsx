import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo (1).png'; // Ajuste o caminho conforme a localização real da sua pasta

const FooterContainer = styled.footer`
  background-color: #FFEBD9;
  padding: 40px 0;
  text-align: center;
  margin-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

// Transformamos em uma div ou mantemos o estilo adaptado para a imagem
const Logo = styled.div`
  a {
    display: inline-block;
  }
  
  img {
    height: 40px; /* Ajuste a altura conforme necessário */
    width: auto;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 8px;
  a {
    background-color: #E66767;
    color: #FFEBD9;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    font-size: 12px;
  }
`;

const FooterText = styled.p`
  font-size: 10px;
  max-width: 480px;
  line-height: 14px;
  color: #E66767;
`;

export function Footer() {
    return (
        <FooterContainer>
            <Logo>
                {/* O Link aponta para a home "/" e envolve a imagem da logo */}
                <Link to="/">
                    <img src={logoImg} alt="efood logo" />
                </Link>
            </Logo>
            <SocialIcons>
                <a href="#"><i className="fa-brands fa-instagram"></i></a>
                <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                <a href="#"><i className="fa-brands fa-twitter"></i></a>
            </SocialIcons>
            <FooterText>
                A efood é uma plataforma para divulgação de estabelecimentos, a responsabilidade pela entrega, qualidade dos produtos é toda do estabelecimento contratado.
            </FooterText>
        </FooterContainer>
    );
}

export default Footer;