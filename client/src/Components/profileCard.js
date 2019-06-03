import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Fuse from 'fuse.js'

const mapStateToProps = (state) => ({
  user: state.currentUser
})

// Add the prop methods you want to dispatch to state here:
const mapDispatchToProps = {

}

const styles = theme => ({
  card: {
    maxWidth: 300,
    height: `100vh`
  },
  media: {
    height: 300,
  },
});

class ProfileCard extends React.Component{

  renderTechnicalSkills = () => {
    return this.props.user.technicalSkills.map(skill => {
      return(
    <Paper style={{display:"inline-block", backgroundColor:"#4154B2", marginRight:"5px", marginBottom:"5px"}} color="secondary">
      <Typography variant="subtitle2" component="p">
        {skill}
      </Typography>
    </Paper>
      )
    })
  }

render() {
  const { classes } = this.props;

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={this.props.user.profileImage}
          title="Josie Yao"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {this.props.user.firstName + " " + this.props.user.lastName}
          </Typography>
          <Typography variant="subtitle1" component="p">
            Technical Skills:
          </Typography>
          <Typography variant="subtitle2" component="p" gutterBottom>
          {this.renderTechnicalSkills()}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {this.props.user.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      </CardActions>
    </Card>
  );
}
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProfileCard))