import 'bootstrap/dist/css/bootstrap.min.css'
import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import "../assets/styles/Reminders.css"
import { Reminder } from '../models/Reminder';

function Reminders(){

    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);


    const [user,setUser]=useState([]);
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [saving,setSaving]=useState(false);
    const [loading,setLoading]=useState(true);
    const [userReminders,setUserReminders]=useState<Reminder[]|null>();
    const [isOpen, setIsOpen] = useState(false);
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

    const createReminder = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSaving(true);
        axios.post("http://localhost:8000/reminder/create",{
            email:email,
            title:reminderFormData.title,
            description:reminderFormData.description,
            datetime:reminderFormData.datetime
        }).then((response)=>{
            setSaving(false);
            setIsOpen(false);
        })
    }

    const createUser = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
        axios.get("http:localhost:8000/reminder/find" + email).then((res)=>{
            setUserReminders(res.data);
            setLoading(false);
        })
    };

    // const getUser = (e: React.FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     axios.get("http://localhost:8000/user/list").then((response)=>{
    //         if (!response.data[0]) {
    //         }
    //         setUser(response.data);
    //     });
    // }
    // function listUsers(){
    //     axios.get("http://localhost:8000/user/list").then((response)=>{
    //         setUsers(response.data)
    //     })
    // };
    useEffect(()=>{
        try {
            if (email) {
                getReminders();
            }
        } catch (error) {
            console.log(error);
        }
    },[]);
    return <>
        <section className="user">
            <div className="container">
                <form onSubmit={createUser} className={(name && email) ? ('content') : ('content middle')}>
                    <h1>Bienvenido</h1>
                    <p>¿Cuál es tu nombre?</p>
                    <TextField id="outlined-basic" label="Name" type="text" variant="outlined" name="name" value={name} onChange={(e)=>{setName(e.target.value)}} autoComplete="nofill" />
                    <TextField id="outlined-basic" label="Email" type="email" variant="outlined" name="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} autoComplete="nofill" />
                    <LoadingButton loading={saving} variant="contained" type='submit'>Guardar</LoadingButton>
                </form>
                <LoadingButton loading={saving} variant="contained" type='button' onClick={()=>getReminders}>Ver</LoadingButton>
            </div>
        </section>
        {(name && email) && <>
            {isOpen && <>
                <div className='darken' onClick={()=>setIsOpen(false)}></div>
                <section className='create'>
                    <div className="container">
                        <div className="content py-3">
                            <button className='close-btn' type='button' onClick={()=>setIsOpen(false)}>x</button>
                            <h1>Crear recordatorio</h1>
                            <hr />
                            <form action="" onSubmit={createReminder}>
                                <div className='row'>
                                    <div className='col-6'>
                                        <TextField id="outlined-basic" label="Title" variant="outlined" name="title" value={reminderFormData.title} onChange={handleInput} className='form-control' />
                                    </div>
                                    <div className='col-6'>
                                        <TextField id="outlined-multiline-static" label="Description" multiline name="description" rows={4} variant="outlined" value={reminderFormData.description} onChange={handleInput} className='form-control' />
                                    </div>
                                    <div className='col-6'>
                                        <TextField id="datetime-local" label="Date and Time" type="datetime-local" name="datetime" variant="outlined" value={reminderFormData.datetime} onChange={handleInput} InputLabelProps={{ shrink: true, }} className='form-control' />
                                    </div>
                                    <div className='col-12 pt-4'>
                                        <LoadingButton loading={saving} variant="contained" type="submit">Save</LoadingButton>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </>}
            <section className="py-5">
                <div className='container'>
                    <div className='content'>
                        <h1>Recordatorios</h1>
                        <LoadingButton variant="contained" type='button' onClick={()=>setIsOpen(true)}>Crear nuevo recordatorio</LoadingButton>
                        <hr />
                        <div className="reminders">
                            <div className="container">
                                <div className="content">
                                {userReminders?.map((reminder, index) => (
                                    <div className="reminder" key={index}>
                                    <h3>{reminder.title}</h3>
                                    <p className='description'>
                                        {reminder.description}
                                    </p>
                                    <p className='datetime'>
                                        {reminder.datetime}
                                    </p>
                                    </div>
                                ))}
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