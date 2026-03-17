"use client";

import { useState } from "react";

type CounterProps = {
  initialValue?: number;
  step?: number;
};

export default function Counter({ initialValue = 0, step = 1 }: CounterProps) {
  const [count, setCount] = useState(initialValue);

  return (
    <div className="counter-demo">
      <output aria-live="polite">{count}</output>
      <div className="counter-buttons">
        <button
          type="button"
          onClick={() => setCount((c) => c - step)}
          aria-label={`Decrement by ${step}`}
        >
          −
        </button>
        <button
          type="button"
          onClick={() => setCount((c) => c + step)}
          aria-label={`Increment by ${step}`}
        >
          +
        </button>
      </div>
    </div>
  );
}
