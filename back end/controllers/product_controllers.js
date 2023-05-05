const {Product_schema} = require('../models');

 exports.addProducts = async(req, res)=>{
    try{
        const {name,img, price, quantity, CategorySchemaId } = req.body;
        const data = await Product_schema.create({name,img,price,quantity,CategorySchemaId})
        res.status(201).json(data )
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
};

exports.getAllProducts = async(req, res)=>{
    try{
        const data = await Product_schema.findAll()
        res.status(200).json(data)
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
};

exports.getOneProducts = async(req, res)=>{
    try{
        const {id} = req.params;
        const data = await Product_schema.findOne({where: {id}})
        res.status(201).json(data )
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
};

exports.deleteProducts = async(req, res)=>{
    try{
        const {id} = req.params;
        const data = await Product_schema.destroy({where: {id}})
        res.status(201).json(data )
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
};

exports.updateProducts = async(req, res)=>{
    try{
        
        const {id} = req.params;
        const {name,img, price, quantity, categoryId  } = req.body;
        const data = await Product_schema.update({name,img, price, quantity,categoryId},{where: {id}})
        res.status(201).json(data )
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
};
