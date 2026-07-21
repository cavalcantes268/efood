import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { 
  Container, 
  CardapioList, 
  CardapioItem, 
  Modal, 
  ModalContent 
} from './styles';

const Perfil = () => {
  const [restaurante, setRestaurante] = useState(null);
  const [modalEstaAberta, setModalEstaAberta] = useState(false);
  const [pratoSelecionado, setPratoSelecionado] = useState(null);

  // Buscando os dados da API por AJAX
  useEffect(() => {
    fetch('https://api-ebac.vercel.app/api/efood/restaurantes')
      .then((res) => res.json())
      .then((data) => {
        setRestaurante(data[0]); 
      })
      .catch((err) => console.error('Erro ao carregar o cardápio:', err));
  }, []);

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
      <Header />
      
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