import React, { useState } from 'react';

// TabChild component to define individual tabs
const TabChild = ({ title, children }) => <>{children}</>;

// Tab component
const Tab = ({ tabContainerClassName = 'border-b border-gray-200', containerClassName = '', saparator = '', saparatorClassName = '', acticeTabClassName = 'border-b-2 border-blue-500 text-blue-500', inactiveTabClassName = 'text-gray-500', tabClassName = '', children }) => {
  const [activeTab, setActiveTab] = useState(0);

  // Get the titles of each tab
  const tabs = React.Children.map(children, (child) => child.props.title);

  return (
    <>
      {children &&
        <div className={containerClassName}>
          <div className={`flex items-center ${tabContainerClassName}`}>
            {tabs.map((title, index) => (
              <React.Fragment key={index}>
                <button
                  className={`py-2 px-4 ${tabClassName} ${activeTab === index ? acticeTabClassName : inactiveTabClassName}`}
                  onClick={() => setActiveTab(index)}
                >
                  {title}
                </button>
                {index < tabs.length - 1 && <span className={`${saparatorClassName}`}>{saparator}</span>}
              </React.Fragment>
            ))}
          </div>
          <div >
            {React.Children.toArray(children)[activeTab]}
          </div>
        </div>
      }

    </>
  );
};

// Export both Tab and TabChild components
export default Tab;

Tab.child = TabChild