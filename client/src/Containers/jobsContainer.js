import React from 'react'
import JobCard from '../Components/jobCard'
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { Waypoint } from 'react-waypoint'
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import Fuse from 'fuse.js'

let i = 1

const mapStateToProps = (state) => ({
    user: state.currentUser
  })

const mapDispatchToProps = {

}

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
        jobs: [],
        options: {
            // tokenize: true,
            keys: ['description', 'title'],
            threshold: 0.7,
        }
    }

    fuse = new Fuse(this.state.jobs, this.state.options)

    scoringFunc = () => {
        const firstScore = this.state.jobs.map(job => {
            if(job.type === this.props.user.positionType){
                job.score = 1
            } else {
                job.score = 0
            }
            return job
        })
        const secondScore = firstScore.map(job => {
                this.props.user.technicalSkills.forEach(skill => {
                let skillSearch = this.fuse.search(skill)
                //console.log(this.fuse.search('Javascript'))
                if(skillSearch.includes(job)){
                    job.score = 1 + job.score
                }
            })
            return job 
        })
        //console.log(secondScore)
        return secondScore
    }

    componentDidMount = () => {
        this.fetchMoreJobs()
    }

    handleCardClick = (e) => {
        console.log(this)
        e.target.style.maxHeight = 'auto'
    }

    filterBasedOnLanguage = () => {
        return this.state.jobs.filter(job => job.type === this.props.user.positionType)
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
        console.log(this.scoringFunc().sort((a, b) => (a.score > b.score) ? -1 : 1))
    return this.scoringFunc().sort((a, b) => (a.score > b.score) ? -1 : 1).map(job => {
        return(
            <Grid xs={12} item>
                <JobCard company={job.company} companyLogo={job.company_logo} posted={job.created_at} location={job.location} position={job.title} description={job.description} apply={job.how_to_apply} type={job.type} score={job.score} />
            </Grid>
        )
    })
    }

    render(){
        this.fuse = new Fuse(this.state.jobs, this.state.options)
        //console.log(fuse.search("Javascript"))
        console.log(this.filterBasedOnLanguage())

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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(jobsContainer))