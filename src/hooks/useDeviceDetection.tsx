
import { useState, useEffect } from 'react';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export const useDeviceDetection = () => {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const userAgent = navigator.userAgent;
      const isTouchSupported = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      
      setIsTouchDevice(isTouchSupported);

      // Mobile detection
      if (width < 768) {
        setDeviceType('mobile');
      }
      // Tablet detection
      else if (width >= 768 && width < 1024) {
        setDeviceType('tablet');
      }
      // Desktop detection
      else {
        setDeviceType('desktop');
      }

      // Enhanced detection for specific devices
      if (/iPhone|iPod/.test(userAgent)) {
        setDeviceType('mobile');
      } else if (/iPad/.test(userAgent)) {
        setDeviceType('tablet');
      }
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return {
    deviceType,
    isTouchDevice,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet', 
    isDesktop: deviceType === 'desktop',
    isMobileOrTablet: deviceType === 'mobile' || deviceType === 'tablet'
  };
};
