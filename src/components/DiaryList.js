import { useNavigate } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import DiaryItem from "./DiaryItem";
import MyButton from "./MyButton";

const sortOptionList = [
  { value: "latest", name: "최신순" },
  { value: "oldest", name: "오래된 순" },
];

const filterOptionList = [
  { value: "all", name: "전부다" },
  { value: "good", name: "좋은 감정만" },
  { value: "bad", name: "안좋은 감정만" },
];

//최신순 오래된순
const ControlMenu = ({ value, onChange, optionList }) => {
  //value : 현재값 , onChange : 필터를 바꾸는 함수 , optionList : filterOptionList
  return (
    <select
      className="ControlMenu"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {optionList.map((it, idx) => (
        <option key={idx} value={it.value}>
          {it.name}
        </option>
      ))}
    </select>
  );
};

const DiaryList = ({ diaryList }) => {
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("lastest");
  const [filter, setFilter] = useState("all");

  //다이어리 최신순 오래된순 정렬 작업
  const getProcessedDiaryList = () => {
    //diaryList.sort 를 쓰면 원본 배열 자체가 정렬이 되어버리기때문에 사용x
    //깊은 복사를 통해 데이터를 붙여넣을꺼다

    const copyList = JSON.parse(JSON.stringify(diaryList));
    //diaryList를 JSON화를 시켜서 문자(stringify)로 바꿔버리고
    //문자열로 바뀐것을 parse시키면 다시 배열로 복구화 시켜서 copyList에 넣어줌

    //날짜 비교
    const compare = (a, b) => {
      if (sortType === "latest") {
        return parseInt(b.date) - parseInt(a.date);
      } else {
        return parseInt(a.date) - parseInt(b.date);
      }
    };

    //emotion 비교
    const filterCallBack = (item) => {
      if (filter === "good") {
        return parseInt(item.emotion) <= 3;
      } else {
        return parseInt(item.emotion) > 3;
      }
    };

    //emotion값에 따라 삼항연산 처리
    const filteredList =
      filter === "all" ? copyList : copyList.filter((it) => filterCallBack(it));

    const sortedList = filteredList.sort(compare);
    return sortedList;
  };

  return (
    <div className="DiaryList">
      <div className="menu_wrapper">
        <div className="left_col">
          <ControlMenu
            value={sortType}
            onChange={setSortType}
            optionList={sortOptionList}
          />
          <ControlMenu
            value={filter}
            onChange={setFilter}
            optionList={filterOptionList}
          />
        </div>
        <div className="right_col">
          <MyButton
            type={"positive"}
            text={"새 일기쓰기"}
            onClick={() => navigate("/new")}
          />
        </div>
      </div>

      {getProcessedDiaryList().map((it) => (
        <DiaryItem key={it.id} {...it} />
      ))}
    </div>
  );
};
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
