import { baseChartOptions } from "./ChartConstants";

// function to create chart options with different options if they are needed
export const createChartOptions = (customOptions = {}) => {
  return {
    ...baseChartOptions,
    ...customOptions,
    plugins: {
      ...baseChartOptions.plugins,
      ...(customOptions.plugins || {}),
      title: {
        ...baseChartOptions.plugins.title,
        ...(customOptions.plugins?.title || {})
      },
      legend: {
        ...baseChartOptions.plugins.legend,
        ...(customOptions.plugins?.legend || {})
      },
      tooltip: {
        ...(customOptions.plugins?.tooltip || {})
      }
    },
    scales: customOptions.scales || {}
  };
};
