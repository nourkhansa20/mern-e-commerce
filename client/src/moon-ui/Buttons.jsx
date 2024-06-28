import { useEffect, useState } from "react"

export const partialComponent = (Component, partialProps) => {
    return props => {
        return <Component {...props} {...partialProps} />
    }
}

export const Button = ({ size, color, className, onClick, children, withoutWidth, isLoading = false, ...props }) => {
    const [disabled, setDisabled] = useState()
    useEffect(() => {
        isLoading ? setDisabled('disabled') : setDisabled('')
    }, [isLoading])

    return (
        <div className={`p-2 flex justify-center gap-2 rounded-md font-semibold border-primary cursor-pointer
        ${withoutWidth ? 'w-full py-5' : 'py-3 w-[15ex] md:w-[30ex] '} 
        ${className}`}>
            <button
                {...props}
                disabled={disabled}
                onClick={onClick}
                className="w-full h-full"
            >

                {
                    isLoading ? (
                        <>Loading...</>
                    ) : (
                        <>
                            {children}
                        </>
                    )

                }

            </button>
        </div>
    )
}

export const PrimaryButton = ({ className, children, ...props }) => {
    return <Button className={`bg-primary text-white ${className}`} {...props}>{children}</Button>
}

export const SecondaryButton = ({ className, children, ...props }) => {
    return <Button className={`bg-secondary text-white ${className}`} {...props}>{children}</Button>
}
export const PrimaryOutlineButton = partialComponent(Button, { className: 'border-primary border-[1px] text-primary' })
export const SecondaryOutlineButton = partialComponent(Button, { className: 'border-secondary border-[1px] text-secondary' })
export const DestructiveButton = partialComponent(Button, { className: 'bg-red-500 text-white' })

// export const MobileFullScreenButton = partialComponent(Button, { className: 'bg-red-500 text-white' })

