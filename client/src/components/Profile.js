import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import * as actions from '../redux/actions';
import { currentUserLogined, currentUserLoginedToken } from "../redux/selectors";

export const Profile = () => {

    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
  
    const dispatch = useDispatch();
    const [dataUser, setdataUser] = useState(null);
    const userLogined = useSelector(currentUserLogined);
    const userLoginedToken = useSelector(currentUserLoginedToken);
    const navigate = useNavigate();
  
    useEffect(() => {
      setdataUser(userLogined?.user)
    },[userLogined])
  
    useEffect(() => {
      dispatch(actions.getProfile.getProfileRequest(localStorage.getItem("authToken")));
    }, [dispatch, userLoginedToken]);
  
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
      setdataUser({ ...dataUser, user_avatar: e.target.files[0]})
    };
  
    const handerBack = () => { 
      navigate(-1)
    }

    const onSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('_id', dataUser._id);
      formData.append('username', dataUser.username);
      formData.append('email', dataUser.email);
      formData.append('role', dataUser.role);
      formData.append('gender', dataUser.gender);
      formData.append('dob', dataUser.dob);
      formData.append('address', dataUser.address);
      formData.append('user_avatar', dataUser.user_avatar);
      dispatch(actions.updateProfileUser.updateProfileUserRequest(formData));
      navigate(-1);
    };
    return (
        <>
          <h1 className="text-primary">Your profile</h1>
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
                          dataUser?.avatar_url ? (
                            <img src={`http://${dataUser?.avatar_url}`} alt="avatarImg" className="img-preview" />
                          ) : (
                              <img src='/img/default-avatar.jpg' alt="avatarImg" className='img-preview'/>
                          )
                        )
                      }
                  </div>
                </div>
                <div className="row g-3 mt-1">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={dataUser?.username || ""}
                        placeholder="User Name"
                        onChange={(e) => setdataUser({ ...dataUser, username: e.target.value })}
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
                        value={dataUser?.email || ""}
                        onChange={(e) => setdataUser({ ...dataUser, email: e.target.value })}
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
                        value={dataUser?.gender || ""}
                        placeholder="Gender"
                        onChange={(e) => setdataUser({ ...dataUser, gender: e.target.value })}
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
                        value={dataUser?.role || ""}
                        onChange={(e) => setdataUser({ ...dataUser, role: e.target.value })}
                        placeholder="Role"
                        readOnly={true}
                      />
                      <label htmlFor="role">Role</label>
                    </div>
                  </div>
                </div>
                <div className="row g-3 mt-1">
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="dob"
                        value={dataUser?.dob || ""}
                        placeholder="DOB"
                        onChange={(e) => setdataUser({ ...dataUser, dob: e.target.value })}
                      />
                      <label htmlFor="dob">DOB</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="text"
                        className="form-control"
                        id="role"
                        value={dataUser?.address || ""}
                        onChange={(e) => setdataUser({ ...dataUser, address: e.target.value })}
                        placeholder="Address"
                      />
                      <label htmlFor="address">Address</label>
                    </div>
                  </div>
                  <div className="col-6">
                    <button className="btn btn-primary w-50 py-3 mr-5" type="submit">
                      Update profile user
                    </button>
                  </div>
                  <div className="col-6">
                    <button onClick={handerBack} className="btn btn-danger w-50 py-3">
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </>
    );
};

