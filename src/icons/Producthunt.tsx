import * as React from 'react';

export function ProducthuntIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className={`fill-current ${props.className ?? ''}`}
    >
      <title>{'Product Hunt icon'}</title>
      <path d="M13.604 8.4h-3.405V12h3.405a1.8 1.8 0 100-3.6zM12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm1.604 14.4h-3.405V18H7.801V6h5.804a4.2 4.2 0 11-.001 8.4z" />
    </svg>
  );
}
