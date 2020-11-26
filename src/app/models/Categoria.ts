import { Tipo } from './Tipo';

export interface Categoria {
    id?: number;
    nombre?: string;
    descripcion?: string;
    tipo?: Array<Tipo>;
}