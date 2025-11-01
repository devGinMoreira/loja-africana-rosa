/**
 * ProductDTO - Product Data Transfer Object
 *
 * Represents a product in the Loja Africana Rosa catalog.
 * Used for API communication between frontend and backend.
 */

export interface ProductDTO {
  id: string;
  sku?: string;
  nome: string;
  descricao?: string;
  categoria: 'Mercearia' | 'Talho' | 'Peixaria' | 'Cosmeticos' | 'Produtos_Cabo_Verde' | 'Outros';
  preco_final: number;
  preco_base?: number;
  taxa_iva: 6 | 13 | 23;
  stock?: number;
  unidade_medida?: 'kg' | 'unidade' | 'l' | 'ml';
  peso?: number;
  imagem_url?: string;
  imagens_extra?: string[];
  is_top_venda?: boolean;
  desconto_percentual?: number;
  preco_promocional?: number;
  promo_valida_ate?: string; // ISO datetime
  atributos?: Record<string, string>;
  created_at?: string;
  updated_at?: string;
}

/**
 * Paginated response format for product listings
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export type ProductPaginatedResponse = PaginatedResponse<ProductDTO>;
