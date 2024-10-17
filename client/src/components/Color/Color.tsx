export const getColorsForDepartment = (department: string) => {
  let textColor = "black";
  let backgroundColor = "rgba(128, 128, 128, 0.05)";

  switch (department) {
    case "Công nghệ thông tin":
      textColor = "red";
      backgroundColor = "rgba(255, 0, 0, 0.05)";
      break;
    case "Quản trị kinh doanh":
      textColor = "blue";
      backgroundColor = "rgba(0, 0, 255, 0.05)";
      break;
    case "Thiết kế đồ họa":
      textColor = "gold";
      backgroundColor = "rgba(255, 215, 0, 0.05)";
      break;
    default:
      textColor = "gray";
      backgroundColor = "rgba(128, 128, 128, 0.05)";
  }

  return { textColor, backgroundColor };
};

const lightGray = "#F6F6F7";

export default { lightGray };
