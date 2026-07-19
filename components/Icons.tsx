import type { SVGProps } from 'react'

type IconName =
  | 'mic'
  | 'booth'
  | 'printer'
  | 'signpost'
  | 'palette'
  | 'megaphone'
  | 'truck'
  | 'video'
  | 'star'
  | 'lightbulb'
  | 'shield'
  | 'flame'
  | 'phone'
  | 'mail'
  | 'pin'
  | 'clock'

const paths: Record<IconName, JSX.Element> = {
  mic: (
    <>
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <path d="M12 19v3" />
      <path d="M8 22h8" />
    </>
  ),
  booth: (
    <>
      <path d="M3 9h18" />
      <path d="M4 9V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4" />
      <path d="M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" />
      <path d="M9 21v-6h6v6" />
    </>
  ),
  printer: (
    <>
      <path d="M7 8V3h10v5" />
      <path d="M7 18H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
      <rect x="7" y="15" width="10" height="6" rx="1" />
    </>
  ),
  signpost: (
    <>
      <path d="M12 3v18" />
      <path d="M12 6h6l2 2.5L18 11h-6" />
      <path d="M12 13H6l-2 2.5L6 18h6" />
    </>
  ),
  palette: (
    <>
      <path d="M12 3a9 9 0 1 0 0 18 2 2 0 0 0 1.6-3.2 2 2 0 0 1 1.6-3.2H18a3 3 0 0 0 3-3 9 9 0 0 0-9-8.6Z" />
      <circle cx="7.5" cy="11.5" r="1" />
      <circle cx="10.5" cy="7.5" r="1" />
      <circle cx="15" cy="8.5" r="1" />
    </>
  ),
  megaphone: (
    <>
      <path d="M3 11v2a1 1 0 0 0 1 1h3l7 4V6l-7 4H4a1 1 0 0 0-1 1Z" />
      <path d="M18 9a3 3 0 0 1 0 6" />
      <path d="M7 14v5a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-4" />
    </>
  ),
  truck: (
    <>
      <path d="M3 6h10v10H3z" />
      <path d="M13 9h4l4 4v3h-8" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </>
  ),
  video: (
    <>
      <rect x="2" y="6" width="13" height="12" rx="2" />
      <path d="m15 11 6-3v8l-6-3z" />
    </>
  ),
  star: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />,
  lightbulb: (
    <>
      <path d="M9 18h6" />
      <path d="M10 21h4" />
      <path d="M12 3a6 6 0 0 0-3.6 10.8c.5.4.8 1 .9 1.6l.1.6h5.2l.1-.6c.1-.6.4-1.2.9-1.6A6 6 0 0 0 12 3Z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5.5c0 4.2 2.9 8 7 9.5 4.1-1.5 7-5.3 7-9.5V6z" />
      <path d="m9.5 12 1.8 1.8 3.4-3.4" />
    </>
  ),
  flame: (
    <>
      <path d="M12 3s4.5 3.4 4.5 8a4.5 4.5 0 0 1-9 0c0-1.6.6-2.9 1.3-3.9.4 1 1 1.7 1.7 2.1 0-2.4.8-4.6 1.5-6.2Z" />
      <path d="M12 21a5 5 0 0 0 5-5" />
    </>
  ),
  phone: <path d="M15.5 21a13.5 13.5 0 0 1-12.5-12.5A2.5 2.5 0 0 1 5.5 6h1.8a1 1 0 0 1 1 .8l.7 3a1 1 0 0 1-.5 1.1l-1.3.7a10 10 0 0 0 4.2 4.2l.7-1.3a1 1 0 0 1 1.1-.5l3 .7a1 1 0 0 1 .8 1v1.8A2.5 2.5 0 0 1 15.5 21Z" />,
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
}

interface Props extends SVGProps<SVGSVGElement> {
  name: IconName
}

export default function Icon({ name, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  )
}

export const serviceIconNames = [
  'mic',
  'booth',
  'printer',
  'signpost',
  'palette',
  'megaphone',
  'truck',
  'video',
] as const

export const valueIconNames = ['star', 'lightbulb', 'shield', 'flame'] as const
