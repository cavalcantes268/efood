import { useDispatch, useSelector } from 'react-redux';
import { close, remove } from '../../store/reducers/cartSlice';

const Cart = () => {
  const { isOpen, items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const getTotalPrice = () => {
    return items.reduce((acc, currentItem) => acc + currentItem.preco, 0);
  };

  const parseToBrl = (amount) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1040,
      display: 'flex',
      justifyContent: 'flex-end'
    }}>
      {/* Fundo escuro transparente */}
      <div 
        onClick={() => dispatch(close())} 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }} 
      />
      
      {/* Gaveta lateral do carrinho */}
      <aside style={{
        position: 'relative',
        maxWidth: '360px',
        width: '100%',
        height: '100%',
        backgroundColor: '#E66767',
        padding: '32px 16px',
        zIndex: 1,
        color: '#FFEBD9',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflowY: 'auto',
        boxSizing: 'border-box'
      }}>
        <div>
          <button 
            onClick={() => dispatch(close())}
            style={{ 
              background: 'transparent', 
              border: 'none', 
              color: '#FFEBD9', 
              cursor: 'pointer', 
              marginBottom: '16px', 
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            &times; Fechar carrinho
          </button>

          {/* Tratamento para carrinho vazio */}
          {items.length === 0 ? (
            <p style={{ textAlign: 'center', marginTop: '32px', fontWeight: 'bold' }}>
              O carrinho está vazio. Adicione produtos para continuar!
            </p>
          ) : (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {items.map((item) => (
                <li key={item.id} style={{
                  display: 'flex',
                  gap: '8px',
                  backgroundColor: '#FFEBD9',
                  color: '#E66767',
                  padding: '8px',
                  position: 'relative',
                  marginBottom: '16px',
                  borderRadius: '4px'
                }}>
                  <img src={item.foto} alt={item.nome} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>{item.nome}</h3>
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{parseToBrl(item.preco)}</span>
                  </div>
                  <button 
                    onClick={() => dispatch(remove(item.id))}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: '#E66767',
                      fontWeight: 'bold',
                      position: 'absolute',
                      bottom: '8px',
                      right: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    🗑️
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Rodapé só aparece se houver itens */}
        {items.length > 0 && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              color: '#FFEBD9',
              fontWeight: 'bold',
              fontSize: '14px',
              marginBottom: '16px',
              marginTop: '40px'
            }}>
              <p>Valor total</p>
              <p>{parseToBrl(getTotalPrice())}</p>
            </div>
            <button style={{
              backgroundColor: '#FFEBD9',
              color: '#E66767',
              border: 'none',
              width: '100%',
              padding: '12px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer',
              textAlign: 'center',
              borderRadius: '4px'
            }}>
              Continuar com a entrega
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default Cart;