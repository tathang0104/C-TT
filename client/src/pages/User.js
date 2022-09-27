import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions';
import { usersState } from '../redux/selectors';

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector(usersState);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(actions.getAllUsers.getAllUsersRequest());
  }, [dispatch]);

  const handleEdit = (id) => {
    navigate(`update/${id}`)
  } 
  
  const handleDelete = (id) => {
    dispatch(actions.deleteUser.deleteUserRequest(id))
  } 

  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
        <h1 className="text-primary">User list</h1>
        <Link className='btn btn-primary' to={'create'}>Add new user</Link>
      </div>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col" className='w-20'>User name</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Avatar</th>
            <th scope="col">Role</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map((user, index) => {
              return (
                <tr key={user._id}>
                  <th scope="row">{user._id.slice(-6)}</th>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>
                    <img style={{height: '60px', width: '60px'}} src={`http://${user.avatar_url}`} alt="" />
                  </td>
                  <td>{user.role}</td>
                  <td>
                    <img style={{height: '25px', width: '25px'}} src='/img/edit.png' alt="" className='p-1' onClick={() => handleEdit(user._id)}/>
                    <img style={{height: '25px', width: '25px'}} src='/img/delete.png' alt="" className='p-1' onClick={() => {if (window.confirm('Are you sure to delete this user?')) {handleDelete(user._id)}}}/>
                  </td>
                </tr>
              )
            })
          }
          
        </tbody>
      </table>
    </>
  )
}

export default User