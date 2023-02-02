import express from "express"
import cors from "cors"
import mysql from "mysql2/promise"
import bluebird from "bluebird"
import Fuse from "fuse.js"
import moment from "moment"

const connection= mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "music",
    Promise: bluebird
})
const app= express()
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors())

app.post("/login", async (req, res)=> {
    const {account, password}= req.body
    const [rows]= await connection.execute("SELECT * FROM user WHERE account= ? AND password= ?", [account, password])
    if(rows.length > 0) {
        return res.status(200).json({message: "Đăng nhập thành công", ...rows[0], login: true})
    }
    else {
        return res.status(200).json({message: "Đăng nhập thất bại", login: false})
    }
})

app.get("/search", async(req, res)=> {
    const {q}= req.query
    const options= {
        includeScore: true,
        keys: [
            "genre",
            "artist_name",
            "track_name"
          ]
    }
    const [rows]= await connection.execute("SELECT * FROM song")
    const fuse= new Fuse(rows, options)
    return res.status(200).json(fuse.search(q).slice(0, 10))
})

app.post("/recent-song", async (req, res)=> {
    const [rows]= await connection.execute("INSERT INTO song_recent(id_user, id_song, time_created) VALUES (?, ?, ?)", [req.body.id_user, req.body.id_song, moment(new Date()).valueOf()])
    return res.status(200).send("")
})

app.get("/recent-song", async (req, res)=> {
    const [rows]= await connection.execute("SELECT * FROM song_recent INNER JOIN song ON song_recent.id_song = song.track_id INNER JOIN user ON user.id = song_recent.id_user WHERE song_recent.id_user = ? ORDER BY time_created", [req.query.id_user])
    return res.status(200).json(rows.reverse())

})

app.listen(4000, ()=> console.log("Server run on port 4000"))