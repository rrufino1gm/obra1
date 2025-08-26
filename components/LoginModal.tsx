
import React, { useState, useEffect } from 'react';

interface LoginModalProps {
    onClose: () => void;
    onLoginSuccess: () => void;
}

const CORRECT_PASSWORD = 'admin123';

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showHint, setShowHint] = useState(false);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleLogin = () => {
        if (password === CORRECT_PASSWORD) {
            onLoginSuccess();
        } else {
            setError('Senha incorreta. Tente novamente.');
            setPassword('');
        }
    };
    
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
            onClick={onClose}
        >
            <div 
                className="relative bg-white p-6 rounded-lg shadow-xl w-full max-w-sm"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Acesso Restrito</h2>
                <p className="text-gray-600 mb-6 text-sm text-center">
                    Por favor, insira a senha para ativar o Modo Admin.
                </p>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Senha
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setError('');
                            setShowHint(false);
                        }}
                        onKeyPress={handleKeyPress}
                        className={`w-full px-3 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500`}
                        autoFocus
                    />
                     {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                </div>
                 <div className="text-xs text-right mt-2">
                    <button onClick={() => setShowHint(true)} className="text-blue-600 hover:underline">
                        Esqueceu a senha?
                    </button>
                </div>

                {showHint && (
                    <div className="mt-4 p-2 bg-blue-50 border border-blue-200 rounded-md text-center">
                        <p className="text-sm text-blue-700">Dica: A senha padrão é `admin123`.</p>
                    </div>
                )}
                
                <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
                     <button
                        onClick={handleLogin}
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Entrar
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                    >
                        Cancelar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
