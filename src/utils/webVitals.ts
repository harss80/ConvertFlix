export const webVitals = () => {
  const reportWebVitals = (onPerfEntry?: any) => {
    if (onPerfEntry && onPerfEntry instanceof Function) {
      import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
        onCLS(onPerfEntry);
        onINP(onPerfEntry);
        onFCP(onPerfEntry);
        onLCP(onPerfEntry);
        onTTFB(onPerfEntry);
      });
    }
  };

  // Log web vitals to console in development
  // @ts-ignore
  if (typeof process !== 'undefined' && process.env.NODE_ENV === 'development') {
    reportWebVitals((metric: any) => {
      console.log(metric);
    });
  }

  return { reportWebVitals };
};

export default webVitals;
