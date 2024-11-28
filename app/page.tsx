import dynamic from "next/dynamic";
import Feedback from "./components/feedback/Feedback";

export default function Home() {
  const MyMap = dynamic(() => import('@/app/components/map/Map'), {
    ssr: false,
  });

  return <div>
    <h1>Sijaintien tallentaja</h1>

    <p>Klikkaa karttaa lisätäksei uuden sijainnin</p>
    <MyMap position={[62.605097, 29.741751]} zoom={13} style={{height: 400, width: "min(75%, 1440px)", margin: "0 auto"}}/>
    <Feedback />
  </div>
}
