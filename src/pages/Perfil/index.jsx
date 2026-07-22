import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // 1. Importe o useParams
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { 
  Container, 
  CardapioList, 
  CardapioItem, 
  Modal, 
  ModalContent,
  BannerContainer, 
  BannerContent 
} from './styles';

const Perfil = () => {
  const { id } = useParams(); // 2. Pega o ID que vem da URL (ex: /restaurante/1)
  const [restaurante, setRestaurante] = useState(null);
  const [modalEstaAberta, setModalEstaAberta] = useState(false);
  const [pratoSelecionado, setPratoSelecionado] = useState(null);

  // 3. Busca o restaurante específico pelo ID da URL
  useEffect(() => {
    fetch(`https://api-ebac.vercel.app/api/efood/restaurantes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRestaurante(data); 
      })
      .catch((err) => console.error('Erro ao carregar o cardápio:', err));
  }, [id]);

  const abrirModal = (prato) => {
    setPratoSelecionado(prato);
    setModalEstaAberta(true);
  };

  const fecharModal = () => {
    setModalEstaAberta(false);
    setPratoSelecionado(null);
  };

  if (!restaurante) {
    return <h3>Carregando cardápio...</h3>;
  }

  return (
    <>
      <Header type="perfil" />
      
      {/* Banner dinâmico com a capa e textos do restaurante da URL */}
      <BannerContainer style={{ backgroundImage: `url(${restaurante.capa})` }}>
        <BannerContent className="container">
          <span>{restaurante.tipo}</span>
          <h2>{restaurante.titulo}</h2>
        </BannerContent>
      </BannerContainer>
      
      <Container>
        <CardapioList>
          {restaurante.cardapio.map((prato) => (
            <CardapioItem key={prato.id}>
              <img src={prato.foto} alt={prato.nome} />
              <h3>{prato.nome}</h3>
              <p>{prato.descricao}</p>
              <button onClick={() => abrirModal(prato)}>Mais detalhes</button>
            </CardapioItem>
          ))}
        </CardapioList>
      </Container>

      {/* Modal do Produto */}
      {modalEstaAberta && pratoSelecionado && (
        <Modal className="visivel" onClick={fecharModal}>
          <div className="overlay" />
          <ModalContent className="container" onClick={(e) => e.stopPropagation()}>
            <button className="fechar" onClick={fecharModal}>X</button>
            <img src={pratoSelecionado.foto} alt={pratoSelecionado.nome} />
            <div>
              <h4>{pratoSelecionado.nome}</h4>
              <p>{pratoSelecionado.descricao}</p>
              <p>Serve: de {pratoSelecionado.porcao}</p>
              <button>
                Adicionar ao carrinho - R$ {pratoSelecionado.preco.toFixed(2).replace('.', ',')}
              </button>
            </div>
          </ModalContent>
        </Modal>
      )}

      <Footer />
    </>
  );
};

export default Perfil;