
export const partialComponent = (Component, partialProps) => {
    return props => {
        return <Component {...props} {...partialProps} />
    }
}

export const Button = ({ size, color, className, onClick, children, withoutWidth, ...props }) => {
    return (
        <div onClick={onClick} className={`p-2 flex justify-center gap-2 rounded-md font-semibold border-primary cursor-pointer
        ${withoutWidth ? 'w-full py-5' : 'py-3 '}
        ${className}`}>
            <button
                {...props}
            >
                {children}
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

