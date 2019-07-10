import { connect } from 'react-redux'
import NavTesting from '../components/NavTesting'
import { setCategoryId } from '../modules/items'

export default connect(
  (state) => ({
    categories: state.categories.rows,
  }),
  (dispatch) => ({
    setCategoryId: (id) => dispatch(setCategoryId(id)),
  })
)(NavTesting)
