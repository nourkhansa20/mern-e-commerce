import React from 'react'

const Flow = ({ onNext, children, currentIndex, className, onBack }) => {
    const currentChild = React.Children.toArray(children)[currentIndex]

    const goNext = (dataFromStep) => {
        if (currentIndex != children.length - 1) {
            onNext(dataFromStep)
        }
    }

    const goBack = (dataFromStep) => {
        if (currentIndex <= children.length - 1) {
            onBack(dataFromStep)
        }
    }


    if (React.isValidElement(currentChild)) {
        return React.cloneElement(currentChild, { goNext, goBack, index: currentIndex })
    }

    return (
        <div className={`${className}`}>
            {currentChild}
        </div>
    )
}

export default Flow