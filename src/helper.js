export function getNftType(nftId) {
  nftId = Number(nftId);
  if (nftId >= 0 && nftId < 2) {
    return 0;
  } else if (nftId >= 2 && nftId < 12) {
    return 1;
  } else if (nftId >= 12 && nftId < 62) {
    return 2;
  } else if (nftId >= 62 && nftId < 162) {
    return 3;
  } else if (nftId >= 162 && nftId < 362) {
    return 4;
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
