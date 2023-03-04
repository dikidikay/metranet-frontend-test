export const bgType = (type: string) => {
  let bgType;
  switch (type) {
    case "normal":
      bgType = "bg-[#a4acaf]";
      break;
    case "fighting":
      bgType = "bg-[#d56723]";
      break;
    case "flying":
      bgType = "bg-[#3dc7ef]";
      break;
    case "poison":
      bgType = "bg-[#b97fc9]";
      break;
    case "ground":
      bgType = "bg-[#f7de3f]";
      break;
    case "rock":
      bgType = "bg-[#a38c21]";
      break;
    case "bug":
      bgType = "bg-[#729f3f]";
      break;
    case "ghost":
      bgType = "bg-[#7b62a3]";
      break;
    case "steel":
      bgType = "bg-[#9eb7b8]";
      break;
    case "fire":
      bgType = "bg-[#fd7d24]";
      break;
    case "water":
      bgType = "bg-[#4592c4]";
      break;
    case "grass":
      bgType = "bg-[#9bcc50]";
      break;
    case "electric":
      bgType = "bg-[#eed535]";
      break;
    case "psychic":
      bgType = "bg-[#f366b9]";
      break;
    case "ice":
      bgType = "bg-[#51c4e7]";
      break;
    case "dragon":
      bgType = "bg-[#f16e57] ";
      break;
    case "dark":
      bgType = "bg-[#707070] ";
      break;
    case "fairy":
      bgType = "bg-[#fdb9e9] ";
      break;
    default:
      break;
  }

  return bgType;
};
