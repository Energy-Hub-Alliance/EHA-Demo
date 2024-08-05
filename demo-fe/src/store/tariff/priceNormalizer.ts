import { PriceDto } from './priceDto';
import { PriceModel } from './priceModel';

export const priceNormalizer = (price: PriceDto): PriceModel => {
  return {
    starts_at: price.startsAt ?? '',
    total_price: price.totalPrice ?? 0,
    vat: price.vat ?? 0,
  };
};
