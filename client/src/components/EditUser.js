import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

import * as actions from '../redux/actions';
import { currentUser } from "../redux/selectors";

const EditUser = () => {

  const {id} = useParams()

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const dispatch = useDispatch();
  const user = useSelector(currentUser);
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(()=> {
    setData(user)
  }, [user])
  
  useEffect(() => {
    dispatch(actions.getOneUser.getOneUserRequest(id));
  }, [dispatch, id]);

  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    // I've kept this example simple by using the first image instead of multiple
    setSelectedFile(e.target.files[0]);
    setData({ ...data, user_avatar: e.target.files[0]})
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('_id', data._id);
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('role', data.role);
    formData.append('gender', data.gender);
    formData.append('dob', data.dob);
    formData.append('address', data.address);
    formData.append('user_avatar', data.user_avatar);
    dispatch(actions.updateProfileUser.updateProfileUserRequest(formData));
    navigate('/dashboard/user');
  };



  return (
    <>
      <h1 className="text-primary">Edit User {id}</h1>
      <div className="row">
        <div className="col-md-12">
          <form onSubmit={onSubmit}>
            <div className="row">
              <div className="col-md-3">
                <input
                  type="file"
                  onChange={onSelectFile}
                  className="custom-file-input mb-3"
                />
              </div>
              <div className="col-md-6">
                  {selectedFile ? (
                    <img src={preview} alt="productImg" className="img-preview" />
                    ): ( 
                      <img src={`http://${data?.avatar_url}`} alt="productImg" className="img-preview" />
                    )}
              </div>
            </div>
            <div className="row g-3 mt-1">
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={data?.username || ''}
                    placeholder="User Name"
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
                    value={data?.email || ''}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    placeholder="Email"
                    readOnly={true}
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
            </div>
            <div className="row g-3 mt-1">
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="gender"
                    value={data?.gender || ''}
                    placeholder="Gender"
                    onChange={(e) => setData({ ...data, gender: e.target.value })}
                  />
                  <label htmlFor="gender">Gender</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="role"
                    value={data?.role || ''}
                    onChange={(e) => setData({ ...data, role: e.target.value })}
                    placeholder="Role"
                    readOnly={true}
                  />
                  <label htmlFor="role">Role</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="dob"
                    value={data?.dob || ''}
                    placeholder="DOB"
                    onChange={(e) => setData({ ...data, dob: e.target.value })}
                  />
                  <label htmlFor="dob">DOB</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    value={data?.address || ''}
                    onChange={(e) => setData({ ...data, address: e.target.value })}
                    placeholder="Address"
                  />
                  <label htmlFor="address">Address</label>
                </div>
              </div>
              <div className="col-6">
                <button className="btn btn-primary w-50 py-3 mr-5" type="submit">
                  Edit User
                </button>
              </div>
              <div className="col-6">
                <Link to={'/dashboard/user'} className="btn btn-danger w-50 py-3">
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUser;
