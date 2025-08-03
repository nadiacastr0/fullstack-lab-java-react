import { useEffect, useState, useCallback, type FormEvent } from "react";
import type { FoodData } from "../../interface/FoodData";
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";

import "./create-modal.css"

interface InputProps {
    label: string;
    value: string | number;
    updateValue: (value: any) => void;
    type?: 'text' | 'number' | 'url';
    placeholder?: string;
    required?: boolean;
}

interface ModalProps {
    closeModal: () => void;
}

const Input = ({ label, value, updateValue, type = 'text', placeholder, required = false }: InputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = type === 'number' ? Number(e.target.value) : e.target.value;
        updateValue(newValue);
    };

    return (
        <div className="input-group">
            <label htmlFor={label}>{label}</label>
            <input 
                id={label}
                type={type}
                value={value} 
                onChange={handleChange}
                placeholder={placeholder}
                required={required}
                min={type === 'number' ? 0 : undefined}
                step={type === 'number' ? 0.01 : undefined}
            />
        </div>
    )
}

export function CreateModal({ closeModal }: ModalProps) {
    const [image, setImage] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState<number>(0);
    const { mutate, isSuccess, isPending, error, reset } = useFoodDataMutate();

    const handleSubmit = useCallback((e: FormEvent) => {
        e.preventDefault();
        
        // Validação básica
        if (!title.trim()) {
            alert('Título é obrigatório');
            return;
        }
        
        if (price <= 0) {
            alert('Preço deve ser maior que zero');
            return;
        }

        const foodData: FoodData = {
            image: image.trim(),
            title: title.trim(),
            price: Number(price)
        };

        mutate(foodData);
    }, [image, title, price, mutate]);

    const handleCloseModal = useCallback(() => {
        reset(); // Limpa o estado da mutation
        closeModal();
    }, [closeModal, reset]);

    // Fecha o modal quando a mutation é bem-sucedida
    useEffect(() => {
        if (isSuccess) {
            handleCloseModal();
        }
    }, [isSuccess, handleCloseModal]);

    // Handle ESC key
    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleCloseModal();
            }
        };

        document.addEventListener('keydown', handleEscKey);
        return () => document.removeEventListener('keydown', handleEscKey);
    }, [handleCloseModal]);

    return (
        <div className="modal-overlay" onClick={handleCloseModal}>
            <div className="modal-body" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Cadastre um novo item no cardápio</h2>
                    <button 
                        className="close-button" 
                        onClick={handleCloseModal}
                        aria-label="Fechar modal"
                        type="button"
                    >
                        ×
                    </button>
                </div>
                
                <form className="input-container" onSubmit={handleSubmit}>
                    <Input 
                        label="URL da Imagem" 
                        value={image} 
                        updateValue={setImage}
                        type="url"
                        placeholder="https://exemplo.com/imagem.jpg"
                    />
                    <Input 
                        label="Título" 
                        value={title} 
                        updateValue={setTitle}
                        placeholder="Nome do item"
                        required
                    />
                    <Input 
                        label="Preço (R$)" 
                        value={price} 
                        updateValue={setPrice}
                        type="number"
                        placeholder="0.00"
                        required
                    />
                    
                    {error && (
                        <div className="error-message">
                            Erro ao cadastrar item: {error.message}
                        </div>
                    )}
                    
                    <button 
                        type="submit" 
                        className="btn-secondary"
                        disabled={isPending}
                    >
                        {isPending ? 'Enviando...' : 'Enviar'}
                    </button>
                </form>
            </div>
        </div>
    );
}