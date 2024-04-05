import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';


import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Student = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
     <h1>hiii</h1>
    </Grid>
  );
};

export default Student;
