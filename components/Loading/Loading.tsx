import { signal } from "@preact/signals-react";
import { useEffect, useState } from "react";
import "./Loading.scss";
export const loading = signal(false);
export const loadingDelay = signal(1000);

export function setLoading(state: boolean, delay = 1000) {
  loading.value = state;
  loadingDelay.value = delay;
}

export default function Loading() {
  const [showLoading, setShowLoading] = useState(false);

  useEffect(() => {
    if (!loading.value) {
      return setShowLoading(false);
    }
    setTimeout(() => {
      setShowLoading(loading.value);
    }, loadingDelay.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading.value]);

  return (
    <>
      {showLoading && (
        <div className="loading-component" data-testid="loading-component">
          <div className="loading"></div>
        </div>
      )}
    </>
  );
}
