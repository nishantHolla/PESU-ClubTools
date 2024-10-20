function base64ToBlob(base64, contentType = "", sliceSize = 512) {
  const byteCharacters = atob(base64); // Decode base64 string to binary data
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, { type: contentType });
}

function base64ToFile(base64, filename, contentType = "") {
  if (typeof base64 !== "string") {
    return base64;
  }
  const blob = base64ToBlob(base64, contentType);
  return new File([blob], filename, { type: contentType });
}

export { base64ToFile };
