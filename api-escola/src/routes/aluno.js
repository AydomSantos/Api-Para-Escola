const express = require('express');
const alunoController = require('../controllers/alunoController');

const router = express.Router();

// Definindo as rotas para Alunos
router.get('/', alunoController.index);
router.post('/', alunoController.armazenar);
router.put('/:id', alunoController.atualizar);
router.delete('/:id', alunoController.deletar);

module.exports = router;  // Certifique-se de exportar o router
