import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';
import MorningPlans from '../../assets/images/onboarding/morning-plans.svg';
import Percentages from '../../assets/images/onboarding/percentages.svg';
import Prioritise from '../../assets/images/onboarding/prioritise.svg';
import Reminder from '../../assets/images/onboarding/reminder.svg';
import Reminders from '../../assets/images/onboarding/reminders.svg';

export type OnboardingSlide = {
  id: string;
  title: string;
  subtitle: string;
  blobColor: string;
  blobPath: string;
  blobRotation: number;
  svgImage: FC<SvgProps>;
};

const blobColor = '#208AEF';

const baseBlobPath =
  'M37.2,-54.3C47.7,-43.6,55.2,-32,63.6,-17.9C71.9,-3.8,81,12.7,75.8,23.4C70.7,34.1,51.3,39,36.3,48.7C21.3,58.3,10.6,72.7,-2.8,76.6C-16.3,80.6,-32.7,74,-48.2,64.5C-63.8,55.1,-78.6,42.7,-81.5,27.9C-84.4,13,-75.4,-4.3,-67.1,-19.3C-58.7,-34.3,-51.1,-47,-40,-57.5C-28.9,-67.9,-14.5,-76.1,-0.5,-75.3C13.4,-74.6,26.8,-64.9,37.2,-54.3Z';

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: '1',
    title: 'Welcome to Flow',
    subtitle: 'Your personal productivity companion',
    blobColor,
    blobPath: baseBlobPath,
    blobRotation: 0,
    svgImage: MorningPlans,
  },
  {
    id: '2',
    title: 'Stay Organized',
    subtitle: 'Keep track of everything that matters',
    blobColor,
    blobPath: baseBlobPath,
    blobRotation: 72,
    svgImage: Percentages,
  },
  {
    id: '3',
    title: 'Collaborate Seamlessly',
    subtitle: 'Work together in real time',
    blobColor,
    blobPath: baseBlobPath,
    blobRotation: 144,
    svgImage: Prioritise,
  },
  {
    id: '4',
    title: 'Track Progress',
    subtitle: "See how far you've come",
    blobColor,
    blobPath: baseBlobPath,
    blobRotation: 216,
    svgImage: Reminders,
  },
  {
    id: '5',
    title: 'Get Started',
    subtitle: 'Create your account and begin your journey',
    blobColor,
    blobPath: baseBlobPath,
    blobRotation: 288,
    svgImage: Reminder,
  },
];
