interface Book{
    id: string; //? = kann muss aber nicht 
    title: string;
    subtitle: string;
    isbn:string;
    abstract: string;
    author: string;
    publisher: string;
    price: string;
    numPages:number;
    cover?: string;
};
export type {Book};