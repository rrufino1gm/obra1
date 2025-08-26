
import React, { useState, useEffect } from 'react';

interface GoogleDriveModalProps {
    currentUrl: string;
    onClose: () => void;
    onSave: (url: string) => void;
}

const GoogleDriveModal: React.FC<GoogleDriveModalProps> = ({ currentUrl, onClose, onSave }) => {
    const [url, setUrl] = useState(currentUrl);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleSave = () => {
        if (url.trim()) {
            onSave(url);
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
            onClick={onClose}
        >
            <div 
                className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-md"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold text-gray-800 mb-4">Configurar Google Drive</h2>
                <p className="text-gray-600 mb-4 text-sm">
                    Cole a URL da pasta do Google Drive onde as fotos da obra devem ser armazenadas.
                </p>
                <div>
                    <label htmlFor="driveUrl" className="block text-sm font-medium text-gray-700 mb-1">
                        URL da Pasta
                    </label>
                    <input
                        type="url"
                        id="driveUrl"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://drive.google.com/drive/folders/..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSave}
                        className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GoogleDriveModal;
