import React, { cloneElement, Children } from 'react'

const CollectionPage = ({ collectionName, children }) => {

    const cloneChildren = Children.map(children, child =>
        cloneElement(child, { collectionName })
    )

    return (
        <div>
            {cloneChildren}
        </div>
    )
}

export default CollectionPage