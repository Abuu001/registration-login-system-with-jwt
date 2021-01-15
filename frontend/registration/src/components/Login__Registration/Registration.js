import React, { Fragment ,useState} from 'react'
import {Link} from "react-router-dom"
import { toast } from 'react-toastify';

function Registration({setAuth}) {

    const [inputs,setInputs ]= useState({
        name : "",
        email : "",
        password : ""
    })

    const {email,name,password} =inputs
    const onChange =(e)=>{
        setInputs({...inputs,[e.target.name]  : e.target.value })
    }

    const onSubmitForm= async (e)=>{
        e.preventDefault()
        try {
            const body =  {email,name,password} 
            const response = await fetch("http://localhost:3002/auth/register",{
                method :"POST",
                headers : {"Content-type" : "application/json"},
                body : JSON.stringify(body)
            })

            const parseResponse = await response.json()
            if(parseResponse.token){
                localStorage.setItem("token",parseResponse.token)
                setAuth(true)
                toast.success("Registered successfully")
            }else{
                toast.error(parseResponse.message)
            }
          //  setInputs(" ")
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <Fragment>
        <h1 className="text-centre">Registration</h1>
        <form  onSubmit={onSubmitForm}>
            <input type="text" name="name"  placeholder="name"  className="form-control my-3" value={name}  onChange={e=>onChange(e)} required/>
            <input type="email" name="email"  placeholder="email"  className="form-control my-3"  value={email} onChange={e=>onChange(e)} required/>
            <input type="password" name="password"  placeholder="password"  className="form-control my-3"  value={password}  onChange={e=>onChange(e)} required/>
            <button className="btn btn-success btn-block">Register</button>
        </form>
        <Link to="/login">Login</Link> 
    </Fragment>
    )
}

export default Registration
