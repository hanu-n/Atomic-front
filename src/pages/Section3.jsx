import { useState } from 'react';
import axios from "axios";
import {toast} from 'react-toastify'


const Section3 = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });
  const [loading,setLoading]=useState(false)

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

const handleSubmit=async(e)=>{
e.preventDefault()
setLoading(true)

try {
    const res=await axios.post('https://atomic-7jgw.onrender.com/api/contact',formData)
          toast.success(res.data.message || "Message sent successfully!");
          setFormData({fullName:'',email:'',subject:'',message:''})
} catch (error) {
          toast.error(error.response?.data?.error || "Something went wrong!");

}
finally{
          setLoading(false);

}
}

  return (
    <section className="py-5 bg-light position-relative overflow-hidden" id="con">
      {/* Animated Background */}
      <div className="position-absolute top-0 start-0 w-100 h-100">
        <div className="contact-circle circle-1"></div>
        <div className="contact-circle circle-2"></div>
        <div className="contact-circle circle-3"></div>
      </div>

      <div className="container py-5 position-relative">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <h2 className="fw-bold mb-3 contact-title">
              {'Contact Us'.split('').map((char, i) => (
                <span key={i} className="contact-letter">{char === ' ' ? '\u00A0' : char}</span>
              ))}
            </h2>
            <p className="text-muted lead contact-subtitle">
              Have questions? <span className="highlight-text">We're here to help!</span>
            </p>
          </div>
        </div>

        <div className="row g-5">
          {/* Contact Info */}
          <div className="col-lg-5 ps-6">
            <div className="d-flex mb-4 card border-0 contact-info-item">
              <div className="me-4 text-primary">
                <i className="bi bi-geo-alt fs-2 text-dark"></i>
              </div>
              <div>
                <h5 className="fw-bold">Our Location</h5>
                <p className="text-muted mb-0">Around Meskel square, Kirkos subcity</p>
              </div>
            </div>

            <div className="d-flex mb-4 card border-0 contact-info-item">
              <div className="me-4 text-primary">
                <i className="bi bi-telephone fs-2 text-dark"></i>
              </div>
              <div>
                <h5 className="fw-bold">Phone Number</h5>
                <p className="text-muted mb-0">011 416 2168 / +251 911 488 462</p>
              </div>
            </div>

            <div className="d-flex mb-4 card border-0 contact-info-item">
              <div className="me-4 text-primary">
                <i className="bi bi-envelope fs-2 text-dark"></i>
              </div>
              <div>
                <h5 className="fw-bold">Email Address</h5>
                <p className="text-muted mb-0">contact atomic@gmail.com</p>
              </div>
            </div>

            <div className="d-flex card border-0 ms-2 contact-info-item">
              <div className="me-4 text-primary">
                <i className="bi bi-clock fs-2 text-dark"></i>
              </div>
              <div>
                <h5 className="fw-bold">Working Hours</h5>
                <p className="text-muted mb-0">
                  Monday - Friday: 2PM - 12PM Local time<br />
                  Saturday: 2PM - 6PM Local time
                </p>
              </div>
            </div>

            <div className="text-center mt-3">
              <a href="#" className="text-dark me-3 fs-3"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-dark me-3 fs-3"><i className="bi bi-twitter"></i></a>
              <a href="#" className="text-dark me-3 fs-3"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-dark fs-3"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="col-lg-7">
            <div className="card border-0 shadow contact-form-card">
              <div className="card-body p-5">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="fullName" className="form-label">Your Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">Your Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className="form-label">Your Message</label>
                    <textarea
                      className="form-control"
                      id="message"
                      rows="5"
                      required
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary px-4 py-2">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section3;
