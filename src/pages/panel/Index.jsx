import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { VerifySession, DestroySession } from '../../security/Index';
import { Alert } from '../../functions/Alert';
import NavBar from "../../components/menu/Navbar";
import Target from '../../components/user/Targets';
import ImageGrid from '../../components/loading/home';

const MainPanel = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [isLoadingPetition, setLoadingPetition] = useState(true);
  const [user, setUser] = useState();
  const [petition, setPetition] = useState({empty:false});

  useEffect(() => {
    const session = VerifySession();
    if(!session) navigate('/');
    setUser(session);
    setLoading(false);

    petitions(session.id);
  },[]);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const searchPetitions = (id) =>{
    setTimeout(() => petitions(id), 2000);
  }

  const petitions = (id) => {
    fetch(`${BASE_URL}view/petitions/verify.php?user=${id}`)
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

  return isLoading ? (<div className='d-flex justify-content-center align-items-center mt-5'><ImageGrid /></div>) :
  (
    <>
      <NavBar user={user} DestroySession={DestroySession} navigate={navigate}/>
      <Target petition={petition} isLoadingPetition={isLoadingPetition}/>
    </>
  );
};

export default MainPanel;


