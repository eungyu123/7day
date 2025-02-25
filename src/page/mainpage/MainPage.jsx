import "./MainPage.css";
import { useAppContext } from "../../context/context";
import MainHeader from "../../component/mainPage/MainHeader";
import {
  decreaseCount,
  increseCount,
  setCount,
} from "../../context/reducer/action/action";

export default function MainPage() {
  const { appState, dispatch } = useAppContext();
  console.log(appState, dispatch);
  return (
    <div className="container">
      <MainHeader />
      <div>{appState.count}</div>
      <span class="material-symbols-outlined">home</span>
      <button onClick={() => dispatch(increseCount())}>증가</button>
      <button onClick={() => dispatch(decreaseCount())}>감소</button>
      <button onClick={() => dispatch(setCount({ count: 5 }))}>
        5로 고정{" "}
      </button>
    </div>
  );
}
