import './App.css';
import { useEffect, useState } from 'react';
import Photo from './components/Photo';

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    async function getData() {

      await fetch('https://final3380-server-1.onrender.com/api/arts')
        .then((arts) => arts.json())
        .then((arts) => {
          setData(arts)
        })
        .catch((err) => {
          console.log(err)
        })
    }
    getData();
  }, []);
  
  return (
    <div id='root'>
      <div className='App'>
        <h1>Art Gallery Auctions</h1>
        <div className='photo-gallery'>
            {data.map(art =>
                <Photo art={art} key={art.id}/>
            )}
        </div>
      </div>
    </div>
  );
}

export default App;
