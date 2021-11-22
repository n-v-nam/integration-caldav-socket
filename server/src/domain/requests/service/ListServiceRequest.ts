export interface ListServiceRequest {
    page: number | 1;
    perPage: number | 50;
    descending: string | 'desc';
    sortBy: string | 'id';
};