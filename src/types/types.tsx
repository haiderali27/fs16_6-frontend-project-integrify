export interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
    creationAt?: string;
    updatedAt?: string;
  }
  
export interface Category {
    id: number;
    name: string;
    image?: string;
    creationAt?: string;
    updatedAt?: string;
  }

export enum Role{
  customer = "customer",
  admin = "admin"
}

export interface User{
   id: number;
   email: string;
   password: string;
   name: string;
   role: Role;
   avatar: string
}

export interface Cart{
  user: User,
  product: [Product]
}