import { chartData } from "@/lib/mockChart";
import { ResponsiveBar, DataProps } from "@nivo/bar";

type BarChartProps = {
  title: string;
  data: { id: string; [key: string]: number | string }[];
  keys: string[];
};

export default function BarChart({ title, data, keys }: BarChartProps) {
  return (
    <ResponsiveBar
      data={data}
      keys={["votes"]}
      indexBy="id"
      margin={{ top: 50, right: 150, bottom: 50, left: 150 }}
      padding={0.3}
      layout="horizontal"
      groupMode="grouped"
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={["#1E1E1E", "#232323", "#2C2C2C", "#333", "#363636", "#383838"]}
      axisTop={null}
      axisRight={null}
      axisLeft={{
        format: (v) => {
          console.log(v.slice(0, 6));
          return v;
        },
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      //   axisBottom={{
      //     tickSize: 5,
      //     tickPadding: 5,
      //     tickRotation: 0,
      //     legend: "country",
      //     legendPosition: "middle",
      //     legendOffset: 32,
      //   }}
      //   axisLeft={{
      //     tickSize: 5,
      //     tickPadding: 5,
      //     tickRotation: 0,
      //     legend: "food",
      //     legendPosition: "middle",
      //     legendOffset: -40,
      //   }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor="#ffffff"
      //   legends={[
      //     {
      //       dataFrom: "keys",
      //       anchor: "bottom-right",
      //       direction: "column",
      //       justify: false,
      //       translateX: 120,
      //       translateY: 0,
      //       itemsSpacing: 2,
      //       itemWidth: 100,
      //       itemHeight: 20,
      //       itemDirection: "left-to-right",
      //       itemOpacity: 0.85,
      //       symbolSize: 20,
      //       effects: [
      //         {
      //           on: "hover",
      //           style: {
      //             itemOpacity: 1,
      //           },
      //         },
      //       ],
      //     },
      //   ]}
      role="application"
      ariaLabel="Nivo bar chart demo"
      //   barAriaLabel={(e) =>
      //     e.id + ": " + e.formattedValue + " in country: " + e.indexValue
      //   }
    />
  );
}
