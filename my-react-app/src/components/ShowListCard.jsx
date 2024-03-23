import React from 'react';
import noImage from '../img/download.jpeg';
import {Link} from 'react-router-dom';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material';

function ShowListCard(props) {
  const regex = /(<([^>]+)>)/gi;
  return (
    <Grid item xs={12} sm={7} md={5} lg={4} xl={3} key={props.show.objectId}>
      <Card
        variant='outlined'
        sx={{
          maxWidth: 250,
          height: 'auto',
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: 5,
          border: '1px solid #1e8678',
          boxShadow:
            '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
        }}
      >
        <CardActionArea>
          <Link to={{
          pathname: `/collection/${props.show.objectID}`,
          state: props.page,
        }}>
            <CardMedia
              sx={{
                height: '100%',
                width: '100%'
              }}
              component='img'
              image={
                props.show.primaryImage && props.show.primaryImage
                  ? props.show.primaryImage
                  : noImage
              }
              title='show image'
            />

            <CardContent>
              <Typography
                sx={{
                  borderBottom: '1px solid #1e8678',
                  fontWeight: 'bold'
                }}
                gutterBottom
                variant='h6'
                component='h3'
              >
                {props.show.title}
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
              <>
              <>Artist's Name: </>
                {  props.show.artistDisplayName
                  ? props.show.artistDisplayName
                  : 'N/A'}
               </>
              </Typography>
              <Typography variant='body2' color='textSecondary' component='p'>
              <>
              <>Object Date: </>
                {  props.show.objectDate
                  ? props.show.objectDate
                  : 'N/A'}
               </>
              </Typography>
              
            </CardContent>
          </Link>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default ShowListCard;
