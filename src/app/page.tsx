import Image from "next/image";

export default function Home() {
  return (
    <>
      <Image src={"/lebron.jpg"} alt={"Lebron James"} fill />
    </>
  );
}
