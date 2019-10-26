const ffmpeg = require("ffmpeg-static")
const { spawn } = require("child_process")
const { createWriteStream } = require("fs")

console.log(ffmpeg.path)
const process = spawn(
  ffmpeg.path,
  // ["-probesize", "10M", "-f", "gdigrab", "-framerate", "60", "-i", "desktop", "-f", "mp4", "-"],
  ['-f', 'avfoundation', '-list_devices', 'true', '-progress' , 'pipe:1'],
  { stdio: "pipe" }
);
const stream = process.stdout

// const file = createWriteStream("capture.txt")
// stream.pipe(file)

stream.on("data", chunk => {
  console.log(chunk);
});

stream.on("error", err => {
  console.log(err)
})