//This module is responsible for the functionality of the main Avatar Builder page

import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import "./Builder.css"

export const AvatarForm = () => {

    //retrieving hats from database
    const [hats, setHats] = useState([])
    useEffect( 
        () => {
            fetch("http://localhost:8088/hats")
                .then(res => res.json())
                    .then((hatArray) => {
                        setHats(hatArray)
                    })
        },
        []
    )

    //retrieving eyes from database
    const [eyes, setEyes] = useState([])
    useEffect( 
        () => {
            fetch("http://localhost:8088/eyes")
                .then(res => res.json())
                    .then((eyeArray) => {
                        setEyes(eyeArray)
                    })
        },
        []
    )

    //retrieving mouths from database
    const [mouths, setMouths] = useState([])
    useEffect( 
        () => {
            fetch("http://localhost:8088/mouths")
                .then(res => res.json())
                    .then((mouthArray) => {
                        setMouths(mouthArray)
                    })
        },
        []
    )

    //retrieving shirts from database
    const [shirts, setShirts] = useState([])
    useEffect( 
        () => {
            fetch("http://localhost:8088/shirts")
                .then(res => res.json())
                    .then((shirtArray) => {
                        setShirts(shirtArray)
                    })
        },
        []
    )

    //retrieving bodies from database
    const [bodies, setBodies] = useState([])
    useEffect( 
        () => {
            fetch("http://localhost:8088/bodies")
                .then(res => res.json())
                    .then((bodyArray) => {
                        setBodies(bodyArray)
                    })
        },
        []
    )

    //retrieving backgrounds from database
    const [backgrounds, setBackgrounds] = useState([])
    useEffect( 
        () => {
            fetch("http://localhost:8088/backgrounds")
                .then(res => res.json())
                    .then((backgroundArray) => {
                        setBackgrounds(backgroundArray)
                    })
        },
        []
    )

    const [avatar, setAvatar] = useState({
        //[var to hold state, var to change state]
        name: "",
        hatId: 0,
        eyeId: 0,
        mouthId: 0,
        shirtId: 0,
        bodyId: 0,
        backgroundId: 1
    })

    const history = useHistory()

    const getHat = () => {
            const hat = hats.find((hat) => hat.id === avatar.hatId)
            return hat
    }
    const getEye = () => {
        const eye = eyes.find((eye) => eye.id === avatar.eyeId)
        return eye
    }
    const getBody = () => {
        const body = bodies.find((body) => body.id === avatar.bodyId)
        return body
    }
    const getMouth = () => {
        const mouth = mouths.find((mouth) => mouth.id === avatar.mouthId)
        return mouth
    }
    const getShirt = () => {
        const shirt = shirts.find((shirt) => shirt.id === avatar.shirtId)
        return shirt
    }
    const getBackground = () => {
        const background = backgrounds.find((background) => background.id === avatar.backgroundId)
        return background
    }

    const saveAvatar = (evt) => {
        const newAvatar = {
            userId: parseInt(localStorage.getItem("gourdgeous_user")),
            name: avatar.name,
            hatId: avatar.hatId,
            eyeId: avatar.eyeId,
            mouthId: avatar.mouthId,
            shirtId: avatar.shirtId,
            bodyId: avatar.bodyId,
            backgroundId: avatar.backgroundId

        }
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newAvatar)
        }

        return fetch("http://localhost:8088/avatars", fetchOption)
                
            
    }



    return (
        <>
        <div class="images">
            {getHat() && <img id="img1" src={getHat().image}></img>}
            {getEye() && <img id="img2" src={getEye().image}></img>}
            {getMouth() && <img id="img3" src={getMouth().image}></img>}
            {getShirt() && <img id="img4" src={getShirt().image}></img>}
            {getBody() && <img id="img5" src={getBody().image}></img>}
            {getBackground() && <img id="img6" src={getBackground().image}></img>}
        </div>
        
            <form className="avatarForm">
            <fieldset>
                    <div className="form-group">
                        <label htmlFor="description">Avatar Name </label>
                        <input
                            onChange={
                                (evt) => {
                                    const copy = {...avatar}
                                    copy.name = evt.target.value
                                    setAvatar(copy)
                                }
                            }
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Name your avatar"
                             />
                    </div>
                </fieldset>

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
                                    copy.hatId = parseInt(evt.target.value)
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
                                    copy.eyeId = parseInt(evt.target.value)
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
                                    copy.mouthId = parseInt(evt.target.value)
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
                                    copy.shirtId = parseInt(evt.target.value)
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
                                    copy.bodyId = parseInt(evt.target.value)
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
                                    copy.backgroundId = parseInt(evt.target.value)
                                    setAvatar(copy)
                                }
                            }
                            ><option value="0">Select a background</option>
                            {backgrounds.map(background => <option value={background.id}>{background.name}</option>)}
                            </select>
                    </div>
                </fieldset>
                <button onClick={saveAvatar} className="btn btn-primary">
                    Save Avatar
                </button>
            </form>
        </>
        
    )
}