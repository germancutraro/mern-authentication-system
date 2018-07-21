const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const app = express();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(require('cors')());
app.use(require('helmet')());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
// DB Connection
require('./libs/db-connection');
// Passport
require('./config/passport')(passport);

// Routes
app.use('/api/users', require('./routes/users'));

// Production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendfile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));