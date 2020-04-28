using BlazorSimple.Interfaces;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlazorSimple.Pages
{
	class MyGraphic : IBaseGraphic
	{
		IJSRuntime runtime;
		public MyGraphic(IJSRuntime jsruntime)
		{
			runtime = jsruntime;
		}

		public void DrawIndexedLines(IList<Vector3D> vertices, IEnumerable<(int, int, Color)> lines, LineTypes type = LineTypes.ltSolid, Thickness thickness = Thickness.Small, bool IsTopMost = false)
		{
			float[] raw_points = new float[vertices.Count * 7];

			// Put vertices to raw
			int i = 0;
			foreach (var vertex in vertices)
			{
				raw_points[i] = (float)vertex.X;
				raw_points[i + 1] = (float)vertex.Y;
				raw_points[i + 2] = (float)vertex.Z;

				i += 7;
			}

			// Create indices array
			int[] raw_indices = new int[lines.Count() * 2];

			int index = 0;
			// Put color to raw
			foreach (var line in lines)
			{
				raw_points[line.Item1 * 7 + 3] = (float)line.Item3.R / 255;
				raw_points[line.Item1 * 7 + 4] = (float)line.Item3.G / 255;
				raw_points[line.Item1 * 7 + 5] = (float)line.Item3.B / 255;
				raw_points[line.Item1 * 7 + 6] = (float)line.Item3.A / 255;

				raw_points[line.Item2 * 7 + 3] = (float)line.Item3.R / 255;
				raw_points[line.Item2 * 7 + 4] = (float)line.Item3.G / 255;
				raw_points[line.Item2 * 7 + 5] = (float)line.Item3.B / 255;
				raw_points[line.Item2 * 7 + 6] = (float)line.Item3.A / 255;

				raw_indices[index++] = line.Item1;
				raw_indices[index++] = line.Item2;
			}

			runtime.InvokeVoidAsync("Entry.drawLines", raw_points, raw_indices);
		}

		public void DrawPoints(IEnumerable<Vector3D> Points, Color color, PointTypes type, Thickness size, bool IsTopMost = true)
		{
			float[] raw_points = new float[Points.Count() * 3];

			int i = 0;
			foreach (var point in Points)
			{
				raw_points[i * 3] = (float)point.X;
				raw_points[i * 3 + 1] = (float)point.Y;
				raw_points[i * 3 + 2] = (float)point.Z;
				i++;
			}

			float[] raw_color = new float[4] { (float)color.R / 255, (float)color.G / 255, (float)color.B / 255, (float)color.A / 255 };

			runtime.InvokeVoidAsync("Entry.drawPoints", raw_points, raw_color, 0, (int)size * 2);
		}
	}
}
