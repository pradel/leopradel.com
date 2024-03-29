import * as React from 'react';

export function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
      strokeLinejoin="round"
      strokeMiterlimit={1.414}
      {...props}
      className={`fill-current ${props.className ?? ''}`}
    >
      <path
        d="M16 3.038a6.62 6.62 0 01-1.885.517 3.299 3.299 0 001.443-1.816c-.634.37-1.337.64-2.085.79a3.282 3.282 0 00-5.593 2.99 9.307 9.307 0 01-6.766-3.42A3.222 3.222 0 00.67 3.75c0 1.14.58 2.143 1.46 2.732a3.278 3.278 0 01-1.487-.41v.04c0 1.59 1.13 2.918 2.633 3.22a3.336 3.336 0 01-1.475.056 3.29 3.29 0 003.07 2.28 6.578 6.578 0 01-4.85 1.359 9.332 9.332 0 005.04 1.474c6.04 0 9.34-5 9.34-9.33 0-.14 0-.28-.01-.42a6.63 6.63 0 001.64-1.7z"
        fillRule="nonzero"
      />
    </svg>
  );
}
