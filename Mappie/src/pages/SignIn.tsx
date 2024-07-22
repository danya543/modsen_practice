import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { PasswordInput } from "@/components/PasswordInput";
import { signInUser } from '@/firebase'; // Adjust the import as needed
import { setUser } from "@/store/reducers/userSlice"; // Adjust the import as needed

import styles from './styles.module.css'; // Adjust the import as needed

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .matches(emailRegex, 'Invalid email address')
        .email('Invalid email').required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password must be less then 20 characters')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/\d/, 'Password must contain at least one digit')
        .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
        .required('Password is required'),
});

export const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    //@ts-ignore
    const handleSubmitLogin = (values, { setSubmitting }) => {
        signInUser(values.email, values.password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('favourite-places', JSON.stringify([]));
                //@ts-ignore
                dispatch(setUser({ email: user.email || '', token: user.accessToken, id: user.uid }));
                navigate("/");
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(`Error login: ${errorMessage}`);
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={SignInSchema}
            onSubmit={handleSubmitLogin}
        >
            {({ isSubmitting, isValid, values, setFieldValue }) => (
                <Form className={styles.form}>
                    <h2>Login</h2>
                    <div>
                        <Field
                            type="text"
                            name="email"
                            placeholder="Email"
                            as="input"
                        />
                        <ErrorMessage name="email" component="div" className={styles.errorMsg} />
                    </div>
                    <div>
                        <PasswordInput
                            name={'password'}
                            password={values.password}
                            setPassword={(value) => setFieldValue('password', value)}
                        />
                        <ErrorMessage name="password" component="div" className={styles.errorMsg} />
                    </div>
                    <button type="submit" disabled={isSubmitting || !isValid}>
                        Sign In
                    </button>
                    <Link to={'/signup'}>Sign Up</Link>
                </Form>
            )}
        </Formik>
    );
};
