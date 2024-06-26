import React from 'react';

const RepeatingSection = ({ components, onComponentsChange, children }) => {
  const addComponent = () => {
    const newComponents = [...components, { id: components.length, value: '' }];
    onComponentsChange(newComponents);
  };

  const handleValueChange = (id, newValue) => {
    const updatedComponents = components.map(component =>
      component.id === id ? { ...component, value: newValue } : component
    );
    onComponentsChange(updatedComponents);
  };

  return (
    <div className="p-4">
      {components.map(component => (
        <div key={component.id} className="mb-4">
          {React.cloneElement(children, {
            value: component.value,
            onChange: e => handleValueChange(component.id, e.target.value)
          })}
        </div>
      ))}
      <button
        onClick={addComponent}
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Component
      </button>
    </div>
  );
};

export default RepeatingSection;
