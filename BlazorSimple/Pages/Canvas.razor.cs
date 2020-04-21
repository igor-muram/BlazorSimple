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

		public void DrawPoints(IEnumerable<Vector3D> Points, Color color, PointTypes type, Thickness size, bool IsTopMost = true)
		{
			Vector3D[] points = Points.ToArray();
			float[] raw_points = new float[points.Length * 3];

			for (int i = 0; i < points.Length; i++)
			{
				raw_points[i * 3] = (float)points[i].X;
				raw_points[i * 3 + 1] = (float)points[i].Y;
				raw_points[i * 3 + 2] = (float)points[i].Z;
			}

			float[] raw_color = new float[4] { color.R, color.G, color.B, color.A };

			runtime.InvokeVoidAsync("Entry.drawPoints", raw_points, raw_color, 0, 10.0);
		}
	}
}
