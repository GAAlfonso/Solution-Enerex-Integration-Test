import React from 'react';
import StudentsActions from 'components/StudentsActions';
import { UserProvider } from 'context/UserContext';
import FilterForm from 'components/FilterForm';
import DeleteStudents from 'components/DeleteStudents';
import UpdateStudent from 'components/UpdateStudent';

const PageActions = () => {
  return (
    <UserProvider>
      <div className="d-flex flex-row justify-content-around align-items-center min-vh-100">
        <div className="w-20 p-3">
          <h2 className="text-center">Add Student</h2>
          <StudentsActions />
        </div>
        

        <div className="w-20 p-3">
          <h2 className="text-center">Update Student</h2>
          < UpdateStudent />
        </div>

        <div className="w-20 p-3">
          <h2 className="text-rigth mb-4">Filter Students</h2>
          <FilterForm />
        </div>

        <div className="w-20 p-3">
          <h2 className="text-center">Delete Students</h2>
          <DeleteStudents />
        </div>
        
      </div>
    </UserProvider>
  );
};

export default PageActions;

