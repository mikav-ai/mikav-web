interface RecordAudio {
  (stream: MediaStream): Promise<Blob>;
  stop: () => void;
}

let mediaRecorder: MediaRecorder | null = null;

/**
 * Records audio from the provided MediaStream and resolves with the recorded
 * Blob when `recordAudio.stop()` is called.
 */
export const recordAudio = ((stream: MediaStream): Promise<Blob> => {
  return new Promise<Blob>((resolve, reject) => {
    try {
      const chunks: BlobPart[] = [];
      mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        resolve(blob);
      };

      mediaRecorder.onerror = (event) => {
        reject(event);
      };

      mediaRecorder.start();
    } catch (error) {
      reject(error);
    }
  });
}) as RecordAudio;

recordAudio.stop = () => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }
};
