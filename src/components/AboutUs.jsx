import React from 'react'

export default function AboutUs() {
    return (
        <div className="bg-gray-800 text-white min-h-screen px-6 py-16">
          <div className="container mx-auto">
            {/* Section Title */}
            <h1 className="text-4xl font-bold text-blue-400 text-center mb-8 border-b-4 border-yellow-400 pb-4">About Us</h1>
    
            {/* About Content */}
            <div className="border border-gray-600 rounded-lg p-6 shadow-lg bg-gray-900">
              <p className="text-gray-300 text-lg text-center">
                Welcome to <span className="text-yellow-400 font-semibold">MyWebsite</span>, where we innovate and provide top-quality solutions. Our mission is to create seamless and efficient digital experiences.
              </p>
            </div>
    
            {/* Mission & Vision Section */}
            <div className="grid md:grid-cols-2 gap-6 mt-10">
              <div className="border border-gray-600 rounded-lg p-6 bg-gray-900 shadow-md">
                <h2 className="text-2xl font-semibold text-blue-300 text-center mb-3 border-b-2 border-yellow-400 pb-2">Our Mission</h2>
                <p className="text-gray-300 text-center">
                  Our mission is to empower businesses and individuals through cutting-edge technology and innovative digital solutions.  
                  <br /><br />
                  We strive to deliver high-quality, scalable, and user-centric applications that enhance productivity and efficiency across various industries.  
                  <br /><br />
                  By fostering a culture of continuous learning, research, and development, we ensure that we stay ahead of industry trends and provide our users with the best possible experience.
                </p>
              </div>
              <div className="border border-gray-600 rounded-lg p-6 bg-gray-900 shadow-md">
                <h2 className="text-2xl font-semibold text-blue-300 text-center mb-3 border-b-2 border-yellow-400 pb-2">Our Vision</h2>
                <p className="text-gray-300 text-center">
                  We envision a world where technology is seamlessly integrated into everyday life, enhancing the way people connect, work, and innovate.  
                  <br /><br />
                  Our goal is to become a global leader in software solutions, providing businesses with tools that simplify operations, boost efficiency, and drive sustainable growth.  
                  <br /><br />
                  By leveraging AI, cloud computing, and next-gen technologies, we aim to reshape the digital landscape and create a more inclusive and tech-driven future.
                </p>
              </div>
            </div>
    
            {/* Contact Section */}
            <div className="mt-12 border border-gray-600 rounded-lg p-6 bg-gray-900 shadow-lg text-center">
              <h2 className="text-3xl font-semibold text-blue-400 border-b-4 border-yellow-400 pb-4">Contact Us</h2>
              <p className="text-lg text-gray-300 mt-4">Have any questions? Reach out to us!</p>
              <div className="mt-6 space-y-3">
                <p className="text-lg"><span className="font-bold text-yellow-400">📍 Address:</span> 123 Tech Street, City, Country</p>
                <p className="text-lg"><span className="font-bold text-yellow-400">📧 Email:</span> support@example.com</p>
                <p className="text-lg"><span className="font-bold text-yellow-400">📞 Phone:</span> +123 456 7890</p>
              </div>
            </div>
          </div>
        </div>
      );
}
