//main backend file

const db=require("./database")//by default it is attacking index.js if we do not write index.js also we will get same output. if we change the filename there would be error if we inclue changed filename there will be no error
const BookModel=require("./database/books")//importind bookmodel
// const mongoose = require('mongoose');//importing mongo db
// console.log(db.books)
// console.log(db.authors)
// console.log(db.publications)//we will get the publications as o/p

const express=require("express");
// const { MongoClient } = require('mongodb');
const app=express();
app.use(express.json())//in post method body will be undifined becoz it cant see body in json format in postman so we use this line to recognize
//the use of express.json func is it is built in middleware func in express it parses incomming req with json payload(body of postmon where we inserted txt) to raw json format in the body

//import the mongoose module
var mongoose = require('mongoose');
//set up default mongoose connection
var mongoDB="mongodb+srv://Harini-Thandoju:o5tgRI9ith3B8oq1@SScluster0.9kg5c.mongodb.net/book-company?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {useNewUrlParser:true, UseUnifiedTopology: true}).then(()=>console.log("CONNECTION ESTABLISHED"));


// const uri = "mongodb+srv://Harini-Thandoju:o5tgRI9ith3B8oq1@cluster0.9kg5c.mongodb.net/book-company?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// client.connect(err => {
//   const bcollection = client.db("book-company").collection("books").findOne({ISBN:"12345Three"});
//  bcollection.then((data)=>console.log(data)).catch((err)=>console.log(err));
// });
// client.close();

// async function listDatabases(client){ 
//     databasesList = await client.db().admin().listDatabases();
//     console.log("THE DATABASES ARE:");
//     databasesList.databases.forEach(db=>console.log(db.name));
// }
// async function main(){
//     const uri = "mongodb+srv://Harini-Thandoju:123YoutubE@$@cluster0.9kg5c.mongodb.net/book-company?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// try{
//     await client.connect();
//     const result= await client.db("book-company").collection("books").findOne({ISBN:"1234Three"});
//     console.log(result)
//     // await listDatabases(client);
// }
// catch(err){
//     console.log(err);
// }
// finally{
//     await client.close();
// }
// }
// main();


//http://localhost:5000/
app.get("/book",(req,res)=>{
    return res.json({"Welcome": 'to my backend software for the book company'})
});

//http://;ocalhost:5000/books
app.get("/books",async(req,res)=>{
    const getAllBooks=await BookModel.find();
    return res.json(getAllBooks)
});

//http://localhost:5000/is/12345Two
app.get("/is/:isbn",(req,res)=>{//isbn and all are variable name//if we do /is in url it will goto particular page or else if no page error messages and :isbn is used to isbn is unique so if we want only one particular book then using :isbn we can directly use number of isbn in url then we can get that particular book
    ///printing isbn thing means requesting parameters because isbn is like  
    const {isbn} =req.params//destructuring it can be written has //const isbn=req.params.isbn//here isbn is bject we r storing the obj value into the isbn variable
    // console.log(isbn)
    const getSpecificBook=db.books.filter((book) => book.ISBN === isbn);//filtering all the books nd checking isbn value with the isbn obj 
    // console.log(getSpecificBook)//printing that 1 book if it s equal
    // console.log(getSpecificBook.length)//if no.of books is 0 display error msg
    if(getSpecificBook.length==0){
        return res.json({"error": 'No Book found for the ISBN of ${isbn}'});
    }
    return res.json(getSpecificBook[0]);//if not zero printing the 1st index book
});
//getting category of specified books    //http://localhost:5000/book-category/programming
app.get("/book-category/:category",(req,res)=>{//category and all are variable name//if we do /book-category in url it will goto particular page or else if no page error messages and :category is used to isbn is unique so if we want only one particular book then using :category we can directly use number of isbn in url then we can get that particular book
    ///printing isbn thing means requesting parameters because isbn is like  
    const {category} =req.params//destructuring it can be written has //const category=req.params.isbn//here isbn is bject we r storing the obj value into the isbn variable
    // console.log(isbn)
    const getSpecificBook=db.books.filter((book) => book.category.includes(category));//category array includes particular category in the specified book(ex:tech ,programming etc..)
    // console.log(getSpecificBook)//printing that 1 book if it s equal
    // console.log(getSpecificBook.length)//if no.of books is 0 display error msg
    if(getSpecificBook.length==0){
        return res.json({"error": 'No Book found for the ISBN of ${isbn}'});
    }
    return res.json(getSpecificBook[0]);//if not zero printing the 1st index book
});
//http://localhost:5000/authorss
app.get("/authors",(req,res)=>{
    const getAllBooks=db.authors
    return res.json(getAllBooks)
});
//to get specific author
//http://localhost:5000/author-id/1
app.get("/author-id/:id",(req,res)=>{ 
    console.log(req.params)
    let {id} =req.params
     id=Number(id);//becoz in our books id is a number not a string in above line it is verifying related to string so we are converting it to number 
    console.log(id)
    const getSpecificBook=db.authors.filter((author) => author.id===id);
    console.log(getSpecificBook)
    console.log(getSpecificBook.length)
    if(getSpecificBook.length===0){
        return res.json({"error": 'No Book found for the ISBN of ${isbn}'});
    }
    return res.json(getSpecificBook[0]);//if not zero printing the 1st index book
});

