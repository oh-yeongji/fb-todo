import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const TodoChart = () => {
  //data는 백에 달라고 해야함.
  const data = [
    { bottle: "365ml", cola: 1200, cidar: 1000, fanta: 1100 },
    { bottle: "500ml", cola: 2200, cidar: 2000, fanta: 2100 },
    { bottle: "1000ml", cola: 3200, cidar: 3000, fanta: 3100 },
  ];

  return (
    <div className="p-6 mt-5 shadow rounded bg-white">
      <h2>TodoChart</h2>
      <div style={{ height: "400px" }}>
        <ResponsiveBar
          //위에서 만들어놓은 데이터
          data={data}
          //key => 반복을 시킨다.
          //chart에서 보여질 데이터 key(측정되는 값)
          keys={["cola", "cidar", "fanta"]}
          //key를 그룹화하는 index key (분류)
          indexBy="bottle"
          //차트 간의 여백(bar 간의 여백)
          padding={0.3}
          //차트의 색상
          colors={["olive", "brown", "orange"]}
          //색상을 적용함.
          colorBy="id"
          //테마 설정
          theme={[
            {
              //lable 스타일(bar에 표현되는 글씨)
              labels: {
                text: {
                  fontSize: 14,
                  fill: "#000000",
                },
              },
              //legend 스타일 (우측하단에 있는 색상별 Key 표시)
              legends: {
                text: {
                  fontSize: 10,
                  fill: "#ff0000",
                },
              },
              //axios legend 스타일 (bottom,left 글씨)
              axios: {
                legend: {
                  text: {
                    fontSize: 20,
                    fill: "#ffff00",
                  },
                },
                ticks: {
                  text: {
                    fontSize: 16,
                    fill: "#0000ff",
                  },
                },
              },
            },
          ]}
          //axis Bottom 설정
            axisBottom={{
                tickSize:5, // 값 설명하기 위해 보여지는 점 크기
                tickPadding:5,
                tickRotation:0, // 점의 기울기
            }}
          enableGridY={true}
          
          enableLabel={false}
        />
      </div>
    </div>
  );
};

export default TodoChart;
