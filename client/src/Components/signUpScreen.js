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
import { connect } from 'react-redux';
import login from './loginScreen'
import { Redirect } from 'react-router-dom'

// Add the prop values you want to pull from state below:
const mapStateToProps = (state) => ({
    loginForm: state.loginForm
})

// Add the prop methods you want to dispatch to state here:
const mapDispatchToProps = {
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


class signUpScreen extends React.Component{

    state = {
        redirect: false
    }

    handleChange = (e) => {
        console.log("changed")
    }

    handleSubmit = (e) => {
        e.preventDefault()
        fetch('http://localhost:80/signup', {
            method: 'POST',
            body: new FormData(e.target)
          })
            .then( res => res.json())
            .then(data => {
                console.log(data)
                this.setState({
                    redirect: true
                })
            })
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
                            Sign Up
                        </Typography>
                        <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="component-simple" />
                                <Input type='file' name='image' />
                            </FormControl>
                            <FormControl >
                                <InputLabel htmlFor="component-simple" >first name</InputLabel>
                                <Input type="text"  name="firstName" />
                            </FormControl>
                            <FormControl >
                                <InputLabel htmlFor="component-simple" >last name</InputLabel>
                                <Input type="text"  name="lastName" />
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="component-simple">e-mail</InputLabel>
                                <Input type="text" name="email" />
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="component-simple">password</InputLabel>
                                <Input name="password" type="password" id="password" name="password" />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                // onClick={this.handleSubmit}
                            >
                                Sign Up
                            </Button>
                            {this.state.redirect ? <Redirect to='/login' /> : null}
                        </form>
                        </Paper>
                    </Grid>   

                </Grid> 
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(signUpScreen));