// Image compression function
export const compressImage = (file: File, maxSizeInBytes: number = 10 * 1024 * 1024): Promise<File> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new window.Image()

    img.onload = () => {
      // Calculate new dimensions to maintain aspect ratio
      let { width, height } = img
      const maxDimension = 1920 // Max width or height

      if (width > height) {
        if (width > maxDimension) {
          height = (height * maxDimension) / width
          width = maxDimension
        }
      } else {
        if (height > maxDimension) {
          width = (width * maxDimension) / height
          height = maxDimension
        }
      }

      canvas.width = width
      canvas.height = height

      // Draw and compress
      ctx?.drawImage(img, 0, 0, width, height)

      // Start with high quality and reduce if needed
      let quality = 0.9
      const tryCompress = () => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              if (blob.size <= maxSizeInBytes || quality <= 0.1) {
                // Create new file with compressed blob
                const compressedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                })
                resolve(compressedFile)
              } else {
                // Reduce quality and try again
                quality -= 0.1
                tryCompress()
              }
            }
          },
          file.type,
          quality,
        )
      }

      tryCompress()
    }

    img.src = URL.createObjectURL(file)
  })
}

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "ml_default")

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/dk4pwokx3/image/upload`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error("Cloudinary error:", errorData)
      throw new Error(`Upload failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log("Upload successful:", data)
    return data.secure_url
  } catch (error) {
    console.error("Upload error:", error)
    throw new Error(`Failed to upload image: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}
