import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const IPAddressPopup = () => {
  const [country, setCountry] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [ipAddress, setIpAddress] = useState('');

  useEffect(() => {
    const fetchCountryAndIP = async () => {
      try {
        // Fetch country and IP information
        const response = await axios.get('http://ip-api.com/json/');
        const { country, query: ip } = response.data; 
        console.log('Fetched country:', country);
        console.log('Fetched IP address:', ip); 
        setCountry(country);
        setIpAddress(ip);

        // Store the IP address in a cookie
        Cookies.set('userIP', ip, { expires: 7, path: '/' }); 
        console.log('IP address cookie set:', ip);

        // Check if the popup was already shown
        const popupShown = Cookies.get('popupShown');
        console.log('Popup shown cookie:', popupShown);

        if (!popupShown) {
          
          setShowPopup(true);
          Cookies.set('popupShown', true, { expires: 1, path: '/' }); 
          console.log('Popup shown cookie set');
        }
      } catch (error) {
        console.error('Error fetching country or IP:', error);
      }
    };

    fetchCountryAndIP(); 
  }, []);

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <div className='fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-8 rounded-lg text-center'>
            <p className='text-xl font-semibold mb-4'>
              Welcome! It seems you're visiting from {country}.
              Enjoy exploring our content tailored for readers from all over the world!
            </p>
            <button 
              onClick={closePopup} 
              className='text-white bg-yellow-500 px-4 py-2 rounded-md hover:bg-yellow-600'>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default IPAddressPopup;
