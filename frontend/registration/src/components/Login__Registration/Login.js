import React, { Fragment,useState } from 'react'
import {Link} from "react-router-dom"
import { toast } from 'react-toastify';

function Login({setAuth}) {

    const [inputs,setInputs]=useState({
        email : "",
        password : ""
    })

    const {email,password,name} = inputs;
    const onChange =(e)=>{
        setInputs({...inputs,[e.target.name]  : e.target.value })
    }   

    const onSubmitForm= async (e)=>{
        e.preventDefault()
        try {
            const body = {email,password,name}
            const response = await fetch("http://localhost:3002/auth/login",{
                method :"POST",
                headers : {"Content-Type" : "application/json"},
                body  : JSON.stringify(body)
            })

            const parseRes = await response.json()
            if(parseRes.token){
                localStorage.setItem("token", parseRes.token)
                setAuth(true)
                parseRes.message === "Password or Email is incorrect" ?  setAuth(false) : setAuth(true)
                toast.success("Login successfully !!")
            }else{
                toast.error(parseRes.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    })
            }
   
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
    <Fragment>
        <h1>Login</h1>
        <form onSubmit={onSubmitForm} >
            <input type="email" name="email"  placeholder="email"  className="form-control my-3"  value={email} onChange={e=>onChange(e)} required/>
            <input type="password" name="password"  placeholder="password"  className="form-control my-3"  value={password}  onChange={e=>onChange(e)} required/>
            <button className="btn btn-success btn-block">Login</button>
        </form>
        <Link to="/register">Register</Link> 
    </Fragment>
    )
}

export default Login
