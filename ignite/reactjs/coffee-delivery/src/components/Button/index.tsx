import { ShoppingCart } from '@phosphor-icons/react'
import { CartButton } from './styles'

interface ButtonProps {
  iconColor: 'white' | 'orange'
  background: 'yellow' | 'purple'
  onClick?: () => void
}

export function Button({ iconColor, background, onClick }: ButtonProps) {
  return (
    <CartButton $background={background} onClick={onClick}>
      <ShoppingCart
        size={22}
        weight="fill"
        color={iconColor === 'white' ? '#F3F2F2' : '#C47F17'}
      />
    </CartButton>
  )
}
