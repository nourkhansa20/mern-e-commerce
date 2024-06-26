import React, { useState } from 'react'
import { FilledTextField } from '../../moon-ui/TextField'
import UserInfoForm from '../../components/Form/UserInfoForm'
import RepeatingSection from '../../moon-ui/RepeatingSection'

const UserInfo = () => {
    const [components, setComponents] = useState([{ id: 0, value: '' }]);
    const handleComponentsChange = (newComponents) => {
        setComponents(newComponents);
    };

    const handleSubmit = () => {
        console.log('Component Values:', components.map(component => component.value));
    };

    return (
        <div>
            <UserInfoForm />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
                <RepeatingSection
                    components={components}
                    onComponentsChange={handleComponentsChange}
                >
                    <SampleComponent />
                </RepeatingSection>
                <button
                    onClick={handleSubmit}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

export default UserInfo

const SampleComponent = ({ value, onChange }) => {
    return (
      <div className="p-4 bg-gray-200 rounded shadow">
        <input
          type="text"
          value={value}
          onChange={onChange}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter value"
        />
      </div>
    );
  };
  