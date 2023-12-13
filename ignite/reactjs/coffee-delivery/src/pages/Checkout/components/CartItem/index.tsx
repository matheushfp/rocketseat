import { Minus, Plus, Trash } from '@phosphor-icons/react'
import { useCart } from '../../../../hooks/useCart'
import {
  BorderContainer,
  ButtonsContainer,
  CartItemContainer,
  CounterContainer,
  RemoveButton,
  Wrapper,
} from './styles'

interface CartItemProps {
  id: number
  img: string
  title: string
  basePrice: number
  quantity: number
}

export function CartItem({
  id,
  img,
  title,
  basePrice,
  quantity,
}: CartItemProps) {
  const { incrementItemQuantity, decrementItemQuantity, removeItem } = useCart()

  function handleDecrementItemQuantity(itemId: number) {
    decrementItemQuantity(itemId)
  }

  function handleIncrementItemQuantity(itemId: number) {
    incrementItemQuantity(itemId)
  }

  function handleRemoveItem(itemId: number) {
    removeItem(itemId)
  }

  return (
    <BorderContainer>
      <CartItemContainer>
        <img src={img} width={64} alt="" />
        <Wrapper>
          <div>
            <span>{title}</span>
            <ButtonsContainer>
              <CounterContainer>
                <button onClick={() => handleDecrementItemQuantity(id)}>
                  <Minus size={14} color="#8047F8" />
                </button>
                {quantity}
                <button onClick={() => handleIncrementItemQuantity(id)}>
                  <Plus size={14} color="#8047F8" />
                </button>
              </CounterContainer>
              <RemoveButton onClick={() => handleRemoveItem(id)}>
                <Trash size={14} color="#8047F8" />
                REMOVER
              </RemoveButton>
            </ButtonsContainer>
          </div>
          <strong>{`R$ ${(quantity * basePrice)
            .toFixed(2)
            .replace('.', ',')}`}</strong>
        </Wrapper>
      </CartItemContainer>
    </BorderContainer>
  )
}
