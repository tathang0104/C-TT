import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { createUser } from '../api'

export const CreateUser = () => {

  const [data, setData] = useState({
    username: '',
    email: '',
    password: '',
    role: '',
  });
  console.log(data);
  
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    createUser(data).then(data => {
      navigate('/dashboard/product');
    }).catch(err => {
      console.log(err)
    })
  };

  return (
    <>
      <h1 className="text-primary">Create New User</h1>
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={onSubmit}>
            <div className="row g-3 mt-1">
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="User Name"
                    value={data?.username}
                    onChange={(e) => setData({ ...data, username: e.target.value })}
                  />
                  <label htmlFor="username">User Name</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                    value={null}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    value={data?.password}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="role"
                    placeholder="Role"
                    value={data?.role}
                    onChange={(e) => setData({ ...data, role: e.target.value })}
                  />
                  <label htmlFor="role">Role</label>
                </div>
              </div>
              <div className="col-12">
                <button className="btn btn-primary w-100 py-3" type="submit">
                  Create New User
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
