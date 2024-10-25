import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function Header() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  
  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/logout", { method: "POST" });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    onError: () => toast.error("Logout failed"),
  });

  const { data: authUser } = useQuery({ queryKey: ["authUser"] });

  // Fetch user list for searching, with a fallback to an empty array
  const { data: users = [] } = useQuery({
    queryKey: ["users", searchTerm],
    queryFn: async () => {
      const res = await fetch(`/api/users/search?query=${encodeURIComponent(searchTerm)}`);
      const data = await res.json();
      return Array.isArray(data) ? data : []; // Ensure we always return an array
    },
    enabled: !!searchTerm, // Only fetch when searchTerm is not empty
  });

  // Filter users based on search term (local filter, can be removed if backend handles it)
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="navbar border-b border-gray-700 bg-base-100">
      <div role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS Navbar component" src="/avatars/logoIMG.png" />
        </div>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">GlobeTrekker</a>
      </div>
      {/* Search Bar */}
      <div className="form-control flex flex-col relative">
        <input
          type="text"
          placeholder="Search users..."
          className="input input-bordered w-48"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* Dropdown for filtered users */}
        {searchTerm && (
          <ul className="dropdown-content menu mt-2  bg-base-100 rounded-box shadow-lg w-96 absolute z-10 top-12">
            {filteredUsers.map(user => (
              <li key={user.id}>
                <Link
                  to={`/profile/${user.username}`}
                  className="flex items-center gap-2 p-2 hover:bg-base-200">
                  <img src={user.profileImg || "/avatar-placeholder.png"} alt={user.username} className="w-6 h-6 rounded-full" />
                  <span>{user.username}</span>
                </Link>
              </li>
            ))}
            {filteredUsers.length === 0 && (
              <li className="p-2 text-gray-500">No users found</li>
            )}
          </ul>
        )}
      </div>
      {authUser && (
        <div className="flex-none gap-2 ml-4">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img alt="abc" src={authUser?.profileImg || "/avatar-placeholder.png"} />
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link to={`/profile/${authUser.username}`} className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <a onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
