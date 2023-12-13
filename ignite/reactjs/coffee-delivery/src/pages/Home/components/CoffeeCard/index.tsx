import {
  BuyContainer,
  Card,
  CounterContainer,
  PriceContainer,
  TagContainer,
  TagsWrapper,
} from './styles'
import { Minus, Plus } from '@phosphor-icons/react'
import { Button } from '../../../../components/Button'
import { useState } from 'react'
import { useCart } from '../../../../hooks/useCart'

interface CoffeeCardProps {
  id: number
  title: string
  description: string
  tags: string[]
  img: string
  price: number
}

export function CoffeeCard({
  id,
  title,
  description,
  tags,
  img,
  price,
}: CoffeeCardProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(0)

  function handleIncrementCount() {
    setQuantity((state) => state + 1)
  }

  function handleDecrementCount() {
    if (quantity > 0) {
      setQuantity((state) => state - 1)
    }
  }

  function handleAddItem() {
    const newItem = {
      id,
      quantity,
    }

    addItem(newItem)
    setQuantity(0)
  }

  return (
    <Card>
      <img src={img} width={120} alt="" />
      <TagsWrapper>
        {tags.map((tag, idx) => (
          <TagContainer key={`${id}-tag${idx}`}>
            {tag.toUpperCase()}
          </TagContainer>
        ))}
      </TagsWrapper>
      <h3>{title}</h3>
      <p>{description}</p>
      <BuyContainer>
        <PriceContainer>
          <span>R$</span>
          <strong>{price.toFixed(2).replace('.', ',')}</strong>
        </PriceContainer>

        <div className="container">
          <CounterContainer>
            <button onClick={handleDecrementCount}>
              <Minus size={14} weight="bold" color="#8047F8" />
            </button>
            {quantity}
            <button onClick={handleIncrementCount}>
              <Plus size={14} weight="bold" color="#8047F8" />
            </button>
          </CounterContainer>
          <Button
            iconColor="white"
            background="purple"
            onClick={handleAddItem}
          />
        </div>
      </BuyContainer>
    </Card>
  )
}
