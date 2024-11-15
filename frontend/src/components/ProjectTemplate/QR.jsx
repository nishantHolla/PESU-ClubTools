import { useState, useEffect } from "react";
import { useSession } from "../../providers/session/Session";

function QR({ currentProject, setCurrentProject, parent }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const { projects } = useSession();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (projects.find((p) => p["_id"] === currentProject["_id"]).qr) {
        return;
      }

      if (isDragging && parent.current) {
        const parentRect = parent.current.getBoundingClientRect();

        const newLeft = Math.min(
          Math.max(0, e.clientX - parentRect.left - offset.x),
          parentRect.width - currentProject.qr.size,
        );

        const newTop = Math.min(
          Math.max(0, e.clientY - parentRect.top - offset.y),
          parentRect.height - currentProject.qr.size,
        );

        setCurrentProject((prev) => ({
          ...prev,
          qr: {
            ...prev.qr,
            x: (newLeft / parentRect.width) * 100,
            y: (newTop / parentRect.height) * 100,
          },
        }));
      } else if (isResizing && parent.current) {
        const parentRect = parent.current.getBoundingClientRect();

        const newSize = Math.min(
          Math.max(
            20,
            e.clientX -
              parentRect.left -
              (currentProject.qr.x * parentRect.width) / 100,
          ),
          parentRect.width - (currentProject.qr.x * parentRect.width) / 100,
          parentRect.height - (currentProject.qr.y * parentRect.height) / 100,
        );

        setCurrentProject((prev) => ({
          ...prev,
          qr: {
            ...prev.qr,
            size: (newSize / parentRect.width) * 100,
          },
        }));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    isResizing,
    offset,
    currentProject,
    parent,
    setCurrentProject,
  ]);

  const handleMouseDown = (e) => {
    const qrRect = e.target.getBoundingClientRect();
    setOffset({ x: e.clientX - qrRect.left, y: e.clientY - qrRect.top });
    setIsDragging(true);
  };

  const handleResizeMouseDown = (e) => {
    e.stopPropagation();
    setIsResizing(true);
  };

  if (!currentProject.qr) return <></>;

  return (
    <div
      className="project-qr"
      style={{
        width: `${currentProject.qr.size}%`,
        aspectRatio: '1/1',
        left: `${currentProject.qr.x}%`,
        top: `${currentProject.qr.y}%`,
        position: "absolute",
      }}
    >
      <div
        className="project-qr-label unselectable"
        onMouseDown={handleMouseDown}
        style={{ cursor: "move" }}
      >
        QR
      </div>
      <div className="project-qr-resizer" onMouseDown={handleResizeMouseDown} />
    </div>
  );
}

export default QR;
