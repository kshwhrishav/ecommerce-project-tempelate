import { handleLogout } from "../Login/Logout";

const AdminDashboard = () => {
  
    return (
      <div>
        <h2>Admin Dashboard</h2>
        <p>Welcome, Admin! Manage the system here.</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  };
  
  export default AdminDashboard;
  