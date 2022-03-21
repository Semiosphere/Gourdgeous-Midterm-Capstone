import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./MyAvatars.css";

export const AvatarList = () => {
  const [avatars, setMyAvatars] = useState([]);
  const [active] = useState("");
  const history = useHistory();

  useEffect(() => {
    fetch(
      `http://localhost:8088/avatars?userId=${localStorage.getItem(
        "gourdgeous_user"
      )}&_expand=hat&_expand=eye&_expand=mouth&_expand=shirt&_expand=body&_expand=background&_expand=accessory`
    )
      .then((res) => res.json())
      .then((avatarArray) => {
        setMyAvatars(avatarArray);
      });
  }, []);

  const removeAvatar = (event) => {
    fetch(`http://localhost:8088/avatars/${event.target.id}`, {
      method: "DELETE",
    }).then(() => {
      updatedList();
    });
  };

  const updatedList = () => {
    fetch(
      `http://localhost:8088/avatars?userId=${localStorage.getItem(
        "gourdgeous_user"
      )}&_expand=hat&_expand=eye&_expand=mouth&_expand=shirt&_expand=body&_expand=background&_expand=accessory`
    )
      .then((res) => res.json())
      .then((avatarsArray) => {
        setMyAvatars(avatarsArray);
      });
  };

  const logout = () => {
    localStorage.removeItem("gourdgeous_user");
    history.push(`/login`);
  };

  const editAvatar = (foundId) => {
    history.push(`/avatars/create/${foundId}`);
  };

  return (
    <>
      <button
        className="avatar-builder"
        onClick={() => history.push("/avatars/create")}
      >
        Avatar Builder
      </button>

      <button className="logout" onClick={() => logout()}>
        Logout
      </button>
      {active}
      <h2 id="header">My Avatars</h2>
      <div class="pageGrid">
        {avatars.map((avatarObject) => {
          return (
            <div class="image-grid">
              <img id="hatImg" src={avatarObject.hat.image}></img>
              <img id="eyeImg" src={avatarObject.eye.image}></img>
              <img id="mouthImg" src={avatarObject.mouth.image}></img>
              <img id="shirtImg" src={avatarObject.shirt.image}></img>
              <img id="accessoryImg" src={avatarObject.accessory.image}></img>
              <img id="bodyImg" src={avatarObject.body.image}></img>
              <img id="backgroundImg" src={avatarObject.background.image}></img>
              <h4 id="avatarName">{avatarObject.name}</h4>
              <button
                className="delete-buttons"
                id={avatarObject.id}
                onClick={(event) => {
                  removeAvatar(event);
                }}
              >
                Delete Avatar
              </button>
              <button
                classname="edit-avatars"
                id={avatarObject.id}
                onClick={() => editAvatar(avatarObject.id)}
              >
                Edit Avatar
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
