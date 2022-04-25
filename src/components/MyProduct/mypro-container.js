import React, { useEffect } from "react";
import axios from "axios";
import MyPView from "./mypro-view"
import { product_in } from "../../redux/actions";
import { useDispatch,useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const MyPro=()=>{

    
  const token = localStorage.getItem('Token');
  
  let id = JSON.parse(localStorage.getItem("User"))._id
  const dispatch = useDispatch();


  const loadData = () => {

      axios.get(`http://localhost:8000/api/product/?user_id=${id}`, {
        headers: {
          'x-auth-token': token
        }
      })
      .then((res) => {
        dispatch(product_in(res.data))
      })
      .catch((error) => {
        console.error(error)
      })  

    
  }

  let history = useHistory();

  const deleteProduct=(id)=>{
    axios.delete(`http://localhost:8000/api/product/delP/?id=${id}`,{
      headers:{
        'x-auth-token':token
      }
    })
    .then((res)=>{
      console.log(res,"Product deleted")
      history.go(0);

    })
    .catch((error)=>{
      console.log(error)
    })
  }

  const submit = (id) => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => deleteProduct(id)
        },
        {
          label: 'No',
          onClick: () => history.go(0)
        }
      ]
    });
  };

  useEffect(()=>{
      loadData();
  },[1])

  const check = useSelector(state=>state.myPro)
  
  if(check && check.length > 0){
    return(
        <MyPView {...{submit}}/>
    )
    } else{
        return(
            <>No Products found</>
        )
    }
}

export default MyPro;