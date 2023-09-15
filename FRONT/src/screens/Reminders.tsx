import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';

function Reminders(){

    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [saving,setSaving]=useState(false);
    // const [users,setUsers]=useState([]);
    const [reminderFormData, setReminderFormData] = useState({
        title: "",
        description: "",
        datetime: ""
    });
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        setReminderFormData((prevState) => ({
            ...prevState,
            [fieldName]: fieldValue
        }));
    };

    const createReminder =()=>{
        setSaving(true);
        axios.post("http://localhost:8000/reminder/create",{
            email:email,
            title:reminderFormData.title,
            description:reminderFormData.description,
            datetime:reminderFormData.datetime
        }).then((response)=>{
            setSaving(false);
        })
    }

    function createUser(){
        setSaving(true);
        axios.post("http://localhost:8000/user/create",{
            name:name,
            email:email
        }).then((response)=>{
            setSaving(false);
        })
    };
    // function listUsers(){
    //     axios.get("http://localhost:8000/user/list").then((response)=>{
    //         setUsers(response.data)
    //     })
    // };
    // useEffect(()=>{
    //     listUsers();
    // },[]);
    return <>
        <section className="user">
            <div className="container">
                <div className="content">
                    <h1>Bienvenido</h1>
                    <p>¿Cuál es tu nombre?</p>
                    <TextField id="outlined-basic" label="Name" type="text" variant="outlined" name="name" value={name} onChange={(e)=>{setName(e.target.value)}} autoComplete="nofill" />
                    <TextField id="outlined-basic" label="Email" type="email" variant="outlined" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} autoComplete="nofill" />
                    <LoadingButton loading={saving} variant="contained" onClick={createUser}>Save</LoadingButton>
                </div>
            </div>
        </section>
        {(name && email) && <>
            <section className="reminders">
                <div className="create">
                    <h1>Create reminder</h1>
                    <hr />
                    <form action="">
                        <TextField id="outlined-basic" label="Title" variant="outlined" name="title" value={reminderFormData.title} onChange={handleInput} />
                        <TextField id="outlined-multiline-static" label="Description" multiline name="description" rows={4} variant="outlined" value={reminderFormData.description} onChange={handleInput} />
                        <TextField id="datetime-local" label="Date and Time" type="datetime-local" name="datetime" variant="outlined" value={reminderFormData.datetime} onChange={handleInput} InputLabelProps={{ shrink: true, }} />
                        <LoadingButton loading={saving} variant="contained" onClick={createReminder}>Save</LoadingButton>
                    </form>
                </div>
                <div className="view">
                    <h1>Reminders</h1>
                    <hr />
                    <div></div>
                </div>
                {/* <div>
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
                </div> */}
                {/* <div>
                    {users.map((user:any)=>{
                        return <>
                            <p>{user.name} {user.last_name} {user.email}</p>
                        </>
                    })}
                </div> */}

            </section>
        </>}
    </>;

}

export default Reminders;