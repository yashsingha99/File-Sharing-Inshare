import { useState } from 'react';
import Lottie from 'react-lottie';
import { Bounce, Fade, Slide } from 'react-awesome-reveal';
import emailAnimation from './email.json';
import phoneAnimation from './phone.json';
import Swal from 'sweetalert2';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Message Sent!',
      text: 'Thank you for contacting us. We will get back to you soon.',
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

  const emailOptions = {
    loop: true,
    autoplay: true,
    animationData: emailAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const phoneOptions = {
    loop: true,
    autoplay: true,
    animationData: phoneAnimation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <>
    <div className="container mx-auto p-8">
      <div className="text-center mb-12">
        <Bounce>
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
        </Bounce>
        <Fade>
          <p className="text-lg mb-8">Feel free to reach out to us for any inquiries or feedback.</p>
        </Fade>
      </div>
      <div className="flex flex-wrap justify-around mb-12">
        <div className="w-full sm:w-1/2 p-4 flex flex-col items-center">
          <Slide direction="left">
          <EmailIcon />
            <h2 className="text-2xl font-semibold mb-4">Email Us</h2>
            <p className="text-lg mb-4">inShare@gmail.com</p>
          </Slide>
        </div>
        <div className="w-full sm:w-1/2 p-4 flex flex-col items-center">
          <Slide direction="right">
          <CallIcon />
            <h2 className="text-2xl font-semibold mb-4">Call Us</h2>
            <p className="text-lg mb-4">+91 9756144688</p>
          </Slide>
        </div>
      </div>
      <div className="lg:w-1/2 md-w1/2 mx-auto bg-gray-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Send Us a Message</h2>
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

export default ContactUs;
