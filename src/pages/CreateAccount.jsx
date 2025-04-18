import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom";
import "./createAccount.css"
import Button from 'react-bootstrap/Button';
import { Form } from "react-bootstrap";

export default function CreateAccount(){


    const [account, setAccount] = useState({
        'username' : "",
        'password' : ""
    })

    const nav = useNavigate();

    const [password, setPassword] = useState("");

    const submit = () => {
        if (password != account.password){

        }
        else{
            fetch("http://localhost:8081/register",{
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(account)
            })
            .then((res) => {
                if(res.status == 201){
                    return res.json();
                }
            })
            .then((data)=>{
                sessionStorage.setItem("login",JSON.stringify(data));
                nav("/URLSearch");
            })
        }

    }

    const changeUserDetails = (e) => {
        if(e.target.name == "confirmPassword"){
            setPassword(e.target.value);
        }
        else{
        setAccount({
            ...account,[e.target.name]:e.target.value
        });
        }
        console.log(account);
        console.log(password);

    }



    return (


        <>
        
            <header>Create Account</header>
            <p>User Name:
            <input type="text" name="username" class="form-control" onChange={changeUserDetails} placeholder="Username"/>
            </p>
            
            <p>Password:
                <input type="password" name="password" class="form-control" onChange={changeUserDetails} placeholder="Password"/>
            </p>
            
            <p> Confirm Password:
                <input type="password" name="confirmPassword" class="form-control" onChange={changeUserDetails} placeholder="Confirm Password"/>
            </p>
            
            <Button variant = "success" value="Create Account" onClick={submit} className="submit">Create Account</Button>
            
            
        

        
        
        </>


    )
}