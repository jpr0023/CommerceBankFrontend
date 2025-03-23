import{Outlet, Navigate} from 'react-router-dom';
const ProtectedRoutes = () => {
    //right now the user is true so it doesnt redirect to login page
    //if you change the user to null and save it will redirect to login and the button will not work
    //thats as far as i got with it, so im just leaving it true until the search is done
    const user = true;

    return user ? <Outlet/> : <Navigate to = '/login'/>

}
export default ProtectedRoutes;