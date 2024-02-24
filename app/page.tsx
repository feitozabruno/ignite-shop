import { styled } from "@/app/styles/stitches.config";

const Button = styled("button", {
  border: "none",
  backgroundColor: "#fff",
  padding: "4px 8px",
  color: "#000",
  fontSize: "16px",
});

export default function Home() {
  return (
    <>
      <h1>Next App</h1>
      <Button>Start</Button>
    </>
  );
}
