import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [email, set] = useState("");
  const existDialog = useRef();
  const history = useHistory();

  const existingUserCheck = () => {
    return fetch(`http://localhost:8088/users?email=${email}`)
      .then((res) => res.json())
      .then((user) => (user.length ? user[0] : false));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    existingUserCheck().then((exists) => {
      if (exists) {
        localStorage.setItem("gourdgeous_user", exists.id);
        history.push("/avatars/create");
      } else {
        existDialog.current.showModal();
      }
    });
  };

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>User does not exist</div>
        <button
          className="button--close"
          onClick={(e) => existDialog.current.close()}
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

      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <h1>The Pumpkin Avatar Creation App</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <input
              type="email"
              onChange={(evt) => set(evt.target.value)}
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <button type="submit">Sign in</button>
          </fieldset>
          <fieldset>
            <h3>Art and Code by Zach Dugger</h3>
          </fieldset>
        </form>
      </section>
      <section className="link--register">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  );
};
