const express = require('express');
const turmaController = require('../controllers/TurmaController');


const router = express.Router();

// Definindo as rotas para Turmas
router.get('/', turmaController.index);
router.post('/', turmaController.armazenar);
router.put('/:id', turmaController.atualizar);
router.delete('/:id', turmaController.deletar);




module.exports = router;  // Certifique-se de exportar o router
