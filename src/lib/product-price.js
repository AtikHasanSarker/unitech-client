function toValidPrice(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const numericValue = Number(value);
  return Number.isFinite(numericValue) && numericValue >= 0
    ? numericValue
    : null;
}

/**
 * Returns true when discountPrice is a valid non-negative number lower than price.
 */
export function hasValidDiscountPrice(product) {
  const price = toValidPrice(product?.price);
  const discountPrice = toValidPrice(product?.discountPrice);

  return price !== null && discountPrice !== null && discountPrice < price;
}

/**
 * Returns true when the product has at least one valid non-negative price.
 */
export function hasSellablePrice(product) {
  return (
    toValidPrice(product?.discountPrice) !== null ||
    toValidPrice(product?.price) !== null
  );
}

/**
 * Returns discountPrice when present and valid, otherwise falls back to price.
 */
export function getEffectivePrice(product) {
  const discountPrice = toValidPrice(product?.discountPrice);
  if (discountPrice !== null) {
    return discountPrice;
  }

  return toValidPrice(product?.price) ?? 0;
}

/**
 * Returns the rounded discount percentage when a valid discountPrice is active.
 */
export function getDiscountPercentage(product) {
  if (!hasValidDiscountPrice(product)) {
    return 0;
  }

  const price = Number(product.price);
  const discountPrice = Number(product.discountPrice);
  return Math.round(((price - discountPrice) / price) * 100);
}
