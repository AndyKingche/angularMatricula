import { Categoria } from './Categoria';

export interface Tipo {
    id?: number;
    nombre?: string;
    descripcion?: string;
    categoria?: Categoria;
}