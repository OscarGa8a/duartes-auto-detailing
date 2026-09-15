import { createHash } from "node:crypto";
import { pageIds, type PageId } from "./routes";

export type JsonValue = null | boolean | number | string | JsonValue[] | { [key: string]: JsonValue };
type Block = { state: "approved"; acceptedValue: JsonValue; sha256: string };
type RouteReview = { state: "staged" | "approved"; requiredBlocks: readonly string[] };
export type ApprovalLedger = { schemaVersion: 1; locale: "es-US"; blocks: Record<string, Block>; routes: Partial<Record<PageId, RouteReview>> };
export type PublicationManifest = { schemaVersion: 1; locale: "es-US"; blocks: Record<string, { sha256: string }>; routes: Partial<Record<PageId, RouteReview>> };

// Human-review records are intentionally outside deployable `src/content`.
export const reviewLedgerFiles = {
  approval: "localization/es-US/approval-ledger.json",
  claims: "localization/es-US/claim-ledger.md",
} as const;

export const canonicalJson = (value: JsonValue): string => {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  if (typeof value === "number" && !Number.isFinite(value)) throw new Error("Canonical JSON requires finite numbers.");
  return JSON.stringify(value);
};

export const sha256 = (value: JsonValue) => createHash("sha256").update(canonicalJson(value)).digest("hex");

function assertKnownRoute(pageId: string): asserts pageId is PageId {
  if (!pageIds.includes(pageId as PageId)) throw new Error(`Unknown Spanish route: ${pageId}`);
}

export const verifyPublication = (ledger: ApprovalLedger, manifest: PublicationManifest) => {
  const referenced = new Set<string>();
  for (const [pageId, route] of Object.entries(ledger.routes)) {
    assertKnownRoute(pageId);
    if (!route || !Array.isArray(route.requiredBlocks)) throw new Error(`Incomplete review route: ${pageId}`);
    for (const blockId of route.requiredBlocks) {
      const block = ledger.blocks[blockId];
      if (!block) throw new Error(`Missing approved block: ${blockId}`);
      if (block.sha256 !== sha256(block.acceptedValue)) throw new Error(`Changed approved block: ${blockId}`);
      referenced.add(blockId);
    }
  }
  for (const blockId of Object.keys(ledger.blocks)) if (!referenced.has(blockId)) throw new Error(`Orphan approved block: ${blockId}`);
  for (const [blockId, block] of Object.entries(manifest.blocks)) {
    if (!ledger.blocks[blockId] || ledger.blocks[blockId].sha256 !== block.sha256) throw new Error(`Unknown or changed promoted block: ${blockId}`);
  }
  for (const [pageId, route] of Object.entries(manifest.routes)) {
    assertKnownRoute(pageId);
    const reviewed = ledger.routes[pageId];
    if (!route || !reviewed || route.state !== reviewed.state || canonicalJson(route.requiredBlocks as JsonValue) !== canonicalJson(reviewed.requiredBlocks as JsonValue) || route.requiredBlocks.some((blockId) => !manifest.blocks[blockId])) throw new Error(`Incomplete publication route: ${pageId}`);
  }
};

export const getPublishedSpanishPage = (pageId: PageId, ledger: ApprovalLedger, manifest: PublicationManifest) => {
  verifyPublication(ledger, manifest);
  return ledger.routes[pageId]?.state === "approved" && manifest.routes[pageId]?.state === "approved" ? pageId : undefined;
};
