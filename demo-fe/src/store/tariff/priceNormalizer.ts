import { PriceDto } from './priceDto';
import { PriceModel } from './priceModel';

export const priceNormalizer = (price: PriceDto): PriceModel => {
  return {
    starts_at: price.startDate ?? '',
    total_price: price.totalPrice ?? 0,
    vat: price.taxAndLevies ?? 0,
    energyPrice: price.energyPrice ?? 0,
  };
};
