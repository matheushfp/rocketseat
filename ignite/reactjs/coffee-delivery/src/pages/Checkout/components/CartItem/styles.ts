import styled from 'styled-components'

export const CartItemContainer = styled.div`
  display: flex;
  justify-content: flex-start;

  span {
    color: ${(props) => props.theme['base-subtitle']};
    margin-left: 1.25rem;
  }
`

export const Wrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
`

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  margin-left: 1.25rem;
  margin-top: 0.5rem;
`

export const CounterContainer = styled.div`
  background: ${(props) => props.theme['base-button']};
  color: ${(props) => props.theme['base-title']};

  border-radius: 6px;

  max-width: fit-content;
  height: 2rem;

  padding: 0.5rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  button {
    border: none;
    background: transparent;

    cursor: pointer;
  }
`

export const RemoveButton = styled.button`
  background: ${(props) => props.theme['base-button']};
  color: ${(props) => props.theme['base-text']};

  height: 2rem;

  padding: 0.4rem 0.5rem;

  display: flex;
  align-items: center;
  gap: 0.25rem;

  border: none;
  border-radius: 6px;
  cursor: pointer;

  transition: 0.2s;

  &:hover {
    background: ${(props) => props.theme['base-hover']};
    color: ${(props) => props.theme['base-subtitle']};
  }
`

export const BorderContainer = styled.div`
  padding-bottom: 2rem;
  margin-bottom: 1.5rem;

  border-bottom: 2px solid ${(props) => props.theme['base-button']};
`
