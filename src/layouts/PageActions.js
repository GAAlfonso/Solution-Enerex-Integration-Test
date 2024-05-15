import React, { useState } from 'react';
import StudentsActions from 'components/StudentsActions';
import { UserProvider } from 'context/UserContext';
import FilterForm from 'components/FilterForm';
import DeleteStudents from 'components/DeleteStudents';
import UpdateStudent from 'components/UpdateStudent';

const PageActions = () => {
  const [activeComponent, setActiveComponent] = useState('StudentsActions');

  const renderComponent = () => {
    switch (activeComponent) {

      case 'StudentsActions':
        return (
        <>
        <h3>Add Student</h3>

        <StudentsActions />        
        </>        
    );
      case 'UpdateStudent':
        return(
       <>
        <h3>Update Student</h3>
        
         <UpdateStudent />         
       </>);

      case 'FilterForm':
        return (        
       <>
        <h3>Filter Student</h3>

        <FilterForm />
       </>
    );
      case 'DeleteStudents':
        return (
       <>
       <h3>Deleted Student</h3>

        <DeleteStudents />;
       </>
        );
      default:
        return null;
    }
  };

  return (
    <UserProvider>
      <div className="d-flex flex-row justify-content-center align-items-center min-vh-100">
        <div className="w-20 p-3">
          <button className={`btn btn-${activeComponent === 'StudentsActions' ? 'primary' : 'secondary'} btn-block mb-3`} onClick={() => setActiveComponent('StudentsActions')}>Add Student</button>
          <button className={`btn btn-${activeComponent === 'StudentsActions' ? 'primary' : 'secondary'} btn-block mb-3`} onClick={() => setActiveComponent('UpdateStudent')}>Update Student</button>
          <button className={`btn btn-${activeComponent === 'StudentsActions' ? 'primary' : 'secondary'} btn-block mb-3`} onClick={() => setActiveComponent('FilterForm')}>Filter Students</button>
          <button className={`btn btn-${activeComponent === 'StudentsActions' ? 'primary' : 'secondary'} btn-block mb-3`} onClick={() => setActiveComponent('DeleteStudents')}>Delete Students</button>
        </div>
        <div className="w-80 p-3 ml-5">
          {renderComponent()}
        </div>
      </div>
    </UserProvider>
  );
};

export default PageActions;


