let mediaRecorder: MediaRecorder | null = null;
let chunks: Blob[] = [];
let resolveRecording: ((blob: Blob) => void) | null = null;

export function recordAudio(stream: MediaStream): Promise<Blob> {
  chunks = [];
  mediaRecorder = new MediaRecorder(stream);

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      chunks.push(event.data);
    }
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: "audio/webm" });
    if (resolveRecording) {
      resolveRecording(blob);
      resolveRecording = null;
    }
  };

  mediaRecorder.start();

  return new Promise<Blob>((resolve) => {
    resolveRecording = resolve;
  });
}

recordAudio.stop = () => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }
};
