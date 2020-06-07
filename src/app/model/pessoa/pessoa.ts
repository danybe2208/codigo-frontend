export class Pessoa{
    id: number;

    curriculo: Curriculo;
    formacao: Formacao;
    infoAdicionais: InfoAdicionais;  
    informacao: Informacao;  
    trabalho: Trabalho;

    interesses: string;
    seguindo: string;
    seguidores: string;
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
    email: string;
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