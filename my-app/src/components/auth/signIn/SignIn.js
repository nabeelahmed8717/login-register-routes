import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SignIn.module.css";

const SignIn = (props) => {
  const [UserNotFound, setUserNotFound] = useState(false);

  const navigate = useNavigate();

  const [input, setInput] = useState({
    password: "",
    email: "",
  });

  const [error, setError] = useState({
    password: "",
    email: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };
  const validateInput = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "username":
          if (!value) {
            stateObj[name] = "*Please enter Username.";
          }
          break;

        case "email":
          if (!value) {
            setUserNotFound(false);
            stateObj[name] = "*Please enter email.";
          } else if (!value.includes("@")) {
            stateObj["email"] = "*Invalid email: email must include '@' ";
          }
          break;

        case "password":
          if (!value) {
            stateObj[name] = "*Please enter Password.";
          } else if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "*Password and Confirm Password does not match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (!value) {
            stateObj[name] = "*Please enter Confirm Password.";
          } else if (input.password && value !== input.password) {
            stateObj[name] = "*Password and Confirm Password does not match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  async function login(event) {
    event.preventDefault();
    const response = await fetch(
      "https://usersdata-56b3b-default-rtdb.firebaseio.com/Users.json"
    );
    const data = await response.json();
    let loadedData = [];
    for (const key in data) {
      loadedData.push({
        id: key,
        username: data[key].username,
        email: data[key].email,
        password: data[key].password,
        role: data[key].role,
      });
    }

    const matchUser = loadedData.filter(
      (user) => user.email === input.email && user.password === input.password
    );
    console.log("UserFiltered", matchUser);

    

    if (matchUser.length === 0) {
      alert("user does`nt exists");
    } else {
      console.log("user exists");
      console.log("welcome to user");
      navigate("../Home", { replace: true });
      props.setUserId(matchUser[0].id);
    }
  }

  return (
    <React.Fragment>
      <div className={classes.authContainer}>
        <h2 className={classes.authHeader}>Sign In</h2>
        {UserNotFound && <p>Oops! User Not Found</p>}
        <form onSubmit={login}>
          <div className={classes.input_fields}>
            <label htmlFor="">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              value={input.email}
              onChange={onInputChange}
              onBlur={validateInput}
            />
            {error.email && <span className={classes.err}>{error.email}</span>}
          </div>

          <div className={classes.input_fields}>
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Confirm Password"
              value={input.password}
              onChange={onInputChange}
              onBlur={validateInput}
            />
            {error.password && (
              <span className={classes.err}>{error.password}</span>
            )}
          </div>
          <br />
          <button className={classes.authSubmit}>SignIn</button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default SignIn;
