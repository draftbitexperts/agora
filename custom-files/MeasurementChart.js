// This import is required if you are defining react components in this module.
import React, { useMemo } from 'react';

import {
  VictoryChart,
  VictoryScatter,
  VictoryAxis,
  VictoryTheme,
} from 'victory-native';

export function Index({ data, index }) {
  const fillColor = ['#12da49', '#37a7c0', '#9b100a', '#dd584d', '#68e780'];

  // Calculate the domain values dynamically based on data
  const domains = useMemo(() => {
    if (!data || data.length === 0) {
      return { x: [0, 5], y: [0, 10] }; // Default domain if no data
    }

    // Find max values with some padding
    const maxX = Math.max(...data.map(point => point.x));
    const maxY = Math.max(...data.map(point => point.y));

    // Ensure minimum domain width to avoid broken appearance
    const xDomain = [0, Math.max(5, maxX * 1.1)]; // Add 10% padding
    const yDomain = [0, Math.max(10, maxY * 1.1)]; // Add 10% padding

    return { x: xDomain, y: yDomain };
  }, [data]);

  //console.log(data, "DATAAAAAA");

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      height={300}
      width={360}
      domain={domains}
    >
      <VictoryScatter
        style={{ data: { fill: fillColor[index] } }}
        size={7}
        data={data}
      />

      {/* Configure the X-axis */}
      <VictoryAxis
        label="Week"
        //orientation = "bottom"
        style={{
          grid: { stroke: 'none' }, // Removes the grid lines for the X-axis
          axisLabel: { fontSize: 12, padding: 25 }, // Increase padding to move the label further away
          tickLabels: { fontSize: 15, padding: 5 }, // Adjust tick label font size, padding, and angle
        }}
        tickFormat={tick => Math.floor(tick)}
      />

      {/* Configure the Y-axis */}
      <VictoryAxis
        dependentAxis
        style={{
          grid: { stroke: 'none' }, // Removes the grid lines for the Y-axis
        }}
      />
    </VictoryChart>
  );
}
