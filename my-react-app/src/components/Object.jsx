import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link, useParams} from 'react-router-dom';
import noImage from '../img/download.jpeg';

import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardHeader
} from '@mui/material';
import '../App.css';
import { useLocation } from "react-router-dom";

const Object = (props) => {
  const [showData, setShowData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  // const classes = useStyles();
  let {id} = useParams();
  const location = useLocation();
  const page = location.state;
  console.log(page);

//   const tConvert = (time) => {
//     // Check correct time format and split into components
//     time = time
//       .toString()
//       .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

//     if (time.length > 1) {
//       // If time format correct
//       time = time.slice(1); // Remove full string match value
//       time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
//       time[0] = +time[0] % 12 || 12; // Adjust hours
//     }
//     return time.join(''); // return adjusted time or original string
//   };
  useEffect(() => {
    console.log('SHOW useEffect fired');
    async function fetchData() {
      try {
        const {data: show} = await axios.get(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
          );
        setShowData(show);
        setLoading(false);
        console.log(show);
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [id]);

  let summary = null;
  const regex = /(<([^>]+)>)/gi;
  if (showData && showData.summary) {
    summary = showData && showData.summary.replace(regex, '');
  } else {
    summary = 'No Summary';
  }

  if (loading) {
    return (
      <div>
        <h2>Loading....</h2>
      </div>
    );
  } else {
    return (
      <Card
        variant='outlined'
        sx={{
          maxWidth: 550,
          height: 'auto',
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: 5,
          border: '1px solid #1e8678',
          boxShadow:
            '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);'
        }}
      >
        <CardHeader
          title={showData.title}
          sx={{
            borderBottom: '1px solid #1e8678',
            fontWeight: 'bold'
          }}
        />
        <CardMedia
          component='img'
          image={
            showData.primaryImage
              ? showData.primaryImage
              : noImage
          }
          title='show image'
        />

        <CardContent>
          <Typography
            variant='body2'
            color='textSecondary'
            
            sx={{
              borderBottom: '1px solid #1e8678',
              fontWeight: 'bold'
            }}
          >
            <>
              <>
                <dt className='title'>Artist's name</dt>
                {showData && showData.artistDisplayName ? (
                  <dd>{showData.artistDisplayName}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </>
              <p>
                <dt className='title'>Artist's Bio:</dt>
                {showData && showData.artistDisplayBio ? (
                  <dd> {showData.artistDisplayBio} </dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>
              <p>
                <dt className='title'>Artist's Gender:</dt>
                {showData && showData.artistGender ? (
                  <dd>{showData && showData.artistGender}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>
              <p>
                <dt className='title'>Object Date:</dt>
                {showData && showData.objectDate ? (
                  <dd>{showData.objectDate}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>
              <p>
                <dt className='title'>Department:</dt>
                {showData && showData.department ? (
                  <dd>{showData.department}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>
              <p>
                <dt className='title'>Medium:</dt>
                {showData && showData.medium ? (
                  <dd>{showData.medium}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>
              <p>
                <dt className='title'>Classification:</dt>
                {showData && showData.classification ? (
                  <dd>{showData.classification}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>
              <p>
                <dt className='title'>Culture:</dt>
                {showData && showData.culture ? (
                  <dd>{showData.culture}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>
              <p>
                <dt className='title'>dimensions:</dt>
                {showData && showData.dimensions ? (
                  <dd>{showData.dimensions}</dd>
                ) : (
                  <dd>N/A</dd>
                )}
              </p>
              
            </>
            { page? <Link to={`/collection/page/${page}`}>Back to all objects...</Link>:
            <Link to={`/collection/page/1`}>Back to all objects...</Link>
            }
            
          </Typography>
        </CardContent>
      </Card>
    );
  }
};

export default Object;
