const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// data validation with joi
const validateUser = (data) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      nom: Joi.string().min(2).max(30).required(),
    });
    return schema.validate(data);
};

// routes
router.post('/', async (req, res) => {
    const { error }= validateUser(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    
    const{ email,nom }= req.body;
    try {
        const result = await prisma.utilisateur.create({
            data: {
              email,
              nom,
            },
          });
          res.status(200).json(result);
    } catch (error) {
        res.status(500).send('Erreur lors de la création de l\'utilisateur.');
    }
    
});


router.get('/', async (req, res) => {
    try {
        const allUsers = await prisma.utilisateur.findMany();
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération de l\'utilisateur.');
    }
    
  });

  

module.exports = router;