
import React, { useMemo } from 'react';
import type { Phase, Photo } from '../types';
import ActivityItem from './ActivityItem';

interface PhaseCardProps {
    phase: Phase;
    onToggleActivity: (phaseId: number, activityId: number) => void;
    onAddPhoto: (phaseId: number, activityId: number, photo: string) => void;
    onRemovePhoto: (phaseId: number, activityId: number, photoIndex: number) => void;
    onImageClick: (photo: Photo) => void;
    isEditMode: boolean;
    onDateChange: (phaseId: number, activityId: number, newDate: string) => void;
    onPhotoCommentChange: (phaseId: number, activityId: number, photoIndex: number, newComment: string) => void;
}

const PhaseCard: React.FC<PhaseCardProps> = ({ phase, onToggleActivity, onAddPhoto, onRemovePhoto, onImageClick, isEditMode, onDateChange, onPhotoCommentChange }) => {
    const phaseProgress = useMemo(() => {
        if (phase.activities.length === 0) return 0;
        const completedCount = phase.activities.filter(a => a.completed).length;
        return Math.round((completedCount / phase.activities.length) * 100);
    }, [phase.activities]);

    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl">
            <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{phase.name}</h3>
                    <span className="text-md font-semibold text-blue-600">{phaseProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                    <div
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${phaseProgress}%` }}
                    ></div>
                </div>
                <div className="space-y-4">
                    {phase.activities.map(activity => (
                        <ActivityItem
                            key={activity.id}
                            activity={activity}
                            isEditMode={isEditMode}
                            onToggle={() => onToggleActivity(phase.id, activity.id)}
                            onAddPhoto={(photo) => onAddPhoto(phase.id, activity.id, photo)}
                            onRemovePhoto={(photoIndex) => onRemovePhoto(phase.id, activity.id, photoIndex)}
                            onImageClick={onImageClick}
                            onDateChange={(newDate) => onDateChange(phase.id, activity.id, newDate)}
                            onPhotoCommentChange={(photoIndex, newComment) => onPhotoCommentChange(phase.id, activity.id, photoIndex, newComment)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PhaseCard;
