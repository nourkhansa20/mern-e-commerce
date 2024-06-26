import React from 'react';

const Form = ({ children }) => {
    const enhancedChildren = React.Children.map(children, child => {
        // Check if the child is a valid React element
        if (React.isValidElement(child)) {
            // Clone the child and add the new props
            return React.cloneElement(child, { ...register(child.props.id) });
        }
        return child;
    });

    return (
        <form>
            {enhancedChildren}
        </form>
    );
}

export default Form;
