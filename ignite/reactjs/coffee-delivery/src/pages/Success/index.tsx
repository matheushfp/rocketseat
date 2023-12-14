import { CurrencyDollar, MapPin, Timer } from '@phosphor-icons/react'
import illustration from '../../assets/illustration.svg'
import {
  GridContainer,
  IconContainer,
  OrderInfo,
  TitleContainer,
} from './styles'
import { useCart } from '../../hooks/useCart'
import { useParams } from 'react-router-dom'

export function Success() {
  const { orders } = useCart()
  const { orderId } = useParams()

  const orderInfo = orders.find((order) => order.id === Number(orderId))

  if (!orderInfo) {
    return null
  }

  const paymentMethod = {
    credit: 'Cartão de Crédito',
    debit: 'Cartão de Débito',
    cash: 'Dinheiro',
  }

  return (
    <>
      <TitleContainer>
        <h2>Uhu! Pedido confirmado</h2>
        <span>Agora é só aguardar que logo o café chegará até você</span>
      </TitleContainer>
      <GridContainer>
        <OrderInfo>
          <div>
            <IconContainer $background="purple">
              <MapPin weight="fill" />
            </IconContainer>
            <p>
              Entrega em{' '}
              <strong>
                {orderInfo.street}, {orderInfo.number}
              </strong>{' '}
              <br />
              {orderInfo.neighborhood}, {orderInfo.city} - {orderInfo.state}
            </p>
          </div>

          <div>
            <IconContainer $background="yellow">
              <Timer weight="fill" />
            </IconContainer>
            <p>
              Previsão de Entrega <br />
              <strong>20 min - 30 min</strong>
            </p>
          </div>

          <div>
            <IconContainer $background="orange">
              <CurrencyDollar />
            </IconContainer>
            <p>
              Pagamento na entrega <br />
              <strong>{paymentMethod[orderInfo.paymentMethod]}</strong>
            </p>
          </div>
        </OrderInfo>
        <img src={illustration} alt="" />
      </GridContainer>
    </>
  )
}
