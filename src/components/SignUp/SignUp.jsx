import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.init";

const SignUp = () => {

    const handleSignUp = (event) => {
        event.preventDefault();
       const email = event.target.email.value;
       const password = event.target.password.value;

       console.log(email, password);

       createUserWithEmailAndPassword(auth, email, password)
       .then(result => {
        console.log(result.user);
       })
       .catch(error => {
        console.error("ERROR", error.message);
       })
    };

  return (
    <div className="w-11/12 max-w-sm mx-auto">
      <h2 className="text-4xl font-bold my-6 text-center">Sign Up</h2>
      <form onSubmit={handleSignUp} action="" className="space-y-3">
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="email" name="email" className="grow" placeholder="Email" />
        </label>

        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
            />
          </svg>
          <input type="password" name="password" className="grow" placeholder="Password" />
        </label>
        <div className="mt-6">
          <button className="w-full btn btn-accent text-white font-bold">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
