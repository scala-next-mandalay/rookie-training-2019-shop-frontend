import { createMuiTheme } from '@material-ui/core/styles';
import primary from '@material-ui/core/colors/blue';
import secondary from '@material-ui/core/colors/pink';
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const pxToRem = (value) => {
  return `${value / 16}rem`
}

const breakpoints = createBreakpoints({});

export default createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
      primary: primary,
      secondary: secondary,
    },
    responsiveText: {
      fontSize: pxToRem(4),
        [breakpoints.up("sm")]: {
          fontSize: pxToRem(4)
        },
        [breakpoints.up("md")]: {
          fontSize: pxToRem(6)
        },
        [breakpoints.up("lg")]: {
          fontSize: pxToRem(8)
        }
    }
});