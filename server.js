const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const dataFolder = path.join(__dirname, 'data');

// Verifique se a pasta "data" existe, se não, crie-a
if (!fs.existsSync(dataFolder)) {
  fs.mkdirSync(dataFolder);
}

app.use(express.json());
app.use(express.static('public')); // Para servir arquivos estáticos como HTML, CSS, JS

// Rota para obter todos os cartões
app.get('/api/cards', (req, res) => {
  fs.readdir(dataFolder, (err, files) => {
    if (err) {
      return res.status(500).send('Erro ao ler os arquivos de dados.');
    }

    const cards = files.filter(file => file.endsWith('.json')).map(file => {
      const data = fs.readFileSync(path.join(dataFolder, file), 'utf-8');
      return JSON.parse(data);
    });

    res.json(cards);
  });
});

// Rota para criar um novo cartão
app.post('/api/cards', (req, res) => {
  const cardData = req.body;

  // Pegar o último ID e incrementar
  fs.readdir(dataFolder, (err, files) => {
    if (err) {
      return res.status(500).send('Erro ao ler os arquivos de dados.');
    }

    // Encontrar o maior número de ID
    const lastId = files.reduce((max, file) => {
      const match = file.match(/^(\d+)_/);
      if (match) {
        const id = parseInt(match[1], 10);
        return id > max ? id : max;
      }
      return max;
    }, 0);

    const newId = String(lastId + 1).padStart(2, '0'); // Incrementa o ID
    const filename = `${newId}_${cardData.nome.toLowerCase().replace(/\s+/g, '_')}.json`;

    const cardFilePath = path.join
})})