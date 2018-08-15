const { Client } = require('pg');
const express = require('express');

// create an express application
const app = express();
app.use(express.json());
// create a postgresql client
const client = new Client({
    database: 'social-media'
});

// route handlers go here

// start a server that listens on port 3000 and connects the sql client on success
app.listen(3000, () => {
    client.connect();
});

app.param('id', (req, res, next, id ) => {
    client.query('SELECT * FROM users WHERE id=' + id , (err, user) => {
        if( err ) throw err
        client.query( 'SELECT * FROM posts WHERE user_id=' + id, (err, posts) => {
            if (posts) {
                user.rows[0].posts = posts.rows
            }
            res.end(JSON.stringify(user.rows));
        } )
    });
});

app.get('/users/:id', (req, res, next, id) => {
});

// route handlers go here
app.get('/users', (req, res) => {
    client.query('SELECT * FROM users', (err, result) => {
        res.send(result.rows);
    });
});

app.post('/users', (req, res) => {

    console.log( req.body )
    const text = 'INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *';
    const values = [ req.body.username.slice(0,15), req.body.bio.slice(0,255) ];
    client.query(text, values, (err, result) => {
        if (err) throw err
        console.table(result.rows);
        res.end()
    });
})
