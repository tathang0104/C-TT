import React from 'react'
// import { useNavigate } from 'react-router-dom'

const CreateProduct = () => {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if(!token) {
  //       navigate('/login')
  //   }
  //   return () => {};
  // }, []);
  
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <form>
            <div className="row">
                <div className="col-md-6">
                    {/* <input type="file"  /> */}
                </div>
            </div>
          </form>
        </div>
      </div>   
    </>
  )
}

export default CreateProduct