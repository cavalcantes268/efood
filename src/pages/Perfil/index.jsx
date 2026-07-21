    import { useState } from 'react'
    import { useParams } from 'react-router-dom'
    import styled from 'styled-components'
    import { Header } from '../../components/Header'
    import { Footer } from '../../components/Footer'
    import { RESTAURANTS } from '../../data/mockData'

    const Banner = styled.div`
    width: 100%;
    height: 280px;
    background-image: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${props => props.bg});
    background-size: cover;
    background-position: center;
    color: #FFFFFF;
    padding: 32px 0;
    `

    const BannerContent = styled.div`
    max-width: 1024px;
    margin: 0 auto;
    padding: 0 16px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    `

    const Container = styled.div`
    max-width: 1024px;
    margin: 80px auto;
    padding: 0 16px;
    `

    const DishesGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;

    @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr); }
    @media (max-width: 600px) { grid-template-columns: 1fr; }
    `

    const DishCard = styled.div`
    background-color: #E66767;
    padding: 8px;
    color: #FFEBD9;
    display: flex;
    flex-direction: column;
    `

    const DishImage = styled.img`
    width: 100%;
    height: 167px;
    object-fit: cover;
    margin-bottom: 8px;
    `

    const ButtonSecondary = styled.button`
    background-color: #FFEBD9;
    color: #E66767;
    border: none;
    width: 100%;
    padding: 4px 0;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    margin-top: auto;
    `

    export default function Perfil() {
        const { id } = useParams()
        const [cart, setCart] = useState([])
        const restaurant = RESTAURANTS.find(r => r.id === Number(id)) || RESTAURANTS[0]

        const addToCart = (dish) => {
            setCart([...cart, dish])
            alert(`${dish.name} foi adicionado ao carrinho!`)
        }

        return (
            <>
                <Header type="perfil" cartCount={cart.length} onOpenCart={() => { }} />
                <Banner bg={restaurant.image}>
                    <BannerContent>
                        <span style={{ fontSize: '32px', fontWeight: 100 }}>{restaurant.category}</span>
                        <h2 style={{ fontSize: '32px', fontWeight: 900 }}>{restaurant.title}</h2>
                    </BannerContent>
                </Banner>
                <Container>
                    <DishesGrid>
                        {restaurant.dishes.map(dish => (
                            <DishCard key={dish.id}>
                                <DishImage src={dish.image} alt={dish.name} />
                                <h3 style={{ fontSize: '16px', fontWeight: 900, marginBottom: '8px' }}>{dish.name}</h3>
                                <p style={{ fontSize: '14px', lineHeight: '22px', marginBottom: '8px' }}>{dish.description}</p>
                                <ButtonSecondary onClick={() => addToCart(dish)}>
                                    Adicionar ao carrinho
                                </ButtonSecondary>
                            </DishCard>
                        ))}
                    </DishesGrid>
                </Container>
                <Footer />
            </>
        )
    }
