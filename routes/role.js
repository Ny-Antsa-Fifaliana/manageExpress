const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//data validation
const validateRole = (data) => {
    const schema = Joi.object({
      nom: Joi.string().min(2).max(30).required(),
    });
    return schema.validate(data);
};


router.post('/', async (req, res) => {
  const { error } = validateRole(req.body);
  if(error){
    return res.status(400).send(error.details[0].message);
  }

  const{ nom } = req.body;
  try {
    const result = await prisma.role.create({
        data: {
          nom,
        },
      });
      res.status(200).json(result);
  } catch (error) {
    res.status(500).send('Erreur lors de la création du role.');
  }
  
});

router.get('/', async (req, res) => {
    try {
        const allRoles = await prisma.role.findMany();
        res.json(allRoles);
    } catch (error) {
        res.status(500).send('Erreur lors de la récupération du role.');
    }
  
});



module.exports = router;
