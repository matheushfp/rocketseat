import { Minus, Plus, Trash } from '@phosphor-icons/react'
import expresso from '../../../../assets/coffees/expresso.svg'
import {
  BorderContainer,
  ButtonsContainer,
  CartItemContainer,
  CounterContainer,
  RemoveButton,
  Wrapper,
} from './styles'

export function CartItem() {
  return (
    <BorderContainer>
      <CartItemContainer>
        <img src={expresso} width={64} alt="" />
        <Wrapper>
          <div>
            <span>Expresso Tradicional</span>
            <ButtonsContainer>
              <CounterContainer>
                <button>
                  <Minus size={14} color="#8047F8" />
                </button>
                1
                <button>
                  <Plus size={14} color="#8047F8" />
                </button>
              </CounterContainer>
              <RemoveButton>
                <Trash size={14} color="#8047F8" />
                REMOVER
              </RemoveButton>
            </ButtonsContainer>
          </div>
          <strong>R$ 9,90</strong>
        </Wrapper>
      </CartItemContainer>
    </BorderContainer>
  )
}
