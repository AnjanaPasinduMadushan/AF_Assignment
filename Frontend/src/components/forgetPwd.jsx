import axios from 'axios'
import React, {useState} from 'react'

const ForgetPwd = () => {


    const [email, setEmail] = useState("")

    const sendData = async()=>{
        try{

            const res = await axios.post("http://localhost:8070/User/sentUrl", {
                email
            })
            if (res && res.data) {
                const data = await res.data;
                console.log(data)
                return data;
              }else {
                throw new Error("Response data is undefined");
              }  
        }catch(err){
            console.log(err)
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
    console.log(email)

    try{
        await sendData();

    //    if (data && data.message) {
    //    setError(data.message)
       
    //    if (data.User.role === "admin") {
    //     navigate("/newUsers");
    //    }
       
      // } else if (response.User.role === "seller") {
      //   navigate("/profile");
      // } else {
      //   navigate("/products");
      // }
       
       
       
    }catch(err){
      console.log(err)
    }
    }



  return (
    <div className='form'>
      <form onSubmit={handleSubmit}>

      <h1><center>Enter Your Email</center></h1>
        

        <div>
        <label>Email:</label>
        <input type="email" name='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        

        <div>
        <button type="submit" className="btn custom-button">Submit</button>
        </div>
        
        
      </form>


    </div>
  )
}

export default ForgetPwd