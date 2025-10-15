import React from 'react';
import { LucideIcon } from 'lucide-react';
import { getIcon } from '@/lib/iconMap';
import { StrapiIcon } from '@/lib/types';

interface DynamicIconProps {
  icon: StrapiIcon | string | null | undefined;
  className?: string;
  size?: number;
}

/**
 * DynamicIcon component handles both Lucide icons and custom SVG icons from Strapi IconHub.
 *
 * @param icon - Can be a Strapi icon object with iconData, a string, or null
 * @param className - CSS classes to apply to the icon
 * @param size - Size of the icon (default: 24)
 */
export const DynamicIcon: React.FC<DynamicIconProps> = ({ icon, className = '', size = 24 }) => {
  // If icon is null or undefined, use default icon
  if (!icon) {
    const DefaultIcon = getIcon(null);
    return <DefaultIcon className={className} size={size} />;
  }

  // If icon is an object with iconData (Strapi IconHub custom SVG)
  if (typeof icon === 'object' && icon.iconData) {
    const width = icon.width || size;
    const height = icon.height || size;

    return (
      <svg
        className={className}
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        xmlns="http://www.w3.org/2000/svg"
        dangerouslySetInnerHTML={{ __html: icon.iconData }}
      />
    );
  }

  // Otherwise, try to get the Lucide icon
  const LucideIconComponent = getIcon(icon);
  return <LucideIconComponent className={className} size={size} />;
};

export default DynamicIcon;
