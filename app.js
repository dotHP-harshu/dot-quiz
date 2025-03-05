const express = require('express');
const app = express();
const path = require('path');




// body parsers
app.use(express.json())
app.use(express.urlencoded({extended:true}));



// Routers
const renderHome = require("./routes/home");
const { adminPanel } = require("./routes/admin");
const { newTopic} = require("./routes/newTopic");
const { sets } = require('./routes/sets');
const {getQuiz} = require("./routes/getQuiz");
const { submit } = require('./routes/submit');




app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));



// Routes
app.get('/', renderHome);
app.get('/sets/:topicname', sets)
app.get('/sets/:topicname/:set', getQuiz);
app.post("/submit", submit)
app.get('/admin/panel', adminPanel);
app.post('/admin/newtopic', newTopic)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
