import React from "react";

const FilterLabel = ({ filterLabelText }) => {
  let bgType;
  if (filterLabelText === "normal") {
    bgType = "bg-[#a4acaf]";
  } else if (filterLabelText === "fighting") {
    bgType = "bg-[#d56723]";
  } else if (filterLabelText === "flying") {
    bgType = "bg-[#3dc7ef]";
  } else if (filterLabelText === "poison") {
    bgType = "bg-[#b97fc9]";
  } else if (filterLabelText === "ground") {
    bgType = "bg-[#f7de3f]";
  } else if (filterLabelText === "rock") {
    bgType = "bg-[#a38c21]";
  } else if (filterLabelText === "bug") {
    bgType = "bg-[#729f3f]";
  } else if (filterLabelText === "ghost") {
    bgType = "bg-[#7b62a3]";
  } else if (filterLabelText === "steel") {
    bgType = "bg-[#9eb7b8]";
  } else if (filterLabelText === "fire") {
    bgType = "bg-[#fd7d24]";
  } else if (filterLabelText === "water") {
    bgType = "bg-[#4592c4]";
  } else if (filterLabelText === "grass") {
    bgType = "bg-[#9bcc50]";
  } else if (filterLabelText === "electric") {
    bgType = "bg-[#eed535]";
  } else if (filterLabelText === "psychic") {
    bgType = "bg-[#f366b9]";
  } else if (filterLabelText === "ice") {
    bgType = "bg-[#51c4e7]";
  } else if (filterLabelText === "dragon") {
    bgType = "bg-[#f16e57] ";
  } else if (filterLabelText === "dark") {
    bgType = "bg-[#707070] ";
  } else if (filterLabelText === "fairy") {
    bgType = "bg-[#fdb9e9] ";
  } else {
  }

  return (
    <p className={`${bgType} px-2 py-1 rounded-lg capitalize text-white`}>
      {filterLabelText}
    </p>
  );
};

export default FilterLabel;
