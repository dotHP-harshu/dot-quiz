require('dotenv').config()
const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require("cookie-parser");



// Body Parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




// Routers
const renderHome = require("./routes/home");
const { adminPanel } = require("./routes/adminPanel");
const { newTopic } = require("./routes/newTopic");
const { sets } = require('./routes/sets');
const { getQuiz } = require("./routes/getQuiz");
const { result } = require('./routes/submit');
const upload = require("./utils/getImage");
const { newSet } = require('./routes/newSet');
const { adminLoginPage } = require('./routes/adminLogin');
const { authAdmin } = require('./routes/authAdmin');
const { adminAuthorisation } = require('./middlewares/adminAuthorisation');
const { logoutAdmin } = require('./routes/logoutAdmin');
const { connectDB } = require('./connection/connectdb');




app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));



// Routes
app.get('/', renderHome);
app.get('/sets/:topicname', sets)
app.get('/quiz/:setId', getQuiz);
app.post("/result/:setId", result);
app.get('/login/admin', adminLoginPage)
app.post('/authadmin', authAdmin);
app.get('/admin/panel',adminAuthorisation, adminPanel);
app.post('/admin/newtopic',adminAuthorisation,upload.single('topicIcon'), newTopic)
app.post('/admin/newset',adminAuthorisation, newSet );
app.get('/logout/admin',logoutAdmin)




app.use((req, res) => {
    res.status(404).render("404")
});

const PORT = process.env.PORT || 3000;

const startApp = async()=>{
    try{
        await connectDB(process.env.DB_URI);
        app.listen(PORT);
    }catch(err){
        console.log(err)
    }
}

startApp();