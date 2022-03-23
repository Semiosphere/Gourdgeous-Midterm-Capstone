import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";

export const Register = (props) => {
  const [user, setUser] = useState({});
  const conflictDialog = useRef();

  const history = useHistory();

  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/users?email=${user.email}`)
      .then((res) => res.json())
      .then((user) => !!user.length);
  };
  const handleRegister = (e) => {
    e.preventDefault();
    existingUserCheck().then((userExists) => {
      if (!userExists) {
        fetch("http://localhost:8088/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((createdUser) => {
            if (createdUser.hasOwnProperty("id")) {
              localStorage.setItem("gourdgeous_user", createdUser.id);
              history.push("/quizAnswers");
            }
          });
      } else {
        conflictDialog.current.showModal();
      }
    });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <main style={{ textAlign: "center" }}>
      <dialog className="dialog dialog--password" ref={conflictDialog}>
        <div>Account with that email address already exists</div>
        <button
          className="button--close"
          onClick={(e) => conflictDialog.current.close()}
        >
          Close
        </button>
      </dialog>
      <section className="logo">
        <img
          id="login-logo"
          src="https://res.cloudinary.com/dvdug0mzg/image/upload/v1647968032/Assets/Gourdgeous_Logo_hteo00.png"
        ></img>
      </section>

      <form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">
          Please Register for Gourdgeous
        </h1>
        <fieldset>
          <input
            onChange={updateUser}
            type="email"
            id="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </fieldset>
        <fieldset>
          <button onClick={(e) => handleRegister(e)} type="submit">
            {" "}
            Register{" "}
          </button>
        </fieldset>
      </form>
    </main>
  );
};
