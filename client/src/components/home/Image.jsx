import React from "react";

const ImageLoader = ({ src, alt, ...props }) => {
    const imgSrc = useImage(src);
  
    return <img src={imgSrc} alt={alt} {...props} />;
  };
  
  const useImage = (src) => {
    const [sourceLoaded, setSourceLoaded] = React.useState(null);
  
    React.useEffect(() => {
      const img = new Image();
      img.src = src;
      img.onload = () => setSourceLoaded(src);
    }, [src]);
  
    return sourceLoaded;
  };

export default ImageLoader;