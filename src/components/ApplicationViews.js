import React from "react"
import { Route } from "react-router-dom"
import { AvatarForm } from "./builder/Builder"



export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/avatars/create">
                <AvatarForm />
            </Route>
        </>
    )
}