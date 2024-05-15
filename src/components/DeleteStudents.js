import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { deleteStudent } from 'services/Api';

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
 
  id: Yup.number().required("The id is required").positive().integer(),

});

const DeleteStudents = () => {
  const initialValues = {
    name: '',
    gender: '',
    age: '',
    education: '',
    academicYear: '',
    id: ''
  };

  const handleDelete = async (values, { setSubmitting }) => {

    const studentId = values.id;
  
    const result = await deleteStudent(studentId);
  
    if (result) {

      console.log('Estudiante eliminado con éxito');

      
    } else {
        
      console.error('No se pudo eliminar el estudiante');
      
    }
  
    setSubmitting(false); 
  };
  
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleDelete}
    >
      {({ isSubmitting }) => (
        
        <Form>

          <div className="form-group mb-3">
            <Field name="id" type="number" className="form-control" placeholder="id" />
            <ErrorMessage name="id" component="div" className="text-danger"/>
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            Delete Student
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default DeleteStudents;