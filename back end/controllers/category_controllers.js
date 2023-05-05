
const {Category_schema} = require('../models');


 exports.addCategories = async(req, res)=>{
    try{
        const {name} = req.body;
        const data = await Category_schema.create({name})
        res.status(201).json(data )
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
};

exports.getCategories = async(req, res)=>{
    try{
        const data = await Category_schema.findAll()
        res.status(201).json(data )
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
};

exports.getOneCategories = async(req, res)=>{
    try{
        const {id} = req.params;
        const data = await Category_schema.findOne({where: {id}})
        res.status(201).json(data )
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
};

exports.deleteCategories = async(req, res)=>{
    try{
        const {id} = req.params;
        const data = await Category_schema.destroy({where: {id}})
        res.status(201).json(data )
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
};

exports.updateCategories = async(req, res)=>{
    try{ 
        const {id} = req.params;
        const {name} = req.body;
        const data = await Category_schema.update({name},{where:{id}})
        res.status(201).json(data )
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
};
