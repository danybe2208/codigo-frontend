import { Interesse } from '../interesse/interesse';

export class Pessoa{
    id: number;
    email: string;

    curriculo: Curriculo;
    formacao: Formacao;
    infoAdicionais: InfoAdicionais;  
    informacao: Informacao;  
    trabalho: Trabalho;

    interesses: Interesse[];
    seguindo: any;
    seguidores: any;
    postsCurtidos: any;
}

export class Curriculo {
    url: string;
}

export class Formacao {
    nivelDeFormacao: string;
    localDeFormacao: string;
}

export class InfoAdicionais {
    dataNascimento: string;
    dataInicioCientista: string;
    cpf: string;
}

export class Informacao{
    nomePessoa: string;
    senha: string;
}

export class Glossario{
    nome: string;
    status: string;
}

export class Trabalho{
    nomeInstituicao: string;
    cidadeOndeTrabalha: string;
    estadoOndeTrabalha: string;
}

export class Notificacao{
    tipoPublicacao: string;
    titulo: string;
    autor: String;
    visualizacao: boolean;
}