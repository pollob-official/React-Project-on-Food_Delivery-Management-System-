import React, { useState } from 'react';
import api from '../api/axios';

const LoginLayout = () => {

  const [user, setUser] = useState({
    name: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        username: user.name,
        password: user.password
      });

      if (res.data && res.data.token) {
        // ✅ Save token
        localStorage.setItem("token", res.data.token);

        // 🔥 SIMPLE & FINAL FIX
        window.location.replace("/");
      } else {
        alert("Invalid Credentials");
      }

    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  return (
    <>
      {/* Begin Wrapper */}
      <div className="main-wrapper auth-bg">
        {/* Start Content */}
        <div className="container-fuild">
          <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
            {/* start row */}
            <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
              <div className="col-lg-4 mx-auto">

                <form onSubmit={handleLogin} className="d-flex justify-content-center align-items-center">
                  <div className="d-flex flex-column justify-content-lg-center p-4 p-lg-0 pb-0 flex-fill">

                    <div className="card border-0 p-lg-3 shadow-lg">
                      <div className="card-body">

                        <div className="text-center mb-3">
                          <h5 className="mb-2">Sign In</h5>
                          <p className="mb-0">
                            Please enter below details to access the dashboard
                          </p>
                        </div>

                        {/* Username */}
                        <div className="mb-3">
                          <label className="form-label">Username</label>
                          <div className="input-group">
                            <span className="input-group-text border-end-0">
                              <i className="isax isax-sms-notification" />
                            </span>
                            <input
                              type="text"
                              name="name"
                              className="form-control border-start-0 ps-0"
                              placeholder="username"
                              value={user.name}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                          <label className="form-label">Password</label>
                          <div className="pass-group input-group">
                            <span className="input-group-text border-end-0">
                              <i className="isax isax-lock" />
                            </span>
                            <input
                              type="password"
                              name="password"
                              className="form-control border-start-0 ps-0"
                              placeholder="********"
                              value={user.password}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <div className="form-check form-check-md mb-0">
                            <input className="form-check-input" id="remember_me" type="checkbox" />
                            <label htmlFor="remember_me" className="form-check-label mt-0">
                              Remember Me
                            </label>
                          </div>
                          <div className="text-end">
                            <a href="#">Forgot Password?</a>
                          </div>
                        </div>

                        <div className="mb-1">
                          <button
                            type="submit"
                            className="btn bg-primary-gradient text-white w-100"
                          >
                            Sign In
                          </button>
                        </div>

                        <div className="login-or">
                          <span className="span-or">Or</span>
                        </div>

                        <div className="mb-3">
                          <div className="d-flex align-items-center justify-content-center flex-wrap">
                            <div className="text-center me-2 flex-fill">
                              <button type="button" className="br-10 p-1 btn btn-light w-100">
                                Facebook
                              </button>
                            </div>
                            <div className="text-center me-2 flex-fill">
                              <button type="button" className="br-10 p-1 btn btn-light w-100">
                                Google
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="text-center">
                          <h6 className="fw-normal fs-14 text-dark mb-0">
                            Don’t have an account yet?{" "}
                            <a href="#" className="hover-a">Register</a>
                          </h6>
                        </div>

                      </div>
                    </div>

                  </div>
                </form>

              </div>
            </div>
            {/* end row */}
          </div>
        </div>
        {/* End Content */}
      </div>
      {/* End Wrapper */}
    </>
  );
};

export default LoginLayout;
