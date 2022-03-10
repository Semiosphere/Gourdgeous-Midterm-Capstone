import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"

export const AvatarForm = () => {

    //retrieving hats from database
    const [hats, setHat] = useState([])
    useEffect( 
        () => {
            fetch("http://localhost:8088/hats")
                .then(res => res.json())
                    .then((hatArray) => {
                        setHat(hatArray)
                    })
        },
        []
    )

    //retrieving eyes from database
    const [eyes, setEye] = useState([])
    useEffect( 
        () => {
            fetch("http://localhost:8088/eyes")
                .then(res => res.json())
                    .then((eyeArray) => {
                        setEye(eyeArray)
                    })
        },
        []
    )

    //retrieving mouths from database
    const [mouths, setMouth] = useState([])
    useEffect( 
        () => {
            fetch("http://localhost:8088/mouths")
                .then(res => res.json())
                    .then((mouthArray) => {
                        setMouth(mouthArray)
                    })
        },
        []
    )

    //retrieving shirts from database
    const [shirts, setShirt] = useState([])
    useEffect( 
        () => {
            fetch("http://localhost:8088/shirts")
                .then(res => res.json())
                    .then((shirtArray) => {
                        setShirt(shirtArray)
                    })
        },
        []
    )

    //retrieving bodies from database
    const [bodies, setBody] = useState([])
    useEffect( 
        () => {
            fetch("http://localhost:8088/bodies")
                .then(res => res.json())
                    .then((bodyArray) => {
                        setBody(bodyArray)
                    })
        },
        []
    )

    //retrieving backgrounds from database
    const [backgrounds, setBackground] = useState([])
    useEffect( 
        () => {
            fetch("http://localhost:8088/backgrounds")
                .then(res => res.json())
                    .then((backgroundArray) => {
                        setBackground(backgroundArray)
                    })
        },
        []
    )

    const [avatar, setAvatar] = useState({
        //[var to hold state, var to change state]
        name: "",
        hatId: 1,
        eyeId: 1,
        mouthId: 1,
        shirtId: 1,
        bodyId: 1,
        backgroundId: 1
    })

    const history = useHistory()

    

    return (

            
        
            <form className="employeeForm">
                <h2 className="employeeForm__title">Hire New Employee</h2>
                <button onClick={() => history.push("/employees")} className="btn btn-primary">
                    Employee List
                </button>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">New Hire Name: </label>
                        <input
                            onChange={
                                (evt) => {
                                    const copy = {...employee}
                                    copy.name = evt.target.value
                                    updateEmployee(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Fill in new hire's full name"
                             />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="location">Location: </label>
                        <select
                            required autoFocus
                            type="text"
                            className="form-control"
                            onChange={
                                (evt) => {
                                    const copy = {...employee}
                                    copy.locationId = evt.target.value
                                    updateEmployee(copy)
                                }
                            }
                            ><option value="0">Pick a location</option>
                            {locations.map(location => <option value={location.id}>{location.address}</option>)}
                            </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Manager: </label>
                        <input
                        onChange={
                            (evt) => {
                                const copy = {...employee}
                                copy.manager = evt.target.checked
                                updateEmployee(copy)
                            }
                        }
                            type="checkbox" />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Hourly Pay: </label>
                        <input
                            onChange={
                                (evt) => {
                                    const copy = {...employee}
                                    copy.hourlyWage = evt.target.value
                                    updateEmployee(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Fill in new hire's hourly rate"
                             />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Full-time: </label>
                        <input
                        onChange={
                            (evt) => {
                                const copy = {...employee}
                                copy.fullTime = evt.target.checked
                                updateEmployee(copy)
                            }
                        }
                            type="checkbox" />
                    </div>
                </fieldset>
                <button onClick={submitEmployee} className="btn btn-primary">
                    Add Employee to System
                </button>
            </form>
        
    )
}