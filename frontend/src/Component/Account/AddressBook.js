import React,{useState,useEffect,useRef} from 'react'
import {} from 'react-router-dom'
import Bd from "../../HelperData/BdMap.json"
import "./Style/AddressBook.css"
import Swal from "sweetalert2"

const AddressBook = ()=>{
  // elements ref
  const stateSelect = useRef()
  const disticSelect = useRef()
  const unionSelect = useRef()
  const moreSelect = useRef()
  // states 
  const [anyChange , setAnyChange] = useState(null)
  const [address,setAddress ] = useState({state:null,distic:null,union:null,more:null,_id:Date.now()})
  
  const states = Object.keys(Bd)
  // extruct ls data
  const [ existingAddress, setExistingAddress ] = useState([])
  useEffect(()=>{
    const lsData = JSON.parse(localStorage.getItem(process.env.REACT_APP_NAME))
    setExistingAddress( lsData.addressBook ? lsData.addressBook : [] )
    
  },[anyChange])
  function resetSelectAndTextarea(){
    stateSelect.current.disabled = stateSelect.current.disabled === "True" && "False"
    disticSelect.current.disabled = disticSelect.current.disabled === "True" && "False"
    unionSelect.current.disabled = unionSelect.current.disabled === "True" && "False"
    moreSelect.current.value =""
  }
  
  const handleChange = (e,state)=>{
    setAddress((previus)=>{
      if(state === "state"){
        e.target.disabled = true
        return {
        ...previus,state:e.target.value
        }
      }else if(state === "distic"){
        e.target.disabled = true
        return {
        ...previus,distic:e.target.value
        }
      }else if(state === "union"){
        e.target.disabled = "True"
        return {
        ...previus,union:e.target.value
        }
      }else if(state === "more"){
        return {
        ...previus,more:e.target.value
        }
      }
    })
    
  }
  
  // DeleteAddress 
  const DeleteAddress = async (id)=>{
    if(id){
      try{
        let result = await fetch(`${process.env.REACT_APP_API_URL}/member/address`,{
          method:"delete",
          body:JSON.stringify({address:id,id:JSON.parse(localStorage.getItem(process.env.REACT_APP_NAME))}),
          headers:{
            "content-type":"application/json"
          }
        })
        result = await result.json()
        if(result && result.state){
          const localdata = JSON.parse(localStorage.getItem(process.env.REACT_APP_NAME))
          localdata.addressBook = result.address
          localStorage.setItem(process.env.REACT_APP_NAME,JSON.stringify(localdata))
          setAnyChange(Date.now())
        }else{
          Swal.fire({
            title:"Error",
            text:"can't delete!",
            icon:"error"
          })
        }
      }catch(err){
        Swal.fire({
          title:"Error!",
          text:err.message,
          icon:"error"
        })
      }
    }
  }
  
  
  // SubmitAddress
  const SubmitAddress = async ()=>{
    console.log("chaking...")
    if(address.state&&address.distic&&address.union){
      console.log("chaking... true => process")
      try{
        let result = await fetch(`${process.env.REACT_APP_API_URL}/member/address`,{
          method:"post",
          body:JSON.stringify({address:address,id:JSON.parse(localStorage.getItem(process.env.REACT_APP_NAME))._id}),
          headers:{
            "content-type":"application/json"
          }
        })
        console.log(result)
        result = await result.json()
        if(result && result.state){
          const localdata = JSON.parse(localStorage.getItem(process.env.REACT_APP_NAME))
          localdata.addressBook = result.address
          localStorage.setItem(process.env.REACT_APP_NAME,JSON.stringify(localdata))
          setAddress({state:null,distic:null,union:null,more:null,_id:Date.now()})
          setAnyChange(Date.now())
          resetSelectAndTextarea()
        }else{
          Swal.fire({
            title:"Error!",
            text:result.msg,
            icon:"error"
          })
        }
      }catch(err){
        console.log(err)
        Swal.fire({
          title:"error!",
          text:err.message,
          icon:"error"
        })
      }
    }else{
      Swal.fire({
        title:"Empty!",
        text:"Please Select Address!",
        icon:"error"
      })
    }
  }
  
  return(
    <div className="addressBookContainar">
      <h3 id="headerTxt">Address Book</h3>
      <h4>All address</h4>
      <div className="addedAddressBox">
        {
          existingAddress && existingAddress.map((addr)=>{
            return (
            <div key={addr._id}>
              <p>{addr.state}-{addr.distic}-{addr.union} {addr.more && `( ${addr.more} )`}</p>
              <button onClick={()=>DeleteAddress(addr._id)} >Delete</button>
            </div>
            )
          })
        }
      </div>
      <div className="newAddressBox" >
        <h4>New Address</h4>
        <div id="creatingAddrs">{address.state}-{address.distic}-{address.union}-{address.more}</div>
        <select ref={stateSelect} onChange={(e)=>handleChange(e,"state")}>
          <option>State</option>
          {
            states.map((item)=>{
              return(
                <option key={item} value={item}>{item}</option>
              )
            })
          }
        </select>
        {
          address.state && 
          <select ref={disticSelect} onChange={(e)=>handleChange(e,"distic")}>
            <option>Distic</option>
            {
              Object.keys(Bd[address.state]).map((it)=>{
                return(
                <option key={it} value={it}>{it}</option>
                )
              })
            }
          </select>
        }
        {
          address.distic && 
          <select ref={unionSelect} onChange={(e)=>handleChange(e,"union")}>
            <option>Union</option>
            {
              Bd[address.state][address.distic].map((it)=>{
                return(
                <option key={it} value={it}>{it}</option>
                )
              })
            }
          </select>
        }
        
        <textarea ref={moreSelect} onChange={(e)=>handleChange(e,"more")} id="moreAddress" placeholder="Village-Road-Street Etc.."></textarea>
        
        <button onClick={()=>SubmitAddress()} >Add Address</button>
      </div>
    </div>
    );
};
export default AddressBook;