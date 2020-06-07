export class Post{
    id: number;
    conteudo: Conteudo;
    emailAutor: string;
    curtidas: number;
}

export class Conteudo{
    titulo: string;
    conteudo: string;
    localDaPublicacao: string;
    anoDaPublicacao: string;
    url: string;
    tags: string;
}