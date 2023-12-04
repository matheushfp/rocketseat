import styled from 'styled-components'

export const CheckoutContainer = styled.div`
  h4 {
    color: ${(props) => props.theme['base-subtitle']};
    font-size: 1.125rem;
    font-family: 'Baloo 2', sans-serif;
    font-weight: 700;
  }
`

export const BaseInput = styled.input`
  background: ${(props) => props.theme['base-input']};
  border: none;
  border-radius: 4px;

  width: 12.5rem;
  height: 2.625rem;

  padding: 0.75rem;
`

export const CEPInput = styled(BaseInput)``
export const NumeroInput = styled(BaseInput)``
export const BairroInput = styled(BaseInput)``

export const RuaInput = styled(BaseInput)`
  width: 100%;
`

export const ComplementoInput = styled(BaseInput)`
  width: 70%;
`

export const CidadeInput = styled(BaseInput)`
  width: 75%;
`

export const UFInput = styled(BaseInput)`
  width: 10%;
`

export const FormContainer = styled.div`
  background: ${(props) => props.theme['base-card']};
  color: ${(props) => props.theme['base-text']};

  border-radius: 6px;

  padding: 2.5rem;

  margin-top: 1rem;

  div {
    display: flex;
  }

  form {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;

    div {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    input::placeholder {
      color: ${(props) => props.theme['base-label']};
      font-size: 0.875rem;
    }
  }
`

export const FormHeaderContainer = styled.div`
  display: flex;
  gap: 0.5rem;

  margin-bottom: 2rem;
`

export const FormTitleContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 0.125rem;

  p {
    color: ${(props) => props.theme['base-subtitle']};
  }

  span {
    font-size: 0.875rem;
  }
`

export const PaymentContainer = styled.div`
  background: ${(props) => props.theme['base-card']};
  color: ${(props) => props.theme['base-text']};

  border-radius: 6px;

  padding: 2.5rem;

  margin-top: 0.75rem;

  div {
    display: flex;
    gap: 0.75rem;
  }
`

export const PaymentHeaderContainer = styled(FormHeaderContainer)``
export const PaymentTitleContainer = styled(FormTitleContainer)``

export const PaymentMethod = styled.button`
  background: ${(props) => props.theme['base-button']};
  color: ${(props) => props.theme['base-text']};

  font-size: 0.75rem;

  border: none;
  border-radius: 6px;
  padding: 1rem;

  display: flex;
  align-items: center;
  gap: 0.75rem;

  flex: 1;
`
