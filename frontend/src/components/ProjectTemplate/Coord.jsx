import { useState, useEffect, useRef } from "react";

function Coord({ i, c, currentProject, setCurrentProject, parent }) {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const coordRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging && parent.current) {
        const parentRect = parent.current.getBoundingClientRect();
        const coordRect = coordRef.current.getBoundingClientRect();

        const newLeft = Math.min(
          Math.max(0, e.clientX - parentRect.left - offset.x),
          parentRect.width - coordRect.width,
        );
        const newTop = Math.min(
          Math.max(0, e.clientY - parentRect.top - offset.y),
          parentRect.height - coordRect.height,
        );

        console.log(newLeft, newTop);
        setCurrentProject((prev) => {
          const newCoords = [...prev.coords];
          newCoords[i] = {
            ...newCoords[i],
            x: (newLeft / parentRect.width) * 100,
            y: (newTop / parentRect.height) * 100,
          };
          return { ...prev, coords: newCoords };
        });
      }
    };

    const handleMouseUp = () => setIsDragging(false);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, offset, setCurrentProject, i, parent]);

  const handleMouseDown = (e) => {
    const coordRect = e.target.getBoundingClientRect();
    setOffset({ x: e.clientX - coordRect.left, y: e.clientY - coordRect.top });
    setIsDragging(true);
  };

  return (
    <div
      className="project-coord unselectable"
      ref={coordRef}
      style={{
        top: `${c.y}%`,
        left: `${c.x}%`,
        color: `${c.color}`,
        fontSize: `${c.size}px`,
        position: "absolute",
        cursor: "move",
      }}
      onMouseDown={handleMouseDown}
    >
      {
        currentProject.csv[1][
          currentProject.csv[0].indexOf(currentProject.coords[i].field)
        ]
      }
    </div>
  );
}

export default Coord;
