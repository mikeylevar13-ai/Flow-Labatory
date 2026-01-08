const beat = document.getElementById("beat");
const select = document.getElementById("beatSelect");

function playBeat() {
  beat.src = select.value;
  beat.play();
}

function stopBeat() {
  beat.pause();
  beat.currentTime = 0;
}

// 🎙 Recording
let recorder;
let chunks = [];

async function startRecording() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  recorder = new MediaRecorder(stream);
  recorder.start();
  chunks = [];

  recorder.ondataavailable = e => chunks.push(e.data);
  recorder.onstop = () => {
    const blob = new Blob(chunks);
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
  };
}

function stopRecording() {
  recorder.stop();
}
