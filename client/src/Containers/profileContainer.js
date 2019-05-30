import React from 'react'
import ProfileCard from '../Components/profileCard'
import JobContainer from './jobsContainer'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


export default class profileContainer extends React.Component{

    render(){
        return(
            <Grid container>
                <Grid item xs={2}>
                    <ProfileCard />
                </Grid>
                <Grid item xs={10}>
                    <JobContainer />
                </Grid>
            </Grid>
        )
    }

}