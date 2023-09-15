import 'bootstrap/dist/css/bootstrap.min.css'
import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import "../assets/styles/Reminders.css"

function Reminders(){

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);


    const [user,setUser]=useState({});
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [saving,setSaving]=useState(false);
    const [loading,setLoading]=useState(true);
    const [userReminders,setUserReminders]=useState([]);
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

    const createReminder = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
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

    function createUser(e: React.ChangeEvent<HTMLInputElement>){
        setSaving(true);
        axios.post("http://localhost:8000/user/create",{
            name:name,
            email:email
        }).then((response)=>{
            setSaving(false);
        })
    };

    function getReminders() {
        setLoading(true);
        axios.get("http:localhost:8000/reminders/get").then((res)=>{
            setUserReminders(res.data);
        })
    };

    const getUser = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        axios.get("http://localhost:8000/user/list").then((response)=>{
            setUser(response.data);
        });
    }
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
                <div className={(name && email) ? ('content') : ('content middle')}>
                    <h1>Bienvenido</h1>
                    <p>¿Cuál es tu nombre?</p>
                    <TextField id="outlined-basic" label="Name" type="text" variant="outlined" name="name" value={name} onChange={(e)=>{setName(e.target.value)}} autoComplete="off" />
                    <TextField id="outlined-basic" label="Email" type="email" variant="outlined" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} autoComplete="off" />
                    <LoadingButton loading={saving} variant="contained" onClick={createUser}>Save</LoadingButton>
                </div>
            </div>
        </section>
        {(name && email) && <>
            <section className='create'>
                <div className="container">
                    <div className="content">
                        <h1>Create reminder</h1>
                        <hr />
                        <form action="" onSubmit={()=>{}}>
                            <TextField id="outlined-basic" label="Title" variant="outlined" name="title" value={reminderFormData.title} onChange={handleInput} />
                            <TextField id="outlined-multiline-static" label="Description" multiline name="description" rows={4} variant="outlined" value={reminderFormData.description} onChange={handleInput} />
                            <TextField id="datetime-local" label="Date and Time" type="datetime-local" name="datetime" variant="outlined" value={reminderFormData.datetime} onChange={handleInput} InputLabelProps={{ shrink: true, }} />
                            <LoadingButton loading={saving} variant="contained" type="submit">Save</LoadingButton>
                        </form>
                    </div>
                </div>
            </section>
            <section className="reminders">
                <div className='container'>
                    <div className='content'></div>
                </div>
                <div className="view">
                    <h1>Reminders</h1>
                    <hr />
                    <div className="reminders">
                        <div className="container">
                            <div className="content">
                                <div className="reminder">
                                    <h3>Recordatorio 1</h3>
                                </div>
                                <div className="reminder">
                                    <h3>Recordatorio 1</h3>
                                </div>
                                <div className="reminder">
                                    <h3>Recordatorio 1</h3>
                                </div>
                                <div className="reminder">
                                    <h3>Recordatorio 1</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>}
    </>;

}

export default Reminders;