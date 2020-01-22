import { useEffect, useState, useRef, MutableRefObject } from "react";

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const setFromEvent = e => setPosition({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", setFromEvent);
    return () => {
      window.removeEventListener("mousemove", setFromEvent);
    };
  }, []);
  return position;
};

type Point = { x: number; y: number };

const getCenter = (ref: MutableRefObject<SVGElement>): Point => {
  if (!ref.current) {
    return;
  }

  const {
    top,
    bottom,
    left,
    right,
    x,
    y
  } = ref.current.getBoundingClientRect();

  const xOffset = (right - left) / 2;
  const yOffset = (bottom - top) / 2;

  return { x: x + xOffset, y: y + yOffset };
};

const getBearing = (a: Point, b: Point): number =>
  Math.atan2(a?.y - b?.y, a?.x - b?.x);

const getOffset = (a: Point, b: Point): Point => {
  const bearing = getBearing(a, b);

  return { x: Math.cos(bearing), y: Math.sin(bearing) };
};

const ZERO_POINT = { x: 0, y: 0 };

export default () => {
  const position = useMousePosition();

  const topElement = useRef<SVGElement>(undefined) as any;
  const leftElement = useRef<SVGElement>(undefined) as any;
  const rightElement = useRef<SVGElement>(undefined) as any;

  const topCenter = getCenter(topElement);
  const leftCenter = getCenter(leftElement);
  const rightCenter = getCenter(rightElement);

  const topOffset = topElement.current
    ? getOffset(position, topCenter)
    : ZERO_POINT;
  const leftOffset = leftElement.current
    ? getOffset(position, leftCenter)
    : ZERO_POINT;
  const rightOffset = rightElement.current
    ? getOffset(position, rightCenter)
    : ZERO_POINT;

  return (
    <svg
      width="134px"
      height="92px"
      viewBox="0 0 134 92"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Trio</title>
      <desc>Created with Sketch.</desc>
      <g
        id="Page-1"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <g id="Trio" transform="translate(4.000000, 4.000000)">
          <g
            ref={topElement}
            id="Top"
            transform="translate(36.833333, 0.000000)"
          >
            <path
              d="M33.75,52.7837838 C52.3896103,52.7837838 67.5,52.8438393 67.5,34.0426196 C67.5,15.2414 52.3896103,0 33.75,0 C15.1103897,0 0,15.2414 0,34.0426196 C0,52.8438393 15.1103897,52.7837838 33.75,52.7837838 Z"
              id="Body"
              stroke="#17161D"
              stroke-width="8"
              fill="#FFFFFF"
            ></path>
            <ellipse
              id="LeftEye"
              fill="#17161D"
              cx={24.0377698 + topOffset.x}
              cy={13.4403153 + topOffset.y}
              rx="4.12769784"
              ry="4.15427928"
            ></ellipse>
            <ellipse
              id="RightEye"
              fill="#17161D"
              cx={43.4622302 + topOffset.x}
              cy={13.4403153 + topOffset.y}
              rx="4.12769784"
              ry="4.15427928"
            ></ellipse>
          </g>
          <g
            ref={leftElement}
            id="Left"
            transform="translate(0.000000, 21.000000)"
          >
            <path
              d="M33.75,52.6438356 C52.3896103,52.6438356 67.5,52.7037319 67.5,33.9523608 C67.5,15.2009897 52.3896103,0 33.75,0 C15.1103897,0 0,15.2009897 0,33.9523608 C0,52.7037319 15.1103897,52.6438356 33.75,52.6438356 Z"
              id="Body"
              stroke="#17161D"
              stroke-width="8"
              fill="#FFFFFF"
            ></path>
            <ellipse
              id="LeftEye"
              fill="#17161D"
              cx={11.6276978 + leftOffset.x}
              cy={28.3761416 + leftOffset.y}
              rx="4.12769784"
              ry="4.14326484"
            ></ellipse>
            <ellipse
              id="RightEye"
              fill="#17161D"
              cx={43.4622302 + leftOffset.x}
              cy={13.4046804 + leftOffset.y}
              rx="4.12769784"
              ry="4.14326484"
            ></ellipse>
            <path
              d="M31,31.739807 C34.8659932,31.739807 38,28.3819427 38,24.239807 C38,20.0976714 34.522432,20 30.6564388,20 C26.7904455,20 24,20.0976714 24,24.239807 C24,28.3819427 27.1340068,31.739807 31,31.739807 Z"
              id="Mouth"
              fill="#17161D"
              transform="translate(31.000000, 25.869904) rotate(-30.000000) translate(-31.000000, -25.869904) "
            ></path>
          </g>
          <g
            ref={rightElement}
            id="Right"
            transform="translate(58.333333, 31.000000)"
          >
            <path
              d="M33.75,52.5 C52.3896103,52.5 67.5,52.5597326 67.5,33.8595948 C67.5,15.159457 52.3896103,0 33.75,0 C15.1103897,0 0,15.159457 0,33.8595948 C0,52.5597326 15.1103897,52.5 33.75,52.5 Z"
              id="Body"
              stroke="#17161D"
              stroke-width="8"
              fill="#FFFFFF"
            ></path>
            <circle
              id="RightEye"
              fill="#17161D"
              cx={51.1666667 + rightOffset.x}
              cy={33.5 + rightOffset.y}
              r="5.5"
            ></circle>
            <circle
              id="LeftEye"
              fill="#17161D"
              cx={28.1666667 + rightOffset.x}
              cy={35.5 + rightOffset.y}
              r="5.5"
            ></circle>
            <ellipse
              id="Mouth"
              fill="#17161D"
              cx="41.1666667"
              cy="41"
              rx="2.5"
              ry="3"
            ></ellipse>
          </g>
        </g>
      </g>
    </svg>
  );
};
