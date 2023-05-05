const {getAllUsers,register,login,updateUser,deleteUser,verify} = require('../controllers/users_controllers');
const {authenticateToken} = require('../middleware/jwt_authenticate');

exports.user_routers = (app)=>{
    app.get('/users/getAll', getAllUsers)
    app.post('/users/register', register)
    app.post('/users/login', login)
    app.put('/users/update/:id', updateUser);
    app.delete('/users/delete/:id', deleteUser);
    app.get('/verify/:token',verify);
}