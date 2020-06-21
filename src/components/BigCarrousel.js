import React from 'react';

const BigCarrousel = (props) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
            <div className="col">
               <img className='img-fluid' src={`/images/banners/main/${props.image}`} alt=""/>
            </div>
        </div>
      </div>
    </>  
  );
}
 
export default BigCarrousel;