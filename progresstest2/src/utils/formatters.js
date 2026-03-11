export const formatCurrency = (amount) => {
  return Number(amount).toLocaleString("vi-VN") + " đ";
};

export const formatDate = (dateStr) => {
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
};