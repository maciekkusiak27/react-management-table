import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setFilter } from './redux/userSlice';
import { RootState, AppDispatch } from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { users, loading, error, filters } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilter({ [e.target.name]: e.target.value }));
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
    user.username.toLowerCase().includes(filters.username.toLowerCase()) &&
    user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
    user.phone.toLowerCase().includes(filters.phone.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1>User Management Table</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className="row mb-3">
        <div className="col">
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            placeholder="Filter by name"
            className="form-control"
          />
        </div>
        <div className="col">
          <input
            type="text"
            name="username"
            value={filters.username}
            onChange={handleFilterChange}
            placeholder="Filter by username"
            className="form-control"
          />
        </div>
        <div className="col">
          <input
            type="text"
            name="email"
            value={filters.email}
            onChange={handleFilterChange}
            placeholder="Filter by email"
            className="form-control"
          />
        </div>
        <div className="col">
          <input
            type="text"
            name="phone"
            value={filters.phone}
            onChange={handleFilterChange}
            placeholder="Filter by phone"
            className="form-control"
          />
        </div>
      </div>

      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
