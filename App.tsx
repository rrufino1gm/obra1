

import React, { useState, useMemo, useCallback } from 'react';
import { PROJECT_DATA, CHART_DATA } from './constants.ts';
import type { Phase, Photo, ProjectDetails } from './types.ts';
import Header from './components/Header.tsx';
import ProjectDetailsCard from './components/ProjectDetailsCard.tsx';
import ProgressChart from './components/ProgressChart.tsx';
import MilestoneList from './components/MilestoneList.tsx';
import ImageModal from './components/ImageModal.tsx';
import GoogleDriveModal from './components/GoogleDriveModal.tsx';
import LoginModal from './components/LoginModal.tsx';

const App: React.FC = () => {
    const [projectTitle, setProjectTitle] = useState<string>('Acompanhamento de Obra');
    const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
        address: 'Rua Exemplo, 123, Bairro, Cidade-UF',
        client: 'Nome do Cliente Final'
    });
    const [phases, setPhases] = useState<Phase[]>(PROJECT_DATA);
    const [modalPhoto, setModalPhoto] = useState<Photo | null>(null);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [logs, setLogs] = useState<string[]>([]);
    const [isDriveModalOpen, setIsDriveModalOpen] = useState<boolean>(false);
    const [driveFolderUrl, setDriveFolderUrl] = useState<string>('');
    const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);


    const addLog = useCallback((message: string) => {
        const timestamp = new Date().toLocaleString('pt-BR');
        setLogs(prevLogs => [`[${timestamp}] ${message}`, ...prevLogs].slice(0, 10)); // Keep last 10 logs
    }, []);

    const handleToggleEditMode = useCallback(() => {
        if (isEditMode) {
            setIsEditMode(false);
            addLog('Modo Admin desativado.');
        } else {
            setIsLoginModalOpen(true);
        }
    }, [isEditMode, addLog]);
    
    const handleLoginSuccess = useCallback(() => {
        setIsEditMode(true);
        setIsLoginModalOpen(false);
        addLog('Modo Admin ativado com sucesso.');
    }, [addLog]);

    const handleTitleChange = useCallback((newTitle: string) => {
        setProjectTitle(newTitle);
        addLog(`Título do projeto alterado para: "${newTitle}"`);
    }, [addLog]);
    
    const handleDetailsChange = useCallback((field: keyof ProjectDetails, value: string) => {
        setProjectDetails(prevDetails => ({ ...prevDetails, [field]: value }));
        const fieldName = field === 'address' ? 'Endereço' : 'Cliente';
        addLog(`${fieldName} da obra alterado para: "${value}"`);
    }, [addLog]);

    const handleToggleActivity = useCallback((phaseId: number, activityId: number) => {
        setPhases(prevPhases => {
            let activityName = '';
            const newPhases = prevPhases.map(phase =>
                phase.id === phaseId
                    ? {
                          ...phase,
                          activities: phase.activities.map(activity => {
                              if (activity.id === activityId) {
                                  activityName = activity.name;
                                  return { ...activity, completed: !activity.completed };
                              }
                              return activity;
                          }),
                      }
                    : phase
            );
            const status = newPhases.find(p => p.id === phaseId)?.activities.find(a => a.id === activityId)?.completed ? 'concluída' : 'pendente';
            addLog(`Atividade "${activityName}" marcada como ${status}.`);
            return newPhases;
        });
    }, [addLog]);

    const handleAddPhoto = useCallback((phaseId: number, activityId: number, photoUrl: string) => {
        setPhases(prevPhases => {
             let activityName = '';
             const newPhases = prevPhases.map(phase =>
                phase.id === phaseId
                    ? {
                          ...phase,
                          activities: phase.activities.map(activity => {
                              if (activity.id === activityId) {
                                  activityName = activity.name;
                                  const newPhoto: Photo = { url: photoUrl, comment: '' };
                                  return { ...activity, photos: [...activity.photos, newPhoto] };
                              }
                              return activity;
                          }),
                      }
                    : phase
            );
            addLog(`Foto adicionada à atividade "${activityName}".`);
            return newPhases;
        });
    }, [addLog]);
    
    const handleRemovePhoto = useCallback((phaseId: number, activityId: number, photoIndex: number) => {
        setPhases(prevPhases => {
            let activityName = '';
            const newPhases = prevPhases.map(phase =>
                phase.id === phaseId
                    ? {
                          ...phase,
                          activities: phase.activities.map(activity => {
                              if(activity.id === activityId) {
                                activityName = activity.name;
                                return { ...activity, photos: activity.photos.filter((_, index) => index !== photoIndex) };
                              }
                              return activity;
                          }),
                      }
                    : phase
            );
            addLog(`Foto removida da atividade "${activityName}".`);
            return newPhases;
        });
    }, [addLog]);
    
    const handleDateChange = useCallback((phaseId: number, activityId: number, newDate: string) => {
        setPhases(prevPhases => {
            let activityName = '';
            const formattedDate = new Date(newDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            const newPhases = prevPhases.map(phase =>
                phase.id === phaseId
                    ? {
                          ...phase,
                          activities: phase.activities.map(activity => {
                              if (activity.id === activityId) {
                                  activityName = activity.name;
                                  return { ...activity, dueDate: newDate };
                              }
                              return activity;
                          }),
                      }
                    : phase
            );
            addLog(`Data da atividade "${activityName}" alterada para ${formattedDate}.`);
            return newPhases;
        });
    }, [addLog]);
    
    const handlePhotoCommentChange = useCallback((phaseId: number, activityId: number, photoIndex: number, newComment: string) => {
        setPhases(prevPhases => {
            let activityName = '';
            const newPhases = prevPhases.map(phase =>
                phase.id === phaseId
                    ? {
                          ...phase,
                          activities: phase.activities.map(activity => {
                              if (activity.id === activityId) {
                                  activityName = activity.name;
                                  return {
                                      ...activity,
                                      photos: activity.photos.map((photo, index) =>
                                          index === photoIndex ? { ...photo, comment: newComment } : photo
                                      ),
                                  };
                              }
                              return activity;
                          }),
                      }
                    : phase
            );
            if (newComment.trim() !== '') {
                addLog(`Comentário adicionado/alterado na foto da atividade "${activityName}".`);
            } else {
                addLog(`Comentário removido da foto da atividade "${activityName}".`);
            }
            return newPhases;
        });
    }, [addLog]);
    
    const handleSaveDriveConfig = useCallback((url: string) => {
        setDriveFolderUrl(url);
        setIsDriveModalOpen(false);
        addLog(`Pasta do Google Drive configurada: ${url}`);
    }, [addLog]);

    const handleClearLogs = useCallback(() => {
        if (isEditMode) {
            setLogs([]);
            addLog('Log de alterações foi limpo.');
        }
    }, [isEditMode, addLog]);

    const overallProgress = useMemo(() => {
        const totalWeight = phases.reduce((sum, phase) => sum + phase.percentageWeight, 0);
        const completedWeight = phases.reduce((sum, phase) => {
            const completedActivities = phase.activities.filter(a => a.completed).length;
            const phaseProgress = phase.activities.length > 0 ? (completedActivities / phase.activities.length) : 0;
            return sum + (phaseProgress * phase.percentageWeight);
        }, 0);
        return totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0;
    }, [phases]);

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
            <Header 
              projectTitle={projectTitle}
              onTitleChange={handleTitleChange}
              overallProgress={overallProgress}
              isEditMode={isEditMode}
              onToggleEditMode={handleToggleEditMode}
              onOpenDriveModal={() => setIsDriveModalOpen(true)}
              driveFolderUrl={driveFolderUrl}
            />
            <main className="container mx-auto p-4 md:p-8">
                <ProjectDetailsCard 
                    details={projectDetails}
                    isEditMode={isEditMode}
                    onDetailsChange={handleDetailsChange}
                />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <ProgressChart data={CHART_DATA} />
                    </div>
                    <div className="lg:col-span-2">
                        <MilestoneList
                            phases={phases}
                            onToggleActivity={handleToggleActivity}
                            onAddPhoto={handleAddPhoto}
                            onRemovePhoto={handleRemovePhoto}
                            onImageClick={setModalPhoto}
                            isEditMode={isEditMode}
                            onDateChange={handleDateChange}
                            onPhotoCommentChange={handlePhotoCommentChange}
                        />
                    </div>
                </div>
            </main>
            {modalPhoto && <ImageModal photo={modalPhoto} onClose={() => setModalPhoto(null)} />}
            {isDriveModalOpen && isEditMode && (
                <GoogleDriveModal 
                    currentUrl={driveFolderUrl}
                    onClose={() => setIsDriveModalOpen(false)}
                    onSave={handleSaveDriveConfig}
                />
            )}
            {isLoginModalOpen && (
                <LoginModal 
                    onClose={() => setIsLoginModalOpen(false)}
                    onLoginSuccess={handleLoginSuccess}
                />
            )}
             <div className="container mx-auto px-4 md:px-8 mt-4 mb-8">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-700">
                           <i className="fas fa-history mr-2"></i>Log de Alterações
                        </h2>
                        {isEditMode && (
                            <button 
                                onClick={handleClearLogs}
                                className="text-sm bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition-colors"
                                aria-label="Limpar log de alterações">
                                Limpar Log
                            </button>
                        )}
                    </div>
                    <div className="bg-gray-100 p-4 rounded-lg h-40 overflow-y-auto font-mono text-sm text-gray-600">
                        {logs.length > 0 ? (
                            logs.map((log, index) => <div key={index}>{log}</div>)
                        ) : (
                            <p className="text-gray-400">Nenhuma alteração registrada ainda.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default App;
