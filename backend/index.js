const express = require('express');
const routes = require('./routes/routes');
const cors = require('cors');
const {connectDb} = require('./db/db')

const app = express();

app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));
app.use(routes);

connectDb();

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running  on port ${PORT}`);
});
