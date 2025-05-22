import React from 'react';
import AddPerson from '../../../assets/Icons/AddPerson.svg';
import ArrowBack from '../../../assets/Icons/ArrowBack.svg';
import Check from '../../../assets/Icons/Check.svg';
import ChevronLeft from '../../../assets/Icons/ChevronLeft.svg';
import ChevronRight from '../../../assets/Icons/ChevronRight.svg';
import Delete from '../../../assets/Icons/Delete.svg';
import Edit from '../../../assets/Icons/Edit.svg';
import Favorite from '../../../assets/Icons/Favorite.svg';
import FavoriteFilled from '../../../assets/Icons/FavoriteFilled.svg';
import Home from '../../../assets/Icons/Home.svg';
import HomeFilled from '../../../assets/Icons/HomeFilled.svg';
import More from '../../../assets/Icons/More.svg';
import Nudge from '../../../assets/Icons/Nudge 1.svg';
import OpenInNew from '../../../assets/Icons/OpenInNew.svg';
import Remove from '../../../assets/Icons/Remove.svg';
import Spaces from '../../../assets/Icons/Spaces.svg';
import SpacesFilled from '../../../assets/Icons/SpacesFilled.svg';
import Add from '../../../assets/Icons/Add.svg';
import Close from '../../../assets/Icons/Close.svg';
// Import more icons as needed

const icons = {
  AddPerson,
  ArrowBack,
  Check,      
  ChevronLeft,
  ChevronRight,
  Delete,
  Edit,
  Favorite,
  FavoriteFilled,
  Home,   
  HomeFilled,
  More,
  Nudge,
  OpenInNew,
  Remove,
  Spaces,
  SpacesFilled,
  Add,
  Close
  // Add more icons here with their keys
} as const; // This ensures TypeScript treats these as literal strings

// Create a type for the icon names
export type IconName = keyof typeof icons;

interface IconProps {
  name: IconName; // Enforce valid icon names
  width?: number;
  height?: number;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ name, width = 24, height = 24, color = "black" }) => {
  const SvgIcon = icons[name]; // Find the icon by its name

  if (!SvgIcon) {
    return null; 
  }

  return <SvgIcon width={width} height={height} fill={color} />;
};

export default Icon;
