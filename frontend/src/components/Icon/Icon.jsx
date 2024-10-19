import "./icon_style.css";

import EvaMenu from "./svgs/eva-menu.svg?react";
import EvaClose from "./svgs/eva-close.svg?react";
import EvaLock from "./svgs/eva-lock.svg?react";
import EvaEye from "./svgs/eva-eye.svg?react";
import EvaEyeOff from "./svgs/eva-eye-off.svg?react";
import EvaMail from "./svgs/eva-mail.svg?react";
import EvaPerson from "./svgs/eva-person.svg?react";
import EvaError from "./svgs/eva-error.svg?react";
import EvaWarning from "./svgs/eva-warning.svg?react";
import EvaSuccess from "./svgs/eva-success.svg?react";
import EvaCheck from "./svgs/eva-check.svg?react";
import EvaArrowDown from "./svgs/eva-arrow-down.svg?react";
import EvaBrush from "./svgs/eva-brush.svg?react";
import EvaSettings from "./svgs/eva-settings.svg?react";
import EvaCube from "./svgs/eva-cube.svg?react";

const iconMap = {
  "eva:menu": EvaMenu,
  "eva:close": EvaClose,
  "eva:lock": EvaLock,
  "eva:eye": EvaEye,
  "eva:eye-off": EvaEyeOff,
  "eva:mail": EvaMail,
  "eva:person": EvaPerson,
  "eva:error": EvaError,
  "eva:warning": EvaWarning,
  "eva:success": EvaSuccess,
  "eva:check": EvaCheck,
  "eva:arrow-down": EvaArrowDown,
  "eva:brush": EvaBrush,
  "eva:settings": EvaSettings,
  "eva:cube": EvaCube,
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