//if we give isbn number should return all the authors who written that book
//http://localhost:5000/author-isbn/12345Two
app.get("/author-isbn/:isbn", (req,res)=>{

}) ;
//http://localhost:5000/publications
app.get("/publications",(req,res)=>{
    const getAllPublications=db.publications
    return res.json(getAllPublications)
});
//if we give isbn number should return all the publications
//http://localhost:5000/author/12345Two
app.get("/publications-isbn/:isbn", (req,res)=>{

}) ;

//post
//http:///localhost:5000/book
app.post("/book",(req,res)=>{
    console.log(req.body);
    const{newBook}=req.body
    console.log(newBook)
    db.books.push(newBook)//it pushes the new book which we created in the db 
    return res.json(db.books)//returning all the books it will be in temperory database
})
// //http:///localhost:5000/book(short form of above code)there is no need of newBook we can remove it in postman also
// app.post("/book",(req,res)=>{
//     db.books.push(req.body)//it pushes the new book which we created in the db
//     return res.json(db.books)//returning all the books it will be in temperory database
// })
//http://localhost:5000/author
app.post("/author",(req,res)=>{
        db.authors.push(req.body)//it pushes the new book which we created in the db 
        return res.json(db.authors)
});
//http://localhost:5000/publication
app.post("/publication",(req,res)=>{
    db.books.push(req.body)//it pushes the new book which we created in the db 
    return res.json(db.publications)
});
//http:///localhost:5000/book-update/12345ONE(short form of above code)there is no need of newBook we can remove it in postman also
app.put("/book-update/:isbn",(req,res)=>{
    console.log(req.body)
    console.log(req.params);
    const {isbn}=req.params;
    db.books.forEach((book)=>{//foreach is to update the existing data nd store in new book
        if(book.ISBN==isbn){//wrt isbn we check to update the data if it is matched
            console.log(...book, ...req.body)
            return{...book, ...req.body}//we will update the existing data wrt to new data
            //the content in ...req.body overrides the content in ...book
        }
        return book;//if isbn is not equal it returns book
    })
    // db.books.push(req.body);//it pushes the new book which we created in the db
    return res.json(db.books);
});
//http:///localhost:5000/author-update/1(short form of above code)there is no need of newBook we can remove it in postman also
app.put("/author-update/:id",(req,res)=>{
    console.log(req.body)
    console.log(req.params);
    const {id}=req.params;
    db.books.forEach((book)=>{//foreach is to update the(database) existing data nd store the new book
        if(book.id==id){//wrt isbn we check to update the data if it is matched
            console.log(...book, ...req.body)
            return{...book, ...req.body}//we will update the existing data wrt to new data
            //the content in ...req.body overrides the content in ...book
        }
        return book;//if isbn is not equal it returns book
    })
    // db.books.push(req.body);//it pushes the new book which we created in the db
    return res.json(db.books);
});

//http:///localhost:5000/book-delete/12345ONE(short form of above code)there is no need of newBook we can remove it in postman also
app.delete("/book-delete/:isbn",(req,res)=>{
    // console.log(req.body)
    console.log(req.params);
    const {isbn}=req.params;
    const filteredBooks=db.books.filter((book)=> book.ISBN!==isbn);//filtering the isbn id books
    console.log(filteredBooks)
    db.books=filteredBooks
    return res.json(db.books);
});
//http:///localhost:5000/book-author-delete/12345ONE/1
app.delete("/book-author-delete/:isbn/:id",(req,res)=>{
    // console.log(req.params);
    let{isbn,id}=req.params
    id=Number(id)
    db.books.forEach((book)=>{//foreach is to update the(database) existing data nd store the new book
        if(book.ISBN==isbn){//wrt isbn we check to update the data if it is matched
            // console.log(...book, ...req.body)
            if(!book.authors.includes(id)){
                return;
            }
            book.authors=book.authors.filter((author)=>author!==id);
            return book;
        }
        return book;

    })
    return res.json(db.books);
});

//http:///localhost:5000/author-book-delete/1/12345ONE
app.delete("/author-book-delete/:id/:isbn",(req,res)=>{
});
//http:///localhost:5000/author-delete/12345ONE
app.delete("/author-delete/:id",(req,res)=>{
});
//http:///localhost:5000/publication-delete/12345ONE
app.delete("/publication-delete/:id",(req,res)=>{
});
app.delete("/author-delete/:isbn",(req,res)=>{
});


app.listen(5000,()=>{
console.log("My express app is running......")
});
