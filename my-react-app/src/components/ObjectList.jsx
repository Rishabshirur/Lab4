import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchShows from './SearchShows';
import ShowListCard from './ShowListCard';
import usePagination from '@mui/material/usePagination';
import {Card, Grid} from '@mui/material';

const ObjectList = (props) => {
    const [loading, setLoading] = useState(true);
    const [searchData, setSearchData] = useState(undefined);
    const [showsData, setShowsData] = useState(undefined);
    
    const { page } = useParams();
    const {q} = useParams();
    const [searchTerm, setSearchTerm] = useState(q);
    const {departmentId}=useParams();
    const [depId, setDepId] = useState(departmentId);

    console.log(page);
    var numP;
    let cardsData = null;
    const navigate = useNavigate();
    const [pageData, setPageData] = useState(page);
    const [numOfPages, setNumOfPages] = useState(undefined);

    // let {page} = useParams();
    // console.log(pageData)

    
    
    useEffect(() => {
      console.log('on load useEffect');
      // let object_data=[];
      
      async function fetchData() {
        let data;
        try {

          
          if(depId){
            data = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=`+ depId)
          }else{
            data = await axios.get('https://collectionapi.metmuseum.org/public/collection/v1/objects')
          }

          
          // console.log(data)
          
          const temp=data.data.objectIDs.slice((pageData-1)*50,pageData*50)
          if(temp.length==0){
            return <div>Not Found</div>
          }
          const total=data.total
          const quot=Math.ceil(total / 50);
          setNumOfPages(quot);
          numP=numOfPages
          const object_data = await Promise.all(
          temp.map(async (id) => {
            const {data} = await axios.get('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + id);
            return data;
            })
        );
          console.log(object_data)
          // console.log(object_data[0])
          // let ob=Array(object_data[0])
          // console.log(ob)
          setShowsData(object_data);
          // console.log(showsData)
          // setPageData(page)
          setLoading(false);
          console.log(pageData);
        } catch (e) {
          console.log(e);
        }
        
      }
      fetchData();
    }, [pageData]);

    const { items, onPageChange } = usePagination({
      count: numOfPages,
      page:pageData,
      onChange: (event, newPage) => {
        setPageData(newPage);
        navigate(`/collection/page/${newPage}`);
      },
    });
    // console.log(page)
  
    useEffect(() => {

      console.log('search useEffect fired');

      async function fetchData() {
         try {
          
        const {data} = await axios.get('https://collectionapi.metmuseum.org/public/collection/v1/search?q=' + searchTerm)
        // console.log(data)
        if((!data)|| data.length==0|| !data.objectIDs){
          return <div>Not Found</div>
        }
        let temp1=data.objectIDs.slice(0,20)
        // console.log(temp1)
        
        const quot1=Math.ceil(data.total / 20);
          setNumOfPages(quot1);
          numP=numOfPages
        const object_data1 = await Promise.all(
          temp1.map(async (id) => {
            const {data} = await axios.get('https://collectionapi.metmuseum.org/public/collection/v1/objects/' + id);
            return data;
            })
        );
        // console.log(object_data1)    
        // const resolvedObjectData = await Promise.all(objectDataPromises);    
        // console.log(resolvedObjectData) 

    // //   console.log(data)
      setSearchData(object_data1);
      setLoading(false);
    } catch (e) {
      return (<div>{e}</div>)
    }
    
      }
      if (searchTerm && searchTerm.trim().length!==0) {
        console.log('searchTerm is set');
        fetchData();
      }
    }, [searchTerm]);
  
    const searchValue = async (value) => {
      setSearchTerm(value);
    };

    // console.log(searchTerm)
    if (searchTerm) {
        cardsData = searchData && searchData.map(async (obj) => {
            return <ShowListCard show={obj} key={obj.objectID} />;
          });
    } else {
        // console.log(showsData.objectIDs)
        
        cardsData = showsData && showsData.map(async(obj) => { 
            return <ShowListCard show={obj} key={obj.objectID} page={pageData} />;
        });
        // console.log(showsData)
        // console.log(cardsData);

    }
    if(isNaN(pageData)|| pageData<1||pageData>9708){
      return (
        <div>
          Error 400: Page Parameter invalid
        </div>
      )
    }
    if (loading) {
      return (
        <div>
          <h2>Loading....</h2>
        </div>
      );
    } else {
      return (
        <>
          <SearchShows searchValue={searchValue} />
          <br />
          <br />
          <Grid
            container
            spacing={2}
            sx={{
              flexGrow: 1,
              flexDirection: 'row'
            }}
          >
          {(searchTerm && searchTerm.trim().length!==0 && searchData) ? (
            searchData.map((obj) => (
              <ShowListCard show={obj} key={obj.objectID} page={pageData} />
            ))
          ) : Array.isArray(showsData) ? (
            showsData.map((obj) => (
              <ShowListCard show={obj} key={obj.objectID} page={pageData} />
            ))
          ) : (
            <div>No data available</div>
          )}
          </Grid>
          <nav style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {items.map(({ page, type, selected, ...item }, index) => {
            let children = null;

            if (type === 'start-ellipsis' || type === 'end-ellipsis') {
              children = '…';
            } else if (type === 'page') {
              children = (
                <button
                  type="button"
                  style={{
                    fontWeight: selected ? 'bold' : undefined,
                  }}
                  {...item}
                >
                  {page}
                </button>
              );
            } else {
              children = (
                <button type="button" {...item}>
                  {type}
                </button>
              );
            }

            return (
              <li
                key={index}
                style={{ listStyle: 'none', margin: '0 4px' }}
              >
                {children}
              </li>
            );
          })}
          </nav>

        </>
      );
    }
  };
  
  export default ObjectList;
  