export function inferImage(project) {
  if (!project || !project.image) {
    return "";
  } else if (typeof project.image === "object") {
    return URL.createObjectURL(project.image);
  } else {
    return `data:${project.contentType};base64,${project.image}`;
  }
}

export const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      resolve(reader.result.substring(reader.result.indexOf(",") + 1));
    reader.onerror = reject;
  });
