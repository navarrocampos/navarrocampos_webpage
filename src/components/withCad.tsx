import type { ReactNode } from 'react';

/**
 * Splits a string on the literal "CAD" and wraps each occurrence in a
 * small, muted <span className="cad"> so currency labels read as a
 * subtle disclaimer rather than part of the headline price.
 *
 * Usage: {withCad(tier.price)}  →  "$89 CAD" renders as $89 ᶜᵃᵈ (small)
 */
export function withCad(text: string): ReactNode {
  const parts = text.split('CAD');
  if (parts.length === 1) return text;

  const nodes: ReactNode[] = [];
  parts.forEach((part, i) => {
    if (part) nodes.push(part);
    if (i < parts.length - 1) {
      nodes.push(
        <span className="cad" key={i}>
          CAD
        </span>
      );
    }
  });
  return nodes;
}
