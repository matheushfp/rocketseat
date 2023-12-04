import {
  BuyContainer,
  Card,
  CounterContainer,
  PriceContainer,
  TagContainer,
} from './styles'
import expresso from '../../../../assets/coffees/expresso.svg'
import { Minus, Plus } from '@phosphor-icons/react'
import { Button } from '../../../../components/Button'

export function CoffeeCard() {
  return (
    <Card>
      <img src={expresso} width={120} alt="" />
      <TagContainer>TRADICIONAL</TagContainer>
      <h3>Expresso Tradicional</h3>
      <p>
        O tradicional café feito com água
        <br /> quente e grãos moídos
      </p>
      <BuyContainer>
        <PriceContainer>
          <span>R$</span>
          <strong>9,90</strong>
        </PriceContainer>

        <div className="container">
          <CounterContainer>
            <button>
              <Minus size={14} weight="bold" color="#8047F8" />
            </button>
            1
            <button>
              <Plus size={14} weight="bold" color="#8047F8" />
            </button>
          </CounterContainer>
          <Button iconColor="white" background="purple" />
        </div>
      </BuyContainer>
    </Card>
  )
}
