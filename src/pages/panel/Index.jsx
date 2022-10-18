import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VerifySession, DestroySession } from '../../security/Index';
import { Alert } from '../../functions/Alert';
import NavBar from "../../components/menu/Navbar";
import Target from '../../components/user/Targets';
import ImageGrid from '../../components/loading/home';

import Count from './Cont';

const MainPanel = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [isLoadingPetition, setLoadingPetition] = useState(true);
  const [user, setUser] = useState();
  const [petition, setPetition] = useState({empty:false});
  const [state, setState] = useState('petition');
  // const [state, setState] = useState('count');

  useEffect(() => {
    const session = VerifySession();
    if(!session) navigate('/');
    setUser(session);
    setLoading(false);

    petitions(session.id);
  },[state]);

  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const TOKEN = import.meta.env.VITE_TOKEN;

  const searchPetitions = (id) =>{
    setTimeout(() => petitions(id), 2000);
  }

  const petitions = (id) => {
    const requestOptions = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Authorization': TOKEN,
      }
    }
    fetch(`${BASE_URL}view/petitions/verify.php?user=${id}`,requestOptions)
    .then((response) => response.json())
    .then(result => {
      const { description, problems } = result.conflicts;
      if(problems) {
        Alert('error', description)
        return;
      }
      const { empty } = result.response;
      setPetition(result.response);
      if(empty) {
        setLoadingPetition(false);
        searchPetitions(id);
        return;
      }
      setLoadingPetition(false);
    })
  }

  const nexStep = petition =>{
    const { status, id, idlaboratory, idsaplaboratory, idtimes, times, ubication, idubication } = petition;
    const requestOptions = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Authorization': TOKEN,
      },
      body: JSON.stringify({
        status, 
        idpetition: id, 
        idlaboratory,
        idsaplaboratory,
        idtimes,
        times,
        ubication, 
        idubication
      })
    }
    fetch(`${BASE_URL}/view/petitions/verify.php`,requestOptions)
    .then(response => response.json())
    .then(result => {
      const {description, problems} = result.conflicts;
      
      if(problems) {
        Alert('error', description);
        return;
      }
      setState('count')
      console.table(result.message);
    })
    .catch(error => Alert('error', error.message))
  }


  return isLoading ? (<div className='d-flex justify-content-center align-items-center mt-5'><ImageGrid /></div>) :
  (
    <>
      {state === 'petition' && <>
      <NavBar user={user} DestroySession={DestroySession} navigate={navigate}/>
      <Target petition={petition} isLoadingPetition={isLoadingPetition} nexStep={nexStep}/>
      </> }
      {state == 'count' && <Count />}
    </>
  );
};

export default MainPanel;


