const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');



//frontend


  router.get('/clinicoindex', isLoggedIn,  async (req, res) => {
    const clinico = await pool.query('SELECT * FROM clinico');
    res.render('clinico/clinico', { clinico });
});



//backend


  router.get('/clinicobackend', isLoggedIn,  async (req, res) => {
    const clinico = await pool.query('SELECT * FROM clinico');
    res.render('clinico/clinicoback', { clinico });
});


router.post('/clinico/new-clinico', isLoggedIn, async (req, res) => {
    
    const { especialidad, medico, horario } = req.body;
    const newDoctor = {
        especialidad,
        medico,
        horario
        
    };
    console.log(newDoctor);
    await pool.query('INSERT INTO clinico set ?', [newDoctor]);
    req.flash('success', 'Link Saved Successfully');
    res.redirect('/clinicobackend');
});



router.get('/clinico/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM clinico WHERE ID = ?', [id]);
    req.flash('success', 'Link Removed Successfully');
    res.redirect('/clinicobackend');
});




router.get('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM clinico WHERE id = ?', [id]);
    console.log(links);
    res.render('clinico/edit-clinico', {link: links[0]});
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
    res.redirect('/clinicobackend');
});


module.exports = router;