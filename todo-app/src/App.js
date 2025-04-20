import React ,{useState,useRef, use}from 'react'

const App = () => {


  //  const [text, setText] = useState("")
   const [task, settask] = useState([])
   const ref = useRef("")
   function show() {
    //  console.log(text);

    ref.current.value != "" ? settask([...task,ref.current.value]): alert("please enter a value")
    ref.current.value = ""
     
     }
console.log(task);

     function deletee(e) {
      let id = e.target.id
      console.log(e.target.id);
      // e.target.parentNode.remove()

      settask([...task.filter((item) => item !== id)])

      
      
     }

     function update(e) {
      console.log(e.target.value);
      ref.current.value = e.target.value
      settask(task.indexOf(e.target.value))
     }
   
  return (
    <>
    <input type="text" ref={ref} />
    <button onClick={show}>submit</button>
    <ul>
      
    {task.map((item,index) => {
      return <li key={index}>{item} <button onClick={deletee} id={item}>delete({index})</button> <button onClick={update} value={item}>update({item})</button></li>
    })}

    </ul>

    </>
  )
}

export default App