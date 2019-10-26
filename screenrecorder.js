let stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
let recorder = new RecordRTCPromisesHandler(stream, {
    type: 'video'
});
recorder.startRecording();

const sleep = m => new Promise(r => setTimeout(r, m));
await sleep(3000);

await recorder.stopRecording();
let blob = await recorder.getBlob();
invokeSaveAsDialog(blob);