// import React, { useState } from "react";
// import { useDispatch, } from "react-redux";
// import { registerUser } from "../features/authSlice";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { loading, error } = useSelector((state) => state.auth);

//   const handleRegister = (e) => {
//     e.preventDefault();
//     dispatch(registerUser({ name, email, password }))
//       .unwrap()
//       .then(() => {
//         alert("Registration successful!");
//         navigate("/");
//       })
//       .catch(() => {});
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
//         <h2 className="text-3xl font-bold mb-6 text-center">REGISTER</h2>
//         {error && <p className="text-red-500 text-center">{error}</p>}
//         <form onSubmit={handleRegister} className="space-y-4">
//           <input className="w-full p-2 border rounded-md focus:ring" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
//           <input className="w-full p-2 border rounded-md focus:ring" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//           <input className="w-full p-2 border rounded-md focus:ring" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//           <button className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition" type="submit" disabled={loading}>
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;









import React from "react";
import { useDispatch,useSelector } from "react-redux";
import { registerUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  // Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(registerUser(values))
      .unwrap()
      .then(() => {
        alert("Registration successful!");
        navigate("/");
      })
      .catch(() => { })
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-400">
      <div className="w-full max-w-md p-8 bg-gray-300 shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Name Field */}
              <div>
                <Field className="w-full p-2 border rounded-md focus:ring" type="text" name="name" placeholder="Name" />
                <ErrorMessage name="name" component="p" className="text-red-500 text-sm" />
              </div>

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
                {loading || isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
