import React from 'react';
import { useHistory } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import firebase from '../config/firebase.config';

const Signup = () => {
  const history = useHistory();
  return (
    <Formik
      initialValues={{ fullName: '', email: '', password: '' }}
      onSubmit={(value, formikBag) => {
        firebase
          .auth()
          .createUserWithEmailAndPassword(value.email, value.password)
          .then((res) => {
            const user = firebase.auth().currentUser;
            history.replace('/');
            return user.updateProfile({ displayName: value.fullName });
          })
          .catch((e) => {
            formikBag.setFieldError('email', e.message);
          });
      }}
      validationSchema={Yup.object({
        fullName: Yup.string()
          .required('Name is Required')
          .min(5, 'Must be 5 characters or less'),
        email: Yup.string().required('Email is Required').email(),
        password: Yup.string().required('Password is Required').min(5),
      })}
    >
      <div className='flex h-screen bg-gray-200'>
        <div className='m-auto w-1/3 text-white flex flex-wrap justify-center shadow-lg round-lg bg-gradient-to-br from-blue-900 to-blue-700'>
          <Form className='m-5 w-10/12'>
            <h1 className='w-full text-4xl tracking-widest text-center my-6'>
              Signup Here
            </h1>
            <div className='w-full my-6'>
              <Field
                type='text'
                name='fullName'
                placeholder='Enter Your Full Name'
                className='p-2 rounded shadow w-full text-black'
              />
              <ErrorMessage name='fullName' />
            </div>
            <div className='w-full my-6'>
              <Field
                type='email'
                name='email'
                placeholder='Enter Your Email'
                className='p-2 rounded shadow w-full text-black'
              />
              <ErrorMessage name='email' />
            </div>
            <div className='w-full my-6'>
              <Field
                type='password'
                name='password'
                placeholder='Enter Password'
                className='p-2 rounded shadow w-full text-black'
              />
              <ErrorMessage name='password' />
            </div>
            <div className='w-full my-10'>
              <button
                type='submit'
                className='p-2 rounded shadow w-full bg-gradient-to-tr from-green-600 to-green-400 text-white '
              >
                {
                  //                   isLoading ? (
                  //     <i className='fas fa-circle-notch fa-spin text-yellow-400'></i>
                  //   ) : (
                  'Signup'
                  //                   )
                }
              </button>
              {
                //   error && <p>{error}</p>
              }
            </div>
          </Form>
        </div>
      </div>
    </Formik>
  );
};

export default Signup;
