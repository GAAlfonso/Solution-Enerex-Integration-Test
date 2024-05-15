import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateStudent } from 'services/Api';

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is requered"),
  gender: Yup.string().required("Gender is requered"),
  age: Yup.number().required("Age is requered").positive().integer(),
  education: Yup.string().required("Education is requered"),
  academicYear: Yup.number().required("Academic years is requered").positive().integer(),
  id: Yup.number().required("The id is requered").positive().integer(),
});

const UpdateStudent = () => {

  const initialValues = {
    name: '',
    gender: '',
    age: '',
    education: '',
    academicYear: '',
    id: ''
  };

  const handleSubmit = async(values, {setSubmitting}) => {

    const studentData = {
        id: values.id,
        name: values.name,
        gender: values.gender,
        age: values.age,
        education: values.education,
        academicYear: values.academicYear
      };

     try{

      const updStudent = await updateStudent(studentData);

    if (updStudent) {

        console.log('Successful response');

      } else{

        console.error('No data received for student update');
      
    }
      
   } catch (error){

    console.error('Error updating student:', error);
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
            <Field name="name" type="text" className="form-control" placeholder="Student name" />
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
            <Field name="academicYear" type="number" className="form-control" placeholder="Academic years" />
            <ErrorMessage name="academicYear" component="div" className="text-danger" />
          </div>

          <div className="form-group mb-3">
            <Field name="id" type="number" className="form-control" placeholder="id" />
            <ErrorMessage name="id" component="div" className="text-danger"/>
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            Update Student
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateStudent;