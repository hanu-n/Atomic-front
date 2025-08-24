import React from 'react'
import homeimg from '../assets/main.jpg'
import { Link } from 'react-router-dom'
import chemistryLab from '../assets/images/chemistry lab equip.png'
import bioLab from '../assets/images/bio lab models.png'
import chemLab from '../assets/images/chem lab chemicals.png'
import analytical from '../assets/images/analytical lab equip.png'



const Home = () => {
  return (
   <>
       <div className="py-4" style={{backgroundColor: '#d2f5d0'}}>
     
     <div className="container" id="home">
 <div className="row align-items-center mt-5">
     <div className="col-md-6 text-center text-md-start mb-4 mb-md-0">
         <h1 className="display-5 fw-bold text-success">Welcome to Atomic MAS</h1>
         <p className="lead text-dark">Quality Material Supply for better Education.</p>
         <p className="mt-4 td">We provide top quality Chemistry Laboratory Equipment & Chemicals, Physics Laboratory Apparatus, Biology Laboratory Models, Analytical Laboratory Equipment, Laboratory Glass/Plastic ware, Educational Charts and Scientific Experimental Apparatus.
        </p>
        <Link to={'/about'} className="btn btn-success btn-lgvpx-4">Read more</Link>
        


     </div>
     <div className="col-md-6 text-center">
         <img className="img-fluid rounded shadow" src={homeimg} alt="Educational Material"/>
     </div>
 </div>
 
     </div>
    </div>
     <section className="products-section" >
      <div className="container">
        <h2 className="section-title">Our Products</h2>
        <p className="section-subtitle">
          We operate in all corners of <span className='text-success fw-bold'>Africa</span> and deliver our products on time.
        </p>
    
        <div className="products-grid">
          <div className="product-card">
            <img className="img-fluid" src={chemistryLab} alt="Chemistry Laboratory Equipment"/>
            <h3>Chemistry Laboratory Equipment</h3>
          </div>
          <div className="product-card">
            <img className="img-fluid" src={chemLab} alt="Chemistry Laboratory Chemicals"/>
            <h3>Chemistry Laboratory Chemicals</h3>
          </div>
          <div className="product-card">
            <img className="img-fluid" src={bioLab} alt="Biology Laboratory Models "/>
            <h3>Biology Laboratory Models and Apparatus</h3>
          </div>
          <div className="product-card">
            <img className="img-fluid" src={analytical} alt="Analytical Laboratory Equipment"/>
            <h3>Analytical Laboratory Equipment</h3>
          </div>
        </div>

       
      </div>
    </section>
    </>
  )
}

export default Home