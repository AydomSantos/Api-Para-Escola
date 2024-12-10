const AlunoModel = require('../models/Aluno.js');

module.exports = {
  async index(req, res) {
    try {
      const alunos = await AlunoModel.findAll();
      res.json(alunos);
    } catch (error) {
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  },

  async armazenar(req, res) {
    try {
      const { nome, sobrenome, email, idade, peso, altura } = req.body;
      const aluno = await AlunoModel.create({
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        idade: idade,
        peso: peso,
        altura: altura,
      });

      res.status(201).json(aluno);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, sobrenome, email, idade, peso, altura } = req.body;
      const aluno = await AlunoModel.findByPk(id);

      if (!aluno) {
        return res.status(404).json({ error: "Aluno não encontrado" });
      }

      await aluno.update({
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        idade: idade,
        peso: peso,
        altura: altura,
      });

      res.json(aluno);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async deletar(req, res) {
    try {
      const { id } = req.params;
      const aluno = await AlunoModel.findByPk(id);

      if (!aluno) {
        return res.status(404).json({ error: "Aluno não encontrado" });
      }

      await aluno.destroy();

      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
