import { Outlet } from "react-router-dom";

const Layout = () => {
    //render the children of the outlet component
    //if we want to add a baner or a footer that appears in every public or private page we can add it here
    return <Outlet />
}
export default Layout