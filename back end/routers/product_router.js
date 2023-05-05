const { addProducts,getAllProducts,getOneProducts,updateProducts,deleteProducts} = require('../controllers/product_controllers');

exports.product_routers = (app)=>{
    app.post('/products/add',addProducts);
    app.get('/products/getAll',getAllProducts);
    app.get('/products/getOne/:id',getOneProducts);
    app.put('/products/update/:id',updateProducts);
    app.delete('/products/delete/:id',deleteProducts);
}