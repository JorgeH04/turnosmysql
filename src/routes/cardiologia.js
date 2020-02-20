const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');



//frontend


  router.get('/cardiologiaindex', isLoggedIn,  async (req, res) => {
    const cardiologia = await pool.query('SELECT * FROM cardiologia');
    res.render('cardiologia/cardiologia', { cardiologia });
});



//backend


  router.get('/cardiologiabackend', isLoggedIn,  async (req, res) => {
    const cardiologia = await pool.query('SELECT * FROM cardiologia');
    res.render('cardiologia/cardiologiaback', { cardiologia });
});


router.post('/cardiologia/new-cardiologia', isLoggedIn, async (req, res) => {
    
    const { especialidad, medico, horario } = req.body;
    const newDoctor = {
        especialidad,
        medico,
        horario
        
    };
    console.log(newDoctor);
    await pool.query('INSERT INTO cardiologia set ?', [newDoctor]);
    req.flash('success', 'Link Saved Successfully');
    res.redirect('/cardiologiabackend');
});



router.get('/cardiologia/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM cardiologia WHERE ID = ?', [id]);
    req.flash('success', 'Link Removed Successfully');
    res.redirect('/cardiologiabackend');
});




router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM cardiologia WHERE id = ?', [id]);
    console.log(links);
    res.render('cardiologia/edit-cardiologia', {link: links[0]});
});

router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { especialidad, medico, horario} = req.body; 
    const newLink = {
        especialidad,
        medico,
        horario
    };
    await pool.query('UPDATE clinico set ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link Updated Successfully');
    res.redirect('/cardiologiabackend');
});


module.exports = router;