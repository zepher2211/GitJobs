import React from 'react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid'


export default class mainContainer extends React.Component{

    render(){
        const styles = {
            media: {
                maxHeight: 50,
                height: 50,
                paddingTop: '56.25%' // 16:9
            },
            card: {
                position: 'relative',
                height: `50vh`
            },
            overlay: {
                position: 'absolute',
                top: '20px',
                left: '20px',
                color: 'black',
                backgroundColor: 'white'
            }
        }
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
                {/* <Grid item xs={12}> */}
                <Card style={styles.card}>
                    <CardMedia style={styles.media} image="https://images.pexels.com/photos/669996/pexels-photo-669996.jpeg?cs=srgb&dl=contemporary-dark-data-669996.jpg&fm=jpg" />
                    <div style={styles.overlay}>
                        this text should overlay the image
                    </div>
                </Card>
                {/* </Grid> */}
            </Grid>
            </div>
        )
    }

}