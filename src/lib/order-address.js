export function parseDeliveryAddress(value) {
  if (typeof value !== "string") return {};

  return Object.fromEntries(
    value
      .split(/\r?\n/)
      .map((line) => {
        const separator = line.indexOf(":");
        return separator === -1
          ? ["Address", line.trim()]
          : [line.slice(0, separator).trim(), line.slice(separator + 1).trim()];
      })
      .filter(([, field]) => field),
  );
}
