export interface ProductQuery {
  offset?: number;
  limit?: number;
  categorySlug?: string;
  title?: string;
  price_min?: number;
  price_max?: number;
}
