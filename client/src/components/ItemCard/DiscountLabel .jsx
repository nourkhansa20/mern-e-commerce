import * as React from "react";
const DiscountLabel = ({ discount =100, labelClassName, discountClassName }) => (
    <>
        {
            discount > 0 && (
                <>
                    <svg
                        data-name="Layer 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 277.33 89.19"
                        className={labelClassName}
                    >
                        <path d="M266.95 0H24.23A10.39 10.39 0 0 0 13.8 10.39v19.32L1.06 43.51a4.15 4.15 0 0 0 0 5.6l12.77 14v15.68a10.39 10.39 0 0 0 10.39 10.39h242.73a10.38 10.38 0 0 0 10.38-10.39v-68.4A10.39 10.39 0 0 0 266.95 0M27.93 51.79a5.32 5.32 0 1 1 5.32-5.32 5.32 5.32 0 0 1-5.32 5.32" />
                    </svg>
                    <div className={`absolute  ${discountClassName}`}>-{discount}% OFF</div>
                </>
            )
        }
    </>
);
export default DiscountLabel;
