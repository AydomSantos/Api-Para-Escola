const express = require('express');
const MatriculaController = require('../controllers/MatriculaController');

const router = express.Router();

// Lista todas as matrículas
router.get('/', MatriculaController.listarMatriculas);

// Associa um aluno a uma turma
router.post('/', MatriculaController.associarAlunoATurma);

module.exports = router;
