document.addEventListener('DOMContentLoaded', () => {
    // Carregar os cards do arquivo JSON
    carregarCards();
  
    // Submeter o formulário para criar um novo card
    const form = document.getElementById('cardForm');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      const imagem = document.getElementById('imagem').value;
      const nome = document.getElementById('nome').value;
      const interpretacao = document.getElementById('interpretacao').value;
      const comentario = document.getElementById('comentario').value;
      const regras = document.getElementById('regras').value;
      const cenarios = document.getElementById('cenarios').value;
      const flexibilidade = document.getElementById('flexibilidade').value;
  
      const cardData = {
        imagem,
        nome,
        interpretacao,
        comentario,
        regras,
        cenarios,
        flexibilidade
      };
  
      // Enviar o novo card para o servidor
      await criarCard(cardData);
  
      // Limpar o formulário
      form.reset();
  
      // Recarregar os cards após a criação de um novo
      carregarCards();
    });
  });
  
  // Função para carregar os cards do servidor
  async function carregarCards() {
    const response = await fetch('/api/cards');
    const cards = await response.json();
  
    const container = document.querySelector('.card-container');
    container.innerHTML = ''; // Limpar os cartões atuais
  
    cards.forEach(card => {
      const cardDiv = criarCardElement(card);
      container.appendChild(cardDiv);
    });
  }
  
  // Função para criar o HTML de um card
  function criarCardElement(card) {
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card');
  
    const cardInner = document.createElement('div');
    cardInner.classList.add('card-inner');
    
    // Parte da frente (imagem)
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
  
    const img = document.createElement('img');
    img.src = card.imagem;
    img.alt = card.nome;
  
    cardFront.appendChild(img);
  
    // Parte de trás (informações)
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    
    const ul = document.createElement('ul');
    
    const fields = [
      { label: 'Nome', value: card.nome },
      { label: 'Interpretação', value: card.interpretacao },
      { label: 'Comentário', value: card.comentario },
      { label: 'Regras de Reconhecimento', value: card.regras },
      { label: 'Cenários', value: card.cenarios },
      { label: 'Flexibilidade', value: card.flexibilidade }
    ];
  
    fields.forEach(field => {
      const li = document.createElement('li');
      const h4 = document.createElement('h4');
      h4.textContent = field.label + ':';
      const p = document.createElement('p');
      p.textContent = field.value;
  
      li.appendChild(h4);
      li.appendChild(p);
      ul.appendChild(li);
    });
  
    const button = document.createElement('button');
    button.textContent = 'Fechar';
    button.onclick = () => {
      cardInner.style.transform = 'rotateY(0deg)';
    };
  
    cardBack.appendChild(ul);
    cardBack.appendChild(button);
  
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    
    cardDiv.appendChild(cardInner);
  
    return cardDiv;
  }
  
  // Função para criar um novo card
  async function criarCard(cardData) {
    const response = await fetch('/api/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardData)
    });
  
    if (!response.ok) {
      alert('Erro ao criar o card!');
    }
  }
  