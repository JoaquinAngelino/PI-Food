
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

const PORT = 3001

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log('%s listening at PORT '+PORT); // eslint-disable-line no-console
  });
}).catch(err =>{
  console.error("ERROR en la DB", err)
})
