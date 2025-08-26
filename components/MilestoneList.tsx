
import React from 'react';
import type { Phase, Photo } from '../types';
import PhaseCard from './PhaseCard';

interface MilestoneListProps {
    phases: Phase[];
    onToggleActivity: (phaseId: number, activityId: number) => void;
    onAddPhoto: (phaseId: number, activityId: number, photo: string) => void;
    onRemovePhoto: (phaseId: number, activityId: number, photoIndex: number) => void;
    onImageClick: (photo: Photo) => void;
    isEditMode: boolean;
    onDateChange: (phaseId: number, activityId: number, newDate: string) => void;
    onPhotoCommentChange: (phaseId: number, activityId: number, photoIndex: number, newComment: string) => void;
}

const MilestoneList: React.FC<MilestoneListProps> = (props) => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Checklist de Atividades</h2>
            {props.phases.map(phase => (
                <PhaseCard
                    key={phase.id}
                    phase={phase}
                    onToggleActivity={props.onToggleActivity}
                    onAddPhoto={props.onAddPhoto}
                    onRemovePhoto={props.onRemovePhoto}
                    onImageClick={props.onImageClick}
                    isEditMode={props.isEditMode}
                    onDateChange={props.onDateChange}
                    onPhotoCommentChange={props.onPhotoCommentChange}
                />
            ))}
        </div>
    );
};

export default MilestoneList;
