# Blog-com-Next.js

Execute o comando para baixar as dependências

### yarn

Para iniciar, na raiz do projeto execute

### yarn dev

Para iniciar os testes:

### yarn test

É necessário criar um arquivo de variável local na raiz do projeto  e configurar uma conta no Prismic CMS para utilizar o projeto.

A variável local deve ter o seguinte conteúdo: 

### PRISMIC_API_ENDPOINT= AQUI VAI O ENDPOINT

mais para frente irei explicar melhor tudo.

# Sobre o Projeto

O Spacetraveling é um blog completo feito em Next.js e Prismic CMS

![1](https://user-images.githubusercontent.com/72321264/141834092-8d10ad90-b021-48a1-acdc-240f65a0952b.png)

Na home é possível ver a listagem de posts mais recentes, o usuário pode carregar mais posts clicando em "Carregar mais posts"

![Captura de tela 2021-11-15 152435](https://user-images.githubusercontent.com/72321264/141834500-ac67be9c-628e-4cb2-9bd8-b4c192a18f33.png)

Ao clicar em um post ele é carregado

![Captura de tela 2021-11-15 152557](https://user-images.githubusercontent.com/72321264/141834694-7efd9c91-3ec6-43a6-9b68-093ebb5e271e.png)

##Sobre a arquitetura do projeto

O projeto parece simples e de certo modo é, mas eu criei este projeto para estudar features do Next.js. 
O React.js tem um problema de SEO por se tratar de uma lib SPA os navegadore tem dificuldade em indexar o conteúdo correto na web e o Next.js veio para resolver isso, o Next consegue organizar o conteúdo em páginas individuais podem assim utilizar a componentização do React e seus hooks em um projeto que precisa de SEO.
No projeto eu utilizei as funções getSaticProps e getSaticPaths para gerar páginas estáticas com o conteúdo já inserindo, assim possibilitando um melhor funcionamento do SEO.
Também utilizei Prismic CMS para criação de posts.

## Prismic CMS

Site do Prismic: https://prismic.io/

Acesse o site do prismic e crie uma conta.
Crie um novo repositório com o nome que desejar, em seguida vá até custom types e crie um novo tipo chamado 'post' e selecione 'Repeatable', em seguida a estrutura do post deve ser exatamente como vou passar:
![Captura de tela 2021-11-15 155054](https://user-images.githubusercontent.com/72321264/141837833-f10a631d-6618-4ee2-b3c6-f1595f5e5fc4.png)
No vídeo apresentado, foi possível ver que nosso documento repetível `posts` tem 8 campos. Vamos descrever cada um deles:

- **slug**
    - Tipo: UID
    - Descrição: Identificador único amigável de cada post. Pode receber um valor manualmente ou é gerado automaticamente a partir do primeiro campo de texto preenchido. Esse campo vai ser utilizado na navegação do Next.
- **title**
    - Tipo: Key Text
    - Descrição: Input de strings. Recebe valores manualmente. Esse campo será utilizado como título do Post.
- **subtitle**
    - Tipo: Key Text
    - Descrição: Input de strings. Recebe valores manualmente. Esse campo será utilizado como subtítulo do Post.
- **author**
    - Tipo: Key Text
    - Descrição: Input de strings. Recebe valores manualmente. Esse campo será utilizado como nome do autor do Post.
- **banner**
    - Tipo: Image
    - Configurações do campo:
        
       ![1](https://user-images.githubusercontent.com/72321264/141838103-c3198a6c-8331-4079-b5a7-fc127380dd93.png)

        
    - Descrição: Input de imagens. Recebe valores manualmente. Esse campo será utilizado como banner do Post.
- **content**
    - Tipo: Group
    - Descrição: Grupo de campos repetíveis. Esse campo será utilizado como o conteúdo do Post. O conteúdo será dividido em seções com um campo `heading` e um campo `body`.
    - Campos internos:
        - **heading**
            - Tipo: Key Text
            - Descrição: Input de strings. Recebe valores manualmente. Esse campo será utilizado como título da seção do Post.
        - **body**
            - Tipo: Rich Text
            - Configurações do campo:
                
                ![2](https://user-images.githubusercontent.com/72321264/141838176-7464c80e-a6d4-4348-a7aa-09f56fdb9feb.png)

                
            - Descrição: Input de *rich text* (HTML). Recebe valores manualmente. Esse campo será utilizado como conteúdo da seção do Post. Perceba que nas configurações do campo, selecionamos algumas opções para que o seu texto tenha várias formatações (negrito, hyperlinks, listas, etc.).

Feito isso vá para aba de settings >  API & Security copie o ENDPOINT e cole na variavel local PRISMIC_API_ENDPOINT= COLE AQUI

![Captura de tela 2021-11-15 160256](https://user-images.githubusercontent.com/72321264/141839175-bcfdcc05-5071-4b5c-945c-315a72fcb17e.png)

Feito isso agora é só criar os posts dentro da aba 'documents'.

Em caso de duvida acesse: https://prismic.io/docs/core-concepts/publish-a-new-document

## Técnologias

React.js, Next.js, sass, jest, TypeScript


#NeverStopLearning
