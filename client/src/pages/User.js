import React from 'react'

const User = () => {
  return (
    <>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">User name</th>
            <th scope="col">Avatar</th>
            {/* <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">DOB</th> */}
            <th scope="col">Address</th>
            <th scope="col">Role</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>1</th>
            <th>1</th>
            <th>1</th>
            {/* <th>1</th>
            <th>1</th>
            <th>1</th> */}
            <th>1</th>
            <th>1</th>
            <th>1</th>
          </tr>
        </tbody>
      </table>
    </>
  )
}

export default User