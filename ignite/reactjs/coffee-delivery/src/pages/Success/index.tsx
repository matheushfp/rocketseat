import { CurrencyDollar, MapPin, Timer } from '@phosphor-icons/react'
import illustration from '../../assets/illustration.svg'
import {
  GridContainer,
  IconContainer,
  OrderInfo,
  TitleContainer,
} from './styles'

export function Success() {
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
              Entrega em <strong>Avenida Paulista, 671</strong> <br />
              <p>Bela Vista, São Paulo - SP</p>
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
              <strong>Cartão de Crédito</strong>
            </p>
          </div>
        </OrderInfo>
        <img src={illustration} alt="" />
      </GridContainer>
    </>
  )
}
