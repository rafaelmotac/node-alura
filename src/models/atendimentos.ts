import moment, { Moment } from 'moment';
import conexao from '../infraestrutura/conexao';
import { Response } from 'express';

interface AtendimentoDto {
    cliente: string,
    pet: string,
    servico: string,
    status: string,
    observacoes: string,
    data: string
}

class Atendimento {
    adiciona(atendimento: AtendimentoDto, res) {
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');

        const erros = this._validaAtendimento(atendimento, data, dataCriacao);

        if (erros && erros.length > 0) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data };

            const sql = 'INSERT INTO Atendimentos SET ?'

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json({atendimentoDatado})
                }
            });
        }
    }

    lista(res: Response) {

        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados)
            }
        });

    }

    buscaPorId(id: number, res: Response) {
        const sql = `SELECT * FROM Atendimentos a WHERE a.id = ${id}`;


        conexao.query(sql, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultados[0])
            }
        });

    }

    atualiza(id: number, atendimento: AtendimentoDto, res: Response) {

        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');

        const erros = this._validaAtendimento(atendimento, data, dataCriacao);

        if (erros && erros.length > 0) {
            res.status(400).json(erros)
        } else {

            const atendimentoDatado = { ...atendimento, dataCriacao, data };

            const sql = `UPDATE Atendimentos a
                     SET ?
                     WHERE a.id = ?
                     `

            conexao.query(sql, [atendimentoDatado, id], (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(200).json({...atendimentoDatado, id})
                }
            });

        }

    }

    atualizaElemento(id: number, valores: any, res: Response) {

        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        }


        const sql = `UPDATE Atendimentos a
                     SET ?
                     WHERE a.id = ?
                     `

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({...valores, id})
            }
        });


    }

    deleta(id: number, res: Response) {

        const sql = `DELETE FROM Atendimentos a
                     WHERE a.id = ?
                     `

        conexao.query(sql, id, (erro, resultados) => {
            if (erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json({id})
            }
        });

    }

    _validaAtendimento(atendimento: AtendimentoDto, data: string, dataCriacao: string): Array<{ nome: string, valido: boolean, mensagem: string }> {

        const dataEhValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteEhValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ];

        const erros: Array<{ nome: string, valido: boolean, mensagem: string }> = validacoes.filter(campo => !campo.valido);

        return erros;
    }
}

export default new Atendimento;