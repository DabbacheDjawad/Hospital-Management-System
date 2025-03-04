import { useState, useEffect } from "react";
import Facebook from "@iconscout/react-unicons/icons/uil-facebook";
import Instagram from "@iconscout/react-unicons/icons/uil-instagram";
import GitHub from "@iconscout/react-unicons/icons/uil-github";
import LinkedIn from "@iconscout/react-unicons/icons/uil-linkedin";

const Section = ({ home, head, dark, children}) => {
  return (
    <div
      className={` top-[100px] lg:top-auto xl:top-auto ${
        home && home == true ? "h-[500px]" : "h-fit"
      }
     w-[90%] ml-[5%] mt-18 rounded-xl bg-gradient-to-r from-[#0a3d6d] via-[#092137] to-[#2D336B]`}
    >
      <h1
        className={`text-3xl text-center pt-10 underline ${
          dark && dark === true ? "text-[#092137]" : "text-white"
        }`}
      >
        {head}
      </h1>
      {home && home == true ? (
        <p className={`text-white text-center mt-8 text-2xl w-[80%] ml-[10%]`}>
          A simple Hospital Management System , to actually Get the Data , Be
          Sure to Login with your Account And if you don't have an Account sign
          in by clicking the Button Above
        </p>
      ) : (
        ""
      )}

      <div>{children && <div>{children}</div>}</div>

      <div className="flex justify-center items-center mt-24">
        <a
          href="https://www.facebook.com/profile.php?id=100021755386728"
          target="_blank"
        >
          <Facebook size={65} className="rounded-full mr-8" color="white" />
        </a>
        <a href="https://www.instagram.com/julius_the_ll/" target="_blank">
          <Instagram size={65} className="rounded-full mr-8" color="white" />
        </a>
        <a href="https://github.com/DabbacheDjawad" target="_blank">
          <GitHub size={65} className="rounded-full mr-8" color="white" />
        </a>
        <a
          href="https://www.linkedin.com/in/djawad-dabbache-97882a333/"
          target="_blank"
        >
          <LinkedIn size={65} className="rounded-full mr-8" color="white" />
        </a>
      </div>
    </div>
  );
};

export default Section;
