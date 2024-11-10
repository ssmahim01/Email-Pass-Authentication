import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const terms = event.target.terms.checked;

    console.log(name, photo, email, password, terms);
    setSuccess(false);
    setErrorMessage("");

    if (password.length < 6) {
      setErrorMessage("Password should be 6 characters or longer");
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "At least one Uppercase, one Lowercase, One Number, One Special Character required"
      );
      return;
    };

    if(!terms){
      setErrorMessage("Please accept our terms and conditions");
      return;
    };

    
    createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      console.log(result.user);
      setSuccess(true);
      sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log("Verification email sent");
      })
      const profile = {
        displayName: name,
        photoURL: photo
      }

      updateProfile(auth.currentUser, profile)
      .then(() => {
        console.log("User Profile Updated");
      })
      .catch(error => {
        console.error("User profile Update Error", error)
      })
      })
      
      .catch(error => {
        console.error("ERROR", error.message);
        setSuccess(false);
        setErrorMessage(error.message);
      })
    };

  return (
    <div className="space-y-4 pt-4 pb-10">
      <h1 className="text-3xl font-bold text-center">Register now!</h1>
      <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleRegister} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Photo URL"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control relative">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-xs absolute top-12 right-2"
            >
              {showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>}
            </button>
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          <div className="form-control">
            <label className="label justify-start cursor-pointer">
              <input type="checkbox" name="terms" className="checkbox" />
              <span className="label-text font-bold ml-2">Accept Our Terms and Condition</span>
            </label>
          </div>

          <div className="form-control mt-2">
            <button className="btn btn-accent text-white font-bold">
              Register
            </button>
          </div>
        </form>
        {success && (
          <p className="text-lime-500 text-center font-bold mb-5">
            Successfully Registered
          </p>
        )}
        {errorMessage && (
          <p className="text-center mb-5 text-rose-500 font-bold">
            {errorMessage}
          </p>
        )}

        {
          <p className="text-center font-semibold pb-5">Already Have an Account, Please <Link to="/signIn" className="text-lime-400 underline">Sign In</Link></p>
        }
      </div>
    </div>
  );
};

export default Register;
