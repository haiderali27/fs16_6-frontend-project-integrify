export interface Product {
    id?: number;
    title?: string;
    price?: number;
    description?: string;
    category?: Category | undefined;
    images?: string[];
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


export interface UserSchema{
    id: number;
    email: string;
    password?: string;
    name: string;
    role: "customer"|"admin";
    avatar: string
 }

 export interface User{
    currentUser: null | UserSchema;
 }
 export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
}
