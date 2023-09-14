import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';

function CreateUserForm(){

    const [name,setName]=useState("");
    const [lastName,setLastName]=useState("");
    const [email,setEmail]=useState("");
    const [saving,setSaving]=useState(false);
    const [users,setUsers]=useState([]);
    function save(){
        setSaving(true);
        axios.post("http://localhost:8000/user/create",{
            name:name,
            last_name:lastName,
            email:email
        }).then((response)=>{
            setSaving(false);
            listUsers();
        })
    }
    function listUsers(){
        axios.get("http://localhost:8000/user/list").then((response)=>{
            setUsers(response.data)
        })
    }
    useEffect(()=>{
        listUsers();
    },[])
    return (
        <div style={{marginTop:30}}>
            <div>
            <TextField id="outlined-basic" label="Name" variant="outlined" value={name} onChange={(event)=>{
                const {value}=event.target
                setName(value)
            }} />
            <TextField id="outlined-basic" label="Last Name" variant="outlined" value={lastName} onChange={(event)=>{
                const {value}=event.target
                setLastName(value)
            }}/>
            <TextField id="outlined-basic" label="Email" variant="outlined" value={email} onChange={(event)=>{
                const {value}=event.target
                setEmail(value)
            }} />
            <LoadingButton loading={saving} variant="contained" onClick={save}>Save</LoadingButton>
            </div>
            <div>
                {users.map((user:any)=>{
                    return <>
                        <p>{user.name} {user.last_name} {user.email}</p>
                    </>
                })}
            </div>

        </div>
    );

}

export default CreateUserForm;