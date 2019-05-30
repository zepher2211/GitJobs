import React from 'react'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux'
import { Link as RouterLink, Redirect } from 'react-router-dom'
import Link from '@material-ui/core/Link';

// Add the prop values you want to pull from state below:
const mapStateToProps = (state) => ({
    loginForm: state.loginForm
})

// Add the prop methods you want to dispatch to state here:
const mapDispatchToProps = {
    setUser: (user) => {
        return dispatch => {
            dispatch({ type: 'SET_USER', user: user })
        }
    },
    onEmailChange: (e) => {
        return dispatch => {
            dispatch({ type: 'EDIT_EMAIL', email: e.target.value })
        }
    },
    onPasswordChange: (e) => {
        return dispatch => {
            dispatch({ type: 'EDIT_PASSWORD', password: e.target.value })
        }
    },
}

const styles = theme =>   ({
    paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
})


class loginScreen extends React.Component{

    state = {

    }

    handleChange = (e) => {
        console.log("changed")
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            error: null
        })
        fetch("http://localhost:80/login", {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.props.loginForm.email,
                password: this.props.loginForm.password,
            })
        })
            .then(async res => {
                let parsedRes = await res.json()
                if(res.ok){
                console.log(parsedRes)
                localStorage.clear()
                localStorage.setItem('auth_token', parsedRes.token)
                this.props.setUser(parsedRes.user)
                this.props.history.push('/profile')
                } else {
                    this.setState({
                        error: parsedRes.error
                    })
                }
            })
        // .then(auth => {
        //     console.log(auth)
        //     localStorage.clear()
        //     localStorage.setItem('auth_token', auth.token)
        //     this.props.setUser(auth.user)
        //     this.props.history.push('/profile')
        // })
        // .catch(error => this.setState({
        //     error: error
        // })
    //     )
     }

    render(){
        const { classes } = this.props;
        return(
            <div>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="center"
                    style={{ minHeight: '100vh' }}
                    >

                    <Grid item xs={3}>
                        <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Log in
                        </Typography>
                        <form onSubmit={this.handleSubmit}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="component-simple">e-mail</InputLabel>
                                <Input id="component-simple" onChange={this.props.onEmailChange} />
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="component-simple">password</InputLabel>
                                <Input name="password" type="password" id="password" onChange={this.props.onPasswordChange} />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                // onClick={this.handleSubmit}
                            >
                                Sign in
                            </Button>
                            <Typography variant="subtitle2">
                                Not a User Yet? <Link component={RouterLink} to="/signup">Sign Up!</Link>
                            </Typography>
                            {this.state.error ? <Typography variant="subtitle2" color="error">
                                {this.state.error}
                            </Typography> : null}
                        </form>
                        </Paper>
                    </Grid>   
                </Grid> 
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(loginScreen));