
import React, { useRef } from 'react';
import type { Activity, Photo } from '../types';

interface ActivityItemProps {
    activity: Activity;
    isEditMode: boolean;
    onToggle: () => void;
    onAddPhoto: (photo: string) => void;
    onRemovePhoto: (photoIndex: number) => void;
    onImageClick: (photo: Photo) => void;
    onDateChange: (newDate: string) => void;
    onPhotoCommentChange: (photoIndex: number, newComment: string) => void;
}

const CameraIcon: React.FC<{className: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 4h3l2-2h6l2 2h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm8 14a5 5 0 1 0 0-10 5 5 0 0 0 0 10z" />
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    </svg>
);

const TrashIcon: React.FC<{className: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
    </svg>
);


const ActivityItem: React.FC<ActivityItemProps> = ({ activity, isEditMode, onToggle, onAddPhoto, onRemovePhoto, onImageClick, onDateChange, onPhotoCommentChange }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onAddPhoto(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' };
        return new Date(dateString).toLocaleDateString('pt-BR', options);
    };

    return (
        <div className={`p-4 rounded-lg border-l-4 transition-colors duration-300 ${activity.completed ? 'bg-green-50 border-green-500' : 'bg-gray-50 border-gray-300'}`}>
            <div className="flex flex-wrap items-center justify-between gap-y-3">
                <div className="flex items-start">
                    <input
                        type="checkbox"
                        checked={activity.completed}
                        onChange={onToggle}
                        className="h-6 w-6 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-1 cursor-pointer flex-shrink-0"
                    />
                    <div className="ml-4">
                        <p className={`font-semibold ${activity.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                            {activity.name}
                        </p>
                        <div className="text-sm text-gray-500 flex items-center mt-1">
                           <i className="far fa-calendar-alt mr-1.5"></i>
                           {isEditMode ? (
                               <input 
                                   type="date"
                                   value={activity.dueDate}
                                   onChange={(e) => onDateChange(e.target.value)}
                                   className="text-sm text-gray-600 bg-gray-100 border rounded p-1"
                               />
                           ) : (
                               <span>Entrega: {formatDate(activity.dueDate)}</span>
                           )}
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center text-sm bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                    <CameraIcon className="h-4 w-4 mr-2" />
                    <span>Foto</span>
                </button>
                <input type="file" accept="image/*" capture="environment" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
            </div>
            {activity.photos.length > 0 && (
                <div className="mt-4 pl-10">
                    <p className="text-sm font-medium text-gray-600 mb-2">Fotos do Progresso:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {activity.photos.map((photo, index) => (
                            <div key={index}>
                                <div className="relative group">
                                    <img
                                        src={photo.url}
                                        alt={`Progress ${index + 1}`}
                                        className="w-full h-24 object-cover rounded-md cursor-pointer border-2 border-gray-200"
                                        onClick={() => onImageClick(photo)}
                                    />
                                    <button 
                                        onClick={() => onRemovePhoto(index)}
                                        className="absolute top-0 right-0 m-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        aria-label="Remove photo"
                                    >
                                        <TrashIcon className="h-3 w-3" />
                                    </button>
                                </div>
                                 {isEditMode ? (
                                    <input
                                        type="text"
                                        placeholder="Adicionar comentário..."
                                        value={photo.comment}
                                        onChange={(e) => onPhotoCommentChange(index, e.target.value)}
                                        className="w-full text-xs mt-1 p-1 border rounded"
                                    />
                                ) : (
                                    photo.comment && <p className="text-xs text-gray-500 mt-1 p-1 truncate" title={photo.comment}>{photo.comment}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActivityItem;
