import React, { useEffect } from 'react';
import POS from '../components/POS/POS';

const PosPage = () => {
  const user = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    if(user.role === "superAdmin") {
      window.location.href= "/transactions"
    }

  }, []);
  return <POS />;
};

export default PosPage;
