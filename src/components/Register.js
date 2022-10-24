import React from "react";
import { Link } from "react-router-dom";
import { api } from "../utils/Api";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }
    handleSubmit(e) {
        e.preventDefault()
        const { email, password } = this.state;
        api.registerUser(email, password)
            .then((response) => {
                try {
                    if (response.status === 201) {
                        this.props.onRegister(true);
                        this.props.onRegisterStatus(true);
                        return response.json();
                    }
                } catch (e) {
                    
                    return (e)
                }
            })
            .then((res) => {
                return res;
            })
            .catch((err) => console.log(err) );
    }
    render() {
        return (
            <form className="auth-form" name="register-form" method="post" onSubmit={this.handleSubmit}>
                <h2 className="auth-form__title">Регистрация</h2>
                <input type="email" name="email" id="user-email" className="auth-form__input" placeholder="Email"
                    minLength="4" maxLength="80" value={this.state.email} onChange={this.handleChange} required />
                <input type="password" name="password" id="user-password" className="auth-form__input" placeholder="Пароль"
                    minLength="4" maxLength="80" value={this.state.password} onChange={this.handleChange} required />
                <button type="submit" className="auth-form__submit" aria-label="Зарегистрироваться">Зарегистрироваться</button>
                <Link to="/sign-in" className="auth-form__login">Уже зарегистрированы? Войти</Link>
            </form>
        )
    }
}

export default Register;