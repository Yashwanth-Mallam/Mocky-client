export const sendAudioToServer = async (
  audioFile: File
): Promise<{ transcript: string }> => {
  const formData = new FormData();
  formData.append("audio", audioFile);

  try {
    // path to your API endpoint
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/audio/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload audio");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Audio upload failed:", error);
    throw error;
  }
};

// audio validation can be added here if needed
