using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace BlazorSimple.Interfaces
{
	public interface IGraphics
	{
		Task DrawPoint(double x, double y);
		Task DrawLine(double x1, double y1, double x2, double y2);
	}
}
