// flex row wrap
// flex column 두개로 나누기
export default function Container({ children, column = false }) {
  if (column == true) {
    return (
      <div
        style={{
          width: "100%",
          maxWidth: "767px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          // height: "100dvh",
          minHeight: "100dvh",
        }}
      >
        {children}
      </div>
    );
  } else {
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
}
