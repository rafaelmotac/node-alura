import express from 'express';
import Atendimento from '../models/atendimentos'

function atendimentoController (app) {
  app.get("/atendimentos", (req, res) =>
    res.send("Você está na rota de atendimentos")
  );

  app.post('/atendimentos', (req: express.Request, res: express.Response) => {
    const atendimento = req.body;

    let atendimentoDto = {
      cliente: atendimento.cliente,
      pet: atendimento.pet,
      servico: atendimento.servico,
      status: atendimento.status,
      observacoes: atendimento.observacoes,
      data: atendimento.data
    }

    Atendimento.adiciona(atendimentoDto, res);
  });

};

export = atendimentoController;
