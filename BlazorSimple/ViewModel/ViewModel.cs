using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive;
using System.Reactive.Subjects;
using System.Threading.Tasks;
using BlazorSimple.Interfaces;
using DynamicData;
using ReactiveUI;

namespace BlazorSimple
{
    public class ViewModel : ReactiveObject
    {
        SourceList<(double,double)> Points=new SourceList<(double, double)>();
        public ReactiveCommand<(double,double),Unit> AddPoint { get; }
        public Subject<Unit> NeedRender { get; } = new Subject<Unit>();
        public ViewModel()
        {
            AddPoint = ReactiveCommand.CreateFromTask<(double, double)>(async p => await Task.Run(()=>Points.Add(p)));
            Points.Connect().CountChanged().Subscribe(_ => NeedRender.OnNext(default));
        }
        public async Task Render(IGraphics graphics)
        {
            var first = Points.Items.FirstOrDefault();
            foreach (var current in Points.Items.Skip(1)) 
            {
                await graphics.DrawLine(first.Item1, first.Item2, current.Item1, current.Item2);
                first = current;
            }
        }
    }
}
