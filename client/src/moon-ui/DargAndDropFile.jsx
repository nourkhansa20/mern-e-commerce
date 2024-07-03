import React, { useEffect, useState } from 'react';

const DragAndDropFile = ({ sendImage, style }) => {
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);

    useEffect(() => {
        if (files.length > 0) {
            const formData = new FormData();
            files.forEach((file, index) => {
                formData.append(`images`, file);
            });
            sendImage(formData);
        }
    }, [files, sendImage]);

    const handleDrop = (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileInputChange = (e) => {
        handleFiles(e.target.files);
    };

    const handleFiles = (fileList) => {
        const newImages = [];
        const newFiles = [];
        for (let i = 0; i < fileList.length; i++) {
            const file = fileList[i];
            if (file && file.type.startsWith('image/')) {
                newFiles.push(file);
                const reader = new FileReader();
                reader.onload = () => {
                    newImages.push(reader.result);
                    if (newImages.length === fileList.length) {
                        setImages((prevImages) => [...prevImages, ...newImages]);
                        setFiles((prevFiles) => [...prevFiles, ...newFiles]);
                    }
                };
                reader.readAsDataURL(file);
            }
        }
    };

    const handleRemoveImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <div
            className={'border-[1px] border-dashed border-[#ccc] p-[20px] rounded-md text-center cursor-pointer flex items-center justify-center overflow-hidden ' + style}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
        >
            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileInputChange}
                className='hidden'
                id="fileInput"
            />
            <label htmlFor="fileInput">
                {images.length > 0 ? (
                    <div className='flex flex-wrap'>
                        {images.map((img, index) => (
                            <div key={index} className='w-60 h-36 relative content-stretch flex items-center justify-center rounded-md cursor-pointer'>
                                <img
                                    src={img}
                                    alt={`Dropped ${index}`}
                                    className='max-w-full max-h-full'
                                />
                                <button
                                    type='button'
                                    onClick={() => handleRemoveImage(index)}
                                    className='absolute top-0 right-0 bg-red-500 text-white rounded-full p-1'
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className='cursor-pointer'>Click to choose or drag and drop photos here</p>
                )}
            </label>
        </div>
    );
};

export default DragAndDropFile;
