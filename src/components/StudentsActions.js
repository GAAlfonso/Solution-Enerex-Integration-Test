import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addStudent } from 'services/Api';

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("The name is required"),
  gender: Yup.string().required("Gender is required"),
  age: Yup.number().required("Age is requiered").positive().integer(),
  education: Yup.string().required("Education is required"),
  academicYear: Yup.number().required("Academic year is required").positive().integer(),
  id: Yup.number().required("The id is required").positive().integer(),
});

const StudentsActions = () => {

  const initialValues = {
    name: '',
    gender: '',
    age: '',
    education: '',
    academicYear: '',
    id: ''
  };

  const handleSubmit = async (values, { setSubmitting }) => {

    // Lógica para enviar los datos al servidor

    const studentData = {

        id: values.id,
        name: values.name,
        gender: values.gender,
        age: values.age,
        education: values.education,
        academicYear: values.academicYear

      };

      try {

      const newStudent = await addStudent(studentData);
      
      if (newStudent) {

        console.log('Successful response');
      
    } else {

        console.error("No data was received for the student's addition");
      
    } 
    
     } catch (error) {

        console.error('Error when adding the student:', error);
    }

     setSubmitting(false);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>

          <div className="form-group mb-3">
            <Field name="name" type="text" className="form-control" placeholder="Name" />
            <ErrorMessage name="name" component="div" className="text-danger"/>
          </div>

          <div className="form-group mb-3">
            <Field name="gender" as="select" className="form-select">
            <option value="">Select the genre</option>
            <option value="F">Female</option>
            <option value="M">Male</option>
            </Field>
            <ErrorMessage name="gender" component="div" className="text-danger"/>
          </div>

          <div className="form-group mb-3">
            <Field name="age" type="number" className="form-control" placeholder="Age" />
            <ErrorMessage name="age" component="div" className="text-danger"/>
          </div>

          <div className="form-group mb-3">
            <Field name="education" type="text" className="form-control" placeholder="Education" />
          <  ErrorMessage name="education" component="div" className="text-danger" />
          </div>
          
          <div className="form-group mb-3">
            <Field name="academicYear" type="number" className="form-control" placeholder="Academic year" />
            <ErrorMessage name="academicYear" component="div" className="text-danger" />
          </div>

          <div className="form-group mb-3">
            <Field name="id" type="number" className="form-control" placeholder="id" />
            <ErrorMessage name="id" component="div" className="text-danger"/>
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            Add Student
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default StudentsActions;
