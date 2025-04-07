export interface IPaginationInfo {
    page: number; // Página actual
    size: number; // Tamaño de página (cantidad de elementos por página)
    totalPages?: number; // Total de páginas (opcional si el backend lo proporciona)
    totalElements?: number; // Total de elementos disponibles (opcional)
    filters?: Record<string, string | number | boolean>; // Filtros aplicados
    sort?: OrderBy; // Objeto que contiene el campo y el orden
}

export class PaginationInfo implements IPaginationInfo {
    page: number;
    size: number;
    totalPages?: number;
    totalElements?: number;
    filters?: Record<string, string | number | boolean>;
    sort?: OrderBy; // Ahora sort es de tipo OrderBy

    constructor(
        page: number = 0,
        size: number = 10,
        totalPages?: number,
        totalElements?: number,
        filters?: Record<string, string | number | boolean>,
        sort?: OrderBy // Cambié el tipo de sort a OrderBy
    ) {
        this.page = page;
        this.size = size;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
        this.filters = filters ?? {}; // Asegura que filters no sea undefined
        this.sort = sort;
    }
}

export type OrderBy = {
    field: string;
    order: "asc" | "desc";
};