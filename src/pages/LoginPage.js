import React, { useState } from 'react';
import Login from '../components/auth/Login';
import Modal from '../components/common/Modal';
import '../App.css';

const LoginPage = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="page">
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Login onClose={() => setIsOpen(false)} />
      </Modal>
    </div>
  );
};

export default LoginPage;