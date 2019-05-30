import React from 'react';
import clsx from 'clsx';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CreateIcon from '@material-ui/icons/CreateSharp';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Moment from 'react-moment';

const mapStateToProps = (state) => ({
  user: state.currentUser
})

// Add the prop methods you want to dispatch to state here:
const mapDispatchToProps = {

}

const styles = theme => ({
  card: {
    display: 'flex',
    width: `100%`,
    // maxHeight: `135px`,
    // overflow: `auto`,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    padding: `0px 0px 0px 5px`,
  },
  media: {
    position: 'sticky',
    height: `100px`,
    width: `100px`,
    maxWidth: `100px`,
    minWidth: `100px`
  },
  expand: {
    transform: 'rotate(0deg)',
    // marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

function JobCard(props) {

  const { classes } = props;

    const [expanded, setExpanded] = React.useState(false);
    const [apply, setApply] = React.useState(false);

  const handleExpandClick = () => {
    if(apply){
      handleApplyClick()
    }
    setExpanded(!expanded);
  }

  const handleApplyClick = () => {
    if(expanded){
      handleExpandClick()
    }
    setApply(!apply);
  }

  return (
    <Card className={classes.card} >
      <CardMedia
          className={classes.media}
          image={props.companyLogo ? props.companyLogo : `http://www.gtgraphics.org/generics/99gen_circlein.jpg`}
          title={props.companyName}
      />
      <div className={classes.details}>
        <CardContent className={classes.details}>
          <Typography variant="h6">
          {props.position ? props.position : `N/A`}
          </Typography>
          <Typography variant="subtitle2" component="p">
          {props.company ? props.company : `N/A`} | Location: {props.location ? props.location : `N/A`}
          </Typography>
          <Typography variant="subtitle2" component="p">
          {props.type ? props.type : `N/A`} | Posted: <Moment fromNow>{props.posted}</Moment>
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        <IconButton aria-label="Apply" onClick={handleApplyClick}>
          <CreateIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.description ?  ReactHtmlParser(props.description) : `No description`}
        </Typography>
        </CardContent>
      </Collapse>
      <Collapse in={apply} timeout="auto" unmountOnExit>
        <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.apply ?  ReactHtmlParser(props.apply) : `No application information found`}
        </Typography>
        </CardContent>
      </Collapse>
      </div>
    </Card>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(JobCard))