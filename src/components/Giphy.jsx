import React, { useEffect, useState } from "react";
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";
import axios from "axios";
import Loader from "./Loader";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  borderRadius: 0,
  height: '260px',
  width: '100%',
  textAlign: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  color: theme.palette.text.secondary,
}));

const useStateWithLocalStorage = localStorageKey => {
  const [isLocked, setIsLocked] = useState(
    localStorage.getItem(localStorageKey) || false
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, isLocked);
  }, [isLocked]);

  return [isLocked, setIsLocked];
};

const Giphy = (props) => {
  const [data, setData] = useState([]);
  const [lockedImages, setLocketImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [isLocked, setIsLocked] = useStateWithLocalStorage(
    'myValueInLocalStorage'
  );

  const currentItems = data.slice(0 + (12* props.count), 12 + (12 * props.count));

  const imageLockHandler= (element) => (e) => {
    e.preventDefault();
    lockedImages.push(e.target)
    setIsLocked(true);
    e.target.style.border = '4px solid rgb(67, 39, 245)';
    // e.target.push(<i className="fas fa-lock"></i>)

    e.target.innerHTML = 'Click to unlock';
  };

  const imageUnlockHandler = (key) => (e) =>{
    setIsLocked(false);
    e.target.style.border = '0';
    // e.target.push(
    //   <i className="fas fa-lock-open"></i>
    // )
    e.target.innerHTML = 'Unlocked';
};

  useEffect(() => {
    const fetchData = async () => { 
      setIsError(false);
      setIsLoading(true);

      try {
        const results = await axios("http://api.giphy.com/v1/gifs/trending?", {
          params: {
            api_key: "tOE8qoHlJEALaX0Hivii0omHGfO6E3Ou",
            limit: 48 + (props.count * 12)
          }
        });

        console.log(results);
        setData(results.data.data);
      } catch (err) {
        setIsError(true);
        setTimeout(() => setIsError(false), 4000);
      }

      setIsLoading(false);
    };
    fetchData();
  }, []);

  const renderGifs = (index) => {
    if (isLoading) {
      return <Loader />;
    }
    return currentItems.map(el => {
      return (
        <Grid item xs={12} sm={4} md={3} key={el.id}>
          <Item
            style={{
              backgroundImage: `url(${el.images.fixed_height.url})`, 
              color: 'white', 
              textAlign: 'left',
              boxSizing: 'border-box',
              }}
            onClick={isLocked ? imageUnlockHandler(el) : imageLockHandler(el.id) }>
            <i className="fas fa-lock-open"></i>
            <Typography
            component={'span'}>Unlocked</Typography>
          </Item>
        </Grid>
      );
    });
  };
  const renderError = () => {
    if (isError) {
      return (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Unable to get Gifs, please try again in a few minutes
        </div>
      );
    }
  };

  return (
    <div className="m-2">
      {renderError()}
      <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {renderGifs()}
      </Grid>
    </div>
  );
};

export default Giphy;