import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "johnBui3010@",
    database: "test",
});

app.use(express.json());
app.use(cors());

app.get("/", (req,res) =>{
    res.json("Hello this is backend");
});

app.get("/books", (req,res) =>{
    const q = "SELECT * FROM books"
    db.query(q,(err,data) =>{
        if(err)return res.json(err);
        return res.send(data);
    })
});

app.post ("/books", (req,res) => {
    const insertQuery = "INSERT INTO books (`title`,`desc`,`cover`,`price`) VALUES (?)"
    const bookValues = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ]
    db.query(insertQuery,[bookValues],(err,data) =>{
        if(err) return res.json(err);
        return res.json("Book has been created successfully!");
    })
});

app.delete("/books/:id", (req,res) =>{
    const bookId = req.params.id;
    const q = "DELETE FROM books WHERE id = ?";
    db.query(q,[bookId],(err,data)=>{
        if(err)return res.json(err)
        return res.json("Book has been deleted successfully")
    })
});

app.put("/books/:id",(req,res) =>{
    const bookId = req.params.id;
    console.log(bookId);
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";
    const bookValues = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
        bookId
    ]
    db.query(q,bookValues,(err,data)=>{
        if(err)return res.json(err)
        return res.json("Book has been updated");
    })
})
app.listen(8800, () =>{
    console.log("Connected to backend")
})