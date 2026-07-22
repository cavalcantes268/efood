import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1024px;
  width: 100%;
  margin: 0 auto;
  padding: 56px 0;
`;

export const BannerContainer = styled.div`
  position: relative;
  height: 280px;
  display: block;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: #fff;
  
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    content: '';
  }
`;

export const BannerContent = styled.div`
  z-index: 1;
  position: relative;
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 25px 0;

  span {
    font-size: 32px;
    font-weight: 100;
  }

  h2 {
    font-size: 32px;
    font-weight: 900;
  }
`;

export const CardapioList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
`;

export const CardapioItem = styled.li`
  background-color: #E66767;
  color: #FFEBD9;
  padding: 8px;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    height: 167px;
    object-fit: cover;
    margin-bottom: 8px;
  }

  h3 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 8px;
    display: block;
    height: 88px;
    overflow: hidden;
  }

  button {
    background-color: #FFEBD9;
    color: #E66767;
    border: none;
    font-weight: bold;
    font-size: 14px;
    padding: 4px 0;
    width: 100%;
    cursor: pointer;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: none;
  align-items: center;
  justify-content: center;

  &.visivel {
    display: flex;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.73);
  }
`;

export const ModalContent = styled.div`
  max-width: 1024px;
  height: 344px;
  background-color: #E66767;
  color: #FFEBD9;
  display: flex;
  padding: 32px;
  position: relative;
  z-index: 1;

  img {
    width: 280px;
    height: 280px;
    object-fit: cover;
    margin-right: 24px;
  }

  h4 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 16px;
  }

  p {
    font-size: 14px;
    line-height: 22px;
    margin-bottom: 16px;
  }

  button {
    background-color: #FFEBD9;
    color: #E66767;
    border: none;
    font-weight: bold;
    font-size: 14px;
    padding: 4px 8px;
    cursor: pointer;
  }

  .fechar {
    position: absolute;
    top: 8px;
    right: 8px;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #FFEBD9;
    font-size: 16px;
  }
`;