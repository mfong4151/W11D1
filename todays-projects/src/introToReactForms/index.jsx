import {useState, useEffect } from 'react';



const DemoForm = props =>{

    const [user, setUser] = useState({
        name:'',
        email: '',
        phoneNumber: '',
        phoneType: '',
        staff: false,
        bio: '',
        emailNotifications: ''
    })
    const [errors, setErrors] = useState([])

    const handleChange = incomingKey => {
        return e =>{
            const newUser = {...user, [incomingKey]: e.target.value}
            setUser(newUser)
        }
    }
    const emailFormat = () =>{

        if (user.email.includes('@')) return true

        return false

    };

    const phoneFormat = () =>{
        
        if (user.phoneNumber.length !== 10) return false
        
        return true
    }

    const validate = () =>{
        let errors = [];
        if(user.name.length === 0) errors.push('Name must be present')
        
        if(user.email.length === 0 && !emailFormat) errors.push("This is not a proper email")

        if(user.phoneNumber.length !== 10 && !phoneFormat) errors.push('Phone number is not formated properly')

        if(user.phoneType.length === 0) errors.push('Select a phone type Bhenchod')

        if(user.bio.length > 280) errors.push('Your bio is too long')

        return errors;   
    }

    const onSubmit = e => {
        e.preventDefault();
        let errors = validate();
        if (errors.length) setErrors(errors)

        else {
        
            setUser({
            name:'',
             email: '',
             phoneNumber: '',
             phoneType: '',
             staff: false,
             bio: '',
             emailNotifications: ''
            })
        
            setErrors([])
        }
    };

    const showErrors = ()=>{
        
        if(errors.length === 0){
            return null;
        }else{
            return(<ul>
                {errors.map((error, i)=><li key={i}>{error}</li>) } 
            </ul>)
        }

    }
 
    return(
        <>
            <form onSubmit={onSubmit}>
                
                <input type="text" placeholder="Name" id="name" value={user.name} onChange={handleChange('name')}/>
                <input type="text" placeholder="Email" id="email" value={user.email} onChange={handleChange('email')}/>
                <input type="text" placeholder="Phone Number" id="phone-number" value={user.phoneNumber}  onChange={handleChange('phoneNumber')}/>
                

                <select name='phoneType' value={user.phoneType} onChange={handleChange('phoneType')}>

                    <option value='' disabled>
                        Select a phone type...
                    </option>

                    <option>Home</option>
                    <option>Work</option>
                    <option>Mobile</option>
                    

                </select>



                <label htmlFor="staff">Staff</label>
                <input type="radio" name="staff" id="staff" value='false'  onChange={handleChange('staff')}
                />

                <label htmlFor="student">Student</label>
                <input type="radio" name="staff" id="student" value='true'  onChange={handleChange('student')} 
                />

                <textarea name="bio" id="bio" cols="30" rows="10"  onChange={handleChange('bio')}></textarea>
                <label htmlFor='email-notifications'>Email Notifications?</label>
                <input type="checkbox" placeholder="chec" id="email-notifications" value={user.emailNotifications}  onChange={handleChange('emailNotifications')}/>
                
                <button>Submit</button>
                {showErrors()}

            </form>

        </>

    )


}

export {DemoForm};