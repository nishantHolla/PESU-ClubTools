
export function inferImage(project) {
  if (typeof(project.image) === 'object') {
    return URL.createObjectURL(project.image)
  }
  else {
    return `data:${project.contentType};base64,${project.image}`

  }
}

