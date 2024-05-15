import React from 'react';
import { useLocation } from 'react-router-dom';
import Students from 'components/Students';

const StudentsList = () => {

    const location = useLocation();

    const { students } = location.state || { students: [] };

    return (
        <div>
      <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <Students students={students} />
      </div>
       );
    };
    export default StudentsList;