import React from 'react'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import FormLabel from '@material-ui/core/FormLabel';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { FormGroup, Switch } from '@material-ui/core';
import TextField from '@material-ui/core/TextField'

// Add the prop values you want to pull from state below:
const mapStateToProps = (state) => ({
    user: state.currentUser
})

// Add the prop methods you want to dispatch to state here:
const mapDispatchToProps = {
    setUser: (user) => {
        return dispatch => {
            dispatch({ type: 'SET_USER', user: user })
        }
    },
}

const languages = ["Python", "Java", "Javascript", "C#", "PHP", "C", "C++", "R", "Objective-C", "Swift", "Matlab", "Typescript", "Ruby", "VBA", "Go", "Kotlin", "Scala", "Visual Basic", "Rust", "Perl", "Lua", "Haskell", "Julia", "Delphi"]

const styles = theme =>   ({
    paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  root: {
    display: 'flex',
  },
  formControl: {
    margin: `10px`,
  },
})


class quizCard extends React.Component{

    state = {
            "isEmployed": false,
            "value": "Full Time",
            "salary": "",
            "yearsOfExperience": "",
    }

    componentDidMount() {
    }

    renderCheckbox = () => {
        return languages.map(language => {
            return  <FormControlLabel
                        control={<Checkbox checked={this.state.language} onChange={() => this.handleCheckboxChange(language)} id="Programming Language" value={language} name="Technical Skill" />}
                        label={language}
                    />
        })
    }

    handleChange = (e) => {
        
    }

    handleSubmit = (e) => {
        e.preventDefault()
        console.log(e.target)
        const formData = new FormData(e.target)
        const formObj = {}

        for(let value of formData.entries()){
            //console.log(value)
            if(formObj[value[0]]){
                if(Array.isArray(formObj[value[0]])){
                    formObj[value[0]] = [...formObj[value[0]], value[1]]
                } else {
                    formObj[value[0]] = [ formObj[value[0]], value[1] ]
                    console.log('we are here', formObj[value[0]])
                } 
            } else {
                formObj[value[0]] = value[1]
            }
        }

        if(!formObj.isEmployed){
            formObj["isEmployed"] = false
        }
        console.log(formObj)
        fetch(`http://localhost:80/user/${this.props.user.id}`, {
            method: 'PATCH',
            body: JSON.stringify(formObj),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("auth_token")}`,
            },
          })
            .then( res => res.json())
            .then(data => {
                this.props.setUser(data)
                this.props.history.push('/profile')
            })
    }

    handleCheckboxChange = name => e => {
        this.setState({
            ...this.state,
            [name]: e.target.checked
        })
    }

    handlePositionChange = (e) => {
        this.setState({
            ...this.state,
            value: e.target.value
        })
    }

    handleSalaryChange = (e) => {
        this.setState({
            ...this.state,
            salary: e.target.value
        })
    }

    handleExperienceChange = (e) => {
        this.setState({
            ...this.state,
            yearsOfExperience: e.target.value
        })
    }

    handleEmploymentChange = (e) => {
        this.setState({
            ...this.state,
            isEmployed: !this.state.isEmployed
        })
    }



    render(){
        const { classes } = this.props;
        console.error("wat")

        return(
            <div style={{overflow: "auto"}}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justify="flex-top"
                    style={{ minHeight: '100vh', overflow: 'auto' }}
                >

                    <Grid item xs={6} style={{overflow: 'auto'}}>
                        <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5" paragraph>
                            Profile Information
                        </Typography>
                        <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
                        <FormLabel component="legend">How would you describe yourself?</FormLabel>
                            <FormControl margin="normal" fullWidth>
                                <InputLabel htmlFor="component-simple"/>
                                <Input type="text" name="description"  />
                            </FormControl>
                            <FormLabel component="legend">What Languages Do You Know?</FormLabel>
                            <FormGroup row>
                                {this.renderCheckbox()}
                            </FormGroup>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Desired Position Type</FormLabel>
                                <RadioGroup
                                aria-label="Position Type"
                                name="position type"
                                value={this.state.value}
                                onChange={this.handlePositionChange}
                                >
                                <FormControlLabel value="Full Time" control={<Radio />} label="Full Time" />
                                <FormControlLabel value="Part Time" control={<Radio />} label="Part Time" />
                                </RadioGroup>
                            </FormControl>
                            <FormLabel component="legend">Minimum Salary Requirement</FormLabel>
                            <FormControl margin="normal" fullWidth>
                                <TextField
                                    id="standard-number"
                                    name="salary"
                                    value={this.state.salary}
                                    onChange={this.handleSalaryChange}
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
                                />
                            </FormControl>
                            <FormLabel component="legend">How many years of experience in the tech industry do you have?</FormLabel>
                            <FormControl margin="normal" fullWidth>
                                <TextField
                                    id="standard-number"
                                    name="yearsOfExperience"
                                    value={this.state.yearsOfExperience}
                                    onChange={this.handleExperienceChange}
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    margin="normal"
                                />
                            </FormControl>
                            <FormLabel component="legend">Are You Currently Employed?</FormLabel>
                            <FormControl>
                                <Switch 
                                    name="isEmployed"
                                    checked={this.state.isEmployed}
                                    onChange={this.handleEmploymentChange}
                                    value={this.state.isEmployed}
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Submit
                            </Button>
                        </form>
                        </Paper>
                    </Grid>   

                </Grid> 
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(quizCard));