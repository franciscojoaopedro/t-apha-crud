
interface DATALOGIN{
    taxNumber:string
    password:string
}
interface USER{
    name:string
    taxNumber:string
    mail:string
    phone:string
    password:string
}
interface PRODUTO{
    name:string
    price:number
    description:string
    stock:number
}










export type{DATALOGIN,USER,PRODUTO}