import React from 'react'
import { useState } from 'react';
import { Bounce, Fade, Slide } from 'react-awesome-reveal';
import Swal from 'sweetalert2';

function About() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Feedback Submitted!',
      text: 'Thank you for your feedback.',
      icon: 'success',
      confirmButtonText: 'OK',
      timer: 3000,
      timerProgressBar: true,
      willClose: () => {
        setName('');
        setEmail('');
        setMessage('');
      }
    });
  }

  return (
    <>
    <div className=" d-index container mx-auto p-8">
      <div className=" d-index text-center mb-12">
        <h1 className=" d-index text-4xl font-bold mb-4">About Us</h1>
        <p className="text-lg mb-8">We are a dedicated team committed to providing the best services for our customers. Our mission is to deliver high-quality products that meet your needs.</p>
      </div>
      <div className="flex sm:flex-wrap justify-around mb-12">
        <div className="w-full sm:w-1/2 p-4">
        <Slide direction="left">

          <img src="https://www.esonmaterial.com/Content/File_Img/38971/home-about-us.jpg" alt="About Us" className="rounded-lg shadow-lg transition-transform transform hover:scale-105" />
          </Slide>
        </div>
        <div className="w-full sm:w-1/2 p-4">
          <Slide direction="right">
          <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
          <p className="text-lg mb-4">To be the leading provider in our industry, recognized for our innovation and customer satisfaction.</p>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg">To deliver exceptional products and services that exceed our customers' expectations.</p>
          </Slide>
        </div>
      </div>
      <div className=" lg:w-1/2  mx-auto bg-gray-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Feedback form</h2>
        <form onSubmit={handleSubmit}>
          <Fade>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2" htmlFor="name">Name</label>
              <input className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
          </Fade>
          <Fade delay={100}>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2" htmlFor="email">Email</label>
              <input className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
          </Fade>
          <Fade delay={200}>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2" htmlFor="message">Message</label>
              <textarea className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
            </div>
          </Fade>
          <Fade delay={300}>
            <button className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors" type="submit">Submit</button>
          </Fade>
        </form>
      </div>
    </div>
    <footer className="bg-gray-800 w-full py-4 text-white text-center">
        <p>&copy; 2024 File Sharing Service. All rights reserved.</p>
      </footer>
    </>
  );
}

export default About

