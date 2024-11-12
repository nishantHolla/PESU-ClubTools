
export function inferImage(project) {
  if (!project || !project.image) {
    return ""
  }
  else if (typeof(project.image) === 'object') {
    return URL.createObjectURL(project.image)
  }
  else {
    return `data:${project.contentType};base64,${project.image}`
  }
}

