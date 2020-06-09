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
}

export class Conteudo{
    titulo: string;
    conteudo: string;
    localDaPublicacao: string;
    anoDaPublicacao: string;
    url: string;
    tags: string;
}