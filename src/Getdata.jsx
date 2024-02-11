import React, { useEffect, useState } from 'react'
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {useNavigate, useLocation} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function Getdata  () {
    const [data, setData] = useState([])
    
    const location = useLocation();
    const navigate = useNavigate();
    
    const getdata =(limit)=>{
      fetch(`https://fakestoreapi.com/products?limit=${limit}`)
      .then((res)=>res.json())
      .then( (json)=>{
        setData(json)
      })
    }
    
    const initialProductDisplay = parseInt(new URLSearchParams(location.search).get('limit'), "10") || 10;
    const [productdisplay, setProductDisplay]= useState(initialProductDisplay)
    useEffect(() => {
   const searchParams = new URLSearchParams ({limit : productdisplay});
   navigate({search: searchParams.toString()})
      getdata(productdisplay)
    }, [navigate, productdisplay]);


     const handlesubmit = (event)=>{
            const selectvalue = event.target.value;
            setProductDisplay(parseInt(selectvalue, 10));
     }
     
  return (
    <>
    <Container>

    <div className='row m-2'>
        <div className='m-2'>
          <label>Select Number of Products: </label>
          <select onChange={handlesubmit} value={productdisplay} className='m-2'>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
   </div>
   <Row style={{gap:"10px"}}>
    {
       data.map((v)=>{
           return(
               <Card style={{ width: '18rem' }}>
               <Card.Body>
                 <Card.Title>{v.title}</Card.Title>
                 <Card.Subtitle className="mb-2 text-muted">Price : {v.price}</Card.Subtitle>
                 <Card.Text>
                {v.description}
                 </Card.Text>
                 <Card.Link href="#">Add Cart</Card.Link>
               </Card.Body>
             </Card>
           )
       })
    }
    </Row>
    </Container>
   </>
  )
}

export default Getdata