import React from 'react';

const Students = ({ students }) => {
  return (
    <div>
      <h2>Estudiantes Filtrados</h2>
      {students.length > 0 ? (
        <ul>
          {students.map(student => (
            <li key={student.id}>
              <p>Nombre: {student.name}</p>
              <p>Género: {student.gender}</p>
              <p>Edad: {student.age}</p>
              <p>Educación: {student.education}</p>
              <p>Año Académico: {student.academicYear}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay estudiantes para mostrar.</p>
      )}
    </div>
  );
};

export default Students;
