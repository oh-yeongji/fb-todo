import React, { useEffect, useRef } from "react";
import anime from "animejs/lib/anime.es.js";
import KakaoMaps from "../components/KakaoMaps";
import KakaoLogin from "../components/KakaoLogin";
const Home = () => {
  //html 태그를 참조해서 활용하고 싶다.
  const h1 = useRef(null);

  useEffect(() => {
    //useRef를 통해서 참조한 html태그는 .current로 접근
    anime({
      targets: h1.current,
      //   translateX: 250,
      //   rotate: "1turn",
      //   backgroundColor: "#FFF",
      //   duration: 800,
    });
  }, []);
  return (
    <div>
      <KakaoLogin />
      <h1 ref={h1}>Home</h1>
      <KakaoMaps />
    </div>
  );
};

export default Home;
