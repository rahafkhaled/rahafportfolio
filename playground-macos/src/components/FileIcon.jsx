import React from 'react';

const FileIcon = ({ title, icon, x = 0, y = 0, onOpen }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const containerStyle = {
    position: 'absolute',
    left: `${x}px`,
    top: `${y}px`,
    width: '120px',
    height: '120px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    transform: isHovered ? 'scale(1.1) translateY(-5px)' : 'scale(1) translateY(0)',
  };

  const iconStyle = {
    width: '80px',
    height: '80px',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    filter: isHovered ? 'brightness(1.1) drop-shadow(0 8px 10px rgba(0,0,0,0.3))' : 'brightness(1) drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
  };

  const labelStyle = {
    marginTop: '8px',
    fontSize: '14px',
    color: '#fff',
    textAlign: 'center',
    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
    backgroundColor: isHovered ? 'rgba(0, 0, 0, 0.4)' : 'transparent',
    padding: '4px 10px',
    borderRadius: '6px',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
    opacity: isHovered ? 1 : 0.9,
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
  };

  return (
    <div 
      style={containerStyle}
      className="file-icon"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onOpen}
    >
      <img 
        src={icon} 
        alt={title} 
        style={iconStyle}
      />
      <span style={labelStyle}>
        {title}
      </span>
    </div>
  );
};

export default FileIcon; 