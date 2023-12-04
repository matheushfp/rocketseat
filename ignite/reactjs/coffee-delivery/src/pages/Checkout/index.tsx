import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
} from '@phosphor-icons/react'
import {
  BairroInput,
  CEPInput,
  CheckoutContainer,
  CidadeInput,
  ComplementoInput,
  FormContainer,
  FormHeaderContainer,
  FormTitleContainer,
  NumeroInput,
  PaymentContainer,
  PaymentHeaderContainer,
  PaymentMethod,
  PaymentTitleContainer,
  RuaInput,
  UFInput,
} from './styles'

export function Checkout() {
  return (
    <CheckoutContainer>
      <h4>Complete seu pedido</h4>
      <FormContainer>
        <FormHeaderContainer>
          <MapPinLine size={22} color="#C47F17" />
          <FormTitleContainer>
            <p>Endereço de Entrega</p>
            <span>Informe o endereço onde deseja receber seu pedido</span>
          </FormTitleContainer>
        </FormHeaderContainer>

        <form action="">
          <div>
            <CEPInput type="text" id="CEP" placeholder="CEP" />
          </div>

          <div>
            <RuaInput type="text" id="Rua" placeholder="Rua" />
          </div>

          <div>
            <NumeroInput type="number" id="Numero" placeholder="Número" />
            <ComplementoInput
              type="text"
              id="Complemento"
              placeholder="Complemento"
            />
          </div>

          <div>
            <BairroInput type="text" id="Bairro" placeholder="Bairro" />
            <CidadeInput type="text" id="Cidade" placeholder="Cidade" />
            <UFInput type="text" id="UF" placeholder="UF" />
          </div>
        </form>
      </FormContainer>

      <PaymentContainer>
        <PaymentHeaderContainer>
          <CurrencyDollar size={22} color="#8047F8" />
          <PaymentTitleContainer>
            <p>Pagamento</p>
            <span>
              O pagamento é feito na entrega. Escolha a forma que deseja pagar
            </span>
          </PaymentTitleContainer>
        </PaymentHeaderContainer>

        <div>
          <PaymentMethod>
            <CreditCard color="#8047F8" />
            CARTÃO DE CRÉDITO
          </PaymentMethod>
          <PaymentMethod>
            <Bank color="#8047F8" />
            CARTÃO DE DÉBITO
          </PaymentMethod>
          <PaymentMethod>
            <Money color="#8047F8" />
            DINHEIRO
          </PaymentMethod>
        </div>
      </PaymentContainer>

      <h4>Cafés selecionados</h4>
    </CheckoutContainer>
  )
}
