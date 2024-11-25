let formData = new FormData()
let formObj = {}
const extructSubmit = (e,returnType)=> {
  const formChildArray = Array.from(e.target.children)
  formChildArray.forEach((elem)=> {
    if (elem.nodeName === "INPUT") {
      getFieldData(elem)
    } else if (elem.nodeName === "DIV") {
      const SecundChildArray = Array.from(elem.children);
      SecundChildArray.forEach((elem)=> {
        getFieldData(elem)
      })
    } else if (elem.nodeName === "SELECT") {
      getFieldData(elem)
    }
  })
 if(returnType === "formData"){
   return formData
 }else{
   return formObj
 }
}

function getFieldData(element) {
  if (element.name === "file") {
    formData.append(element.name, element.files)
    formObj[element.name] = element.files
  } else if (element.name === "warranty") {
    formData.append(element.name, element.checked)
    formObj[element.name] = element.checked
  } else if (element.nodeName !== "LABEL") {
    formData.append(element.name, element.value)
    formObj[element.name] = element.value
  }
}

export default extructSubmit;