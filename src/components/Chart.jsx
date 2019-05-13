import React, { useCallback } from "react";
import styled from "styled-components";

import * as d3 from "d3";

const StyledSvg = styled.svg`
  margin-left: auto;
  margin-right: auto;
  display: block;
`;

const Chart = ({ data, margin, width, height }) => {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const keys = data.columns.slice(1);

  const stack = d3.stack().keys(keys);

  const x = d3
    .scaleTime()
    .range([0, innerWidth])
    .domain(d3.extent(data, d => d.date));

  const y = d3.scaleLinear().range([innerHeight, 0]);

  const z = d3.scaleOrdinal(d3.schemePastel1).domain(keys);

  const area = d3
    .area()
    .x(d => x(d.data.date))
    .y0(d => y(d[0]))
    .y1(d => y(d[1]));

  const bottomAxis = d3.axisBottom(x);
  const addXAxis = useCallback(
    g => {
      d3.select(g).call(bottomAxis);
    },
    [bottomAxis]
  );

  const leftAxis = d3.axisLeft(y).ticks(10, "%");
  const addYAxis = useCallback(
    g => {
      d3.select(g).call(leftAxis);
    },
    [leftAxis]
  );

  // Only shows name of browsers that have relevant information (i.e. diff > 0.01)
  return (
    <StyledSvg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {stack(data).map(stacked => (
          <g key={stacked.key}>
            <path d={area(stacked)} style={{ fill: z(stacked.key) }} />

            {stacked[stacked.length - 1][1] - stacked[stacked.length - 1][0] >
            0.01 ? (
              <text
                x={innerWidth - 6}
                y={y(
                  (stacked[stacked.length - 1][0] +
                    stacked[stacked.length - 1][1]) /
                    2
                )}
                dy={".35em"}
                style={{ font: "10px sans-serif", textAnchor: "end" }}
              >
                {stacked.key}
              </text>
            ) : null}
          </g>
        ))}
      </g>

      <g
        ref={addXAxis}
        transform={`translate(${margin.left}, ${innerHeight + margin.top})`}
      />

      <g
        ref={addYAxis}
        transform={`translate(${margin.left}, ${margin.top})`}
      />
    </StyledSvg>
  );
};

export default Chart;
