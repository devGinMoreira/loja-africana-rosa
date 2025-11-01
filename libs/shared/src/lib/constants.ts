/**
 * Shared constants used across the application
 */

/**
 * Product categories
 */
export const PRODUCT_CATEGORIES = {
  MERCEARIA: 'Mercearia',
  TALHO: 'Talho',
  PEIXARIA: 'Peixaria',
  COSMETICOS: 'Cosmeticos',
  PRODUTOS_CABO_VERDE: 'Produtos_Cabo_Verde',
  OUTROS: 'Outros',
} as const;

/**
 * VAT rates allowed in Portugal
 */
export const VAT_RATES = {
  REDUCED: 6,
  INTERMEDIATE: 13,
  STANDARD: 23,
} as const;

/**
 * User roles
 */
export const USER_ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
} as const;

/**
 * Order statuses
 */
export const ORDER_STATUSES = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

/**
 * Units of measurement
 */
export const UNITS_OF_MEASUREMENT = {
  KG: 'kg',
  UNIT: 'unidade',
  LITER: 'l',
  MILLILITER: 'ml',
} as const;

/**
 * API error codes
 */
export const API_ERROR_CODES = {
  INVALID_INPUT: 'INVALID_INPUT',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  DUPLICATE_ENTRY: 'DUPLICATE_ENTRY',
  OPERATION_NOT_ALLOWED: 'OPERATION_NOT_ALLOWED',
} as const;
