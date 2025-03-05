export default function Container({ children }) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "767px",
        margin: "auto",
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
        backgroundColor: "#fff",
        // height: "100dvh",
        minHeight: "100dvh",
      }}
    >
      {children}
    </div>
  );
}
