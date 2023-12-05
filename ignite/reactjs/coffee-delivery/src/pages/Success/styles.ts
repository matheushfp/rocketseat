import styled from 'styled-components'

export const TitleContainer = styled.div`
  h2 {
    color: ${(props) => props.theme['yellow-dark']};
  }

  span {
    color: ${(props) => props.theme['base-subtitle']};
    font-size: 1.25rem;
  }
`

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 6.375rem;

  margin-top: 2.5rem;
`

export const OrderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  padding: 2.5rem;

  border: 1px solid black;

  border-top-left-radius: 6px;
  border-top-right-radius: 36px;
  border-bottom-right-radius: 6px;
  border-bottom-left-radius: 36px;

  div {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
`

const BACKGROUND_COLORS = {
  purple: 'purple',
  yellow: 'yellow',
  orange: 'yellow-dark',
}

interface IconContainerProps {
  $background: keyof typeof BACKGROUND_COLORS
}

export const IconContainer = styled.div<IconContainerProps>`
  background: ${(props) => props.theme[BACKGROUND_COLORS[props.$background]]};
  color: ${(props) => props.theme.background};

  width: 2rem;
  height: 2rem;

  border-radius: 999px;

  display: flex;
  align-items: center;
  justify-content: center;
`
