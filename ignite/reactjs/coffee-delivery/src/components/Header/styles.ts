import styled from 'styled-components'

export const NavContainer = styled.header`
  display: flex;
  justify-content: space-between;

  height: 6.5rem;

  padding: 2rem 0;

  div {
    display: flex;
    gap: 0.75rem;
  }
`

export const CityLocation = styled.div`
  background: ${(props) => props.theme['purple-light']};
  color: ${(props) => props.theme.purple};

  height: 2.375rem;
  width: max-content;

  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;

  padding: 0.5rem;
`
