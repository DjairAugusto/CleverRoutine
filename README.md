# 📅 Clever Routine

**Clever Routine** é uma ferramenta online desenvolvida para ajudar os usuários a gerenciar seu tempo de estudo de forma eficiente e evitar a procrastinação.

## 👨‍🏫 Alunos Integrantes da Equipe

- Djair Augusto Galdino Soares
- Gustavo Ignácio Moreira da Silva
- Luiz Arthur Costa E Costa
- Pedro Henrique Maia Alves
- Vinicius Paranho Ribeiro

## 👨‍🏫 Professores Responsáveis

- Cleiton Silva Tavares
- Diego Augusto de Faria Barros

## 📖 Introdução

O site de combate à procrastinação foi criado para auxiliar os usuários a gerenciar seu tempo de estudo de forma eficiente, evitando a procrastinação. Utilizando técnicas como o método Pomodoro, o site oferece uma experiência personalizada para maximizar a produtividade dos usuários.

## ❓ Problema

A procrastinação é um desafio comum enfrentado por estudantes e profissionais. A falta de gestão do tempo e de técnicas eficazes de estudo muitas vezes resulta em atrasos nas tarefas e comprometimento do desempenho acadêmico ou profissional.

## 🎯 Objetivos

O objetivo principal do projeto é fornecer uma plataforma acessível e intuitiva que ajude os usuários a superar a procrastinação e aprimorar sua produtividade. O site oferecerá ferramentas de gerenciamento de tempo, como cronômetros e técnicas de estudo comprovadas.

## 💡 Justificativa

Este projeto se justifica pela necessidade de oferecer uma solução prática e eficaz para um problema generalizado. Ao disponibilizar uma variedade de métodos de estudo e ferramentas de gerenciamento de tempo em um único local, o site atende às necessidades diversificadas dos usuários, ajudando-os a alcançar seus objetivos acadêmicos e profissionais de maneira mais eficiente.

## 🏫 Público-Alvo

O público-alvo inclui estudantes de todos os níveis educacionais, desde o ensino fundamental até a pós-graduação, e profissionais que buscam aprimorar suas habilidades e conhecimentos. O site é projetado para ser acessível e útil para qualquer pessoa que deseje melhorar sua produtividade e superar a procrastinação.

## 📋 Especificações do Projeto

### Personas

Criamos personas para entender melhor as necessidades dos usuários e ajudar na criação de um espaço que permita a concentração e organização das tarefas diárias através de um calendário específico e personalizado.

- **Persona Carlos**
- **Persona Marina**

### Requisitos Funcionais

| ID     | Descrição do Requisito     | Prioridade |
|--------|----------------------------|------------|
| RF-001 | Quadro de rotina           | MÉDIA      |
| RF-002 | Guia de funcionalidades    | ALTA       |
| RF-003 | Calendário de organização  | MÉDIA      |
| RF-004 | Tela de usuário            | ALTA       |
| RF-005 | Tela de cadastro           | ALTA       |

### Requisitos Não Funcionais

| ID      | Descrição do Requisito                                  | Prioridade |
|---------|---------------------------------------------------------|------------|
| RNF-001 | Poderá ser utilizado pelos diversos navegadores e plataformas | ALTA       |
| RNF-002 | O sistema será feito principalmente em HTML, CSS e JavaScript | BAIXA      |

### Restrições

| ID  | Restrição                                        |
|-----|--------------------------------------------------|
| 01  | O projeto deverá ser entregue até o final do semestre |
| 02  | Não pode ser desenvolvido um módulo de backend   |

## 💻 Projeto de Interface

Para o desenvolvimento da interface, levamos em conta os requisitos levantados e conceitos básicos de UX design, visando um site simples, funcional e agradável.

### Wireframes

- **Desktop**: [Wireframe do projeto](#)
- **Mobile**: [Wireframe do projeto](#)

## 🔄 Metodologia

Utilizamos o Scrum Framework como ferramenta para auxiliar no andamento do projeto, com reuniões diárias no Discord para definir os próximos passos.

## 🔧 Divisão de Papéis

- **Djair**: Design do site, Layout Responsivo, Playlist Musical, Cronômetro
- **Vinícius**: Tela de informação de usuários, Lista de tarefas usuário
- **Gustavo**: Área de login, Cadastro de Usuário, Tela feed de notícias
- **Pedro**: Cadastro de Tarefas no calendário, Apresentação de conquistas de tarefas
- **Luiz**: Apresentação do Calendário, Feed de notícias com API

## 🛠️ Ferramentas

| Ambiente                        | Plataforma | Link de Acesso                                  |
|---------------------------------|------------|-------------------------------------------------|
| Processo de Design Thinking     | Miro       | [Link](https://miro.com/app/board/uXjVKVlpFhk=) |
| Repositório de código           | GitHub     | [Link](https://github.com/ICEI-PUC-Minas-PMGES-TI/pmg-es-2024-1-ti1-2010100-clever-routine/blob/master/docs/relatorio/Relatorio%20Tecnico%20-%20TEMPLATE.md) |
| Hospedagem do site              | Vercel     | [Link](https://clever-routine.vercel.app) |                                          
| Protótipo Interativo            | Figma      | [Link](https://www.figma.com/file/3GYLRk2BPxz3O2QGdERsL4/Untitled?type=design&node-id=0-1&mode=design&t=yUL354WsuLnD6Kub-0) |

## 🛠️ Projeto da Solução

O site oferece múltiplas ferramentas para ajudar o usuário a organizar suas tarefas e obrigações diárias:

- Sistema de cadastro de tarefas
- Calendário para acompanhar as tarefas cadastradas
- Cronômetro para o método Pomodoro
- Feed de notícias
- Sistema de conquistas
- Sistema de playlists

## 🧑‍💻 Tecnologias Utilizadas

As principais tecnologias utilizadas foram:

- **HTML** para criação dos elementos do site
- **CSS** para estilização e apresentação do site
- **JavaScript** para desenvolvimento das funcionalidades não-estáticas

O Feed de Notícias utiliza a News API para entregar notícias em formato JSON.

## 📝 Avaliação da Aplicação

Os cenários de testes elaborados variaram desde testes de unidade a testes de integração. Foram identificados pontos fortes e fracos, e adotamos um plano de ação para melhorias.

### Pontos Fortes Identificados

- **Cadastro de Usuário e Tarefas**: Robusto com boa validação de campos obrigatórios.
- **Funcionalidades Gerais**: Reprodução de músicas, cronômetro Pomodoro e feed de notícias funcionaram conforme esperado.
- **Segurança e Navegação**: Sistema de autenticação eficiente.

### Pontos Fracos Identificados

- **Calendário**: Inconsistências na exibição das tarefas ao navegar entre os meses.
- **Exclusão de Tarefas**: Falhas intermitentes na exclusão de tarefas.

### Plano de Ação

- **Calendário**: Revisão completa da lógica de atualização e implementação de testes adicionais.
- **Exclusão de Tarefas**: Depuração detalhada e reforço nos testes de integração.

Com estas melhorias, esperamos proporcionar uma experiência ainda melhor para os usuários.

---

Divirta-se gerenciando seu tempo e vencendo a procrastinação! 🚀✨
