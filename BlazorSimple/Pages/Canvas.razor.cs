using BlazorSimple.Interfaces;
using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace BlazorSimple.Pages
{
    class MyGraphic:IGraphics
    {
        IJSRuntime runtime;
        public MyGraphic(IJSRuntime jsruntime)
        {
            runtime = jsruntime;
        }
        public async Task DrawPoint(double x, double y)
        {
            await runtime.InvokeVoidAsync("drawPoint", x, y);
        }

        public async Task DrawLine(double x1, double y1, double x2, double y2)
        {
            await runtime.InvokeVoidAsync("drawLine", x1, y1,x2,y2);
        }
    }

}
