import React, { useContext, useState } from "react";
import { ClipLoader } from 'react-spinners';
import { UserContext } from "context/UserContext";
import { useNavigate } from 'react-router-dom';
import { authorizeLogin } from "services/Api";
import { Field, Formik, ErrorMessage, Form } from "formik";
import * as Yup from "yup";

// Esquema de validación con Yup

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("The email is not valid")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "The password must be at least 6 characters")
    /*.matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
        "The password must contain at least one uppercase letter, one lowercase letter, and one number"
      )*/
    .required("Password is required"),
});

// Usuarios de prueba en memoria

const testUsers = [
  { name: "TestUser1", email: "testUser1@gmail.com", password: "123456" },
  { name: "TestUser2", email: "testUser2@gmail.com", password: "800008" },
  { name: "TestUser3", email: "testUser3@gmail.com", password: "200002" },
];

const LoginForm = () => {
 
  const [error, setError] = useState("");

  const { login } = useContext(UserContext);

  const navigate = useNavigate();

  const handleErrors = (message) => {
    setError(message);
  };

   // Manejador de envío de formulario

  const handleSubmit = async (values, { setSubmitting }) => {
    
    const user = testUsers.find((user) => user.email === values.email);
    
    // Verificar si se ingresaron el correo electrónico y la contraseña

    if (!values.email || !values.password) {

      handleErrors("El correo electrónico y la contraseña son requeridos");

      setSubmitting(false);

      return;
    }

    if(!user){

        handleErrors("El correo electrónico no está registrado.");

        setSubmitting(false);

      return;

    } else if (user.password !== values.password) {

        handleErrors("La contraseña es incorrecta.");

        setSubmitting(false);

      return;

      // Autenticar al usuario

      } else if (user && user.password === values.password) {
    
      try {
        
        //Realizar solicitud a la API con Axios
        
        const data = await authorizeLogin({ email: values.email, password: values.password });
        
        if (data){
                    
            login(data);

            navigate('/pageaction');
       
            handleErrors("");

        } else {

            handleErrors("Login failed: Authentication token not received.");
        
        } 
      }
      catch(error){

        //Manejo de errores de la solicitud

        if (error.response){

            handleErrors("Login error" + error.response.data.message);

        } else if(error.request){

            handleErrors("Login error: No response from server");

        } else{

            handleErrors("Login error" + error.message);
        }
      }

    } else {

      // Mostrar mensaje de error si las credenciales son incorrectas

      handleErrors("Incorrect credentials");
      
    }
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
    }}
      
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>            
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              className="form-control"
              placeholder="Enter email"
              autoComplete="off"
            />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <Field
              id="password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter password"
              autoComplete="off"
            />
            <ErrorMessage name="password" component="div" className="text-danger" />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? <ClipLoader color="#ffffff" /> : "Submit"}
          </button>          
          
        </Form>
        )}
      
    </Formik>
    
  );
};

export default LoginForm;