const express = require('express');
const cors = require("cors");
const app = express();
app.use(express.json())

const {category_routers} = require('./routers/category_router');
const {product_routers} = require('./routers/product_router');
const {user_routers} = require('./routers/user_router');
app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

category_routers(app);
product_routers(app);
user_routers(app);

app.listen(3001, () => {
  console.log('Server running on port 3001');
})

