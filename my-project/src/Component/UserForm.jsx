import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const UserForm = () => {
  const [users, setUsers] = useState([]);

  // load data
  useEffect(() => {
    axios("http://localhost:5000/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  // handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;

    console.log({ name, email });

    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, email }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          alert("user added successfully");

          const newUser = [...users, { name, email }];
          setUsers(newUser);

          e.target.reset();
        }
      });
  };

  // handle delete
  const handleDelete = (id) => {
    console.log("handle delete data: ", id);

    fetch(`http://localhost:5000/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          alert("user delete successfully");

          const remainUser = users.filter((user) => user._id !== id);
          setUsers(remainUser);
        }
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-2xl mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">User CRUD Form</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add User
        </button>
      </form>

      {/* Users List */}

      <div>
        {users.length === 0 ? (
          <p className="text-gray-500 text-center">No users added yet.</p>
        ) : (
          <ul className="space-y-3">
            {users.map((user, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-gray-100 p-3 rounded-md"
              >
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <div className="space-x-2">
                  <Link
                    to={`/update/${user._id}`}
                    className="px-3 py-1 text-sm bg-yellow-400 rounded-md hover:bg-yellow-500"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserForm;
