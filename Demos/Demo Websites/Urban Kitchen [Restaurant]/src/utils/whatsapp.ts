export const WHATSAPP_CMB3 = "94771234567"; // Placeholder
export const WHATSAPP_CMB7 = "94777654321"; // Placeholder

export const getWhatsAppLink = (
  number: string,
  message: string = "Hi URBAN KITCHEN’S, I’d like to place an order."
) => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encodedMessage}`;
};

export const buildOrderMessage = (
  branchName: string,
  items: { name: string; quantity: number }[]
) => {
  if (items.length === 0) {
    return `Hi URBAN KITCHEN’S, I’d like to place an order. Branch: ${branchName}.`;
  }
  
  const itemList = items
    .map((item) => `- ${item.name} x${item.quantity}`)
    .join('\n');
    
  return `Hi URBAN KITCHEN’S, I’d like to order:\n${itemList}\n\nBranch: ${branchName}.`;
};