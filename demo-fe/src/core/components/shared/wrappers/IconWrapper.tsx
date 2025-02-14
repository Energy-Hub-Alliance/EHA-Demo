import { FunctionComponent, SVGProps } from 'react';

export const IconWrapper = (
  Icon: FunctionComponent<SVGProps<SVGSVGElement>>
) => {
  return <Icon height={24} />;
};
