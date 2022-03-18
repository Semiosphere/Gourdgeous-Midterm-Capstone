//This module is responsible for the functionality of the main Avatar Builder page

import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./Builder.css";

export const AvatarForm = () => {
  //retrieving hats from database
  const [hats, setHats] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8088/hats")
      .then((res) => res.json())
      .then((hatArray) => {
        setHats(hatArray);
      });
  }, []);

  //retrieving eyes from database
  const [eyes, setEyes] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8088/eyes")
      .then((res) => res.json())
      .then((eyeArray) => {
        setEyes(eyeArray);
      });
  }, []);

  //retrieving mouths from database
  const [mouths, setMouths] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8088/mouths")
      .then((res) => res.json())
      .then((mouthArray) => {
        setMouths(mouthArray);
      });
  }, []);

  //retrieving shirts from database
  const [shirts, setShirts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8088/shirts")
      .then((res) => res.json())
      .then((shirtArray) => {
        setShirts(shirtArray);
      });
  }, []);

  //retrieving bodies from database
  const [bodies, setBodies] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8088/bodies")
      .then((res) => res.json())
      .then((bodyArray) => {
        setBodies(bodyArray);
      });
  }, []);

  //retrieving backgrounds from database
  const [backgrounds, setBackgrounds] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8088/backgrounds")
      .then((res) => res.json())
      .then((backgroundArray) => {
        setBackgrounds(backgroundArray);
      });
  }, []);

  const [avatar, setAvatar] = useState({
    //[var to hold state, var to change state]
    name: "",
    hatId: 0,
    eyeId: 0,
    mouthId: 0,
    shirtId: 0,
    bodyId: 1,
    backgroundId: 1,
  });

  const { avatarId } = useParams();

  //within this useEffect, don't run this fetch if no avatar.id is found
  useEffect(() => {
    if (props.match.params.avatarId) {
      fetch(`http://localhost:8088/avatars/${avatarId}`)
        .then((res) => res.json())
        .then(setAvatar);
    }
  }, [avatarId]);

  const history = useHistory();

  //The following functions allow me to create variables that represent each feature that has been selected by the user
  const getHat = () => {
    const hat = hats.find((hat) => hat.id === avatar.hatId);
    return hat;
  };
  const getEye = () => {
    const eye = eyes.find((eye) => eye.id === avatar.eyeId);
    return eye;
  };
  const getBody = () => {
    const body = bodies.find((body) => body.id === avatar.bodyId);
    return body;
  };
  const getMouth = () => {
    const mouth = mouths.find((mouth) => mouth.id === avatar.mouthId);
    return mouth;
  };
  const getShirt = () => {
    const shirt = shirts.find((shirt) => shirt.id === avatar.shirtId);
    return shirt;
  };
  const getBackground = () => {
    const background = backgrounds.find(
      (background) => background.id === avatar.backgroundId
    );
    return background;
  };

  //This function holds all of the user selections and updates the api with a new avatar
  const saveAvatar = (evt) => {
    const newAvatar = {
      userId: parseInt(localStorage.getItem("gourdgeous_user")),
      name: avatar.name,
      hatId: avatar.hatId,
      eyeId: avatar.eyeId,
      mouthId: avatar.mouthId,
      shirtId: avatar.shirtId,
      bodyId: avatar.bodyId,
      backgroundId: avatar.backgroundId,
    };
    const fetchOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newAvatar),
    };

    return fetch("http://localhost:8088/avatars", fetchOption);
  };

  const clearSelections = () => {
    history.push(`/avatars/create`);
  };

  return (
    <>
      {/* These functions display the proper feature corresponding with the user selection */}
      <container id="main-Grid">
        <div class="item-b">
          {getHat() && <img id="img1" src={getHat().image}></img>}
          {getEye() && <img id="img2" src={getEye().image}></img>}
          {getMouth() && <img id="img3" src={getMouth().image}></img>}
          {getShirt() && <img id="img4" src={getShirt().image}></img>}
          {getBody() && <img id="img5" src={getBody().image}></img>}
          {getBackground() && <img id="img6" src={getBackground().image}></img>}
        </div>

        <fieldset className="item-c">
          <div className="avatar-Name">
            <input
              onChange={(evt) => {
                const copy = { ...avatar };
                copy.name = evt.target.value;
                setAvatar(copy);
              }}
              required
              autoFocus
              type="text"
              className="form-control"
              placeholder="NAME YOUR AVATAR"
            />
          </div>
        </fieldset>

        <form className="item-a">
          <fieldset>
            <div className="hat-group">
              <label htmlFor="hats">Hats </label>
              <select
                required
                autoFocus
                type="text"
                className="form-control"
                onChange={(evt) => {
                  const copy = { ...avatar };
                  copy.hatId = parseInt(evt.target.value);
                  setAvatar(copy);
                }}
              >
                <option value="0">Select a hat</option>
                {hats.map((hat) => (
                  <option value={hat.id}>{hat.name}</option>
                ))}
              </select>
            </div>
          </fieldset>

          <fieldset>
            <div className="eye-group">
              <label htmlFor="eyes">Eyes </label>
              <select
                required
                autoFocus
                type="text"
                className="form-control"
                onChange={(evt) => {
                  const copy = { ...avatar };
                  copy.eyeId = parseInt(evt.target.value);
                  setAvatar(copy);
                }}
              >
                <option value="0">Select eyes</option>
                {eyes.map((eye) => (
                  <option value={eye.id}>{eye.name}</option>
                ))}
              </select>
            </div>
          </fieldset>

          <fieldset>
            <div className="mouth-group">
              <label htmlFor="mouths">Mouths </label>
              <select
                required
                autoFocus
                type="text"
                className="form-control"
                onChange={(evt) => {
                  const copy = { ...avatar };
                  copy.mouthId = parseInt(evt.target.value);
                  setAvatar(copy);
                }}
              >
                <option value="0">Select a mouth</option>
                {mouths.map((mouth) => (
                  <option value={mouth.id}>{mouth.name}</option>
                ))}
              </select>
            </div>
          </fieldset>

          <fieldset>
            <div className="shirt-group">
              <label htmlFor="shirts">Shirts </label>
              <select
                required
                autoFocus
                type="text"
                className="form-control"
                onChange={(evt) => {
                  const copy = { ...avatar };
                  copy.shirtId = parseInt(evt.target.value);
                  setAvatar(copy);
                }}
              >
                <option value="0">Select a shirt</option>
                {shirts.map((shirt) => (
                  <option value={shirt.id}>{shirt.name}</option>
                ))}
              </select>
            </div>
          </fieldset>

          <fieldset>
            <div className="body-group">
              <label htmlFor="bodies">Bodies </label>
              <select
                required
                autoFocus
                type="text"
                className="form-control"
                onChange={(evt) => {
                  const copy = { ...avatar };
                  copy.bodyId = parseInt(evt.target.value);
                  setAvatar(copy);
                }}
              >
                <option value="0">Select a body</option>
                {bodies.map((body) => (
                  <option value={body.id}>{body.name}</option>
                ))}
              </select>
            </div>
          </fieldset>

          <fieldset>
            <div className="background-group">
              <label htmlFor="backgrounds">Backgrounds </label>
              <select
                required
                autoFocus
                type="text"
                className="form-control"
                onChange={(evt) => {
                  const copy = { ...avatar };
                  copy.backgroundId = parseInt(evt.target.value);
                  setAvatar(copy);
                }}
              >
                <option value="0">Select a background</option>
                {backgrounds.map((background) => (
                  <option value={background.id}>{background.name}</option>
                ))}
              </select>
            </div>
          </fieldset>
          <div className="builder-buttons">
            <button onClick={saveAvatar} id="save-avatar">
              Save Avatar
            </button>
            <button onClick={clearSelections} id="clear-selections">
              Clear Selections
            </button>
            <button onClick={() => history.push(`/MyAvatars`)} id="my-gourds">
              My Gourds
            </button>
          </div>
        </form>
      </container>
    </>
  );
};

//pass edit avatar id to builder.js (props?)

//behavior of builder.js needs to change based on whether I'm creating a new avatar or editing an existing avatar
