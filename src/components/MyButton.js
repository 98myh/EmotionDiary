const MyButton = ({ text, type, onClick }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default";
  //posivite나 negative가 아니면 강제로 default로 바꿈

  return (
    <button
      className={["MyButton", `MyButton_${btnType}`].join(" ")} //type에 따라 클래스이름 바뀜
      onClick={onClick}
    >
      {text}
    </button>
  );
};

MyButton.defaultProps = {
  type: "default",
};
export default MyButton;
