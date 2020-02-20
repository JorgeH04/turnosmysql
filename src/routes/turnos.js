const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');



//frontend


  router.get('/turnoindex', isLoggedIn,  async (req, res) => {
    const turno = await pool.query('SELECT * FROM turnos WHERE user_id = ?', [req.user.id]);
    res.render('turno/turno', { turno });
});





router.post('/turno/new-turno', isLoggedIn, async (req, res) => {
    
    const { especialidad, medico, horario } = req.body;
    const newDoctor = {
        especialidad,
        medico,
        horario,
        user_id: req.user.id
        
    };
    console.log(newDoctor);
    await pool.query('INSERT INTO turnos set ?', [newDoctor]);
    req.flash('success', 'Link Saved Successfully');
    res.redirect('/turnoindex');
});



router.get('/turno/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM turnos WHERE ID = ?', [id]);
    req.flash('success', 'Link Removed Successfully');
    res.redirect('/turnoindex');
});


module.exports = router;