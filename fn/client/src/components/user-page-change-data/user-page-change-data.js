import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { InputGroup, FormControl } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import './user-page-change-data.css';
import { setUser, setSnackbarDuration, setSnackbarStatus, setSnackbarText, setSnackbarSeverity } from '../../actions'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import withStoreService from '../hoc'
import Snackbar from '../snackbar'


const firstnameRegex = /\w+/;
const firstnameValidationText = 'enter firstname';

const lastnameRegex = /\w+/;
const lastnameValidationText = 'enter lastname';

const emailRegEx = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const emailValidationText = "Email must be correct. Example: nick@mail.com";

const SignupSchema = yup.object().shape({
    firstName: yup.string().matches(firstnameRegex, firstnameValidationText),
    lastName: yup.string().matches(lastnameRegex, lastnameValidationText),
    email: yup.string()
        .email()
        .required("Required")
        .matches(emailRegEx, emailValidationText),

    password: yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
});

const UserChangeData = ({ user,
    storeService,
    setUser,
    setSnackbarText,
    setSnackbarDuration,
    setSnackbarStatus,
    setSnackbarSeverity
}) => {
    const local = JSON.parse(localStorage.getItem('user'))
    const { firstName, lastName, email } = user;


    const addUserDataToSTore = useCallback((id, token) => {
        storeService.getUserById(id, token).then((res) => {
            const { user } = res.data
            setUser(user)
        })
    }, [storeService, setUser])

    useEffect(() => {
        addUserDataToSTore(local.userId, local.accessToken)
    }, [addUserDataToSTore])
    
    useEffect(() => {
        addUserDataToSTore(local.userId, local.accessToken)
    }, [])

    const { register, handleSubmit, errors } = useForm({
        validationSchema: SignupSchema
    })

    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const submitHandler = (e) => {
        storeService.sendUserChangedData(local.userId, local.accessToken, { userToChange: user }).then((res) => {
            addUserDataToSTore(local.userId, local.accessToken)
            snackbarHandler(2000, true, res.data.msg,'success')
        })
    }
    const snackbarHandler = (duration, status, text, severity) => {
        setSnackbarDuration(duration)
        setSnackbarStatus(status)
        setSnackbarText(text)
        setSnackbarSeverity(severity)
    }

    if (user) {
        return (
            <div>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <label htmlFor="firstname">change your firstname</label>
                    <InputGroup className="mb-3">
                        <FormControl id="firstname" name="firstName" ref={register} value={firstName}
                            placeholder="enter firstname..." onChange={changeHandler} />
                    </InputGroup>
                    {errors.firstName && <p className="errorMessage">{errors.firstName.message}</p>}
                    <label htmlFor="lastname">change your lastname</label>
                    <InputGroup>
                        <FormControl id="lastname" name="lastName" ref={register} value={lastName}
                            placeholder="enter lastname..." onChange={changeHandler} />
                    </InputGroup>
                    {errors.lastName && <p className="errorMessage">{errors.lastName.message}</p>}
                    <label htmlFor="email">change your email</label>
                    <InputGroup>
                        <FormControl type="text" name="email" id="email" ref={register} value={email}
                            placeholder="enter email..." onChange={changeHandler} />
                    </InputGroup>
                    {errors.email && <p className="errorMessage">{errors.email.message}</p>}
                    <label htmlFor="password">change your password</label>
                    <InputGroup>
                        <FormControl type="password" name="password" id="password" ref={register}
                            placeholder="enter password..." onChange={changeHandler} />
                        {errors.password && <p className="errorMessage">{errors.password.message}</p>}
                    </InputGroup>
                    <input className="btn btn-dark user-page-button" type="submit" value="send changed data" />
                </form>
                <Snackbar />
            </div>
        )
    }
    return <Redirect to="/login" />

}
const mapStateToProps = ({ authReducer: { user } }) => ({
    user
})
const mapDispatchToProps = ({
    setUser,
    setSnackbarDuration,
    setSnackbarStatus,
    setSnackbarText,
    setSnackbarSeverity,
})
export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(UserChangeData));
