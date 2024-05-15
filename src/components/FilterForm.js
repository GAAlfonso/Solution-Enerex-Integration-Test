import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { fetchFilteredStudents } from 'services/Api';

const FilterForm = () => {

    const navigate = useNavigate();


    const handleLoginSuccess = async (gender, academicYear) => {
          
        // Llama a la función fetchFilteredStudents para obtener los datos filtrados

        try {
    
          const filteredStudents = await fetchFilteredStudents(gender, academicYear);
          
          if (filteredStudents) {
    
            navigate('/students-list', { state: { students: filteredStudents } });
    
          } else {
    
            // Manejar el caso en que no se obtienen datos
    
            console.error("Student data could not be obtained");
    
          }
        } catch (error) {
    
          // Manejar errores al obtener los datos de los estudiantes
    
          console.error("Error obtaining student data:", error);
    
        }
        
      };

    // Función para manejar el envío del formulario

  const handleSubmit = (values, { setSubmitting }) => {

    handleLoginSuccess (values.gender, values.academicYear);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        gender: '',
      academicYear: ''
    }}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="form-group mb-3">
            <label htmlFor="gender" className="form-label mr-2">Gender</label>
            <Field as="select" name="gender" className="form-select">
              <option value="F">Female</option>
              <option value="M">Male</option>
            </Field>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="academicYear" className="form-label mr-2">Academic year</label>
            <Field as="select" name="academicYear" className="form-select">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Field>
          </div>

          <button type="submit" className="btn btn-primary mt-3" disabled={isSubmitting}>
            Filter
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FilterForm;
