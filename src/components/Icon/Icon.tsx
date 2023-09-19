import { SVGProps } from "react";

const PackageIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1rem"
    height="1rem"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16.5 9.40002L7.5 4.21002" />
    <path d="M21 16V8.00002C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27002L13 2.27002C12.696 2.09449 12.3511 2.00208 12 2.00208C11.6489 2.00208 11.304 2.09449 11 2.27002L4 6.27002C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8.00002V16C3.00036 16.3508 3.09294 16.6952 3.26846 16.9989C3.44398 17.3025 3.69626 17.5547 4 17.73L11 21.73C11.304 21.9056 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9056 13 21.73L20 17.73C20.3037 17.5547 20.556 17.3025 20.7315 16.9989C20.9071 16.6952 20.9996 16.3508 21 16Z" />
    <path d="M3.27002 6.96002L12 12.01L20.73 6.96002" />
    <path d="M12 22.08V12" />
  </svg>
);

const ClockIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1rem"
    height="1rem"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
    <path d="M12 6V12L16 14" />
  </svg>
);

const LinkIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1rem"
    height="1rem"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11" />
    <path d="M15 3H21V9" />
    <path d="M10 14L21 3" />
  </svg>
);

const PakcageLogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="60"
    height="60"
    viewBox="0 0 60 60"
    fill="none"
    {...props}
  >
    <circle cx="30" cy="30" r="30" fill="#5956E9" />
    <rect x="14" y="14" width="32" height="32" rx="9.14286" fill="white" />
    <circle cx="23.1429" cy="36.8571" r="6.85714" fill="#FAB8C4" />
    <circle cx="36.8571" cy="23.1428" r="6.85714" fill="#5956E9" />
  </svg>
);

const RightArrowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1rem"
    height="1rem"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M9.00002 18L15 12L9.00002 6" />
  </svg>
);

const HorizontalScroll = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeMiterlimit="10"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 2L12 9" />
    <path d="M9 5L12 2L15 5" />
    <path d="M12 22L12 15" />
    <path d="M9 19L12 22L15 19" />
    <path d="M21 15L6 15C4.34315 15 3 13.6569 3 12C3 10.3432 4.34314 9 6 9L21 9" />
  </svg>
);
export {
  LinkIcon,
  PackageIcon,
  ClockIcon,
  PakcageLogoIcon,
  RightArrowIcon,
  HorizontalScroll,
};
