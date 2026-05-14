export interface ProductQuery {
  offset?: number;
  limit?: number;
  categorySlug?: string;
  title?: string;
  minPrice?: number;
  maxPrice?: number;
}
