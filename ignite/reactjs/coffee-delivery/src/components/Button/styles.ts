import styled from 'styled-components'

export const BUTTON_BACKGROUND_COLORS = {
  yellow: 'yellow-light',
  purple: 'purple-dark',
}

interface CartButtonProps {
  $background: keyof typeof BUTTON_BACKGROUND_COLORS
}

export const CartButton = styled.button<CartButtonProps>`
  height: 2.375rem;
  width: 2.375rem;
  background: ${(props) =>
    props.theme[BUTTON_BACKGROUND_COLORS[props.$background]]};

  outline: none;
  border: none;
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`
