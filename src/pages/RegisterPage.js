import React, { useState } from 'react';
import Register from '../components/auth/Register';
import Modal from '../components/common/Modal';
import '../App.css';

const RegisterPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="page">
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Register onClose={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
};

export default RegisterPage;