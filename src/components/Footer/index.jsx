import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const Logo = styled.h1`
  font-size: 36px;
  font-weight: 900;
  color: #E66767;
  a { text-decoration: none; color: inherit; }
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
            <Logo><Link to="/">efood</Link></Logo>
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