import { useState } from "react";
import BackgroundImage from "../assets/background.png";
import { scene } from "../config/scene";

export default function OceanScene() {
  const [activeId, setActiveId] = useState(null);

  const handleClick = (e, id) => {
    e.stopPropagation();
    // toggle active state
    setActiveId((cur) => (cur === id ? null : id));
  };

  const closeActive = () => setActiveId(null);

  return (
    <div
      className="relative h-screen w-screen bg-cover bg-bottom bg-no-repeat z-4 overflow-hidden"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
      }}
      onClick={closeActive}
    >
      {/* scene objects */}
      {scene.map((item, i) => {
        const id = `object-${i}`;
        const isActive = activeId === id;
        const baseZ = item.zindex ?? 1;
        return (
          <img
            key={id}
            id={id}
            data-object-id={id}
            src={item.src}
            alt={item.name}
            className={`absolute object-hoverable transition-transform duration-200 ease-out ${isActive ? "object-active" : ""}`}
            onClick={(e) => handleClick(e, id)}
            style={{
              top: item.top,
              left: item.left,
              height: item.height,
              width: item.width,
              zIndex: isActive ? 2000 : baseZ,
              cursor: "pointer",
              // when some object is active, prevent interacting with all non-active objects
              pointerEvents: activeId && !isActive ? "none" : "auto",
            }}
          />
        );
      })}

      {/* overlay that dims the scene when an object is active */}
      {activeId && (
        <div
          className="scene-overlay"
          onClick={closeActive}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
