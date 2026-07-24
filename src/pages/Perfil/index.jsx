import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom' // ✅ Importação correta
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

import {
  Container,
  CardapioList,
  CardapioItem,
  Modal,
  ModalContent,
  BannerContainer,
  BannerContent
} from './styles'

export default function Perfil() {
  const { id } = useParams()
  const [restaurante, setRestaurante] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [modalEstaAberta, setModalEstaAberta] = useState(false)
  const [pratoSelecionado, setPratoSelecionado] = useState(null)

  useEffect(() => {
    // Chamada direta para a URL oficial da API EBAC
    fetch(`https://api-ebac.vercel.app/api/efood/restaurantes/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro na API: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        setRestaurante(data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error('Erro ao carregar o cardápio:', err)
        setIsLoading(false)
      })
  }, [id])

  const abrirModal = (prato) => {
    setPratoSelecionado(prato)
    setModalEstaAberta(true)
  }

  const fecharModal = () => {
    setModalEstaAberta(false)
    setPratoSelecionado(null)
  }

  if (isLoading) {
    return (
      <>
        <Header type="perfil" />
        <Container>
          <p style={{ textAlign: 'center', color: '#E66767', fontWeight: 'bold', margin: '40px 0' }}>
            Carregando cardápio...
          </p>
        </Container>
        <Footer />
      </>
    )
  }

  if (!restaurante) {
    return (
      <>
        <Header type="perfil" />
        <Container>
          <p style={{ textAlign: 'center', color: '#E66767', fontWeight: 'bold', margin: '40px 0' }}>
            Restaurante não encontrado.
          </p>
        </Container>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header type="perfil" />

      {/* Banner de capa com tipo e título do restaurante */}
      <BannerContainer style={{ backgroundImage: `url(${restaurante.capa})` }}>
        <BannerContent className="container">
          <span>{restaurante.tipo}</span>
          <h2>{restaurante.titulo}</h2>
        </BannerContent>
      </BannerContainer>

      {/* Lista de pratos do cardápio */}
      <Container>
        <CardapioList>
          {restaurante.cardapio?.map((prato) => (
            <CardapioItem key={prato.id}>
              <img src={prato.foto} alt={prato.nome} />
              <h3>{prato.nome}</h3>
              <p>{prato.descricao}</p>
              <button onClick={() => abrirModal(prato)}>
                Mais detalhes
              </button>
            </CardapioItem>
          ))}
        </CardapioList>
      </Container>

      {/* Modal de detalhes do prato */}
      {modalEstaAberta && pratoSelecionado && (
        <Modal className="visivel" onClick={fecharModal}>
          <div className="overlay" />
          <ModalContent className="container" onClick={(e) => e.stopPropagation()}>
            <button className="fechar" onClick={fecharModal}>
              X
            </button>
            <img src={pratoSelecionado.foto} alt={pratoSelecionado.nome} />
            <div>
              <h4>{pratoSelecionado.nome}</h4>
              <p>{pratoSelecionado.descricao}</p>
              <p>Serve: {pratoSelecionado.porcao}</p>
              <button>
                Adicionar ao carrinho - R${' '}
                {pratoSelecionado.preco?.toFixed(2).replace('.', ',')}
              </button>
            </div>
          </ModalContent>
        </Modal>
      )}

      <Footer />
    </>
  )
}