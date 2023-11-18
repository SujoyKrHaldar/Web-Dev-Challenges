//  Hexadecimal values are 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A(10), B(11), C(12), D(13), E(14), F(15).
//  The color code is defined in values between 00 and FF.
//  Example color #502CCB

const colorCode = document.querySelector(".color-code");
const backgroundColor = document.getElementById("bg-color");

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    changeBackgroundColor();
  }
});

const changeBackgroundColor = () => {
  const bgColor = getRandomColorCode();

  backgroundColor.style.backgroundColor = bgColor;
  colorCode.innerHTML = bgColor;
  colorCode.style.color = bgColor;
};

const getRandomColorCode = () => {
  let color = "#";
  const colorValues = "0123456789ABCDEF";

  for (let i = 0; i < 6; i++) {
    const index = Math.floor(Math.random() * 16);
    color += colorValues[index];
  }

  return color;
};
