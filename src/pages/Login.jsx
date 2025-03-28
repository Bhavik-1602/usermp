

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });
const handleSubmit2=()=>{
  navigate("/register")
}
  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(loginUser(values))
      .unwrap()
      .then(() => {
        navigate("/home");
      })
      .catch(() => {})
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-500">
      <div className="w-full max-w-md p-8 bg-gray-300 shadow-lg rounded-lg">
        <h2 className="w-full text-2xl font-bold mb-6 text-center ">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Email Field */}
              <div>
                <Field className="w-full p-2 border rounded-md focus:ring" type="email" name="email" placeholder="Email" />
                <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
              </div>

              {/* Password Field */}
              <div>
                <Field className="w-full p-2 border rounded-md focus:ring" type="password" name="password" placeholder="Password" />
                <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
              </div>

              {/* Submit Button */}
              <button
                className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                type="submit"
                disabled={loading || isSubmitting}
              >
                {loading || isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-4 text-center">
          Don't have an account?<button onClick={()=>{
            handleSubmit2()
          }}>register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;



