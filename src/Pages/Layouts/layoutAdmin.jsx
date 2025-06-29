import Sidebar from "../Admin/Components/sidebar";
import Header from "../Admin/Components/header";
import Footer from "../Admin/Components/footer";
import { Outlet } from 'react-router-dom';


const LayoutAdmin = () => {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Sidebar/>
        <div class="flex-1 ml-20 lg:ml-64">
        <Header/>
        <Outlet />
        <Footer/>
        </div>
        
      </div>
    );
  };
  
  export default LayoutAdmin;