
import React, { useState, useEffect } from 'react';

interface HeaderProps {
    projectTitle: string;
    onTitleChange: (newTitle: string) => void;
    overallProgress: number;
    isEditMode: boolean;
    onToggleEditMode: () => void;
    onOpenDriveModal: () => void;
    driveFolderUrl: string;
}

const Header: React.FC<HeaderProps> = ({ projectTitle, onTitleChange, overallProgress, isEditMode, onToggleEditMode, onOpenDriveModal, driveFolderUrl }) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [currentTitle, setCurrentTitle] = useState(projectTitle);
    const isDriveConnected = driveFolderUrl.trim() !== '';

    useEffect(() => {
        setCurrentTitle(projectTitle);
    }, [projectTitle]);

    const handleTitleBlur = () => {
        if (currentTitle.trim() === '') {
            setCurrentTitle(projectTitle);
        } else {
            onTitleChange(currentTitle);
        }
        setIsEditingTitle(false);
    };

    const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleTitleBlur();
        } else if (e.key === 'Escape') {
            setCurrentTitle(projectTitle);
            setIsEditingTitle(false);
        }
    };

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 md:px-8 py-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-center md:text-left w-full md:w-auto">
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                            {isEditingTitle && isEditMode ? (
                                <input
                                    type="text"
                                    value={currentTitle}
                                    onChange={(e) => setCurrentTitle(e.target.value)}
                                    onBlur={handleTitleBlur}
                                    onKeyDown={handleTitleKeyDown}
                                    className="text-2xl md:text-3xl font-bold text-gray-800 bg-gray-100 border-b-2 border-blue-500 focus:outline-none"
                                    autoFocus
                                />
                            ) : (
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{projectTitle}</h1>
                            )}
                            {isEditMode && !isEditingTitle && (
                                <button onClick={() => setIsEditingTitle(true)} className="text-gray-400 hover:text-blue-600 transition-colors" aria-label="Edit project title">
                                    <i className="fas fa-pencil-alt fa-xs"></i>
                                </button>
                            )}
                        </div>
                        <p className="text-gray-500">Relatório de Progresso Diário</p>
                    </div>

                    <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-4">
                         <div className="flex items-center space-x-4">
                             <button 
                                onClick={isEditMode ? onOpenDriveModal : undefined} 
                                disabled={!isEditMode}
                                className={`text-sm py-2 px-4 rounded-lg transition-colors flex items-center font-medium ${isDriveConnected ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'} ${isEditMode ? 'hover:bg-gray-300' : 'opacity-50 cursor-not-allowed'}`}
                              >
                                {isDriveConnected ? <i className="fas fa-check-circle mr-2"></i> : <i className="fab fa-google-drive mr-2"></i>}
                                {isDriveConnected ? 'Google Drive Conectado' : 'Conectar Google Drive'}
                            </button>
                            <button onClick={onToggleEditMode} className={`text-sm py-2 px-4 rounded-lg transition-colors font-semibold ${isEditMode ? 'bg-red-100 text-red-700 hover:bg-red-200' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}>
                               {isEditMode ? 'Sair do Modo Admin' : 'Modo Admin'}
                            </button>
                        </div>
                        <div className="w-full md:w-80">
                            <div className="flex items-center justify-center md:justify-end">
                                <span className="text-lg font-semibold text-blue-600 mr-4">{overallProgress}%</span>
                                <div className="w-full bg-gray-200 rounded-full h-4">
                                    <div
                                        className="bg-blue-600 h-4 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${overallProgress}%` }}
                                    ></div>
                                </div>
                            </div>
                            <p className="text-right text-sm text-gray-500 mt-1">Progresso Geral</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
