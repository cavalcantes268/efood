    import { useNavigate } from 'react-router-dom'
    import styled from 'styled-components'
    import { Header } from '../../components/Header'
    import { Footer } from '../../components/Footer'
    import { RESTAURANTS } from '../../data/mockData'

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
    background-color: #FFFFFF;
    border: 1px solid #E66767;
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
    background-color: #E66767;
    color: #FFEBD9;
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
    color: #E66767;
    `

    const Rating = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    font-weight: 700;
    color: #E66767;
    `

    const Button = styled.button`
    background-color: #E66767;
    color: #FFEBD9;
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

        return (
            <>
                <Header type="home" />
                <Container>
                    <RestaurantGrid>
                        {RESTAURANTS.map(rest => (
                            <Card key={rest.id}>
                                <CardImage src={rest.image} alt={rest.title} />
                                <TagContainer>
                                    {rest.highlighted && <Tag>Destaque da semana</Tag>}
                                    <Tag>{rest.category}</Tag>
                                </TagContainer>
                                <CardBody>
                                    <CardHeader>
                                        <CardTitle>{rest.title}</CardTitle>
                                        <Rating>
                                            <span>{rest.rating}</span>
                                            <i className="fa-solid fa-star"></i>
                                        </Rating>
                                    </CardHeader>
                                    <p style={{ fontSize: '14px', lineHeight: '22px' }}>{rest.description}</p>
                                    <Button onClick={() => navigate(`/restaurante/${rest.id}`)}>
                                        Saiba mais
                                    </Button>
                                </CardBody>
                            </Card>
                        ))}
                    </RestaurantGrid>
                </Container>
                <Footer />
            </>
        )
    }