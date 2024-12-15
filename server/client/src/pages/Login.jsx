import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";



export const Login = ()=>{
  
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  
  const {storetokenInLS, API} = useAuth()
  const URL = `${API}/api/auth/login`

    
      const handleInput = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;
    
        setUser({
          ...user,
          [name]: value,
        });
      };
    
      // handle form on submit
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          })

          const res_data = await response.json();

            if(response.ok){
              toast.success("Login Successfully and Please Refresh the Page")
              storetokenInLS(res_data.token)
              setUser({email: "", password: ""})
              navigate("/")
            }else{
              toast.error(res_data.extraDetails ? res_data.extraDetails : "Inavalid Email and Password")
            }
            console.log(response);
        } catch (error) {
          console.log("login", error)
        }
      };


    return  <>
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="registration-image reg-img">
              <img
                src="/images/login.png"
                alt="let's fill the login form"
                width="500"
                height="500"
              />
            </div>
            {/* our main registration code  */}
            <div className="registration-form">
              <h1 className="main-heading mb-3">login form</h1>
              <br />
              <form onSubmit={handleSubmit}>
               
                <div>
                  <label htmlFor="email">email</label>
                  <input
                    type="text"
                    name="email"
                    placeholder="email"
                    id="email"
                    required
                    autoComplete="off"
                    value={user.email}
                    onChange={handleInput}
                  />
                </div>
              
                <div>
                  <label htmlFor="password">password</label>
                  <input
                    type="password"
                    name="password"
                    placeholder="password"
                    id="password"
                    required
                    autoComplete="off"
                    value={user.password}
                    onChange={handleInput}
                  />
                </div>
                <br />
                <button type="submit" className="btn btn-submit">
                  Register Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  </>
}