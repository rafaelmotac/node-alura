import moment from 'moment';
import conexao from '../infraestrutura/conexao';

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
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');


        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');

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

        if (erros && erros.length > 0) {
            res.status(400).json(erros)
        } else {
            const atendimentoDatado = { ...atendimento, dataCriacao, data };

            const sql = 'INSERT INTO Atendimentos SET ?'

            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if (erro) {
                    res.status(400).json(erro)
                } else {
                    res.status(201).json(resultados)
                }
            });
        }
    }
}

export default new Atendimento;