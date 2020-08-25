import { Extract } from './Extract';
export class User {

    constructor(){}

    id: number;
    userName: string;
    email: string;
    password: string;
    fullName: string;
    numAccount: string;
    imageURL: string;
    balance: number;
    savedBalance: number;
    cpf: string;
    phoneNumber: string;
    address: string;
    extract: Extract[];
}
