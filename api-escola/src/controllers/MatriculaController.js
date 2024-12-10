const MatriculaModel = require('../models/Matricula');

module.exports = {
    // Lista todas as matrículas
    async listarMatriculas(req, res) {
        try {
            const matriculas = await MatriculaModel.findAll({
                include: ['alunos', 'turmas']
            });
            res.json(matriculas);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
        }
    },

    // Associa um aluno a uma turma
    async associarAlunoATurma(req, res) {
        try {
            const { i_id_aluno, i_id_turma } = req.body;

            // Validação básica para garantir que os campos sejam preenchidos
            if (!i_id_aluno || !i_id_turma) {
                return res.status(400).json({ error: 'Os campos i_id_aluno e i_id_turma são obrigatórios.' });
            }

            // Verificar se os IDs são válidos (podemos fazer uma verificação simples para números positivos)
            if (typeof i_id_aluno !== 'number' || typeof i_id_turma !== 'number' || i_id_aluno <= 0 || i_id_turma <= 0) {
                return res.status(400).json({ error: 'Os IDs de aluno e turma devem ser números positivos.' });
            }

            // Verificar se o aluno já está associado à turma
            const existeMatricula = await MatriculaModel.findOne({
                where: { i_id_aluno, i_id_turma }
            });

            if (existeMatricula) {
                return res.status(400).json({ error: 'Aluno já está matriculado nesta turma.' });
            }

            // Criar a matrícula
            const dataAtual = new Date();
            const dataFim = new Date(dataAtual.setFullYear(dataAtual.getFullYear() + 1));

            const matricula = await MatriculaModel.create({
                i_id_aluno,
                i_id_turma,
                d_data_matricula: new Date(),
                d_data_transacao: new Date(),
                s_status_matricula: 'Matriculado',
                d_data_fim: dataFim,
            });

            // Retornar sucesso com os dados da matrícula criada
            res.status(201).json({
                message: 'Aluno associado à turma com sucesso.',
                matricula: matricula
            });

        } catch (error) {
            // Retornar o erro detalhado
            console.error(error); 
            res.status(500).json({ error: 'Ocorreu um erro interno no servidor.' });
        }
    }
};
