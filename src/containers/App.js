import { connect } from 'react-redux'
import App from '../components/App'

const mapStateToProps = (state, ownProps) => ({
  locale: 'ja'
})

export default connect(
  mapStateToProps
)(App)
