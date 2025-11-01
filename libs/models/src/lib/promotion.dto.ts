/**
 * PromotionDTO - Promotion Data Transfer Object
 *
 * Represents promotional campaigns and discount information.
 */

export interface PromotionDTO {
  id: string;
  name: string;
  description?: string;
  discount_type: 'percentage' | 'fixed_amount';
  discount_value: number;
  valid_from: string; // ISO datetime
  valid_until: string; // ISO datetime
  applicable_categories?: string[];
  min_order_amount?: number;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreatePromotionDTO {
  name: string;
  description?: string;
  discount_type: 'percentage' | 'fixed_amount';
  discount_value: number;
  valid_from: string;
  valid_until: string;
  applicable_categories?: string[];
  min_order_amount?: number;
}
