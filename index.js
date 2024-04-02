// server
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// import
const utilisateurRoutes = require('./routes/utilisateur');
const roleRoutes = require('./routes/role');


// use route
app.use(express.json());
app.use('/utilisateurs', utilisateurRoutes);
app.use('/roles', roleRoutes);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Une erreur est survenue.');
  });
  



// Gestionnaires d'événements pour SIGINT et SIGTERM
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    process.exit();
  });
  
process.on('SIGTERM', async () => {
    await prisma.$disconnect();
    process.exit();
  });


// server listen
app.listen(PORT, ()=>{console.log(`Server is running on port ${PORT}`);});