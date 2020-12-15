export interface Alumnos {
    id?: number;
    nombre?: string;
    apellido?: string;
    cedula?: string;
    fechanacimiento?: string;
    edad?: number;
    direccion?:string;
    telefono?:string;
    grado?:string;
    numeromatricula?:number; 
    provincia?: {id: number};
    cantones?: {id:number;provincia?:{id:number}};
}