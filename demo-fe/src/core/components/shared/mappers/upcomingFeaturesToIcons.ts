import HemsIcon from '../assets/upcomingFeatures/hems.svg?react';

export enum UpcomingFeatures {
  HEMS = 'HEMS',
}

export const upcomingFeaturesToIcons: {
  [type in UpcomingFeatures]: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;
} = {
  HEMS: HemsIcon,
};
