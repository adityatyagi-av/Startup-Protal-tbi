'use client'
import Image from 'next/image';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

export default function MyDropzone({ 
    files, 
    setfiles, 
    className = '', 
    message = 'Attach your files', 
    max, 
    allowedTypes = new Set(['image/*', 'application/pdf']) 
}) {
    
    const onDrop = useCallback((acceptedFiles) => {
    

       
        if (max && files.length + acceptedFiles.length > max) {
            toast.error(`Only ${max} items allowed`);
            return;
        }

        
        const filteredFiles = acceptedFiles.filter(file => {
            return Array.from(allowedTypes).some(type => file.type.match(type));
        });

        if (filteredFiles.length !== acceptedFiles.length) {
            const allowedTypesText = Array.from(allowedTypes).join(', ');
            toast.error(`Some files were not allowed. Allowed types: ${allowedTypesText}`);;
        }

        if (filteredFiles.length) {
            setfiles(prevFiles => [
                ...prevFiles,
                ...filteredFiles.map(file =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                )
            ]);
        }
    }, [files, setfiles, max, allowedTypes]);

    // Configure useDropzone
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop ,
        accept: {
          'image/*': [],
          'application/pdf': [], 
      },
  });

    // Remove file
    const removeFile = (name) => {
        setfiles(prevFiles => prevFiles.filter(file => file.name !== name));
    };

    return (
        <>
            {/* Dropzone Area */}
            <div
                {...getRootProps({
                    className: `border-dashed border-2 border-gray-400 p-6 rounded-lg text-center cursor-pointer ${isDragActive ? 'bg-blue-100' : ''} ${className}`
                })}
            >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p className="text-blue-500">Drop the files here ...</p>
                ) : (
                    <p className="text-gray-700">{message}</p>
                )}
            </div>

            {/* Preview Area */}
            <ul className={`flex flex-wrap gap-4 mt-4 ${className} `}>
                {files.map((file, index) => (
                    <li
                        key={index}
                        className="relative h-32 w-32 rounded-md shadow-lg border border-gray-300 overflow-hidden"
                    >
                        <Image
                            src={file.preview}
                            alt={file.name}
                            width={128}
                            height={128}
                            onLoad={() => URL.revokeObjectURL(file.preview)}
                            className="h-full w-full object-cover rounded-md"
                        />
                        <button
                            type="button"
                            className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                            onClick={() => removeFile(file.name)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-4 h-4"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <p className="mt-2 text-[12px] font-medium text-center text-neutral-700">
                            {file.name}
                        </p>
                    </li>
                ))}
            </ul>
        </>
    );
}
