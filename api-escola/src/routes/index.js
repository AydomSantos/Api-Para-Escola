const express = require('express');
const alunoRouter = require('./aluno');
const turmaRouter = require('./turma');
const matriculaRouter = require('./matricula');

const router = express.Router();

// Definindo os roteadores
router.use('/alunos', alunoRouter);
router.use('/turmas', turmaRouter);
router.use('/matricula', matriculaRouter);

module.exports = router;
