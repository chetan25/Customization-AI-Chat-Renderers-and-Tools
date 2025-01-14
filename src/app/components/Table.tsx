/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
export const Table = ({ content }: { content: any }) => {
  // Parse the content to extract table data
  const parseTableContent = (content: any) => {
    try {
      return {
        headers: content.headers,
        data: content.data,
        title: content.title,
      };
    } catch (error: any) {
      console.warn(error);
      return {
        headers: [],
        data: [],
        title: "Error parsing table data",
      };
    }
  };

  const { headers, data, title } = parseTableContent(content);

  // If no data, show placeholder
  if (!data.length || !headers.length) {
    return (
      <div className="p-4 border rounded bg-gray-50">
        <p className="text-gray-500">No data available for table</p>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-50">
              {headers.map((header: any, index: number) => (
                <th
                  key={index}
                  className="px-6 py-3 border-b text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((row: any, rowIndex: number) => (
              <tr key={rowIndex}>
                {row.map((cell: any, cellIndex: number) => (
                  <td
                    key={cellIndex}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export const formatChartData = (data: any, type = "line") => {
  return `/chart type=${type} data=${JSON.stringify(
    data
  )} title="Data Visualization"`;
};

export const formatTableData = (headers: any, data: any) => {
  return `/table headers=${JSON.stringify(headers)} data=${JSON.stringify(
    data
  )} title="Data Table"`;
};
