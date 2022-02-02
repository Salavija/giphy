import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment } from "../redux/counter";
import Giphy from "../components/Giphy"
import Topbar from "../components/TopBar";


function useKeyPress(targetKey) {
  const [keyPressed, setKeyPressed] = useState(false);
  function downHandler({ keyCode }) {
    if (keyCode === targetKey) {
      setKeyPressed(true);
    }
  }

  const upHandler = ({ keyCode }) => {
    if (keyCode === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []); 
  return keyPressed;
}

const MainPage = () => {
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();


  const shuffleButtonHandler = (e) => {
    dispatch(increment());
  };


if(useKeyPress(32)){
  console.count( 'useKeyPress(32) ')
}

console.log(count, 'dd')
  return (
    <div>       
      <Topbar dataReloadHandler={shuffleButtonHandler} />
      <Giphy count={count} />
    </div>
  )

}

export default MainPage;