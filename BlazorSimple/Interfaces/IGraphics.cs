using Microsoft.JSInterop;
using System.Threading.Tasks;
using System.Collections.Generic;
using System;

namespace BlazorSimple.Interfaces
{
	public interface IEquatable<T>
	{
		bool Equals(T other);
	}

	public struct Vector3D : IEquatable<Vector3D>
	{
		public static readonly Vector3D Zero = new Vector3D(0, 0, 0);
		public static readonly Vector3D XAxis = new Vector3D(1, 0, 0);
		public static readonly Vector3D YAxis = new Vector3D(0, 1, 0);
		public static readonly Vector3D ZAxis = new Vector3D(0, 0, 1);
		public static readonly Vector3D[] Axes = { XAxis, YAxis, ZAxis };

		public double X { get; }
		public double Y { get; }
		public double Z { get; }

		public Vector3D(double x, double y, double z)
		{
			X = x;
			Y = y;
			Z = z;
		}

		public double this[int i]
		{
			get
			{
				switch (i)
				{
					case 0: return X;
					case 1: return Y;
					case 2: return Z;
					default: throw new System.IndexOutOfRangeException();
				}
			}
		}

		public bool Equals(Vector3D other)
		{
			throw new NotImplementedException();
		}
	}

	public struct Color
	{
		byte r, g, b, a;
		public byte R { get => r; set => r = value; }
		public byte G { get => g; set => g = value; }
		public byte B { get => b; set => b = value; }
		public byte A { get => a; set => a = value; }
		private Color(byte R, byte G, byte B, byte A) { r = R; g = G; b = B; a = A; }
		//public Color(uint rgba) { r = (byte)(rgba & 0xff); g = (byte)((rgba >> 8) & 0xff); b = (byte)((rgba >> 16) & 0xff); a = (byte)((rgba >> 24) & 0xff); }
		public static Color FromRGBA(byte R, byte G, byte B, byte A) { return new Color(R, G, B, A); }


		public static Color FromRGBA(uint rgba) { return new Color((byte)(rgba & 0xff), (byte)((rgba >> 8) & 0xff), (byte)((rgba >> 16) & 0xff), (byte)((rgba >> 24) & 0xff)); }
		public static Color FromARGB(uint argb) { return new Color((byte)((argb >> 8) & 0xff), (byte)((argb >> 16) & 0xff), (byte)((argb >> 24) & 0xff), (byte)(argb & 0xff)); }

		public uint RGBA() => ((uint)R | (((uint)(G)) << 8)) | (((uint)(B)) << 16) | (((uint)(A)) << 24);
		public uint ARGB() => ((uint)A | (((uint)(R)) << 8)) | (((uint)(G)) << 16) | (((uint)(B)) << 24);

		public static Color BLACK = new Color(0, 0, 0, 255);
		public static Color BLUE = new Color(0, 0, 180, 255);
		public static Color GREEN = new Color(0, 128, 0, 255);
		public static Color CYAN = new Color(0, 128, 128, 255);
		public static Color RED = new Color(128, 0, 0, 255);
		public static Color MAGENTA = new Color(128, 0, 128, 255);
		public static Color BROWN = new Color(128, 128, 0, 255);
		public static Color LIGHTGRAY = new Color(192, 192, 192, 255);
		public static Color DARKGRAY = new Color(128, 128, 128, 255);
		public static Color LIGHTBLUE = new Color(0, 0, 255, 255);
		public static Color LIGHTGREEN = new Color(0, 255, 0, 255);
		public static Color LIGHTCYAN = new Color(0, 255, 255, 255);
		public static Color LIGHTRED = new Color(255, 0, 0, 255);
		public static Color LIGHTMAGENTA = new Color(255, 0, 255, 255);
		public static Color YELLOW = new Color(255, 255, 0, 255);
		public static Color WHITE = new Color(255, 255, 255, 255);
		public static Color GRAYEDYELLOW = new Color(200, 200, 20, 255);
		public static Color CGEColor0 = new Color(255, 255, 255, 255);
		public static Color CGEColor1 = new Color(85, 85, 255, 255);
		public static Color CGEColor2 = new Color(120, 200, 255, 255);
		public static Color CGEColor3 = new Color(150, 255, 255, 255);
		public static Color CGEColor4 = new Color(150, 255, 150, 255);
		public static Color CGEColor5 = new Color(255, 255, 120, 255);
		public static Color CGEColor6 = new Color(255, 150, 100, 255);
		public static Color CGEColor7 = new Color(255, 100, 100, 255);
		public static Color CGEColor8 = new Color(255, 255, 255, 255);
		public static Color CGEBW1 = new Color(80, 80, 80, 255);
		public static Color CGEBW2 = new Color(175, 175, 175, 255);
		public static Color DARKGRAYTRANSPARENT = new Color(128, 128, 128, 128);
	}

	public enum Thickness { Small, Medium, Large };

	public enum PointTypes { Nail, Hook, SolidSphere, SQUARE, SQUARE_FILLED, TRIANGLE, TRIANGLE_FILLED, CIRCLE, CIRCLE_FILLED, INVERS_TRIANGLE, INVERS_TRIANGLE_FILLED, RHOMB, RHOMB_FILLED }

	public interface IBaseGraphic
	{
		void DrawPoints(IEnumerable<Vector3D> Points, Color color, PointTypes type, Thickness size, bool IsTopMost = true);
	}
}
