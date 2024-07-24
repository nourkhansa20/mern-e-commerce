import * as React from "react";
const AddressIcon = ({ className, ...props }) => (
  <svg
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  className={`${className} scale-[1.8]`}
  >
    <path d="M49 18.92a23.74 23.74 0 0 0-23.73 23.85c0 16.48 17 31.59 22.23 35.59a2.45 2.45 0 0 0 3.12 0c5.24-4.12 22.1-19.11 22.1-35.59A23.74 23.74 0 0 0 49 18.92m0 33.71a10 10 0 1 1 10-10 10 10 0 0 1-10 10" />
  </svg>
);
export default AddressIcon;
