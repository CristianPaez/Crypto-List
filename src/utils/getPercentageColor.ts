// Returns color based on percentage value (positive/negative)
export const getPercentageColor = (value: string) => {
  const numValue = parseFloat(value);
  return {
    color: numValue >= 0 ? "#4CAF50" : "#FF5252",
    value: `${numValue >= 0 ? "+" : ""}${numValue}%`,
  };
};
