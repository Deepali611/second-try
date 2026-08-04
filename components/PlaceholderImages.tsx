import React from 'react';

export const CategoryIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'veggies':
      return (
        <svg viewBox="0 0 100 100" className="w-14 h-14 object-contain">
          <circle cx="35" cy="55" r="22" fill="#4CAF50" />
          <circle cx="62" cy="55" r="18" fill="#FF5722" />
          <path d="M50 30 Q65 15 75 35 Q60 45 50 30 Z" fill="#8BC34A" />
          <path d="M30 40 Q20 20 40 25 Q35 38 30 40 Z" fill="#388E3C" />
          <ellipse cx="65" cy="48" rx="4" ry="7" fill="#FF8A65" opacity="0.6" />
        </svg>
      );
    case 'atta':
      return (
        <svg viewBox="0 0 100 100" className="w-14 h-14 object-contain">
          <rect x="25" y="30" width="50" height="55" rx="6" fill="#D7CCC8" />
          <rect x="30" y="35" width="40" height="45" rx="4" fill="#E8D5B5" />
          <path d="M35 45 H65 V70 H35 Z" fill="#C0A062" />
          <text x="50" y="60" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">ATTA</text>
          <circle cx="50" cy="22" r="10" fill="#4CAF50" />
        </svg>
      );
    case 'oil':
      return (
        <svg viewBox="0 0 100 100" className="w-14 h-14 object-contain">
          <rect x="20" y="35" width="28" height="50" rx="4" fill="#FFD54F" />
          <rect x="28" y="22" width="12" height="13" fill="#F57C00" />
          <path d="M55 40 L75 48 L80 85 H55 Z" fill="#D32F2F" />
          <text x="34" y="65" textAnchor="middle" fill="#5D4037" fontSize="8" fontWeight="bold">OIL</text>
          <text x="67" y="70" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold">SPICE</text>
        </svg>
      );
    case 'dairy':
      return (
        <svg viewBox="0 0 100 100" className="w-14 h-14 object-contain">
          <rect x="20" y="30" width="30" height="55" rx="5" fill="#42A5F5" />
          <path d="M20 30 L35 15 L50 30 Z" fill="#90CAF9" />
          <rect x="55" y="45" width="30" height="40" rx="4" fill="#FFF9C4" />
          <text x="70" y="68" textAnchor="middle" fill="#FBC02D" fontSize="9" fontWeight="bold">MILK</text>
          <circle cx="78" cy="35" r="8" fill="#FFFFFF" />
        </svg>
      );
    case 'bakery':
      return (
        <svg viewBox="0 0 100 100" className="w-14 h-14 object-contain">
          <rect x="18" y="40" width="40" height="45" rx="6" fill="#8D6E63" />
          <circle cx="70" cy="55" r="18" fill="#FFB74D" />
          <circle cx="65" cy="50" r="3" fill="#5D4037" />
          <circle cx="75" cy="60" r="3.5" fill="#5D4037" />
          <text x="38" y="65" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">BREAD</text>
        </svg>
      );
    case 'chips':
      return (
        <svg viewBox="0 0 100 100" className="w-14 h-14 object-contain">
          <path d="M25 25 Q50 15 75 25 L80 80 Q50 90 20 80 Z" fill="#E53935" />
          <ellipse cx="50" cy="55" rx="20" ry="14" fill="#FFEB3B" />
          <text x="50" y="58" textAnchor="middle" fill="#D81B60" fontSize="9" fontWeight="bold">CHIPS</text>
        </svg>
      );
    case 'sweets':
      return (
        <svg viewBox="0 0 100 100" className="w-14 h-14 object-contain">
          <rect x="20" y="35" width="32" height="45" rx="4" fill="#5D4037" />
          <circle cx="68" cy="58" r="18" fill="#F4511E" />
          <circle cx="68" cy="58" r="12" fill="#FF8A65" />
          <text x="36" y="60" textAnchor="middle" fill="#FFD54F" fontSize="8" fontWeight="bold">SILK</text>
        </svg>
      );
    case 'drinks':
      return (
        <svg viewBox="0 0 100 100" className="w-14 h-14 object-contain">
          <rect x="22" y="30" width="22" height="55" rx="6" fill="#FF9800" />
          <rect x="52" y="25" width="26" height="60" rx="4" fill="#B71C1C" />
          <path d="M28 20 H38 V30 H28 Z" fill="#F57C00" />
          <text x="33" y="60" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold">JUICE</text>
          <text x="65" y="60" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">COLA</text>
        </svg>
      );
    case 'tea':
      return (
        <svg viewBox="0 0 100 100" className="w-14 h-14 object-contain">
          <rect x="25" y="28" width="50" height="58" rx="6" fill="#2E7D32" />
          <circle cx="50" cy="55" r="16" fill="#FFD54F" />
          <text x="50" y="59" textAnchor="middle" fill="#1B5E20" fontSize="9" fontWeight="bold">TEA</text>
        </svg>
      );
    case 'instant':
      return (
        <svg viewBox="0 0 100 100" className="w-14 h-14 object-contain">
          <rect x="20" y="30" width="60" height="50" rx="6" fill="#FBC02D" />
          <path d="M30 45 C40 35 60 55 70 45" stroke="#D84315" strokeWidth="4" fill="none" />
          <text x="50" y="68" textAnchor="middle" fill="#B71C1C" fontSize="9" fontWeight="bold">NOODLES</text>
        </svg>
      );
    case 'personal':
      return (
        <svg viewBox="0 0 100 100" className="w-14 h-14 object-contain">
          <rect x="25" y="35" width="22" height="50" rx="10" fill="#EC407A" />
          <rect x="55" y="30" width="24" height="55" rx="5" fill="#00ACC1" />
          <circle cx="36" cy="25" r="6" fill="#F48FB1" />
          <text x="67" y="60" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold">WASH</text>
        </svg>
      );
    case 'baby':
      return (
        <svg viewBox="0 0 100 100" className="w-14 h-14 object-contain">
          <path d="M30 30 H70 V75 Q50 85 30 75 Z" fill="#29B6F6" />
          <rect x="40" y="20" width="20" height="10" rx="3" fill="#FFF" />
          <text x="50" y="55" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold">BABY</text>
        </svg>
      );
    case 'household':
      return (
        <svg viewBox="0 0 100 100" className="w-14 h-14 object-contain">
          <rect x="25" y="30" width="24" height="55" rx="4" fill="#7E57C2" />
          <rect x="55" y="40" width="25" height="45" rx="4" fill="#26A69A" />
          <path d="M37 20 L30 30 H44 Z" fill="#9FA8DA" />
        </svg>
      );
    case 'electronics':
      return (
        <svg viewBox="0 0 100 100" className="w-14 h-14 object-contain">
          <rect x="20" y="35" width="60" height="45" rx="8" fill="#37474F" />
          <circle cx="35" cy="57" r="10" fill="#FF4081" />
          <circle cx="65" cy="57" r="10" fill="#FF4081" />
          <path d="M35 35 Q50 20 65 35" stroke="#B0BEC5" strokeWidth="4" fill="none" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" className="w-14 h-14 object-contain">
          <rect x="20" y="25" width="60" height="55" rx="8" fill="#90A4AE" />
          <circle cx="50" cy="52" r="15" fill="#ECEFF1" />
        </svg>
      );
  }
};
