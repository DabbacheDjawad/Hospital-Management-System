const Button = ({ children, onClick , href , className}) => {
  const renderButton = () => {
    return (
      <button
        className={`relative flex items-center h-fit w-fit justify-center p-[3px] text-white text-lg
  font-medium whitespace-nowrap cursor-pointer transition-all duration-300 ease-in-out rounded-lg border-0
   shadow-[0_15px_30px_-5px_rgba(151,65,252,0.2)] bg-gradient-to-r from-[#af40ff] via-[#5b42f3] to-[#00ddeb]
    hover:outline-none active:outline-none active:scale-90 ${className}`}
        onClick={onClick}
      >
        <span
          className="w-full h-full p-4 px-8 bg-[#05062d] rounded-md transition-all duration-300
     ease-in-out hover:bg-transparent"
        >
          {children}
        </span>
      </button>
    );
  };

  const renderLink = ()=>{
    return (
      <a
        className="relative flex h-fit w-fit items-center justify-center p-[3px] text-white text-lg
  font-medium whitespace-nowrap cursor-pointer transition-all duration-300 ease-in-out rounded-lg border-0
   shadow-[0_15px_30px_-5px_rgba(151,65,252,0.2)] bg-gradient-to-r from-[#af40ff] via-[#5b42f3] to-[#00ddeb]
    hover:outline-none active:outline-none active:scale-90"
        onClick={onClick}
      >
        <span
          className="w-full text-center h-full p-4 px-8 bg-[#05062d] rounded-md transition-all duration-300
     ease-in-out hover:bg-transparent"
        >
          {children}
        </span>
      </a>
    );
  }

  return href ? renderLink() : renderButton();
};

export default Button;
