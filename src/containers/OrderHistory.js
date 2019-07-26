import { connect } from 'react-redux';
import OrderHistory from '../components/OrderHistory';
import { fetchAllOrders,setOrderId, setSearchText,clickOrderId ,setbeginDate,setendDate} from '../modules/orders';

const _filter = (rows, o,searchText) => {
  
  
  console.log(searchText);
  if (!searchText ) {
    return  rows;
  }
  
  const filteredRows = [];
  for (const n of rows) {
    //filter by searchText.
    console.log("n is ",n);
    if (searchText) {
  
         console.log("Id"+n.id);
       if (n.id === parseInt(searchText)) {
        filteredRows.push(n);
       }
    }
  }
  return filteredRows;
} ;
const _filterBeginDate=(rows,sdate,edate)=>{
  console.log("enter function",rows);
  console.log("sdate",sdate);
  console.log("edate",edate);
  if (!sdate ||!edate ) {
    return  rows;
  }
  const filteredRows = [];
  for(const d of rows){
    console.log("d is ",d);
    // const create=new Date(d.created_at);
    // console.log("d start",create);
    // const end=new Date(edate.date);
    // if(create>=sdate||create<=edate){
    //   filteredRows.push(d);
    // }
  }
  console.log("filteredRows",filteredRows);
  return filteredRows;
};
export default connect(
  (state) => ({
    // cart: state.cart.rows,
    //orders: state.orders.rows,
    orders: _filter(
      state.orders.rows, 
      state.orders.selectedOrderId,
      state.orders.searchText
      
    ),
     ordersdate: _filterBeginDate(
      state.orders.rows, 
      state.orders.searchTextBegin,
      state.orders.searchTextEnd
      
    ),
    searchText: state.orders.searchText,
    searchTextBegin: state.orders.searchTextBegin,
    searchTextEnd: state.orders.searchTextEnd
    
    
    
  }),
   
  (dispatch) => ({
    fetchAllOrders: () => dispatch(fetchAllOrders()),
    setOrderId: (orderId) =>  dispatch(setOrderId(orderId)),
    setSearchText: (text) =>  dispatch(setSearchText(text)),
    clickOrderId :(orderId) => dispatch(clickOrderId(orderId)),
    setbeginDate: (date) =>  dispatch(setbeginDate(date)),
    setendDate: (date) =>  dispatch(setendDate(date)),
  })
  
 
)(OrderHistory);
