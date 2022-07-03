import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SignUp.module.css";

const SignUp = () => {
  const [isUserExist, setIsUserExist] = useState(false);
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });

  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

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
            setIsUserExist(false);
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
          } else if (value.length < 8) {
            stateObj["password"] = "*Password must be '8' characters";
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

  let username = input.username;
  let email = input.email;
  let password = input.password;
  let confirmPassword = input.confirmPassword;
  let role = input.role;

  const data = {
    username,
    email,
    password,
    confirmPassword,
    role,
  };

  async function saveUser(e) {
    e.preventDefault();

    const response = await fetch(
      "https://usersdata-56b3b-default-rtdb.firebaseio.com/Users.json"
    );
    const previousData = await response.json();
    let loadedData = [];
    for (const key in previousData) {
      loadedData.push({
        id: key,
        email: previousData[key].email,
        password: previousData[key].password,
        role: previousData[key].role,
      });
    }

    const matchUser = loadedData.filter(
      (user) => user.email === input.email && user.password === input.password
    );
    const userExist = matchUser.length > 0 ? true : false;
    setIsUserExist(userExist);
    console.log("User Exist", userExist);

    if (!userExist) {
      // post user to data

      fetch("https://usersdata-56b3b-default-rtdb.firebaseio.com/Users.json", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      navigate("../SignIn", { replace: true });
    }
  }

  return (
    <React.Fragment>
      <div className={classes.authContainer}>
        <h2 className={classes.authHeader}>Sign Up</h2>
        <form onSubmit={saveUser}>
          <div className={classes.input_fields}>
            <label htmlFor="">User Name</label>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={input.username}
              onChange={onInputChange}
              onBlur={validateInput}
            />
            {error.username && (
              <span className={classes.err}>{error.username}</span>
            )}
          </div>
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
            {isUserExist && (
              <span className={classes.err}>
                <strong>!</strong> Email already exists
              </span>
            )}
          </div>
          <div className={classes.input_fields}>
            <label htmlFor="">Password</label>
            <input
              type="text"
              name="password"
              placeholder="Enter Password"
              value={input.password}
              onChange={onInputChange}
              onBlur={validateInput}
            />
            {error.password && (
              <span className={classes.err}>{error.password}</span>
            )}
          </div>
          <div className={classes.input_fields}>
            <label htmlFor="">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Enter Confirm Password"
              value={input.confirmPassword}
              onChange={onInputChange}
              onBlur={validateInput}
            />
            {error.confirmPassword && (
              <span className={classes.err}>{error.confirmPassword}</span>
            )}
          </div>
          <br />
          <button className={classes.authSubmit}>SignUp</button>
        </form>
      </div>
    </React.Fragment>
  );
};

export default SignUp;
