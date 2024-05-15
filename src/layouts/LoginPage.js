import React from 'react';
import { UserProvider } from 'context/UserContext';
import LoginForm from 'views/examples/LoginForm';


const LoginPage = () => {
    return (
<UserProvider>
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div>
      <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <LoginForm />        
      </div>
    </div>
</UserProvider>
    );
  };
  
  export default LoginPage;