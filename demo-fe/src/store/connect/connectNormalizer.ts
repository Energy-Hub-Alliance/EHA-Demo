import { ConnectDto } from './connectDto';
import { ConnectModel, VendorResponseModel } from './connectModel';

export const connectNormalizer = (connect: ConnectDto): ConnectModel => {
  return {
    vendors: Object.keys(connect).reduce(
      (acc, key) => {
        const vendorsWithType = (
          connect[key as keyof ConnectDto] as VendorResponseModel[]
        ).map((item) => ({
          ...item,
          type: key,
        }));

        return [...acc, ...vendorsWithType];
      },
      [] as (VendorResponseModel & { type: string })[]
    ),
  };
};
