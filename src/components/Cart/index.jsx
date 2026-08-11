import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { close, remove, clear } from '../../store/reducers/cartSlice';

const Cart = () => {
  const { isOpen, items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [step, setStep] = useState('cart');
  const [orderId, setOrderId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Variavel usada no Yup abaixo
  const currentYear = new Date().getFullYear();

  const getTotalPrice = () => {
    return items.reduce((acc, currentItem) => acc + (currentItem.preco || currentItem.price || 0), 0);
  };

  const parseToBrl = (amount) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount);
  };

  const handleClose = () => {
    dispatch(close());
    setStep('cart');
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      receiver: '',
      description: '',
      city: '',
      zipCode: '',
      number: '',
      complement: '',
      cardName: '',
      cardNumber: '',
      cardCode: '',
      expiresMonth: '',
      expiresYear: ''
    },
    validationSchema: Yup.object({
      receiver: Yup.string().required('O campo é obrigatório'),
      description: Yup.string().required('O campo é obrigatório'),
      city: Yup.string().required('O campo é obrigatório'),
      zipCode: Yup.string().required('O campo é obrigatório'),
      number: Yup.string().required('O campo é obrigatório'),
      cardName: Yup.string().required('O campo é obrigatório'),
      cardNumber: Yup.string().required('O campo é obrigatório'),
      cardCode: Yup.string().required('O campo é obrigatório'),
      expiresMonth: Yup.number()
        .typeError('Mês inválido')
        .min(1, 'Mês inválido')
        .max(12, 'Mês inválido')
        .required('O campo é obrigatório'),
      expiresYear: Yup.number()
        .typeError('Ano inválido')
        .min(currentYear, 'Ano inválido') // 👈 currentYear usado aqui
        .required('O campo é obrigatório')
    }),
    onSubmit: async (values) => {
      setIsLoading(true);

      // Remove traços e pontos do CEP para garantir o formato aceito pela API
      const cleanZipCode = values.zipCode.replace(/\D/g, '');

      const payload = {
        products: items.map((item) => ({
          id: item.id,
          price: item.preco || item.price
        })),
        delivery: {
          receiver: values.receiver,
          address: {
            description: values.description,
            city: values.city,
            zipCode: cleanZipCode,
            number: Number(values.number),
            complement: values.complement || ''
          }
        },
        payment: {
          card: {
            name: values.cardName,
            number: values.cardNumber,
            code: Number(values.cardCode),
            expires: {
              month: Number(values.expiresMonth),
              year: Number(values.expiresYear)
            }
          }
        }
      };

      try {
        const response = await fetch('https://api-ebac.vercel.app/api/efood/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          const data = await response.json();
          setOrderId(data.orderId);
          dispatch(clear());
          setStep('confirmation');
        } else {
          alert('Erro ao realizar o pedido. Verifique os dados e tente novamente.');
        }
      } catch (error) {
        console.error('Erro no envio do pedido:', error);
        alert('Falha na comunicação com a API da EBAC.');
      } finally {
        setIsLoading(false);
      }
    }
  });

  const handleCepBlur = async (e) => {
    formik.handleBlur(e);
    const cleanCep = e.target.value.replace(/\D/g, '');

    if (cleanCep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const data = await response.json();

        if (!data.erro) {
          formik.setFieldValue('description', data.logradouro || '');
          formik.setFieldValue('city', `${data.localidade} - ${data.uf}`);
        } else {
          alert('CEP não encontrado. Por favor, preencha o endereço manualmente.');
        }
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
      }
    }
  };

  const deliveryFields = ['receiver', 'description', 'city', 'zipCode', 'number'];

  const isDeliveryValid = () => {
    const hasDeliveryErrors = deliveryFields.some((field) => !!formik.errors[field]);
    const hasEmptyFields = deliveryFields.some((field) => !formik.values[field]);
    return !hasDeliveryErrors && !hasEmptyFields;
  };

  const handleGoToPayment = () => {
    deliveryFields.forEach((field) => formik.setFieldTouched(field, true));
    if (isDeliveryValid()) {
      setStep('payment');
    }
  };

  const renderError = (fieldName) => {
    if (formik.touched[fieldName] && formik.errors[fieldName]) {
      return (
        <small style={{ color: '#FFF', fontSize: '12px', display: 'block', marginTop: '-4px', marginBottom: '8px' }}>
          {formik.errors[fieldName]}
        </small>
      );
    }
    return null;
  };

  if (!isOpen) return null;

  const inputStyle = {
    backgroundColor: '#FFEBD9',
    border: 'none',
    padding: '8px',
    width: '100%',
    color: '#4B4B4B',
    fontWeight: 'bold',
    fontSize: '14px',
    marginBottom: '8px',
    marginTop: '4px',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#FFEBD9',
    display: 'block',
    marginTop: '8px'
  };

  const buttonStyle = {
    backgroundColor: '#FFEBD9',
    color: '#E66767',
    border: 'none',
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textAlign: 'center',
    borderRadius: '4px',
    marginTop: '8px'
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'transparent',
    color: '#FFEBD9',
    border: '1px solid #FFEBD9'
  };

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
      <div 
        onClick={handleClose} 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }} 
      />
      
      <aside style={{
        position: 'relative',
        maxWidth: '360px',
        width: '100%',
        height: '100%',
        backgroundColor: '#E66767',
        padding: '32px 16px',
        zIndex: 1,
        color: '#FFEBD9',
        overflowY: 'auto',
        boxSizing: 'border-box'
      }}>
        <button 
          onClick={handleClose}
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

        {/* 1. ETAPA CARRINHO */}
        {step === 'cart' && (
          <div>
            {items.length === 0 ? (
              <p style={{ marginTop: '16px', fontWeight: 'bold' }}>O carrinho está vazio.</p>
            ) : (
              <>
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
                        <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{parseToBrl(item.preco || item.price)}</span>
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

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: '#FFEBD9',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  marginBottom: '16px',
                  marginTop: '16px'
                }}>
                  <p>Valor total</p>
                  <p>{parseToBrl(getTotalPrice())}</p>
                </div>

                <button 
                  onClick={() => setStep('delivery')}
                  style={buttonStyle}
                >
                  Continuar com a entrega
                </button>
              </>
            )}
          </div>
        )}

        {/* 2. ETAPA DE ENTREGA */}
        {step === 'delivery' && (
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>Entrega</h2>
            
            <label htmlFor="receiver" style={labelStyle}>Quem irá receber</label>
            <input
              id="receiver"
              name="receiver"
              type="text"
              style={inputStyle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.receiver}
            />
            {renderError('receiver')}

            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="zipCode" style={labelStyle}>CEP</label>
                <input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  placeholder="00000-000"
                  style={inputStyle}
                  onChange={formik.handleChange}
                  onBlur={handleCepBlur}
                  value={formik.values.zipCode}
                />
                {renderError('zipCode')}
              </div>

              <div style={{ flex: 1 }}>
                <label htmlFor="number" style={labelStyle}>Número</label>
                <input
                  id="number"
                  name="number"
                  type="text"
                  style={inputStyle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.number}
                />
                {renderError('number')}
              </div>
            </div>

            <label htmlFor="description" style={labelStyle}>Endereço</label>
            <input
              id="description"
              name="description"
              type="text"
              style={inputStyle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.description}
            />
            {renderError('description')}

            <label htmlFor="city" style={labelStyle}>Cidade</label>
            <input
              id="city"
              name="city"
              type="text"
              style={inputStyle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
            />
            {renderError('city')}

            <label htmlFor="complement" style={labelStyle}>Complemento (opcional)</label>
            <input
              id="complement"
              name="complement"
              type="text"
              style={inputStyle}
              onChange={formik.handleChange}
              value={formik.values.complement}
            />

            <div style={{ marginTop: '24px' }}>
              <button 
                type="button" 
                onClick={handleGoToPayment}
                style={buttonStyle}
              >
                Continuar com o pagamento
              </button>
              <button 
                type="button" 
                onClick={() => setStep('cart')}
                style={secondaryButtonStyle}
              >
                Voltar para o carrinho
              </button>
            </div>
          </div>
        )}

        {/* 3. ETAPA DE PAGAMENTO */}
        {step === 'payment' && (
          <form onSubmit={formik.handleSubmit}>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>
              Pagamento - Valor a pagar {parseToBrl(getTotalPrice())}
            </h2>

            <label htmlFor="cardName" style={labelStyle}>Nome no cartão</label>
            <input
              id="cardName"
              name="cardName"
              type="text"
              style={inputStyle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cardName}
            />
            {renderError('cardName')}

            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ flex: 2 }}>
                <label htmlFor="cardNumber" style={labelStyle}>Número do cartão</label>
                <input
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  style={inputStyle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cardNumber}
                />
                {renderError('cardNumber')}
              </div>

              <div style={{ flex: 1 }}>
                <label htmlFor="cardCode" style={labelStyle}>CVV</label>
                <input
                  id="cardCode"
                  name="cardCode"
                  type="text"
                  style={inputStyle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cardCode}
                />
                {renderError('cardCode')}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="expiresMonth" style={labelStyle}>Mês de vencimento</label>
                <input
                  id="expiresMonth"
                  name="expiresMonth"
                  type="number"
                  style={inputStyle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.expiresMonth}
                />
                {renderError('expiresMonth')}
              </div>

              <div style={{ flex: 1 }}>
                <label htmlFor="expiresYear" style={labelStyle}>Ano de vencimento</label>
                <input
                  id="expiresYear"
                  name="expiresYear"
                  type="number"
                  placeholder="2026"
                  style={inputStyle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.expiresYear}
                />
                {renderError('expiresYear')}
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <button 
                type="submit" 
                disabled={isLoading}
                style={buttonStyle}
              >
                {isLoading ? 'Finalizando...' : 'Finalizar pagamento'}
              </button>
              <button 
                type="button" 
                onClick={() => setStep('delivery')}
                style={secondaryButtonStyle}
              >
                Voltar para a edição de endereço
              </button>
            </div>
          </form>
        )}

        {/* 4. TELA DE CONFIRMAÇÃO */}
        {step === 'confirmation' && (
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '16px' }}>
              Pedido realizado - № {orderId}
            </h2>
            <p style={{ fontSize: '14px', lineHeight: '22px', marginBottom: '16px' }}>
              Estamos felizes em informar que seu pedido já está em processo de preparação e em breve será entregue no endereço fornecido.
            </p>
            <p style={{ fontSize: '14px', lineHeight: '22px', marginBottom: '16px' }}>
              Gostaríamos de ressaltar que nossos entregadores não estão autorizados a cobrar comissões adicionais.
            </p>
            <p style={{ fontSize: '14px', lineHeight: '22px', marginBottom: '16px' }}>
              Lembre-se da importância de higienizar as mãos após o recebimento do pedido, garantindo assim sua segurança e bem-estar durante a refeição.
            </p>
            <p style={{ fontSize: '14px', lineHeight: '22px', marginBottom: '24px' }}>
              Esperamos que desfrute de uma excelente experiência gastronômica. Bom apetite!
            </p>

            <button 
              type="button" 
              onClick={handleClose}
              style={buttonStyle}
            >
              Concluir
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default Cart;