import React from 'react'
import JobCard from '../Components/jobCard'
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { Waypoint } from 'react-waypoint'
import Typography from '@material-ui/core/Typography';

let i = 1

const styles = theme => ({
    root: {
        height: `100vh`,
        overflow: 'auto',
        flexDirection: 'row',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
  });


class jobsContainer extends React.Component{

    state = {
        loading: true,
        jobs: []
    }

    componentDidMount = () => {
        this.fetchMoreJobs()
    }

    handleCardClick = (e) => {
        console.log(this)
        e.target.style.maxHeight = 'auto'
    }

    fetchMoreJobs  =  () => {
        fetch(`http://localhost:80/getjobs?page=${i}`)
	        .then(res => res.json())
	        .then(jobArray => {
                this.setState({
                    loading: false,
                    jobs: [...this.state.jobs, ...jobArray]
                })
            })
    }

    renderJobs = () => {
    return this.state.jobs.map(job => {
        return(
            <Grid xs={12} item>
                <JobCard company={job.company} companyLogo={job.company_logo} posted={job.created_at} location={job.location} position={job.title} description={job.description} apply={job.how_to_apply} type={job.type} />
            </Grid>
        )
    })
    }

    render(){

        const { classes } = this.props;

        return(
            <Grid container spacing={16} className={classes.root} justify='center' alignItems='center' >
                {this.state.loading ? <Typography>
                    Retrieving job openings, thank you for your patience...
                </Typography> : null}
                {this.renderJobs()}
            </Grid>
        )
    }

}

export default withStyles(styles)(jobsContainer)