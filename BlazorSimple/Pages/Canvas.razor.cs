using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace BlazorSimple.Pages
{
	public class CanvasBase: ComponentBase, Interfaces.IGraphics
	{
		public async Task DrawPoint(IJSRuntime js, double x, double y)
		{
			await js.InvokeVoidAsync("drawPoint", x, y);
		}

		public async Task DrawLine(IJSRuntime js, double x1, double y1, double x2, double y2)
		{
			await js.InvokeVoidAsync("drawLine", x1, y1, x2, y2);
		}

	}
}
