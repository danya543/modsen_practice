import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast, Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { PasswordInput } from "@/components/PasswordInput";
import { createUser } from "@/firebase"; // Adjust the import as needed
import { setUser } from "@/store/reducers/userSlice"; // Adjust the import as needed

import styles from './styles.module.css';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

const SignUpSchema = Yup.object().shape({
    email: Yup.string()
        .matches(emailRegex, 'Invalid email address')
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must be less than 20 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/\d/, 'Password must contain at least one digit')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
        .required('Password is required'),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], "Passwords don't match")
        .required('Repeat password is required')
});

export const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //@ts-ignore
    const handleSubmitRegister = async (values, { setSubmitting }) => {
        try {
            const userCredential = await createUser(values.email, values.password);
            const user = userCredential.user;
            //@ts-ignore
            dispatch(setUser({ email: user.email ? user.email : '', token: user.accessToken, id: user.uid }));
            navigate("/");
        } catch (error) {
            //@ts-ignore
            toast.error(`Error: ${error.message}`);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <Formik
                initialValues={{ email: '', password: '', repeatPassword: '' }}
                validationSchema={SignUpSchema}
                onSubmit={handleSubmitRegister}
            >
                {({ isSubmitting, isValid, values, setFieldValue }) => (
                    <Form className={styles.form}>
                        <h2>Register</h2>
                        <div>
                            <Field
                                type="text"
                                name="email"
                                placeholder="Email"
                                className={styles.input}
                            />
                            <ErrorMessage name="email" component="div" className={styles.errorMsg} />
                        </div>
                        <div >
                            <PasswordInput name="password" placeholder="Password" password={values.password}
                                setPassword={(value) => setFieldValue('password', value)} />
                            <ErrorMessage name="password" component="div" className={styles.errorMsg} />
                        </div>
                        <div>
                            <PasswordInput name="repeatPassword" placeholder="Repeat Password"
                                password={values.repeatPassword}
                                setPassword={(value) => setFieldValue('repeatPassword', value)} />
                            <ErrorMessage name="repeatPassword" component="div" className={styles.errorMsg} />
                        </div>
                        <button type="submit" disabled={isSubmitting || !isValid}>
                            Sign Up
                        </button>
                        <Link to={'/signin'}>Sign In</Link>
                    </Form>
                )}
            </Formik>
        </>
    );
};
