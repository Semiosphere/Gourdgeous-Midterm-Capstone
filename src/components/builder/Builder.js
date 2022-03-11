//This module is responsible for the functionality of the main Avatar Builder page

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

            
        
            <form className="avatarForm">
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="hats">Hats </label>
                        <select
                            required autoFocus
                            type="text"
                            className="form-control"
                            onChange={
                                (evt) => {
                                    const copy = {...avatar}
                                    copy.hatId = evt.target.value
                                    setAvatar(copy)
                                }
                            }
                            ><option value="0">Select a hat</option>
                            {hats.map(hat => <option value={hat.id}>{hat.name}</option>)}
                            </select>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="eyes">Eyes </label>
                        <select
                            required autoFocus
                            type="text"
                            className="form-control"
                            onChange={
                                (evt) => {
                                    const copy = {...avatar}
                                    copy.eyeId = evt.target.value
                                    setAvatar(copy)
                                }
                            }
                            ><option value="0">Select eyes</option>
                            {eyes.map(eye => <option value={eye.id}>{eye.name}</option>)}
                            </select>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="mouths">Mouths </label>
                        <select
                            required autoFocus
                            type="text"
                            className="form-control"
                            onChange={
                                (evt) => {
                                    const copy = {...avatar}
                                    copy.mouthId = evt.target.value
                                    setAvatar(copy)
                                }
                            }
                            ><option value="0">Select a mouth</option>
                            {mouths.map(mouth => <option value={mouth.id}>{mouth.name}</option>)}
                            </select>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="shirts">Shirts </label>
                        <select
                            required autoFocus
                            type="text"
                            className="form-control"
                            onChange={
                                (evt) => {
                                    const copy = {...avatar}
                                    copy.shirtId = evt.target.value
                                    setAvatar(copy)
                                }
                            }
                            ><option value="0">Select a shirt</option>
                            {shirts.map(shirt => <option value={shirt.id}>{shirt.name}</option>)}
                            </select>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="bodies">Bodies </label>
                        <select
                            required autoFocus
                            type="text"
                            className="form-control"
                            onChange={
                                (evt) => {
                                    const copy = {...avatar}
                                    copy.bodyId = evt.target.value
                                    setAvatar(copy)
                                }
                            }
                            ><option value="0">Select a body</option>
                            {bodies.map(body => <option value={body.id}>{body.name}</option>)}
                            </select>
                    </div>
                </fieldset>

                <fieldset>
                    <div className="form-group">
                        <label htmlFor="backgrounds">Backgrounds </label>
                        <select
                            required autoFocus
                            type="text"
                            className="form-control"
                            onChange={
                                (evt) => {
                                    const copy = {...avatar}
                                    copy.backgroundId = evt.target.value
                                    setAvatar(copy)
                                }
                            }
                            ><option value="0">Select a background</option>
                            {backgrounds.map(background => <option value={background.id}>{background.name}</option>)}
                            </select>
                    </div>
                </fieldset>
            </form>
        
    )
}