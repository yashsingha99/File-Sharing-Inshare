import React from "react";
import { Slide } from "react-awesome-reveal";
import {
  FaFileUpload,
  FaCloud,
  FaUsers,
  FaMobileAlt,
  FaLock,
} from "react-icons/fa";
import { useInView } from "react-intersection-observer";

function Section({
  title,
  description,
  icon: Icon,
  imgSrc,
  imgAlt,
  reverse,
  className,
  left,
  right
}) {
  const { ref, inView } = useInView({
    triggerOnce: false,
    fallbackInView : true
    // threshold: 0.6,
    // delay: 0,
  });

  return (
    <div
      ref={ref}
      className={` w-full flex flex-col  ${
        reverse ? "md:flex-row-reverse " : "md:flex-row"
      } items-center my-12 transition-transform duration-700 ${
        inView
          ? "transform-none opacity-100"
          : "transform translate-x-12 opacity-0"
      }`}
    >
      <div className="w-4/5 ">
      <Slide direction={`${left}`}>

        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{description}</p>
        <Icon className={`text-6xl ${className} `} />
        </Slide>
      </div>

      <div className="md:w-1/3 p-6 hover:scale-110  hover:transition-shadow duration-500 ">
        <Slide direction={`${right}`} >
        <img src={imgSrc} alt={imgAlt} className=" rounded-lg shadow-lg" />
        </Slide>
      </div>
    </div>
  );
}

function LearnMore() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <header className="bg-blue-600 w-full py-6 text-white text-center">
        <h1 className="text-4xl lg:text-3xl sm:text-xl font-bold">
          Learn More About Our File Sharing Service
        </h1>
      </header>
      <main className="flex-grow container mx-auto p-6">
        <Section
          title="Easy File Upload"
          description="Upload your files with ease and share them instantly with anyone. Our intuitive interface ensures that even the least tech-savvy users can quickly and easily upload their files. Drag and drop functionality, bulk upload capabilities, and progress tracking make file sharing a breeze."
          icon={FaFileUpload}
          imgSrc="https://assets-global.website-files.com/5f874a02b14267b40a9fd71b/60de3ac0edefe81ed18d0ca9_benefits-of-secure-file-sharing-forlaw-firms.jpg"
          className={"text-blue-600 animate-bounce"}
          imgAlt="File Upload"
          left = "left"
          right = "right"

        />
        <Section
          title="Collaborate with Your Team"
          description="Work together with your team by sharing files and collaborating in real-time. With our service, you can set permissions, leave comments, and even edit files simultaneously with other team members. Stay organized with project-specific folders and keep track of changes with version history."
          icon={FaUsers}
          imgSrc="https://www.customerinsightleader.com/wp-content/uploads/2020/05/iStock-1127997676-1024x555.jpg"
          className={"text-green-600 animate-pulse"}
          imgAlt="Team Collaboration"
          reverse
          left = "right"
          right = "left"
        />
        <Section
          title="Secure and Private"
          description="Your files are safe with us, protected by top-notch security measures. We use end-to-end encryption to ensure that your data remains private and secure. Our service complies with industry standards and regulations, providing you with peace of mind that your information is in good hands."
          icon={FaLock}
          className={"text-red-600 animate-spin"}
          imgSrc="https://th.bing.com/th/id/OIP.aye80DL4ejP1M-92KWchlAHaEj?rs=1&pid=ImgDetMain"
          imgAlt="Secure and Private"
          left = "left"
          right = "right"
        />
        <Section
          title="Cloud Storage"
          description="Access your files from anywhere with our reliable cloud storage. Our service ensures your files are always available, with high uptime and fast access speeds. Synchronize your files across devices and share them with others seamlessly. Backup your data regularly to prevent loss."
          icon={FaCloud}
          imgSrc="https://www.rddshred.com/wp-content/uploads/2022/08/rdd-cloud-storage.jpg"
          imgAlt="Cloud Storage"
          className={"text-sky-600 animate-pulse"}
          reverse
          left = "right"
          right = "left"
        />
        <Section
          title="Mobile Access"
          description="Use our mobile app to share and access your files on the go. Whether you’re on a business trip or working remotely, our app ensures you have your files at your fingertips. Available for both iOS and Android, the app provides the same level of functionality and security as our web service."
          icon={FaMobileAlt}
          imgSrc="https://www.egnyte.com/sites/default/files/2024-01/192x230_Mobile%20File%20Sharing%20Made%20Easy2x.png"
          imgAlt="Mobile Access"
          className={"text-blue-600 animate-bounce"}
          left = "left"
          right = "right"
        />
      </main>
      <footer className="bg-gray-800 w-full py-4 text-white text-center">
        <p>&copy; 2024 File Sharing Service. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default LearnMore;
