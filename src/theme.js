import { createMuiTheme } from '@material-ui/core/styles';
import secondary from '@material-ui/core/colors/deepOrange';

export default createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
      primary: {
          main : '#9A7B66',
      },
      secondary: secondary
    },
})