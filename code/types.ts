export interface DiscountCode {
  code: string;
  discount: number; // percentage off (e.g., 30 means 30%)
  label: string;
}

export interface DrawResult {
  won: boolean;
  prize?: DiscountCode;
}

export type SliderValue = 5 | 10 | 15 | 20;