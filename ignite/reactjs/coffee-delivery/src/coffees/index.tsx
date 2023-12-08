import expresso from '../assets/coffees/expresso.svg'
import expressoAmericano from '../assets/coffees/americano.svg'
import expressoCremoso from '../assets/coffees/expresso-cremoso.svg'
import expressoGelado from '../assets/coffees/expresso-gelado.svg'
import cafeComLeite from '../assets/coffees/cafe-com-leite.svg'
import latte from '../assets/coffees/latte.svg'
import capuccino from '../assets/coffees/capuccino.svg'
import macchiato from '../assets/coffees/macchiato.svg'
import mocaccino from '../assets/coffees/mocaccino.svg'
import chocolateQuente from '../assets/coffees/chocolate-quente.svg'
import cubano from '../assets/coffees/cubano.svg'
import havaiano from '../assets/coffees/havaiano.svg'
import arabe from '../assets/coffees/arabe.svg'
import irlandes from '../assets/coffees/irlandes.svg'

interface Coffee {
  id: number
  title: string
  description: string
  tags: string[]
  img: string
  price: number
}

const coffees: Coffee[] = [
  {
    id: 1,
    title: 'Expresso Tradicional',
    description: 'O tradicional café feito com água quente e grãos moídos',
    tags: ['Tradicional'],
    img: expresso,
    price: 9.9,
  },
  {
    id: 2,
    title: 'Expresso Americano',
    description: 'Expresso diluído, menos intenso que o tradicional',
    tags: ['Tradicional'],
    img: expressoAmericano,
    price: 9.9,
  },
  {
    id: 3,
    title: 'Expresso Cremoso',
    description: 'Café expresso tradicional com espuma cremosa',
    tags: ['Tradicional'],
    img: expressoCremoso,
    price: 9.9,
  },
  {
    id: 4,
    title: 'Expresso Gelado',
    description: 'Bebida preparada com café expresso e cubos de gelo',
    tags: ['Tradicional', 'Gelado'],
    img: expressoGelado,
    price: 9.9,
  },
  {
    id: 5,
    title: 'Café com Leite',
    description: 'Meio a meio de expresso tradicional com leite vaporizado',
    tags: ['Tradicional', 'Com Leite'],
    img: cafeComLeite,
    price: 9.9,
  },
  {
    id: 6,
    title: 'Latte',
    description:
      'Uma dose de café expresso com o dobro de leite e espuma cremosa',
    tags: ['Tradicional', 'Com Leite'],
    img: latte,
    price: 9.9,
  },
  {
    id: 7,
    title: 'Capuccino',
    description:
      'Bebida com canela feita de doses iguais de café, leite e espuma',
    tags: ['Tradicional', 'Com Leite'],
    img: capuccino,
    price: 9.9,
  },
  {
    id: 8,
    title: 'Macchiato',
    description:
      'Café expresso misturado com um pouco de leite quente e espuma',
    tags: ['Tradicional', 'Com Leite'],
    img: macchiato,
    price: 9.9,
  },
  {
    id: 9,
    title: 'Mocaccino',
    description: 'Café expresso com calda de chocolate, pouco leite e espuma',
    tags: ['Tradicional', 'Com Leite'],
    img: mocaccino,
    price: 9.9,
  },
  {
    id: 10,
    title: 'Chocolate Quente',
    description: 'Bebida feita com chocolate dissolvido no leite quente e café',
    tags: ['Especial', 'Com Leite'],
    img: chocolateQuente,
    price: 9.9,
  },
  {
    id: 11,
    title: 'Cubano',
    description:
      'Drink gelado de café expresso com rum, creme de leite e hortelã',
    tags: ['Especial', 'Alcoólico', 'Gelado'],
    img: cubano,
    price: 9.9,
  },
  {
    id: 12,
    title: 'Havaiano',
    description: 'Bebida adocicada preparada com café e leite de coco',
    tags: ['Especial'],
    img: havaiano,
    price: 9.9,
  },
  {
    id: 13,
    title: 'Árabe',
    description: 'Bebida preparada com grãos de café árabe e especiarias',
    tags: ['Especial'],
    img: arabe,
    price: 9.9,
  },
  {
    id: 14,
    title: 'Irlandês',
    description: 'Bebida a base de café, uísque irlandês, açúcar e chantilly',
    tags: ['Especial', 'Alcoólico'],
    img: irlandes,
    price: 9.9,
  },
]

export default coffees
