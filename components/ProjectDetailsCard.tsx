
import React, { useState, useEffect } from 'react';
import type { ProjectDetails } from '../types';

interface ProjectDetailsCardProps {
    details: ProjectDetails;
    isEditMode: boolean;
    onDetailsChange: (field: keyof ProjectDetails, value: string) => void;
}

const DetailItem: React.FC<{ icon: string; label: string; value: string; isEditMode: boolean; onSave: (newValue: string) => void; }> = ({ icon, label, value, isEditMode, onSave }) => {
    const [inputValue, setInputValue] = useState(value);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        setInputValue(value);
        if (!isEditMode) {
            setIsEditing(false);
        }
    }, [value, isEditMode]);

    const handleSave = () => {
        if (inputValue.trim() !== value) {
            onSave(inputValue.trim());
        }
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSave();
        } else if (e.key === 'Escape') {
            setInputValue(value);
            setIsEditing(false);
        }
    };

    if (isEditMode) {
        return (
            <div className="flex items-center gap-3 py-1">
                <i className={`${icon} text-blue-500 w-5 text-center`}></i>
                <span className="font-semibold text-gray-600 w-20">{label}:</span>
                {isEditing ? (
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onBlur={handleSave}
                        onKeyDown={handleKeyDown}
                        className="flex-1 p-1 bg-gray-100 border-b-2 border-blue-500 focus:outline-none"
                        autoFocus
                    />
                ) : (
                    <div className="flex-1 flex items-center justify-between group">
                        <p className="text-gray-800">{value}</p>
                        <button onClick={() => setIsEditing(true)} className="text-gray-400 hover:text-blue-600 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" aria-label={`Edit ${label}`}>
                            <i className="fas fa-pencil-alt fa-xs"></i>
                        </button>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="flex items-center gap-3 py-1">
            <i className={`${icon} text-blue-500 w-5 text-center`}></i>
            <span className="font-semibold text-gray-600 w-20">{label}:</span>
            <p className="text-gray-800">{value}</p>
        </div>
    );
};


const ProjectDetailsCard: React.FC<ProjectDetailsCardProps> = ({ details, isEditMode, onDetailsChange }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
                <i className="fas fa-info-circle mr-2"></i>Detalhes da Obra
            </h2>
            <div className="space-y-3">
               <DetailItem
                    icon="fas fa-map-marker-alt"
                    label="Endereço"
                    value={details.address}
                    isEditMode={isEditMode}
                    onSave={(newValue) => onDetailsChange('address', newValue)}
                />
                 <DetailItem
                    icon="fas fa-user"
                    label="Cliente"
                    value={details.client}
                    isEditMode={isEditMode}
                    onSave={(newValue) => onDetailsChange('client', newValue)}
                />
            </div>
        </div>
    );
};

export default ProjectDetailsCard;
