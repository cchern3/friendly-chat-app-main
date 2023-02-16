const session = require('express-session');
const express = require('express');
const path = require('path');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3006;

const server = require('http').createServer(app);
const io = require('socket.io')(server);

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

io.on('connection', (socket) => {
  socket.on('new message', (message) => {
    io.emit('new message', message);
  });
});

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});