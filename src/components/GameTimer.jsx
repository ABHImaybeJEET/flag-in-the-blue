import React, { useState, useEffect } from "react";
import popupBoxImg from "/popupbox.png";

const jakartaFont = { fontFamily: '"Super Squad", sans-serif' };

export default function GameTimer() {
  const [time, setTime] = useState(135000);
  const [bonusTime] = useState(0.1);
  const [objectsFound] = useState(3);
  const totalObjects = 10;

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) return 0;
        return prevTime - 10;
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatBonus = (bonus) => {
    return bonus.toFixed(2);
  };

  return (
    <div
      className="fixed top-2 left-2 sm:top-3 sm:left-3 md:top-5 md:left-5 z-50"
      style={jakartaFont}
    >
      <div
        className="relative mb-2 sm:mb-3 w-[32vw] sm:w-[18vw] min-w-[8rem] "
        style={{
          backgroundImage: `url(${popupBoxImg})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          aspectRatio: "auto",
        }}
      >
        <div className="relative flex gap-1 items-center justify-center px-[3%] py-[5%]">
          <span
            className="text-yellow-400 font-bold whitespace-nowrap"
            style={{ fontSize: "clamp(0.75rem, 1.5vw, 1.5rem)" }}
          >
            TIME
          </span>
          <span
            className="text-white font-bold mx-[1.5%]"
            style={{ fontSize: "clamp(0.65rem, 1.3vw, 1.25rem)" }}
          >
            :
          </span>
          <span
            className="text-white font-bold min-w-[3.5ch]"
            style={{
              ...jakartaFont,
              fontSize: "clamp(0.75rem, 1.5vw, 1.5rem)",
            }}
          >
            {formatTime(time)}
          </span>
          <span
            className="text-white font-bold mx-[1.5%]"
            style={{ fontSize: "clamp(0.65rem, 1.3vw, 1.25rem)" }}
          >
            +
          </span>
          <span
            className="text-red-500 font-bold min-w-[2.5ch]"
            style={{
              ...jakartaFont,
              fontSize: "clamp(0.75rem, 1.5vw, 1.5rem)",
            }}
          >
            {formatBonus(bonusTime)}
          </span>
        </div>
      </div>

      <div
        className="relative w-[22vw] sm:w-[14vw] min-w-[5rem] "
        style={{
          backgroundImage: `url(${popupBoxImg})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          aspectRatio: "auto",
        }}
      >
        <div className="relative flex items-center gap-1 justify-center px-[3%] py-[5%]">
          <span
            className="text-yellow-400 font-bold whitespace-nowrap"
            style={{ fontSize: "clamp(0.65rem, 1.3vw, 1.25rem)" }}
          >
            FOUND
          </span>
          <span
            className="text-white font-bold mx-[1.5%]"
            style={{ fontSize: "clamp(0.6rem, 1.1vw, 1.125rem)" }}
          >
            :
          </span>
          <span
            className="text-white font-bold min-w-[3ch]"
            style={{
              ...jakartaFont,
              fontSize: "clamp(0.65rem, 1.3vw, 1.25rem)",
            }}
          >
            {objectsFound}/{totalObjects}
          </span>
        </div>
      </div>
    </div>
  );
}
