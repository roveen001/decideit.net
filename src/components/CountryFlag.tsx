import { cn } from "@/lib/utils";

type CountryFlagProps = {
  countryCode: string;
  className?: string;
};

const flags: Record<string, React.ReactNode> = {
  USA: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 48">
      <path fill="#FFF" d="M0 0h72v48H0z" />
      <path
        fill="#B22234"
        d="M0 0h72v4H0zm0 8h72v4H0zm0 16h72v4H0zm0 24h72v4H0zm0 8h72v4H0zm0-16h72v4H0zm0 8h72v4H0z"
      />
      <path fill="#3C3B6E" d="M0 0h36v28H0z" />
      <g fill="#FFF">
        <path d="M6.3 19.3 4.4 7.8l-1.9 11.5-9.3-7 9.3-7-1.9 11.5L4.4 5l4.6 14.3-7.5-9.3 7.5-9.3L6.3 19.3zM18.3 19.3l-1.9-11.5-1.9 11.5-9.3-7 9.3-7-1.9 11.5 4.6-14.3 4.6 14.3-7.5-9.3 7.5-9.3-1.9 11.5zM30.3 19.3l-1.9-11.5-1.9 11.5-9.3-7 9.3-7-1.9 11.5 4.6-14.3 4.6 14.3-7.5-9.3 7.5-9.3-1.9 11.5zM6.3 19.3 4.4 7.8l-1.9 11.5-9.3-7 9.3-7-1.9 11.5L4.4 5l4.6 14.3-7.5-9.3 7.5-9.3L6.3 19.3zM14.4 5l-1.9 11.5 1.9 11.5L7 21.2l7.4-9.9-7.5 9.3L12.5 5l-4.6 14.3 9.4 7-9.4 7 1.9-11.5zM26.4 5l-1.9 11.5 1.9 11.5-7.4-9.9 7.4-9.9-7.5 9.3L24.5 5l-4.6 14.3 9.4 7-9.4 7 1.9-11.5zM14.4 23.8l-1.9-11.5-1.9 11.5-9.3-7 9.3-7-1.9 11.5L10.9 5l4.6 14.3-7.5-9.3 7.5-9.3L14.4 23.8zM26.4 23.8l-1.9-11.5-1.9 11.5-9.3-7 9.3-7-1.9 11.5L22.9 5l4.6 14.3-7.5-9.3 7.5-9.3L26.4 23.8z" />
      </g>
    </svg>
  ),
  Canada: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 600">
        <path fill="#ff0000" d="M0 0h300v600H0z"/>
        <path fill="#fff" d="M300 0h600v600H300z"/>
        <path fill="#ff0000" d="M900 0h300v600H900z"/>
        <path fill="#ff0000" d="M600 130L630 250h-60L600 130zm30 140l50-30 20 40-50 20-20-30zm-60 0l-50-30-20 40 50 20 20-30zM600 300l110 30-10-50-90-10-10 30zm0 0l-110 30 10-50 90-10 10 30zM600 450l-30-120h60L600 450z"/>
    </svg>
  ),
  Germany: (
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3">
        <path d="M0 0h5v3H0z"/>
        <path fill="#D00" d="M0 1h5v2H0z"/>
        <path fill="#FFCE00" d="M0 2h5v1H0z"/>
    </svg>
  ),
};

export default function CountryFlag({ countryCode, className }: CountryFlagProps) {
  const flag = flags[countryCode];

  if (!flag) {
    return null;
  }

  return (
    <div className={cn("w-4 h-3 rounded-sm overflow-hidden", className)}>
      {flag}
    </div>
  );
}
