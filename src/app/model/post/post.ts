export class Post{
    id: number;
    conteudo: Conteudo;
    emailAutor: string;
    curtidas: number;
    pessoasCurtiram: any;
    status: string;
}

export class Conteudo{
    titulo: string;
    conteudo: string;
    localDaPublicacao: string;
    anoDaPublicacao: string;
    url: string;
    tags: string;
}