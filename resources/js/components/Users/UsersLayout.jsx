import Navbar from "../Navbar";
import Footer from "../Footer";

const UsersLayout = ({ children, activePage = "home" }) => {
    return (
        <div className="min-h-screen bg-black">
            <Navbar activePage={activePage} />
            {children}
            <Footer />
        </div>
    );
};

export default UsersLayout;
