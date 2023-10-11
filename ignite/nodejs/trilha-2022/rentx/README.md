# RentX

### Requisitos
 **RF**:  Requisitos Funcionais<br>
 **RNF**: Requisitos Não Funcionais<br>
 **RN**:  Regra de Negócio<br>

## Cadastro de carro

**RF**
- Deve ser possível cadastrar um novo carro
- Deve ser possível listar todas as categorias

**RN**
- Não deve ser possível cadastrar um carro com uma placa já existente
- Não deve ser possível alterar a placa de um carro já cadastrado
- O carro deve ser cadastrado, por padrão, como disponível
- Apenas usuários administradores podem cadastrar um novo carro


## Listar carros

**RF**
- Deve ser possível listar todos os carros disponíveis
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria
- Deve ser possível listar todos os carros disponíveis pelo nome do carro
- Deve ser possível listar todos os carros disponíveis pelo nome da marca

**RN**
- O usuário não precisa estar logado para listar os carros cadastrados


## Cadastro de especificações no carro

**RF**
- Deve ser possível cadastrar uma ou mais especificações para um carro
- Deve ser possível listar todas as especificações
- Deve ser possível listar todos os carros

**RN**
- Não deve ser possível cadastrar uma especificação para um carro não cadastrado
- Não deve ser possível cadastrar especificações com nomes duplicados para o mesmo carro
- Apenas usuários administradores podem cadastrar uma nova especificação


## Cadastro de imagens do carro

**RF**
- Deve ser possível cadastrar a imagem do carro
- Deve ser possível listar todos os carros

**RNF**
- Utilizar o multer para upload dos arquivos

**RN**
- O usuário pode cadastrar mais de uma imagem para o mesmo carro
- Apenas usuários administradores podem cadastrar as imagens

## Aluguel de carro

**RF**
- Deve ser possível cadastrar um aluguel

**RN**
- O aluguel deve ter duração mínima de 24 horas
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
- Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro