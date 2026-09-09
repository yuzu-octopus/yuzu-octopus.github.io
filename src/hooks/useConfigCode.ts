import { useState, useEffect, useRef } from 'react';

interface UseConfigCodeResult {
  code: string | null;
  loading: boolean;
  error: string | null;
}

/**
 * Fetches config source code from a GitHub raw URL.
 * Only fetches when `shouldFetch` is true (e.g., user clicked "View Source").
 * Caches the result in state so re-expanding doesn't re-fetch.
 * Bump `retryNonce` to re-attempt after a failure.
 */
export function useConfigCode(
  rawUrl: string | undefined,
  shouldFetch: boolean,
  retryNonce = 0,
): UseConfigCodeResult {
  const [code, setCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cacheRef = useRef<Map<string, string>>(new Map());
  const cancelledRef = useRef(false);
  const consumedNonce = useRef(0);

  useEffect(() => {
    if (!rawUrl || !shouldFetch) {
      return;
    }

    // A retry explicitly discards the previous attempt, then caching resumes.
    // Consume the nonce so later effect re-runs (collapse/re-expand) reuse
    // the fresh result instead of evicting and refetching it.
    if (retryNonce > consumedNonce.current) {
      consumedNonce.current = retryNonce;
      cacheRef.current.delete(rawUrl);
    }
    // Return cached result if available
    const cached = cacheRef.current.get(rawUrl);
    if (cached !== undefined) {
      setCode(cached);
      setLoading(false);
      setError(null);
      return;
    }

    cancelledRef.current = false;
    setLoading(true);
    setError(null);

    fetch(rawUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        if (!cancelledRef.current) {
          cacheRef.current.set(rawUrl, text);
          setCode(text);
          setLoading(false);
        }
      })
      .catch((err: unknown) => {
        if (!cancelledRef.current) {
          setError(err instanceof Error ? err.message : String(err));
          setLoading(false);
        }
      });

    return () => {
      cancelledRef.current = true;
    };
  }, [rawUrl, shouldFetch, retryNonce]);

  return { code, loading, error };
}
