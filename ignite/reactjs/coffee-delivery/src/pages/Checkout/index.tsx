import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
} from '@phosphor-icons/react'
import {
  AddressInfoContainer,
  AddressInfoHeaderContainer,
  AddressInfoTitleContainer,
  BairroInput,
  CEPInput,
  CartDetailed,
  CheckoutContainer,
  CidadeInput,
  ComplementoInput,
  ConfirmButton,
  CostsContainer,
  FormContainer,
  FormRow,
  NumeroInput,
  PaymentContainer,
  PaymentErrorMessage,
  PaymentHeaderContainer,
  PaymentMethods,
  PaymentTitleContainer,
  RuaInput,
  UFInput,
} from './styles'
import { CartItem } from './components/CartItem'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useCart } from '../../hooks/useCart'
import coffees from '../../coffees'

type FormInputs = {
  cep: string
  street: string
  number: number
  complement: string
  neighborhood: string
  city: string
  state: string
  paymentMethod: 'credit' | 'debit' | 'cash'
}

const orderValidationSchema = z.object({
  cep: z
    .string()
    .min(1, 'Informe o CEP')
    .max(10, 'Informe o CEP')
    .transform((value) => {
      const formattedCEP = parseInt(value.replace('.', '').replace('-', ''))
      return formattedCEP
    }),
  street: z.string().min(1, 'Informe a rua'),
  number: z.number().min(1, 'Informe o número'),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, 'Informe o bairro'),
  city: z.string().min(1, 'Informe a cidade'),
  state: z.string().min(1, 'Informe a UF').max(2),
  paymentMethod: z.enum(['credit', 'debit', 'cash'], {
    invalid_type_error: 'Selecione um método de pagamento',
  }),
})

export type OrderInfo = z.infer<typeof orderValidationSchema>

export function Checkout() {
  const { cart, checkout } = useCart()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(orderValidationSchema),
  })

  const prices = cart.map((item) => {
    const coffee = coffees.find((coffee) => coffee.id === item.id)
    return coffee!.price * item.quantity
  })

  const shippingPrice = 3.5

  let cartIsEmpty: boolean
  if (cart.length === 0) {
    cartIsEmpty = true
  } else {
    cartIsEmpty = false
  }

  function onSubmit(data) {
    checkout(data)
  }

  return (
    <CheckoutContainer>
      <div>
        <h4>Complete seu pedido</h4>
        <FormContainer>
          <form id="order" onSubmit={handleSubmit(onSubmit)}>
            <AddressInfoContainer>
              <AddressInfoHeaderContainer>
                <MapPinLine size={22} color="#C47F17" />
                <AddressInfoTitleContainer>
                  <span>Endereço de Entrega</span>
                  <p>Informe o endereço onde deseja receber seu pedido</p>
                </AddressInfoTitleContainer>
              </AddressInfoHeaderContainer>

              <FormRow>
                <CEPInput
                  type="text"
                  id="CEP"
                  placeholder="CEP"
                  maxLength={10}
                  {...register('cep')}
                />
              </FormRow>

              <FormRow>
                <RuaInput
                  type="text"
                  id="Rua"
                  placeholder="Rua"
                  {...register('street')}
                />
              </FormRow>

              <FormRow>
                <NumeroInput
                  type="number"
                  id="Numero"
                  placeholder="Número"
                  {...register('number', { valueAsNumber: true })}
                />

                <ComplementoInput
                  type="text"
                  id="Complemento"
                  placeholder="Complemento"
                  {...register('complement')}
                />
              </FormRow>

              <FormRow>
                <BairroInput
                  type="text"
                  id="Bairro"
                  placeholder="Bairro"
                  {...register('neighborhood')}
                />
                <CidadeInput
                  type="text"
                  id="Cidade"
                  placeholder="Cidade"
                  {...register('city')}
                />
                <UFInput
                  type="text"
                  id="UF"
                  placeholder="UF"
                  maxLength={2}
                  {...register('state')}
                />
              </FormRow>
            </AddressInfoContainer>

            <PaymentContainer>
              <PaymentHeaderContainer>
                <CurrencyDollar size={22} color="#8047F8" />
                <PaymentTitleContainer>
                  <span>Pagamento</span>
                  <p>
                    O pagamento é feito na entrega. Escolha a forma que deseja
                    pagar
                  </p>
                </PaymentTitleContainer>
              </PaymentHeaderContainer>

              <PaymentMethods>
                <input
                  type="radio"
                  id="credit"
                  value="credit"
                  {...register('paymentMethod')}
                />
                <label htmlFor="credit">
                  <CreditCard color="#8047F8" />
                  CARTÃO DE CRÉDITO
                </label>

                <input
                  type="radio"
                  id="debit"
                  value="debit"
                  {...register('paymentMethod')}
                />
                <label htmlFor="debit">
                  <Bank color="#8047F8" />
                  CARTÃO DE DÉBITO
                </label>

                <input
                  type="radio"
                  id="cash"
                  value="cash"
                  {...register('paymentMethod')}
                />
                <label htmlFor="cash">
                  <Money color="#8047F8" />
                  DINHEIRO
                </label>
              </PaymentMethods>
              {Object.keys(errors).length !== 0 ? (
                <PaymentErrorMessage>
                  <div>
                    <p>{errors.cep?.message}</p>
                    <p>{errors.street?.message}</p>
                    <p>
                      {Object.keys(errors).includes('number')
                        ? 'Informe o número'
                        : null}
                    </p>
                    <p>{errors.neighborhood?.message}</p>
                  </div>

                  <div>
                    <p>{errors.city?.message}</p>
                    <p>{errors.state?.message}</p>
                    <p>{errors.paymentMethod?.message}</p>
                    {cart.length === 0 ? (
                      <p>O carrinho deve possuir ao menos um produto</p>
                    ) : null}
                  </div>
                </PaymentErrorMessage>
              ) : null}
            </PaymentContainer>
          </form>
        </FormContainer>
      </div>

      <div>
        <h4>Cafés selecionados</h4>
        <CartDetailed>
          {cart.map((item) => {
            const coffee = coffees.find((coffee) => coffee.id === item.id)
            return (
              <CartItem
                key={coffee!.id}
                id={coffee!.id}
                img={coffee!.img}
                title={coffee!.title}
                basePrice={coffee!.price}
                quantity={item.quantity}
              />
            )
          })}
          <CostsContainer>
            <div>
              <p>Total de items</p>
              {prices.length !== 0 ? (
                <p>{`R$ ${prices
                  .reduce((acc, currentValue) => acc + currentValue)
                  .toFixed(2)
                  .replace('.', ',')}`}</p>
              ) : (
                <p>R$ 0,00</p>
              )}
            </div>

            <div>
              <p>Entrega</p>
              {prices.length !== 0 ? (
                <p>{`R$ ${shippingPrice.toFixed(2).replace('.', ',')}`}</p>
              ) : (
                <p>R$ 0,00</p>
              )}
            </div>

            <div>
              <strong>Total</strong>
              {prices.length !== 0 ? (
                <strong>{`R$ ${(
                  prices.reduce((acc, currentValue) => acc + currentValue) +
                  shippingPrice
                )
                  .toFixed(2)
                  .replace('.', ',')}`}</strong>
              ) : (
                <strong>R$ 0,00</strong>
              )}
            </div>
          </CostsContainer>
          <ConfirmButton type="submit" form="order" disabled={cartIsEmpty}>
            CONFIRMAR PEDIDO
          </ConfirmButton>
        </CartDetailed>
      </div>
    </CheckoutContainer>
  )
}
