import React from 'react';  
import { connect } from 'react-redux'
import { Redirect, Route } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const mapStateToProps = (state) => ({
    isAuth: state.isAuth,
    user: state.currentUser
})

// Add the prop methods you want to dispatch to state here:
const mapDispatchToProps = {
    userAuth: (res) => {
        return dispatch => {
            dispatch({ type: 'IS_AUTH', res: res })
        }
    },
    setUser: (user) => {
        return dispatch => {
            dispatch({ type: 'SET_USER', user: user })
        }
    },
}

class PrivateRoute extends React.PureComponent {

    state = {
        redirect: false
    }

    componentDidMount = () => {
        fetch("http://localhost:80/user/authorize", {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("auth_token")}`
            },
        })
            .then(async res => {
                if(!res.ok) {
                    this.props.userAuth(false);
                    this.setState({
                        redirect: true
                    })
                }
                return res.json()
              })
            .then(data => {
                this.props.setUser(data.user)
                this.props.userAuth(true);
            })
    }

    render() {
       const {component: Component, ...rest} = this.props;

       const renderRoute = props => {
           if (this.props.isAuth) {
              return (
                  <Component {...props} />
              );
           }

           if (this.state.redirect) {
           return (
               <Redirect to='/login' />
           );
           }

           return (
            <Typography component="h1" variant="h5">
            
            </Typography>
            );
       }

       return (
           <Route {...rest} render={renderRoute}/>
       );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);  