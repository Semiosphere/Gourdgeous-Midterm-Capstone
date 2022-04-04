//This module is responsible for the functionality of the main Avatar Builder page

import React, { useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./Builder.css";

//AvatarForm export is the main function that renders the "create avatars" page

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

  //retrieving accessories from database
  const [accessories, setAccessories] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8088/accessories")
      .then((res) => res.json())
      .then((accessoryArray) => {
        setAccessories(accessoryArray);
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
    name: "",
    hatId: 0,
    eyeId: 0,
    mouthId: 0,
    shirtId: 0,
    accessoryId: 0,
    bodyId: 1,
    backgroundId: 1,
  });

  const { avatarId } = useParams();

  //function that renders the appropriate art assets based on which avatar is being edited
  useEffect(() => {
    if (avatarId) {
      fetch(`http://localhost:8088/avatars/${avatarId}`)
        .then((res) => res.json())
        .then(setAvatar);
    }
  }, [avatarId]);

  const history = useHistory();

  //The following functions allow me to create variables that represent each art asset that has been selected by the user
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
  const getAccessory = () => {
    const accessory = accessories.find(
      (accessory) => accessory.id === avatar.accessoryId
    );
    return accessory;
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

  const allSelectedDialogue = useRef();

  //This function holds all of the user selections and updates the api with a new avatar
  const saveAvatar = (event) => {
    event.preventDefault();
    const newAvatar = {
      userId: parseInt(localStorage.getItem("gourdgeous_user")),
      name: avatar.name,
      hatId: avatar.hatId,
      eyeId: avatar.eyeId,
      mouthId: avatar.mouthId,
      shirtId: avatar.shirtId,
      accessoryId: avatar.accessoryId,
      bodyId: avatar.bodyId,
      backgroundId: avatar.backgroundId,
    };

    //this if statement determines whether or not all required information has been provided by the user to save an avatar
    if (
      newAvatar.name !== "" &&
      newAvatar.hatId !== 0 &&
      newAvatar.eyeId !== 0 &&
      newAvatar.mouthId !== 0 &&
      newAvatar.shirtId !== 0 &&
      newAvatar.accessoryId !== 0 &&
      newAvatar.bodyId !== 0 &&
      newAvatar.backgroundId !== 0
    ) {
      const fetchOption = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAvatar),
      };

      return fetch("http://localhost:8088/avatars", fetchOption);
    } else {
      allSelectedDialogue.current.showModal();
    }
  };

  //when a user clicks the "clear selections" button, this function runs, reloading the page
  const clearSelections = () => {
    history.push("/avatars/create");
  };

  //function to retrieve each art asset at random from the database when a user clicks the "random avatar" button
  const randomAvatarGenerator = (event) => {
    event.preventDefault();
    const randomAvatar = {
      userId: parseInt(localStorage.getItem("gourdgeous_user")),
      name: "",
      hatId: Math.floor(Math.random() * hats.length - 1) + 2,
      eyeId: Math.floor(Math.random() * eyes.length - 1) + 2,
      mouthId: Math.floor(Math.random() * mouths.length - 1) + 2,
      shirtId: Math.floor(Math.random() * shirts.length - 1) + 2,
      accessoryId: Math.floor(Math.random() * accessories.length - 1) + 2,
      bodyId: Math.floor(Math.random() * bodies.length - 1) + 2,
      backgroundId: Math.floor(Math.random() * backgrounds.length - 1) + 2,
    };
    setAvatar(randomAvatar);
  };

  return (
    <>
      {/* dialog box that appears when a user tries to save an avatar without completing the form */}
      <dialog className="dialog-builder" ref={allSelectedDialogue}>
        <div id="dialog-text">
          Select a feature from each category and name your Gourd!
        </div>
        <button
          className="button--close"
          onClick={() => allSelectedDialogue.current.close()}
        >
          Close
        </button>
      </dialog>
      {/* These functions display the proper feature corresponding with the user selection */}
      <div className="page-background">
        <container id="main-Grid">
          <div class="item-b">
            {getHat() && <img id="img1" src={getHat().image}></img>}
            {getEye() && <img id="img2" src={getEye().image}></img>}
            {getMouth() && <img id="img3" src={getMouth().image}></img>}
            {getShirt() && <img id="img4" src={getShirt().image}></img>}
            {getBody() && <img id="img5" src={getBody().image}></img>}
            {getBackground() && (
              <img id="img6" src={getBackground().image}></img>
            )}
            {getAccessory() && <img id="img7" src={getAccessory().image}></img>}
          </div>
          <section className="item-d">
            <img
              id="builder-logo"
              src="https://res.cloudinary.com/dvdug0mzg/image/upload/v1647968032/Assets/Gourdgeous_Logo_hteo00.png"
            ></img>
          </section>
          {/* text field representing the avatar's name as given by the user */}
          <fieldset className="item-c">
            <div className="avatar-Name">
              <input
                value={avatar.name}
                onChange={(evt) => {
                  const copy = { ...avatar };
                  copy.name = evt.target.value;
                  setAvatar(copy);
                }}
                required
                autoFocus
                type="text"
                className="form-control"
                placeholder="NAME YOUR GOURD"
              />
            </div>
          </fieldset>
          {/* dropdown menus representing each array of art assets */}
          <form className="item-a">
            <fieldset>
              <div className="hat-group">
                <label htmlFor="hats">Hats </label>
                <select
                  value={avatar.hatId}
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
                  value={avatar.eyeId}
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
                  value={avatar.mouthId}
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
                  value={avatar.shirtId}
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
              <div className="accessory-group">
                <label htmlFor="accessories">Accessories </label>
                <select
                  value={avatar.accessoryId}
                  required
                  autoFocus
                  type="text"
                  className="form-control"
                  onChange={(evt) => {
                    const copy = { ...avatar };
                    copy.accessoryId = parseInt(evt.target.value);
                    setAvatar(copy);
                  }}
                >
                  <option value="0">Select an accessory</option>
                  {accessories.map((accessory) => (
                    <option value={accessory.id}>{accessory.name}</option>
                  ))}
                </select>
              </div>
            </fieldset>

            <fieldset>
              <div className="body-group">
                <label htmlFor="bodies">Bodies </label>
                <select
                  value={avatar.bodyId}
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
                  value={avatar.backgroundId}
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
                My <br></br>Gourds
              </button>
            </div>
          </form>
          {/* text field describing app function and random avatar generator button */}
          <div className="item-e">
            <h1 id="info-header">Build your very own Gourd avatar!</h1>
            <p id="info-text">
              Make selections from each of the drop down categories on the left
              to create your perfect Gourd! Don't forget to name your
              masterpiece before saving it to your collection. If you're feeling
              stuck, try the Random Gourd button for inspiration!
            </p>
            <button onClick={randomAvatarGenerator} id="random-avatar">
              Random Gourd
            </button>
          </div>
        </container>
      </div>
    </>
  );
};
