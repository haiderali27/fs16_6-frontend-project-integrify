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


