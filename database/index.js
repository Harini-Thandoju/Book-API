let books = [
    {
      ISBN: "12345ONE",//isbn is unique id  for books
      title: "Getting started with MERN",
      authors: [1, 2],//why author name is not written becoz id would be unique but author is not to  remove that confunsion
      language: "en",
      pubDate: "2021-07-07",
      numOfPage: 225,
      category: ["fiction", "programming", "tech", "web dev"],
      publication: 1,
    },
    {
      ISBN: "12345Two",
      title: "Getting started with Python",
      authors: [1, 2],
      language: "en",
      pubDate: "2021-07-07",
      numOfPage: 225,
      category: ["fiction", "tech", "web dev"],
      publication: 1,
    },
  ];
  
  let authors = [
    {
      id: 1,
      name: "nikhil",
      books: ["12345ONE", "12345Two"],//tittle can b same becoz we use id's
    },
    {
      id: 2,
      name: "ram",
      books: ["12345ONE","12345Two"],
    },
  ];
  
  let publications = [
    {
      id: 1,
      name: "ShapeAI Publications",
      books: ["12345ONE","12345Two"],
    },
    {
      id: 2,
      name: "Agarwal Publications",
      books: [],
    },
  ];

  module.exports={books,authors,publications}//exporting all those data