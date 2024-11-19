// Creiamo il nostro blog personale e giorno dopo giorno lo potremo arricchire con nuove funzionalità sulla base di quello che impareremo.
// Creiamo il progetto base con una rotta / che ritorna un testo semplice con scritto ”Server del mio blog”
// Creiamo un array dove inserire una lista di almeno 5 post, per ognuno indicare titolo, contenuto, immagine e tags (tags è un array di stringhe)
// Creiamo poi una rotta /bacheca che restituisca un oggetto json con la lista dei post e il conteggio, partendo da un array.
// Configuriamo gli asset statici sull’applicazione in modo che si possano visualizzare le immagini associate ad ogni post.
// Testare le chiamate su Postman!

console.log("Server is running");

//importo express
const express = require("express");

//importo lorem per non scrivere manualmente il contenuto
const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 6,
    min: 3,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

//dichiaro una variabile come express e la porta su cui ascolto
const server = express();
const port = 3000;

//dichiaro la classe post
class post {
  titolo;
  contenuto;
  immagine;
  tags;
  constructor(titolo, contenuto, immagine, tags) {
    this.titolo = titolo;
    this.contenuto = contenuto;
    this.immagine = immagine;
    this.tags = tags;
  }
}

//creo l'array dei posts
const posts = [];
//il primo elemento è il numero di posts presenti, questo per facilitare lo scambio di dati nel json e non aggiungere altri parametri da passare all'utente
posts[0] = 0;

//genero i posts
posts.push(
  new post(
    "Ciambellone",
    lorem.generateSentences(1),
    "images/ciambellone.jpeg",
    ["cibo", "cucina", "hobby", "benessere", "photo", "food porn"]
  )
);

posts.push(
  new post(
    "Pane Fritto Dolce",
    lorem.generateSentences(1),
    "images/pane_fritto_dolce.jpeg",
    ["cibo", "cucina", "hobby", "benessere", "photo", "food porn"]
  )
);

posts.push(
  new post(
    "Cracker Alla Barbabietola",
    lorem.generateSentences(1),
    "images/cracker_barbabietola.jpeg",
    ["cibo", "cucina", "hobby", "benessere", "photo", "food porn"]
  )
);

posts.push(
  new post(
    "Torta Paesana",
    lorem.generateSentences(1),
    "images/torta_paesana.jpeg",
    ["cibo", "cucina", "hobby", "benessere", "photo", "food porn"]
  )
);

posts.push(
  new post(
    "Pasta Alla Barbabietola",
    lorem.generateSentences(1),
    "images/pasta_barbabietola.jpeg",
    ["cibo", "cucina", "hobby", "benessere", "photo", "food porn"]
  )
);

//aggiorno il numero di posts
posts[0] = posts.length - 1;

//rendo visibili i contenuti statici nella cartella public
server.use(express.static("public"));

//gestisco la route "/"
server.get("/", (request, response) => {
  response.send("Server del mio blog");
});

//gestisco la route "/bacheca"
server.get("/bacheca", (request, response) => {
  //salvo la richiesta in una variabile
  const nameFilter = request.query.term;

  //se è presente la richiesta
  if (nameFilter) {
    //salvo il numero di post perchè altrimenti tolowercase crea problemi
    const counter = posts.shift();

    //creo un array con solo gli elementi filtrati
    const filteredPosts = posts.filter((post) => {
      return post.titolo.toLowerCase().includes(nameFilter.toLowerCase());
    });

    //riaggiungo il contatore a posts
    posts.unshift(counter);

    //rispondo con il json contenente i post
    response.json(filteredPosts);
  } else response.json(posts);
});

//ascolto per eventuali richieste
server.listen(port, () => {
  console.log("Il server sta ascoltando sulla porta " + port);
});
