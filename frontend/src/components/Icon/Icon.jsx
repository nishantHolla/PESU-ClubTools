import { Icon as Iconify } from '@iconify/react';

function Icon({ type, className, ...props }) {
  return <Iconify icon={type} className={`icon ${className}`} {...props}/>
}

export default Icon;
