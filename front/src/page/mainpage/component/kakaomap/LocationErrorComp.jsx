import "../../MainPage.css";
export default function LocationErrorComp({ des }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="">{des}</div>
    </div>
  );
}
