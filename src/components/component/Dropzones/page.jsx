'use client';

import Image from 'next/image';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

export default function MyDropzone({
    file,
    setFile,
    className = '',
    message = 'Attach your files',
    allowedTypes = new Set(['image/*', 'application/pdf'])
}) {
    const onDrop = useCallback(
        (acceptedFiles) => {
            if (acceptedFiles.length > 1 || file != null) {
                toast.error('Only one file is allowed');
                return;
            }

            const acceptedFile = acceptedFiles[0];

            if (!Array.from(allowedTypes).some(type => acceptedFile.type.match(type))) {
                toast.error(`Invalid file type. Allowed types: ${Array.from(allowedTypes).join(', ')}`);
                return;
            }

            setFile(Object.assign(acceptedFile, { preview: URL.createObjectURL(acceptedFile) }));
        },
        [setFile, allowedTypes]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': [],
            'application/pdf': [],
        },
    });

    const removeFile = () => {
        setFile(null);
    };

    return (
        <>
            {/* Dropzone Area */}
            {
                !file && (
                    <div
                        {...getRootProps({
                            className: `border-dashed border-2 border-gray-400 p-6 rounded-lg text-center cursor-pointer transition ${isDragActive ? 'bg-blue-100' : ''} ${className}`
                        })}
                    >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                            <p className="text-blue-500">Drop the files here ...</p>
                        ) : (
                            <p className="text-gray-700">{message}</p>
                        )}
                    </div>
                )
            }

            {/* File Preview */}
            {file && (
                <div className="relative flex items-center p-4 mt-4 space-x-4 overflow-hidden border border-gray-300 rounded-md shadow-lg">
                    {file.type.startsWith('image/') ? (
                        <Image
                            src={file.preview}
                            alt={file.name}
                            width={64}
                            height={64}
                            onLoad={() => URL.revokeObjectURL(file.preview)}
                            className="object-cover w-16 h-16 rounded-md"
                        />
                    ) : (
                        <div className="flex items-center justify-center w-16 h-16 text-gray-500 bg-gray-100 rounded-md">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-8 h-8"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4.5v15m7.5-7.5h-15"
                                />
                            </svg>
                        </div>
                    )}
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">{file.name}</p>
                        <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                    </div>
                    <button
                        type="button"
                        className="absolute flex items-center justify-center w-6 h-6 text-white bg-red-500 rounded-full top-2 right-2"
                        onClick={removeFile}
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
                </div>
            )}
        </>
    );
}
