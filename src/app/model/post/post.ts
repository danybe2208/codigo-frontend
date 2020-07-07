export class Post{
    id: number;
    mensagem: string;
    emailAutor: string;
    curtidas: number;
    pessoasCurtiram: any;
    status: string;
}

export class Artigo {
    id: number;
    conteudo: Conteudo;
    emailAutor: string;
    curtidas: number;
    membrosCurtiram: any;
    arquivo: Arquivo;
}

export class Arquivo {
    docName: string;
    file: any[];
    type: string;
}

export class Conteudo{
    titulo: string;
    resumo: string;
    conteudo: string;
    localDaPublicacao: string;
    anoDaPublicacao: string;
    url: string;
    tags: string;
}