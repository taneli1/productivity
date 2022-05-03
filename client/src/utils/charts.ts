import * as am5 from "@amcharts/amcharts5";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5xy from "@amcharts/amcharts5/xy";
import { IDateEntry } from "../data/model/overview";

export const setupWeekChart = (
  root: am5.Root,
  data: IDateEntry[],
  color: string
) => {
  root.setThemes([am5themes_Animated.new(root)]);

  const dataMinutes = data.map((it) => {
    return {
      date: it.date,
      time: it.totalTimeSeconds / 60,
    };
  });

  const chart = root.container.children.push(
    am5xy.XYChart.new(root, {
      panY: false,
      layout: root.verticalLayout,
    })
  );

  const yAxis = chart.yAxes.push(
    am5xy.ValueAxis.new(root, {
      renderer: am5xy.AxisRendererY.new(root, {}),
    })
  );

  const xAxis = chart.xAxes.push(
    am5xy.CategoryAxis.new(root, {
      renderer: am5xy.AxisRendererX.new(root, {}),
      categoryField: "date",
    })
  );
  xAxis.get("renderer").setAll({ minGridDistance: 20 });

  xAxis.data.setAll(dataMinutes);

  const series = chart.series.push(
    am5xy.ColumnSeries.new(root, {
      name: "Minutes worked",
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "time",
      categoryXField: "date",
      fill: am5.color(color),
      stroke: am5.color(color),
    })
  );
  series.columns.template.setAll({
    fillOpacity: 0.5,
    strokeWidth: 2,
    cornerRadiusTL: 5,
    cornerRadiusTR: 5,
  });
  series.data.setAll(dataMinutes);

  let legend = chart.children.push(am5.Legend.new(root, {}));
  legend.data.setAll(chart.series.values);
};
