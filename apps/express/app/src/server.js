require('module-alias/register')
const http = require('http');
const app = require('./app');
const { sequelize } = require('./database/models');

const port = process.env.EXPRESS_PORT || 3000;
app.set('port', port);

const server = http.createServer(app);

// Connect database
sequelize
  .sync()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });