import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

const Container = styled.div`
  max-width: 1024px;
  margin: 80px auto;
  padding: 0 16px;
`

const RestaurantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 80px;
  row-gap: 48px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  background-color: #ffffff;
  border: 1px solid #e66767;
  position: relative;
  display: flex;
  flex-direction: column;
`

const CardImage = styled.img`
  width: 100%;
  height: 217px;
  object-fit: cover;
`

const TagContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  gap: 8px;
`

const Tag = styled.span`
  background-color: #e66767;
  color: #ffebd9;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 10px;
`

const CardBody = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-grow: 1;
`

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CardTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #e66767;
`

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 700;
  color: #e66767;
`

const Button = styled.button`
  background-color: #e66767;
  color: #ffebd9;
  border: none;
  padding: 4px 6px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  align-self: flex-start;
  margin-top: auto;
`

export default function Home() {
  const navigate = useNavigate()
  const [restaurants, setRestaurants] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Chamada direta para a URL oficial da API EBAC
    fetch('https://api-ebac.vercel.app/api/efood/restaurantes')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Erro na API: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        setRestaurants(data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error('Erro ao buscar restaurantes:', err)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <>
        <Header type="home" />
        <Container>
          <p style={{ textAlign: 'center', color: '#E66767', fontWeight: 'bold' }}>
            Carregando restaurantes...
          </p>
        </Container>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header type="home" />
      <Container>
        {restaurants.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#E66767', fontWeight: 'bold' }}>
            Nenhum restaurante encontrado.
          </p>
        ) : (
          <RestaurantGrid>
            {restaurants.map((rest) => (
              <Card key={rest.id}>
                <CardImage src={rest.capa} alt={rest.titulo} />
                <TagContainer>
                  {rest.destacado && <Tag>Destaque da semana</Tag>}
                  <Tag>{rest.tipo}</Tag>
                </TagContainer>
                <CardBody>
                  <CardHeader>
                    <CardTitle>{rest.titulo}</CardTitle>
                    <Rating>
                      <span>{rest.avaliacao}</span>
                      <i className="fa-solid fa-star"></i>
                    </Rating>
                  </CardHeader>
                  <p style={{ fontSize: '14px', lineHeight: '22px' }}>
                    {rest.descricao}
                  </p>
                  <Button onClick={() => navigate(`/restaurante/${rest.id}`)}>
                    Saiba mais
                  </Button>
                </CardBody>
              </Card>
            ))}
          </RestaurantGrid>
        )}
      </Container>
      <Footer />
    </>
  )
}