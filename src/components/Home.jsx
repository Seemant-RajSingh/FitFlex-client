import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Listheader from "./Listheader";
import Listitem from "./Listitem"



export default function Home() {

  const [workouts, setWorkouts] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user'])
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email

  const getData = async () => {

    try {
      // ** params on get request
      const options = {
        url: `https://fit-flex-dohxze8w5-seemant-rajsingh.vercel.app/workouts/${userEmail}`,
      };
      const response = await axios.request(options);
      setWorkouts(response.data);
    }
    catch (e) {
      console.log(e.message);
    }
  }



  const navigate = useNavigate();

  useEffect( () => {
    if(authToken) {
      getData();
    }
    else navigate('/auth');
  }, [])

  // sort workouts by date
  const sortedWorkouts = workouts?.sort((a,b) => new Date(a.date) - new Date(b.date));

  return (
    <div className='app min-h-screen bg-zinc-900 '>
      <Listheader listName={'Workouts List'} getData={getData} />
  
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-0">
        {sortedWorkouts?.map((workout) => (
          <Listitem key={workout.id} workout={workout} getData={getData} />
        ))}
      </div>
    </div>
  );
}
