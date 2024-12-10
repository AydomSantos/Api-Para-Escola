const TurmaModel = require('../models/Turma'); 
const AlunoModel = require('../models/Aluno'); 

module.exports = {
  // Listar todas as turmas com os alunos matriculados
  async index(req, res) {
    try {
      const turmas = await TurmaModel.findAll({
        include: [{
          model: AlunoModel,
          as: 'alunos',
          through: {
            attributes: []
          }
        }]
      });
      res.json(turmas);
    } catch (error) {
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  },

  // Criar uma nova turma
  async armazenar(req, res) {
    try {
      const { nome, horario } = req.body;
      
      if (!nome || !horario) {
        return res.status(400).json({ error: 'Nome e Horário são obrigatórios.' });
      }

      const turma = await TurmaModel.create({
        nome: nome,
        horario: horario,
      });

      res.status(201).json(turma);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Atualizar uma turma existente
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, horario } = req.body;

      const turma = await TurmaModel.findByPk(id);

      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada' });
      }

      await turma.update({
        nome: nome,
        horario: horario,
      });

      res.json(turma);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Deletar uma turma
  async deletar(req, res) {
    try {
      const { id } = req.params;
      const turma = await TurmaModel.findByPk(id);

      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada' });
      }

      await turma.destroy();

      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};
