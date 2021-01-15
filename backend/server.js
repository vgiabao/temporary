
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const path= require('path')
const app = express();
const PORT = 4000;
const bodyParser = require("body-parser");
//read information from the front-end
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

const selectAll = "SELECT * FROM movies";

const connection = mysql.createConnection({
    host: "sql12.freesqldatabase.com",
    user: "sql12387050",
    password: "bvCRHytYWT",
    database: "sql12387050",
    port: '3306'})
connection.connect(err => {
    if (err) {
        console.log(err);
        return;
    }
})

app.get('/', (req, res) => {
    const getMovieString = "SELECT * FROM movies;"
    connection.query(getMovieString, (err, result) => {
        if (err) console.log(err);
        else {
            return res.json({data: result})
        }
    })

})

app.get("/register", function (req, res) {

});
app.post("/register/add", (req, res) => {
    const account = req.body.account;
    const name = req.body.name;
    const password = req.body.password;
    const phone = req.body.phone;
    const email = req.body.email;
    const address = req.body.address;
    const insert_query = "INSERT INTO users (account,name,type,phone,email,address,password) VALUES (?,?,1,?,?,?,?)"
    connection.query(insert_query, [account, name, phone, email,address,password], (err, result) => {
        console.log(err)
    })
})

app.get("/login/get", (req, res) => {
    const account = req.query.account;
    const password = req.query.password;
    // const params = new URLSearchParams(window.location.search)
    const getUserString = "SELECT * FROM users WHERE account='"+ account+"' AND password='"+password+"' ;"
    connection.query(getUserString, [account, password], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
                return res.json({data: result});
        }
    })
})


app.get('/user/user-list', (req, res)=>{
        const getUserString = "SELECT * FROM users;"
        connection.query(getUserString, (err, result) => {
            if (err) console.log(err);
            else return res.json({data: result})
        })

})

app.get("/user", (req, res) =>{
    const id = req.query.id;
    const getUserString = "SELECT * FROM users WHERE user_id=" + id + ";"
    connection.query(getUserString, (err, result) => {
        if (err) console.log(err);
        else return res.json({data: result})
    })
})

app.get("/product", (req, res) => {
    connection.query(selectAll, (err, result) => {
        if (err) return res.send(err);
        else {
            return res.json({
                data: result
            })
        }
    })
})

app.get("/movie", (req, res) => {
    const id = req.query.id;
    const selectFilm = "SELECT * FROM movies m, movie_detail md WHERE m.id="+id+" and m.id=md.movie_id;";
    connection.query(selectFilm, (err, result) => {
        if (err) return res.send(err);
        else {
            return res.json({
                data: result
            })
        }
    })
})


app.get("/movie/booking", (req, res) => {
    const id = req.query.id;
    const bookings = "SELECT seat_index, user_index FROM movie_viewer where movie_detail_index='"+id+"'";
    connection.query(bookings, (err, result) => {
        if (err) return res.send(err);
        else {
            return res.json({
                data: result
            })
        }
    })
})
app.post("/movie/booking", (req, res) => {
    const movieIndex = req.body.movieIndex;
    const seatIndex = req.body.seatIndex;
    const userIndex = req.body.userIndex;
    const insert_query = "INSERT INTO movie_viewer (movie_detail_index, seat_index, user_index) VALUES (?,?,?)"
    connection.query(insert_query, [movieIndex, seatIndex, userIndex], (err, result) => {
        console.log(err)
    })
})


app.post("/user/add-screening", (req, res) => {
    const id = req.body.id;
    const starting_time = req.body.starting_time;
    const price = req.body.price;
    const number_viewer = req.body.number_viewer;
    const insert_query = "INSERT INTO movie_detail ( movie_id, starting_time, number_viewer, price) VALUES (?,?,?,?)"
    connection.query(insert_query, [id, starting_time, number_viewer, price], (err, result) => {
        console.log(err)
    })
})

app.post('/user/add-Movie', (req, res)=>{
    const name = req.body.name;
    const description = req.body.description;
    const short_description = req.body.short_description;
    const category_id = req.body.category_id;
    const image = req.body.image;
    const insert_query = "INSERT INTO movies ( name, description, short_description, category_id, image) VALUES (?,?,?,?,?)"
    connection.query(insert_query, [name, description, short_description, category_id,image], (err, result) => {
        console.log(err)
    })
})

app.put("/user/update-movie", (req, res)=>{
    const id = req.body.params.id;
    const name = req.body.params.name;
    const description = req.body.params.description;
    const short_description = req.body.params.short_description;
    const category_id = req.body.params.category_id;
    const image = req.body.params.image;
    const update = "UPDATE movies SET name='"+name+"', description='"+description+"', short_description='" + short_description +"', " +
        "category_id='"+category_id +"', image='" + image+"' where" +
        " id='"+id+"';";
    connection.query(update, (err,result)=>{
        if (err) console.log(err);
        else console.log('successfully update user')
    });

})


app.get('/user/history', (req, res) => {
    const id = req.query.id;
    const history = "SELECT COUNT(*) as count, short_description, image, starting_time, price, name FROM movies m, movie_viewer mv, movie_detail md  " +
        "WHERE mv.user_index='"+id+"' and md.id = mv.movie_detail_index and m.id=md.movie_id GROUP BY movie_detail_index"
    connection.query(history, (err, result) => {
        if (err) return res.send(err);
        else {
            console.log('successfully update user')
            return res.json({
                data: result
            })
        }
    })
})

app.put('/user/update-user', (req, res)=>{
    const id = req.body.params.id;
    const name = req.body.params.name;
    const phone = req.body.params.phone;
    const email = req.body.params.email;
    const address = req.body.params.address;
    const type = req.body.params.type;
    const update = "UPDATE users SET name='"+name+"', phone='"+phone+"', email='" + email +"', address='"+address +"', type='" + type+"' where" +
        " user_id='"+id+"';";
    connection.query(update, (err,result)=>{
        if (err) console.log(err);
        else console.log('successfully update user')
    });

})

app.put('/user/update-movie', (req, res)=>{
    const id = req.body.params.id;
    const starting_time =req.body.params.starting_time;
    const price = req.body.params.price;
    console.log(price)
    console.log(typeof  price)
    const number_viewer = req.body.params.number_viewer;
    const update = "UPDATE movie_detail SET starting_time='"+starting_time+"', price='"+price+"', number_viewer='"
        + number_viewer +"' WHERE id='" + id+"'"
    // const update = "UPDATE movie_detail SET starting_time=STR_TO_DATE('"+starting_time+"','%H:%M:%S %d-%m-%y'), price='"+price+"', number_viewer='"
    //     + number_viewer +"' WHERE id='" + id+"'"
    connection.query(update, (err,result)=>{
        if (err) console.log(err);
        else console.log('successfully update movie')
    });

})









app.post("/admin/add", (req, res) => {

})


// serve static access production
if (process.env.NODE_ENV === 'production'){
    // set static folder
    app.use(express.static('client/build'))
    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })

}



app.listen(PORT, () => {
    console.log("listen from port " + PORT )
})

// app.listen(PORT+"/product", ()=>{
//     console.log("welcome to product website");
// })
