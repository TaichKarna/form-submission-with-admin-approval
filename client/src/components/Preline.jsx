import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';
import {IStaticMethods} from 'preline/preline'

const Preline = () => {
  const location = useLocation();

  useEffect(() => {
    import('preline/preline');
  }, []);

  useEffect(() => {
    // @ts-ignore
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return <></>;
};

export default Preline;
