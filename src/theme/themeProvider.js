import { createTheme} from '@material-ui/core/styles';

const primary = '#2176ff'
const secondary = '#1be38b'

export const theme = createTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary
    }
  },
})
