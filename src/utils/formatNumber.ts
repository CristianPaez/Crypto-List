// Function to format numbers with two decimal places
export const formatNumber = (num: string) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(num));
};
