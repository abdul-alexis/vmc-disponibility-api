# dash-api

Instruções de git
=======================================

- Clonar um repositório remoto:
>`git clone url-repositorio`

- Visualização de branch:
>`git branch`

- Criação de branch:
>`git branch nome-branch`

- Mudança para uma branch:
>`git checkout nome-branch`

- Criação e mudança para nova branch (engloba os dois comandos anteriores):
>`git checkout -b nova-branch`

- Inspeção de arquivos:
>`git status`

- Adição de arquivo específico ao staging para commit:
>`git add arquivo`

- Adição de todos os arquivos ao staging para commit:
>`git add .`

- Confirmação das mudanças(Commit):
>`git commit -m "mensagem de commit"`

- Histórico de commit:
>`git log`

- Envio para repositório remote (apenas na primeira vez):
>`git push -u origin nova-branch`

- Envio para repositório remote:
>`git push`

- Adicionar para o repositório local as mudanças do repositório remote:
>`git pull`



Fluxo de Trabalho
=======================================

- A branch **_main_** é responsável pelo código final que está em produção.
- A branch **_dev_** é resposável pelo código em desenvolvimento. É dessa branch **_dev_** que cada um vai criar outra branch para fazer mudança no código. Essa branch deve está sempre atualizada.
- Toda nova implementação tem que seguir esse fluxo:


1. Atualização do repositório local
2. Criação de branch nova para a implementação a partir de **_dev_**.
3. Fazer a implementação.
4. Adicionar a implementação no staging e commitar com uma mensagem que indicar o que foi implementado.
5. Subir a implementaçao para o repositório remote para revisão e pull request.

**_NB_**:*É recomendado dividir as implementações para não gerar muitos códigos. Isso facilita a revisão dos colegas.*

### Exemplo: Vamos fazer uma nova implementação, adicionar um arquivo readme no projeto.

1. Vamos atualizar o repositório local:
>`git pull`

2. A partir da branch **_dev_**, vamos criar uma nova branch chamado **_readme_**
>`git checkout -b readme`

3. Depois de fazer nossas mudanças, vamos adicionar no staging e commitar

>```
>git add .
>git commit -m "adicionando o arquivo de instrução no projeto"
>```

4. Enviar essa mudança para o repositório remoto
>`git push -u origin readme`

5. Finalemente, fazer pull request no github



## Parametro do Projeto
```
npm install
```

### Hot-reloads for development
```
npm run dev
```

### Run  for production
```
npm run start
```




