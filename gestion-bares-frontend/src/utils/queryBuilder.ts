type Filters = {
  [key: string]: string | number | boolean | undefined;
};

type QueryOptions = {
  page?: number;
  size?: number;
  sort?: string; // "field,asc" o "field,desc"
  filters?: Filters;
};

export const buildQueryParams = ({ page, size, sort, filters = {} }: QueryOptions): string => {
  const params = new URLSearchParams();

  if (page !== undefined) params.append("page", page.toString());
  if (size !== undefined) params.append("size", size.toString());
  if (sort) params.append("sort", sort);

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      params.append(key, String(value));
    }
  });

  return params.toString();
};
