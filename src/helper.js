export function getNftType(nftId) {
  nftId = Number(nftId);
  if (nftId >= 0 && nftId < 2) {
    return 0;
  } else if (nftId >= 2 && nftId < 4) {
    return 5;
  } else if (nftId >= 4 && nftId < 6) {
    return 5;
  } else if (nftId >= 6 && nftId < 8) {
    return 5;
  } else if (nftId >= 8 && nftId < 10) {
    return 5;
  } else {
    return 5;
  }
}

export function nftTypeToString(type) {
  switch (type) {
    case 0:
      return "King";
    case 1:
      return "Queen";
    case 2:
      return "Rook";
    case 3:
      return "Knight";
    case 4:
      return "Bishop";
    case 5:
      return "Pawn";
    default:
      return null;
  }
}

export function isClub(name, length) {
  if (length > 5 || length < 3 || name.length !== length) return false;

  // Check if the first part is a number
  for (let i = 0; i < length; i++) {
    const b = name[i];
    if (b < 0 || b > 9) return false;
  }

  return true;
}

export function formatAddress(address) {
  if (address && address.length >= 10) {
    const start = address.substring(0, 6);
    const end = address.substring(address.length - 4);
    return `${start}...${end}`;
  }
  return address; // Si l'adresse n'est pas valide, retournez-la telle quelle
}
