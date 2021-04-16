import { Request, Response } from 'express';
import Atendimento from '../models/atendimentos'

function atendimentoController(app) {
  app.get("/atendimentos", (req: Request, res: Response) =>
    Atendimento.lista(res)
  );

  app.get("/atendimentos/:id", (req: Request, res: Response) =>
    Atendimento.buscaPorId(Number.parseInt(req.params.id), res)
  );

  app.post('/atendimentos', (req: Request, res: Response) => {
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

  app.put("/atendimentos/:id", (req: Request, res: Response) => {

    const atendimento = req.body;

    let atendimentoDto = {
      cliente: atendimento.cliente,
      pet: atendimento.pet,
      servico: atendimento.servico,
      status: atendimento.status,
      observacoes: atendimento.observacoes,
      data: atendimento.data
    }

    Atendimento.atualiza(Number.parseInt(req.params.id), atendimentoDto, res);

  });

  app.patch("/atendimentos/:id", (req: Request, res: Response) => {

    const valores = req.body;

    Atendimento.atualizaElemento(Number.parseInt(req.params.id), valores, res);

  });

  app.delete("/atendimentos/:id", (req: Request, res: Response) => {

    Atendimento.deleta(Number.parseInt(req.params.id), res);

  });


};

export = atendimentoController;
