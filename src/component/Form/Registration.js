// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const UserTable = () => {
//   const [userData, setUserData] = useState(null);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     userName: '',
//     email: '',
//     mobileNo: '',
//     status: '',
//   });

//   useEffect(() => {
//     const fetchUserData = async () => {
//       const token = localStorage.getItem('token');
//       const username = localStorage.getItem('username');

//       if (!token || !username) {
//         setError({ error: { reason: 'Token or username not found in local storage' } });
//         return;
//       }

//       try {
//         const response = await axios.get(`http://localhost:8080/api/user/getUser/${username}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         console.log('Response headers:', response.headers);

//         if (response.headers['content-type'] !== 'application/json') {
//           throw new Error('Server did not respond with JSON data');
//         }

//         setUserData(response.data); // Assuming response.data is the user object
//         setFormData({
//           userName: response.data.Details.userName,
//           email: response.data.Details.email,
//           mobileNo: response.data.Details.mobileNo,
//           status: response.data.Details.status,
//         });
//       } catch (err) {
//         const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
//         setError(err.response?.data || defaultError);
//         console.error('Error fetching user data:', err);
//       }
//     };

//     fetchUserData();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleEdit = async () => {
//     const token = localStorage.getItem('token');
//     const username = localStorage.getItem('username');

//     if (!token || !username) {
//       setError({ error: { reason: 'Token or username not found in local storage' } });
//       return;
//     }

//     try {
//       const response = await axios.put(`http://localhost:8080/api/user/update`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setUserData(response.data);
//       setIsEditing(false);
//     } catch (err) {
//       const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
//       setError(err.response?.data || defaultError);
//       console.error('Error updating user data:', err);
//     }
//   };

//   const handleDelete = async () => {
//     const token = localStorage.getItem('token');
//     const username = localStorage.getItem('username');

//     if (!token || !username) {
//       setError({ error: { reason: 'Token or username not found in local storage' } });
//       return;
//     }

//     try {
//       await axios.delete(`http://localhost:8080/api/user/deleteUser/${username}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setUserData(null); // Clear user data on successful delete
//     } catch (err) {
//       const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
//       setError(err.response?.data || defaultError);
//       console.error('Error deleting user data:', err);
//     }
//   };

//   if (error) {
//     return (
//       <div>
//         <p>Error: {error.error?.reason || 'No error message available'}</p>
//         <p>Timestamp: {error.timeStamp || 'No timestamp available'}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container tab-style">
//       {userData ? (
//         <div>
//           <h2>User Profile</h2>
//           {isEditing ? (
//             <div>
//               <label>
//                 User Name:
//                 <input
//                   type="text"
//                   name="userName"
//                   value={formData.userName}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label>
//                 Email:
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label>
//                 Mobile Number:
//                 <input
//                   type="text"
//                   name="mobileNo"
//                   value={formData.mobileNo}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <label>
//                 Status:
//                 <input
//                   type="text"
//                   name="status"
//                   value={formData.status}
//                   onChange={handleInputChange}
//                 />
//               </label>
//               <button onClick={handleEdit}>Save</button>
//               <button onClick={() => setIsEditing(false)}>Cancel</button>
//             </div>
//           ) : (
//             <div>
//               <table className="table">
//                 <thead>
//                   <tr>
//                     <th>User Name</th>
//                     <th>Email</th>
//                     <th>Mobile Number</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>{userData.Details.userName}</td>
//                     <td>{userData.Details.email}</td>
//                     <td>{userData.Details.mobileNo}</td>
//                     <td>{userData.Details.status}</td>
//                     <td>
//                       <button onClick={() => setIsEditing(true)}>Edit</button>
//                       <button onClick={handleDelete}>Delete</button>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default UserTable;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserTable = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    mobileNo: '',
    status: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const username = localStorage.getItem('username');

      if (!token || !username) {
        setError({ error: { reason: 'Token or username not found in local storage' } });
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/user/getUser/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Response headers:', response.headers);

        if (response.headers['content-type'] !== 'application/json') {
          throw new Error('Server did not respond with JSON data');
        }

        setUserData(response.data); // Assuming response.data is the user object
        setFormData({
          userName: response.data.Details.userName,
          email: response.data.Details.email,
          mobileNo: response.data.Details.mobileNo,
          status: response.data.Details.status,
        });
      } catch (err) {
        const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
        setError(err.response?.data || defaultError);
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = async () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (!token || !username) {
      setError({ error: { reason: 'Token or username not found in local storage' } });
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8080/api/user/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(response.data);
      setIsEditing(false);
    } catch (err) {
      const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
      setError(err.response?.data || defaultError);
      console.error('Error updating user data:', err);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    if (!token || !username) {
      setError({ error: { reason: 'Token or username not found in local storage' } });
      return;
    }

    try {
      await axios.delete(`http://localhost:8080/api/user/deleteUser/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(null); // Clear user data on successful delete
      alert('User deleted successfully');
    } catch (err) {
      const defaultError = { error: { reason: 'Unknown error occurred' }, timeStamp: new Date().toISOString() };
      setError(err.response?.data || defaultError);
      console.error('Error deleting user data:', err);
    }
  };

  if (error) {
    return (
      <div>
        <p>Error: {error.error?.reason || 'No error message available'}</p>
        <p>Timestamp: {error.timeStamp || 'No timestamp available'}</p>
      </div>
    );
  }

  return (
    <div className="container tab-style">
      {userData ? (
        <div>
          <h2>User Profile</h2>
          {isEditing ? (
            <div>
              <label>
                User Name:
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Mobile Number:
                <input
                  type="text"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Status:
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                />
              </label>
              <button onClick={handleEdit}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          ) : (
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{userData.Details.userName}</td>
                    <td>{userData.Details.email}</td>
                    <td>{userData.Details.mobileNo}</td>
                    <td>{userData.Details.status}</td>
                    <td>
                      <button onClick={() => setIsEditing(true)}>Edit</button>
                      <button onClick={handleDelete}>Delete</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default UserTable;
