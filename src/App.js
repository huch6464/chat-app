
import './App.css';
import Users from './component/Users';
import UsersNav from './component/UsersNav';
import Input from './component/Input';


    

    

function App() {
  return (
    <div className="container-fluid d-flex flex-row p-0" style={{height : '100vh'}}>
            <Users/>
        <nav className="navbar bg-body-tertiary bg-primary-subtle d-block d-md-none  ">
              <button className="navbar-toggler " type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon "></span>
              </button>
             <UsersNav/>
        </nav>
  
    <div className="h-100 w-100 bg-primary-subtle d-flex flex-column overflow-y-scroll" >
        <Input/>
    </div>
</div>
  );
}

export default App;
