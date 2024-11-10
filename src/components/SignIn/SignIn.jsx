import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {

    const [success, setSuccess] = useState(false);
    const [signInError, setSignInError] = useState("");
    const emailRef = useRef();

    const handleSignIn = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email, password);
        setSuccess(false);
        setSignInError("");

        signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            console.log(userCredential.user);
            if(!userCredential.user.emailVerified){
                setSignInError("Please Verify Your Email Address");
            }else{
                setSuccess(true);
            }
        })

        .catch(error => {
            console.log(error.message);
            setSignInError(error.message);
        })
    };

    const handleForgetPass = () => {
        console.log("Get Me Email Address", emailRef.current.value);
        const emailField = emailRef.current.value;
        if(!emailField){
            alert("Please provide a valid email address");
        }else{
            sendPasswordResetEmail(auth, emailField)
            .then(() => {
                alert("Password Reset email sent, please check your email");
            })
        }
    };

  return (
    <div>
        <div className="pt-4">
         <h1 className="md:text-3xl text-white font-bold text-center my-3">Sign In Now!</h1>
         </div>
    <div className="hero py-10 max-w-sm w-11/12 mx-auto">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form onSubmit={handleSignIn} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label onClick={handleForgetPass} className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary text-white font-semibold">Sign In</button>
            </div>
          </form>
          {
            success && <p className="text-lime-400 font-bold text-center pb-5">Sign In Successful</p>
          }
          {
            signInError && <p className="text-rose-500 font-semibold text-center pb-5">{signInError}</p>
          }

          <p className="text-center pb-5 font-semibold">New User? Please <Link to="/register" className="text-amber-400 underline">Register First</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
