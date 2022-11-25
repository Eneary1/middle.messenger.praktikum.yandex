const objectFromFormData = function(formData: FormData): {[x: string]: unknown} {
	return Object.fromEntries(Array.from(formData.entries()))
  }

export {objectFromFormData}