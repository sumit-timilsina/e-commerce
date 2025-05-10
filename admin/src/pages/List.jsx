import axios from 'axios';
import React, { useEffect } from 'react'
import { backendUrl } from '../App';

const List = () => {

  const [list , setList] = React.useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl+'/api/product/list')
      console.log(response.data)
    } catch (error) {
      
    }
  }

  useEffect(
    () => {
      fetchList()
    },[]
  )

  return (
    <div>
      
    </div>
  )
}

export default List