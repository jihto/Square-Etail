import Modal from './Modal'
import { Button } from '../buttons/Button' 
import React from 'react';
import useConfirmModal from '../../hooks/zustands/useConfirmModal';


const ConfirmModal: React.FC  = () => { 
    const { isOpen, onClose, content, title, action } = useConfirmModal();
    return (
        <Modal
            title={title}
            onClose={onClose}
            isOpen={isOpen}
        > 
            <div className="w-full h-fit grid gap-5">  
                <div className='h-72 flex-center object-contain w-full'>{content}</div>
                <div className='flex-between gap4'> 
                    {action}
                </div>
            </div>  
        </Modal>
    )
}

export default ConfirmModal