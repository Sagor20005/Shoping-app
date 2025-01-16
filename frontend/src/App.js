import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {useCookies} from "react-cookie"
import { HomePage, Signup, Login, PrivetComponent, RevarseHomeComponent, Account, SelectedProduct, Cart, AddProduct, Checkout, AddressBook, MyOrder, Category } from "./ComponentImports"

function App() {
  const [cookies] = useCookies([process.env.REACT_APP_NAME])
  let auth = cookies[process.env.REACT_APP_NAME] 
  if(!auth){
    const lsdata = JSON.parse(localStorage.getItem(process.env.REACT_APP_NAME))
    if(lsdata){
      localStorage.removeItem(`${process.env.REACT_APP_NAME}`)
    }
  }
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* if empty cookie can't access them */}
          <Route element={<PrivetComponent/>}>
            <Route path="/account" element={<Account />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/new-product" element={<AddProduct />}/>
            <Route path="/checkout" element={<Checkout />}/>
            <Route path="/addressbook" element={<AddressBook />}/>
            <Route path="/myorder" element={<MyOrder />}/>
          </Route>
          {/* if cookie can't access them */}
          <Route element={<RevarseHomeComponent/>}>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/login" element={<Login />}/>
          </Route>
          
          <Route path="/cat" element={<Category />}/>
          <Route path="/" element={<HomePage/>}/>
          <Route path="selected-product" element={<SelectedProduct/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
