import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions';
import { usersState, totalPageUser } from '../redux/selectors';
import clsx from 'clsx';

const User = () => {
  const dispatch = useDispatch();
  const users = useSelector(usersState);
  const total = useSelector(totalPageUser);
  const navigate = useNavigate();
  const pagination = []
  const [searchInput, setSearchInput] = useState("");
  const [option, setOption] = useState({
    page: 1,
    size: 10,
    search: '',
  });
  
  useEffect(() => {
    dispatch(actions.getAllUsers.getAllUsersRequest(option));
  }, [dispatch, option]);

  const handleEdit = (id) => {
    navigate(`update/${id}`)
  } 
  
  const handleDelete = (id) => {
    dispatch(actions.deleteUser.deleteUserRequest(id))
    setOption(prev => ({...prev, page: 1}))
  } 

  const changePage = (i) => {
    setOption(prev => ({...prev, page: i}))
  } 
  for(let i = 0; i < total; i++) {
    pagination.push(
      <li key={i}>
        <Link to={'#'} onClick={()=>{changePage(i+1)}} className={clsx({"active": i + 1 === option.page} )}>{i + 1}</Link>
      </li>
    )
  }

  const prev = (page)=>{
    if(option.page !== 1)
      setOption(prev => ({...prev, page: page-1}))
  }

  const next = (page)=>{
    if(option.page !== total)
      setOption(prev => ({...prev, page: page+1}))
  }

  const handerChange = (e) => {
    setSearchInput(e.target.value)
  }

  const handerSubmit = (e) => {
    e.preventDefault()
    setOption(prev => ({...prev, 
      page: 1,
      search: searchInput 
    }))
  }

  return (
    <>
      <div className='d-flex justify-content-between align-items-center'>
        <h1 className="text-primary">User list</h1>
        <div className='menu-search'>
          <form className='d-flex justify-content-center align-items-center' onSubmit={(e) => handerSubmit(e)}>
            <i className='fa fa-search text-primary' style={{fontSize: "16px"}}></i>
            <input type="text" className="" placeholder="Search" value={searchInput} onChange={(e) => handerChange(e)}/>
          </form>
        </div>
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
                  <td>{(option.page-1)*option.size+index+1}</td>
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
      {
        total !== 0 && (
          <ul id="pagination">
            <li><Link to={'#'} onClick={()=>prev(option.page)}>«</Link></li>
            {pagination}
            <li><Link to={'#'} onClick={()=>next(option.page)}>»</Link></li>
          </ul> 
        )
      }
    </>
  )
}

export default User