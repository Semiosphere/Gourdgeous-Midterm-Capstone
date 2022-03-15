import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import "./MyAvatars.css"

export const AvatarList = () => {
    const [avatars, setMyAvatars] = useState([])
    const [active] = useState("")
    const history = useHistory()

    useEffect(
        () => {
            fetch(`http://localhost:8088/avatars?userId=${localStorage.getItem("gourdgeous_user")}&_expand=hat&_expand=eye&_expand=mouth&_expand=shirt&_expand=body&_expand=background`)
                .then(res => res.json())
                    .then((avatarArray) => {
                        setMyAvatars(avatarArray)
                    })
        },
        []
    )

    const removeAvatar = (eventId) => {
        fetch(`http://localhost:8088/avatars/${eventId}`, {
            method: "DELETE"
        })
        .then(() => {updatedList()})

    }
    
    const updatedList = () => {
        fetch("http://localhost:8088/avatars")
        .then(res => res.json())
            .then((avatarsArray) => {
                setMyAvatars(avatarsArray)
            })

    }

    return (
        <>
        <button onClick={() => history.push("/avatars/create")}>Avatar Builder</button>
        { active }
            <h2>My Avatars</h2>
            <div class="pageGrid">
            {
                avatars.map(
                    (avatarObject) => {
                        return <div class="image-grid">
                            <h4 id="avatarName">{avatarObject.name}</h4>
                             <img id="hatImg" src={avatarObject.hat.image}></img>
                             <img id="eyeImg" src={avatarObject.eye.image}></img>
                             <img id="mouthImg" src={avatarObject.mouth.image}></img>
                             <img id="shirtImg" src={avatarObject.shirt.image}></img>
                             <img id="bodyImg" src={avatarObject.body.image}></img>
                             <img id="backgroundImg" src={avatarObject.background.image}></img>
                             <button onClick={(eventId) => {removeAvatar(eventId)}}>Delete Avatar</button>
                            </div>
                    }
                    )
                }

            </div>

        </>
    )
}