// @flow strict

import { useState, useEffect, useMemo } from "react";
import { skillsData } from "@/utils/data/skills";
import { skillsImage } from "@/utils/skill-image";
import Image from "next/image";
import Marquee from "react-fast-marquee";

// Hook to detect mobile screen size
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);
  return isMobile;
}

function Skills() {
  const isMobile = useIsMobile();

  // Memoize skill cards so they don't re-render unnecessarily
  const skillCards = useMemo(() => {
    return skillsData.map((skill, id) => (
      <div
        className="w-36 min-w-fit h-fit flex flex-col items-center justify-center transition-all duration-500 m-3 sm:m-5 rounded-lg group relative hover:scale-[1.15] cursor-pointer"
        key={id}
      >
        <div className="h-full w-full rounded-lg border border-[#1f223c] bg-[#11152c] shadow-none group-hover:border-violet-500 transition-all duration-500">
          <div className="flex -translate-y-[1px] justify-center">
            <div className="w-3/4">
              <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
            </div>
          </div>
          <div className="flex flex-col items-center justify-center gap-3 p-6">
            <div className="h-8 sm:h-10">
              <Image
                src={skillsImage(skill)?.src}
                alt={skill}
                width={40}
                height={40}
                className="h-full w-auto rounded-lg"
              />
            </div>
            <p className="text-white text-sm sm:text-lg">{skill}</p>
          </div>
        </div>
      </div>
    ));
  }, []);

  return (
    <div id="skills" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      {/* Background Glow */}
      <div className="w-[100px] h-[100px] bg-violet-100 rounded-full absolute top-6 left-[42%] translate-x-1/2 filter blur-3xl opacity-20"></div>

      {/* Top Gradient Line */}
      <div className="flex justify-center -translate-y-[1px]">
        <div className="w-3/4">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-violet-500 to-transparent w-full" />
        </div>
      </div>

      {/* Skills Header */}
      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Skills
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      {/* Skills Marquee */}
      <div
        className="w-full my-12"
        style={{ willChange: "transform" }} // GPU optimization
      >
        <Marquee
          gradient={false}
          speed={isMobile ? 45 : 80} // Slower on mobile
          pauseOnHover={!isMobile}
          pauseOnClick={!isMobile}
          delay={0}
          play={true}
          direction="left"
        >
          {skillCards}
        </Marquee>
      </div>
    </div>
  );
}

export default Skills;
