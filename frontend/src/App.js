import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {HomePage,Signup,Login,PrivetComponent,RevarseHomeComponent,Account,SelectedProduct,Cart,AddProduct} from "./ComponentImports"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {/* if empty cookie can't access them */}
          <Route element={<PrivetComponent/>}>
            <Route path="/account" element={<Account />}/>
            <Route path="/cart" element={<Cart />}/>
            <Route path="/new-product" element={<AddProduct />}/>
          </Route>
          {/* if cookie can't access them */}
          <Route element={<RevarseHomeComponent/>}>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/login" element={<Login />}/>
          </Route>
          
          <Route path="/" element={<HomePage/>}/>
          <Route path="selected-product" element={<SelectedProduct/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
