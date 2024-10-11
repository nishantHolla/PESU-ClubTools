import "./icon_style.css";

import EvaMenu from "./svgs/eva-menu.svg?react";
import EvaClose from "./svgs/eva-close.svg?react";
import EvaLock from "./svgs/eva-lock.svg?react";
import EvaEye from "./svgs/eva-eye.svg?react";
import EvaEyeOff from "./svgs/eva-eye-off.svg?react";
import EvaMail from "./svgs/eva-mail.svg?react";
import EvaPerson from "./svgs/eva-person.svg?react";

const iconMap = {
  "eva:menu": EvaMenu,
  "eva:close": EvaClose,
  "eva:lock": EvaLock,
  "eva:eye": EvaEye,
  "eva:eye-off": EvaEyeOff,
  "eva:mail": EvaMail,
  "eva:person": EvaPerson,
};

function Icon({ type, className, ...props }) {
  if (!className) className = "";
  const Icon = iconMap[type];

  if (Icon)
    return (
      <div className="icon-component">
        <Icon className={`icon ${className}`} {...props} />
      </div>
    );

  return <div>Icon not found</div>;
}

export default Icon;
