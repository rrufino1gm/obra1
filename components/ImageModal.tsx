
import React, { useEffect } from 'react';
import type { Photo } from '../types';

interface ImageModalProps {
    photo: Photo;
    onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ photo, onClose }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50 transition-opacity duration-300 p-4"
            onClick={onClose}
        >
            <div 
                className="relative bg-white p-2 md:p-4 rounded-lg shadow-2xl w-full max-w-4xl max-h-full"
                onClick={e => e.stopPropagation()} // Prevent closing when clicking on the image
            >
                <img src={photo.url} alt="Progress view" className="max-w-full max-h-[85vh] object-contain rounded mx-auto"/>
                {photo.comment && (
                    <div className="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4 bg-black bg-opacity-60 text-white p-3 rounded-b-lg">
                        <p className="text-sm">{photo.comment}</p>
                    </div>
                )}
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 mt-2 mr-2 bg-gray-800 bg-opacity-50 text-white rounded-full h-8 w-8 flex items-center justify-center text-2xl shadow-lg hover:bg-gray-700 transition-colors z-10"
                    aria-label="Close image view"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default ImageModal;
