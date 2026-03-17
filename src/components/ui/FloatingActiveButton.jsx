import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigationIcon from '@mui/icons-material/Navigation';

export default function FloatingActionButtons(children) {
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Fab color="primary" aria-label="add">
        {children}
      </Fab>
    </Box>
  );
}
