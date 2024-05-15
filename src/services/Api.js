// services/api.js

import axios from 'axios';

export const api = axios.create({

  baseURL: 'https://localhost:7087', 

  headers: {

    'Content-Type': 'application/json',

  }
});

// Función para actualizar el token en la instancia de Axios

export const updateAxiosToken = (token) => {

  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

};

export const fetchFilteredStudents = async (gender, academicYear) => {

    try {
      
        // Construye la URL con los parámetros de consulta para filtrar por género y año académico

      const url = `/api/Student/GetStudents?gender=${gender}&academicYear=${academicYear}`;
  
      // Realiza la solicitud GET al endpoint de la API utilizando Axios

      const response = await api.get(url);
  
      // Verifica si la respuesta es exitosa y devuelve los datos filtrados

      if (response.data) {

        return response.data;

      } else {

        console.error("Could not get data for leaked students");

        return null;
      }
    } catch (error) {

        if (error.response) {

            // Manejo de diferentes códigos de estado y proporcionar mensajes específicos

            switch (error.response.status) {
              case 400:
                console.error("Bad Request. Please check the parameters");
                break;
              case 401:
                console.error("Not authorized. Make sure your authentication token is valid");
                break;
              case 404:
                console.error("No students were found with the provided filters");
                break;
              case 500:
                console.error("Internal Server Error. Please try again later.");
                break;
              default:
                console.error(`Error ${error.response.status}: ${error.response.statusText}`);
            }
          } else if (error.request) {

            console.error("No response was received from the server. Check your internet connection.");

          } else {

            console.error("Error when making the request: ", error.message);
          }
          return null;
        }
    };
  
  
  export const authorizeLogin = async (credentials) => {

    const response = await api.post('/api/Login/Authorize', credentials);
    return response.data;

  };
  
 

  export const addStudent = async (studentData) => {

    try {

      // Realiza la solicitud POST al endpoint de la API para agregar un nuevo estudiante

      const response = await api.post('/api/Student/AddStudent', studentData);
  
      // Verifica si la respuesta es exitosa y devuelve los datos del estudiante agregado

      if (response.data) {

        console.log('Student successfully added:', response.data);

        return response.data;

      } else {

        console.error("The student could not be added.");

        return null;
      }

    } catch (error) {

      if (error.response) {

        // Maneja los errores de respuesta de la API

        console.error(`Error adding student: ${error.response.status} ${error.response.statusText}`);

      } else if (error.request) {

        // Maneja los errores de solicitud sin respuesta

        console.error("Error adding student: No response received from the server.");
      } else {

        // Maneja otros errores

        console.error("Error adding student:", error.message);
      }
      return null;
    }
  };
  
  
  export const updateStudent = async (studentData) => {

  try {

    // Extrae el id del estudiante del objeto studentData
    
    const { id } = studentData;

    // Construye la URL con el id del estudiante

    const url = `/api/Student/UpdateStudent/${id}`;

    // Realiza la solicitud PUT al endpoint de la API para actualizar el estudiante

    const response = await api.put(url, studentData);

    // Verifica si la respuesta es exitosa y devuelve los datos actualizados del estudiante

    if (response.data) {

      console.log('Student successfully updated:', response.data);

      return response.data;

    } else {

      console.error("Student information could not be updated");

      return null;

    }
  } catch (error) {

    if (error.response) {

      // Maneja los errores de respuesta de la API

      console.error(`Error updating student: ${error.response.status} ${error.response.statusText}`);

    } else if (error.request) {

      // Maneja los errores de solicitud sin respuesta

      console.error("Error updating student: No response received from the server");

    } else {

      // Maneja otros errores
      console.error("Error updating student:", error.message);
    }
    return null;
  }
};

  
  
 export const deleteStudent = async (studentId) => {

  try {

    //URL con el id del estudiante

    const url = `/api/Student/DeleteStudent/${studentId}`;

    // Realiza la solicitud DELETE al endpoint de la API para eliminar el estudiante

    const response = await api.delete(url);

    // Verifica si la respuesta es exitosa

    if (response.status === 200) {

      console.log('Student successfully removed');

      return true;

    } else {

      console.error("Student information could not be deleted");
      
      return false;

    }
  } catch (error) {

    if (error.response) {

      // Maneja los errores de respuesta de la API

      console.error(`Error when deleting student: ${error.response.status} ${error.response.statusText}`);
    
    } else if (error.request) {

      // Maneja los errores de solicitud sin respuesta

      console.error("Error when deleting student: No response received from the server");
    
    } else {

      // Maneja otros errores

      console.error("Error when deleting student:", error.message);
    }
    
    return false;
  }
};

