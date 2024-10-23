import dynamic from "next/dynamic";

export default function Home() {
  const MyMap = dynamic(() => import('@/app/components/Map'), {
    ssr: false,
  });

  return <div>
    <MyMap position={[62.605097, 29.741751]} zoom={13} style={{height: 400, width: "100%"}}/>
  </div>
}
